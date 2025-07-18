import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './Pages/LandingPage';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegistrationPage';
import ForgotPasswordPage from './Pages/ForgotPassword';
import HomePage from './Pages/HomePage';
import ProtectedRoute from './Pages/ProtectedRoute';
import AllCategoriesPage from './Pages/AllCategoriesPage';
import SubCategoryPage from './Pages/SubCategoriesPage';
import AllSubcategoriesPage from './Pages/AllSubcategoriesPage';
import SubcategoryTestsPage from './Pages/SubcategoryTestsPage';
import TestInstructionsPage from './Pages/TestInstructionsPage';
import TakeTestPage from './Pages/LiveTestPage/TestTakingpage';
import TestResultsPage from './Pages/TestResultsPage';
import MyTestsPage from './Pages/MyTestsPage';
import AboutUsPage from './Pages/AboutPage';
import LandingPageAllCategoriesPage from './Pages/LandingPageAllCategoriesPage';
import LandingPageAllSubcategoriesPage from './Pages/LandingPageAllSubcategoriesPage';
import LandingPageSubcategoriesByCategory from './Pages/LandingPageSubcategoriesByCategory';
import LandingAboutUsPage from './Pages/LandingAboutUsPage';
import BlogsPage from './Pages/BlogPage';

import useAutoTracker from './hooks/useAutoTracker'; 
import { useUser } from './context/UserContext';
import CookieConsentBanner from './Components/CookieConsentBanner';

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  const { user } = useUser(); 
  useAutoTracker(user?.id);

  return (
    <>
      {/* 🔐 Toast + Cookie Consent must be outside the Routes */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
      />
      <CookieConsentBanner />

      {/* 🌐 Routes */}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/all-categories" element={<LandingPageAllCategoriesPage />} />
        <Route path="/all-exams" element={<LandingPageAllSubcategoriesPage />} />
        <Route path="/category/:categoryId/exams" element={<LandingPageSubcategoriesByCategory />} />
        <Route path="/Landing-about" element={<LandingAboutUsPage />} />
        <Route path="/blogs" element={<BlogsPage />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />

        <Route path="/home" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
        <Route path="/categories" element={<ProtectedRoute><AllCategoriesPage /></ProtectedRoute>} />
        <Route path="/exams/:id" element={<ProtectedRoute><SubCategoryPage /></ProtectedRoute>} />
        <Route path="/exams" element={<ProtectedRoute><AllSubcategoriesPage /></ProtectedRoute>} />
        <Route path="/subcategories/:subId/tests" element={<ProtectedRoute><SubcategoryTestsPage /></ProtectedRoute>} />
        <Route path="/test/:testId/instructions" element={<ProtectedRoute><TestInstructionsPage /></ProtectedRoute>} />
        <Route path="/take-test/:testId/start" element={<ProtectedRoute><TakeTestPage /></ProtectedRoute>} />
        <Route path="/test-results/:attemptId" element={<ProtectedRoute><TestResultsPage /></ProtectedRoute>} />
        <Route path="/my-tests" element={<ProtectedRoute><MyTestsPage /></ProtectedRoute>} />
        <Route path="/about" element={<ProtectedRoute><AboutUsPage /></ProtectedRoute>} />
      </Routes>
    </>
  );
}
