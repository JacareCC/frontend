import React, { useState } from "react";
import PrivacyPolicy from "./PrivacyPolicy";

export default function TermsAndConditions({ setTermsAgreed, setToggleAgreement }: { setTermsAgreed: any, setToggleAgreement: any }) {
    const [showPrivacyPolicy, setShowPrivacyPolicy] = useState<boolean>(false);

    
// handler
function handleAgreeClick() {
    setTermsAgreed((prev: boolean) => !prev);
    setToggleAgreement((prev: boolean) => !prev);
}

function handleCloseTerms() {
    setToggleAgreement((prev: boolean) => !prev);
}

function handleShowPrivacyPolicy() {
    setShowPrivacyPolicy((prev: boolean) => !prev);
}

  return (
    <div className="container relative mx-auto mt-4 p-4 bg-white rounded-lg shadow-lg terms-container z-10 max-w-full w-11/12 md:w-2/5 max-h-[60vh] overflow-y-auto">        
        <h1 className="text-md font-bold mb-2">Terms and Conditions</h1>
        <p className="mb-0.5 text-xs">Read these terms and conditions carefully before using our web application.</p>

        <h2 className="text-sm font-semibold mb-0.5">1. Acceptance of Terms</h2>
        <p className="mb-0.5 text-xs">By using our web application, you agree to comply with and be bound by these terms and conditions.</p>

        <h2 className="text-sm font-semibold mb-0.5">2. User Registration</h2>
        <p className="mb-0.5 text-xs">To access features, you may need to register. Provide accurate information during the registration process.</p>

        <h2 className="text-sm font-semibold mb-0.5">3. User Responsibilities</h2>
        <p className="mb-0.5 text-xs">You are responsible for maintaining the confidentiality of your account and password.</p>

        <h2 className="text-sm font-semibold mb-0.5">4. Intellectual Property</h2>
        <p className="mb-0.5 text-xs">The web app and its content are owned by Jacareview and protected by international laws.</p>

        <h2 className="text-sm font-semibold mb-0.5">5. Limitation of Liability</h2>
        <p className="mb-0.5 text-xs">Jacareview and its affiliates shall not be liable for any damages or loss of profits.</p>

        <h2 className="text-sm font-semibold mb-0.5">Contact Us</h2>
        <p className="mb-0.5 text-xs">For questions, contact us at <a href="mailto:jacareview@gmail.com">jacareview@gmail.com</a>.</p>

        <h2 className="text-sm font-semibold mb-0.5">Privacy Policy</h2>
        <p className="mb-0.5 text-xs" onClick={handleShowPrivacyPolicy}><u>Click here to view our Privacy Policy</u></p>

        <button className="text-xs button-4 ml-4 p-2 mt-4 bg-jgreen rounded" onClick={handleAgreeClick}>Agree</button>
        <button className="text-xs text-white button-4 ml-4 rounded p-2 mt-4 bg-gray-800" onClick={handleCloseTerms}>Back</button>
        {showPrivacyPolicy && (
         <div className="fixed inset-0 flex items-center justify-center z-[101] bg-black bg-opacity-50">
        <PrivacyPolicy setShowPrivacyPolicy={setShowPrivacyPolicy} />
        </div>)
        }
    </div>

  );
}
