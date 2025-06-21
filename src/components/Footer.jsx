import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white text-sm w-full">
      <div className="flex justify-between items-center p-8">
        <div>
          🔑 <span className="text-green-500 font-semibold">Key</span>
          <span className="font-bold">Keep</span>
          <p className="text-xs text-gray-400">Securely manage your passwords</p>
        </div>
        <div className="text-gray-500">© 2025 KeyKeep</div>
      </div>
    </footer>
  );
};


export default Footer;
