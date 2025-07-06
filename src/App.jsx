import React from 'react';
import './App.css'
import { Routes, Route } from 'react-router-dom';
import LandingPage from './Pages/LandingPage';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegistrationPage';
import ForgotPasswordPage from './Pages/ForgotPassword';
import HomePage from './Pages/HomePage';
import ProtectedRoute from './Pages/ProtectedRoute';
import AllCategoriesPage from './Pages/AllCategoriesPage';
import SubCategoryPage from './Pages/SubCategoriesPage';
import SubcategoryTestsPage from './Pages/SubcategoryTestsPage';
import  TestInstructionsPage from './Pages/TestInstructionsPage';
import TakeTestPage from './Pages/LiveTestPage/TestTakingpage';
import TestResultsPage from './Pages/TestResultsPage';
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        }
      />
      <Route 
       path = "/exams" element = {
        <ProtectedRoute>
          <AllCategoriesPage />
        </ProtectedRoute>   

       }  
      />
      <Route  
       path = "/category/:id" element = {
        <ProtectedRoute>
          <SubCategoryPage />
        </ProtectedRoute>
       }
      />  

    <Route  
       path = "/subcategories/:subId/tests" element = {
        <ProtectedRoute>
          <SubcategoryTestsPage />
        </ProtectedRoute>
       }
      />
      <Route
        path="/test/:testId/instructions"
        element={
          <ProtectedRoute>
            <TestInstructionsPage />
          </ProtectedRoute>
        }
      />

      {/* <Route path="/test/:testId" element={<TestPage />} /> */}
        <Route
        path="/take-test/:testId/start"
        element={
          <ProtectedRoute>
            <TakeTestPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/test-results/:attemptId"
        element={
          <ProtectedRoute>
            <TestResultsPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
