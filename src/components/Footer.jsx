import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full py-6 bg-white/80 text-center text-gray-500 text-sm mt-16 shadow-inner rounded-t-2xl">
      &copy; {new Date().getFullYear()} EduTrack. All rights reserved.
    </footer>
  );
}
