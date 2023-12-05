"use client"
import Navbar from "@/components/Navbar";
import "../../../app/globals.css"
const BusinessPage: React.FC = () => {
  return (
    <div>
      <Navbar />

      <div className="mt-16 p-4">
        <h1 className="text-3xl font-bold mb-4">Business Page</h1>
        <p className="text-lg">
          This is a mobile-responsive div with a top margin for your business content.
        </p>
      </div>
    </div>
  );
};

export default BusinessPage;