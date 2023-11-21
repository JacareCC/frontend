export default function PrivacyPolicy({setShowPrivacyPolicy}:{setShowPrivacyPolicy: any}){

//handler
function handleClosePrivacyPolicy(){
    setShowPrivacyPolicy((prev:boolean)=> !prev)
}
return(
<div className="container relative mx-auto mt-8 p-8 bg-white rounded-lg shadow-lg privacy-container z-20">
    <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

    <p className="mb-4">Last updated: November 21st, 2023</p>

    <h2 className="text-xl font-semibold mb-4">1. Information We Collect</h2>
    <p>We collect and process various types of information when you use our web app, including personal and non-personal information. This may include:</p>
    <ul className="list-disc ml-6">
        <li>Personal information (e.g., name, email address)</li>
        <li>Usage data (e.g., pages visited, interactions)</li>
        <li>Device information (e.g., device type, IP address)</li>
    </ul>

    <h2 className="text-xl font-semibold mb-4">2. How We Use Your Information</h2>
    <p>We use the collected information for various purposes, including:</p>
    <ul className="list-disc ml-6">
        <li>Providing and maintaining our web app</li>
        <li>Improving and personalizing user experience</li>
        <li>Communicating with users</li>
    </ul>

    <h2 className="text-xl font-semibold mb-4">3. Cookies</h2>
    <p>We use cookies and similar tracking technologies to analyze user activity and improve our services. You can control the use of cookies through your browser settings.</p>

    <h2 className="text-xl font-semibold mb-4">4. Data Security</h2>
    <p>We implement security measures to protect your data, but no method of transmission over the internet or electronic storage is 100% secure. We cannot guarantee absolute security.</p>

    <h2 className="text-xl font-semibold mb-4">5. Third-Party Links</h2>
    <p>Our web app may contain links to third-party websites. We have no control over the content and practices of these sites and are not responsible for their privacy policies.</p>

    <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
    <p>If you have any questions about our privacy policy, please contact us at <a href="mailto:jacareview@gmail.com">jacareview@gmail.com</a>.</p>

    <button onClick={handleClosePrivacyPolicy}>Back</button>
</div>
)
}