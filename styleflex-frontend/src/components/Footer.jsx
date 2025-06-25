import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-center text-sm text-gray-600 py-4 mt-10 border-t">
      <div className="max-w-screen-lg mx-auto px-4">
        <p>&copy; {new Date().getFullYear()} StyleFlex. All rights reserved.</p>
        <div className="mt-2 flex justify-center gap-4">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:underline">
            Facebook
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:underline">
            Instagram
          </a>
          <a href="mailto:contact@styleflex.com" className="hover:underline">
            Contact Us
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
