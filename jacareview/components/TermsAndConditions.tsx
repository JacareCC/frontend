 import React, {useState} from "react"
 import PrivacyPolicy from "./PrivacyPolicy"

 export default function TermsAndConditions ({setTermsAgreed, setToggleAgreement}: {setTermsAgreed:any, setToggleAgreement:any}){
    const [showPrivacyPolicy, setShowPrivacyPolicy] = useState<boolean>(false)
    //handler
    function handleAgreeClick() {
        setTermsAgreed((prev:boolean) => !prev)
        setToggleAgreement((prev:boolean)=>!prev)
    }

    function handleCloseTerms() {
        setToggleAgreement((prev:boolean)=>!prev)
    }

    function handleShowPrivacyPolicy(){
        setShowPrivacyPolicy((prev:boolean) => !prev)
    }

    return(

            <div className="container relative mx-auto mt-8 p-8 bg-white rounded-lg shadow-lg terms-container z-10">
    <h1 className="text-3xl font-bold mb-6">Terms and Conditions</h1>

    <p className="mb-4">Please read these terms and conditions carefully before using our web application.</p>

    <h2 className="text-xl font-semibold mb-4">1. Acceptance of Terms</h2>
    <p>By using our web application, you agree to comply with and be bound by these terms and conditions.</p>

    <h2 className="text-xl font-semibold mb-4">2. User Registration</h2>
    <p>In order to access certain features of the web app, you may be required to register for an account. You agree to provide accurate, current, and complete information during the registration process.</p>

    <h2 className="text-xl font-semibold mb-4">3. User Responsibilities</h2>
    <p>You are responsible for maintaining the confidentiality of your account and password. You agree to notify us immediately of any unauthorized use of your account.</p>

    <h2 className="text-xl font-semibold mb-4">4. Intellectual Property</h2>
    <p>The web app and its original content, features, and functionality are owned by Jacareview and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.</p>

    <h2 className="text-xl font-semibold mb-4">5. Limitation of Liability</h2>
    <p>Jacareview and its affiliates shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues.</p>


    <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
    <p>If you have any questions about these terms and conditions, please contact us at <a href="mailto:jacareview@gmail.com">jacareview@gmail.com</a>.</p>

    <h2 className="text-xl font-semibold mb-4">Privacy Policy</h2>
    <p onClick={handleShowPrivacyPolicy}>Please click here to view our Privacy Policy</p>
   


            <button onClick={handleAgreeClick}>Agree</button>
            <button onClick={handleCloseTerms}>Back</button>
            {showPrivacyPolicy && (<PrivacyPolicy setShowPrivacyPolicy={setShowPrivacyPolicy}/>)}
            </div>
          

    )
 }