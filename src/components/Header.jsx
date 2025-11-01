import React from 'react';

export default function Header() {
  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-white/80 shadow-md rounded-b-2xl mb-10 sticky top-0 z-10 backdrop-blur-md">
      <div className="flex items-center gap-2">
        <span className="text-3xl font-extrabold text-blue-700 tracking-tight">EduTrack</span>
      </div>
      <div className="flex gap-6">
        <a href="#features" className="text-gray-700 hover:text-blue-600 font-medium transition">Features</a>
        <a href="#login" className="text-gray-700 hover:text-blue-600 font-medium transition">Login</a>
      </div>
    </nav>
  );
}
