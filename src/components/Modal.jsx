import React from 'react';
import { motion } from 'framer-motion';

export default function Modal({ children, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 sm:px-0">
      {/* Backdrop with improved blur and animation */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-black/30 to-black/50 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
      />

      {/* Modal Content with enhanced design */}
      <motion.div
        className="relative z-10 w-full max-w-md"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ 
          duration: 0.3,
          type: "spring",
          stiffness: 300,
          damping: 30
        }}
      >
        {/* Modal inner container with glass effect */}
        <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl 
          border border-white/20 overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 to-blue-50/50 z-0" />
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-200 rounded-full blur-3xl opacity-30" />
          <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-indigo-200 rounded-full blur-3xl opacity-30" />

          {/* Content container */}
          <div className="relative z-10 p-8">
            {/* Enhanced close button with animation */}
            <motion.button
              whileHover={{ rotate: 90 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full
                bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
            >
              <span className="text-gray-600 text-lg leading-none">&times;</span>
            </motion.button>

            {/* Main content */}
            {children}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
