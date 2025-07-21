import React, { useState } from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import LegalModal from "./LeagalModel";

const Footer = () => {
  const [modalData, setModalData] = useState({ open: false, title: "", content: "" });

  const openModal = (type) => {
    let title = "";
    let content = "";

    if (type === "privacy") {
      title = "Privacy Policy";
      content = `
A AWM, your privacy is extremely important to us. This Privacy Policy outlines how we collect, use, and protect your personal information.

1. Information We Collect:
   - Email address, phone number, and username when you sign up
   - Test history, performance data, and time spent on tests
   - Device and browser data for analytics purposes

2. How We Use Your Data:
   - To provide personalized test experiences and track your progress
   - To send important updates or account-related notifications
   - To improve the platform using aggregated, anonymized data

3. Data Sharing:
   - We do NOT sell or rent your personal data to third parties
   - Data may be shared with trusted services only for analytics, email delivery, or hosting (under strict confidentiality)

4. Security:
   - All data is encrypted in transit (HTTPS)
   - Stored securely using industry-standard security protocols

5. User Rights:
   - You may access, update, or request deletion of your data anytime by contacting support@awm.com

By using AWM, you consent to this policy. We may update it occasionally and will notify users of significant changes.
`;
    } else if (type === "terms") {
      title = "Terms & Conditions";
      content = `
Welcome to AWM. By accessing or using our platform, you agree to be bound by the following terms and conditions:

1. Fair Use:
   - AWM is intended for personal and non-commercial use.
   - Sharing accounts or test content is strictly prohibited.

2. User Conduct:
   - You agree not to cheat, tamper with results, or misuse the platform in any way.
   - Posting or uploading copyrighted or offensive content is not allowed.

3. Test Content:
   - All questions and materials are either original or sourced from public domains.
   - We do not guarantee any official result based on your performance here.

4. Account Suspension:
   - AWM reserves the right to suspend or delete accounts that violate these terms.

5. Modifications:
   - Terms may change without prior notice. Continued use implies acceptance of the updated terms.
`;
    } else if (type === "disclaimer") {
      title = "Disclaimer";
      content = `
AWM is an independent educational platform offering practice tests for competitive exams.

1. No Affiliation:
   - We are not affiliated with any government agency or official exam body.

2. Accuracy:
   - While we aim for accuracy in our questions and explanations, we do not guarantee 100% correctness or relevance to actual exams.

3. Outcomes:
   - Your performance on AWM does not guarantee success in any official examination.

4. Purpose:
   - All content is provided for learning and revision purposes only.
`;
    }

    setModalData({ open: true, title, content });
  };

  const closeModal = () => setModalData({ open: false, title: "", content: "" });

  return (
    <footer className="bg-gray-900 text-gray-200 py-10 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        
        {/* Company Info */}
        <div>
          <h2 className="text-2xl font-bold text-white">AWM - Ace With Mock</h2>
          <p className="text-sm mt-2">
            Your gateway to government job success. Practice, learn, and crack your exams with confidence.
          </p>
        </div>

        {/* About Us & Blog */}
        <div>
          <h3 className="text-lg font-semibold mb-3">About</h3>
          <ul className="space-y-1 text-sm">
            <li><a href="/about" className="hover:text-white">About Us</a></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Support</h3>
          <ul className="space-y-1 text-sm">
            <li><a  className="hover:text-white">Contact Us</a></li>
            <li><a  className="hover:text-white">Help Center</a></li>
            <li><a className="hover:text-white">Report a Problem</a></li>
          </ul>
        </div>

        {/* Legal & Social */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Legal & Social</h3>
          <ul className="space-y-1 text-sm mb-4">
            <li><button onClick={() => openModal("privacy")} className="hover:text-white">Privacy Policy</button></li>
            <li><button onClick={() => openModal("terms")} className="hover:text-white">Terms & Conditions</button></li>
            <li><button onClick={() => openModal("disclaimer")} className="hover:text-white">Disclaimer</button></li>
          </ul>
          <div className="flex gap-4 text-xl">
            <a href="#" className="hover:text-white" aria-label="Facebook"><FaFacebook /></a>
            <a href="#" className="hover:text-white" aria-label="Twitter"><FaTwitter /></a>
            <a href="#" className="hover:text-white" aria-label="Instagram"><FaInstagram /></a>
            <a href="#" className="hover:text-white" aria-label="YouTube"><FaYoutube /></a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-10 text-center text-xs text-gray-500">
        &copy; {new Date().getFullYear()} AWM. All rights reserved.
      </div>

      {/* Legal Modal */}
      {modalData.open && (
        <LegalModal
          title={modalData.title}
          content={modalData.content}
          onClose={closeModal}
        />
      )}
    </footer>
  );
};

export default Footer;
