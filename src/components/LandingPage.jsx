import React, { useState } from 'react';
import Modal from './Modal';
import LoginForm from './LoginForm';
import { motion, AnimatePresence } from 'framer-motion';

export default function LandingPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userType, setUserType] = useState('');

  const handleUserSelection = (type) => {
    setUserType(type);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setUserType('');
  };

  const userRoles = [
    {
      type: 'Teacher',
      icon: '🗂️',
      description:
        'Organize and track student activities, assignments, and progress all in one place.',
      features: [
        'Create & Assign Activities',
        'Monitor Progress',
        'Generate Reports',
      ],
      gradient: 'from-blue-600 to-indigo-600',
      hover: 'hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50',
    },
    {
      type: 'Student',
      icon: '📋',
      description:
        'View your assigned activities, check them off as you complete tasks, and stay on top of your goals.',
      features: [
        'View Assigned Tasks',
        'Mark Completed Activities',
        'Track Personal Progress',
      ],
      gradient: 'from-emerald-600 to-teal-600',
      hover: 'hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50',
    },
  ];

  return (
    <div className="min-h-fit bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-center px-6 py-12">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">
          Welcome to{' '}
          <span className="text-indigo-600">Activity Checklist System</span>
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          Stay organized and productive — teachers can manage class tasks, and students can keep track of their activities with ease.
        </p>
      </motion.div>

      {/* Role Selection Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl w-full">
        {userRoles.map((role, index) => (
          <motion.div
            key={role.type}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.5 }}
            whileHover={{ scale: 1.03 }}
            className={`rounded-2xl shadow-md p-8 cursor-pointer border bg-white ${role.hover} transition-all duration-300`}
            onClick={() => handleUserSelection(role.type)}
          >
            <div className="flex items-center mb-4">
              <div
                className={`p-3 rounded-xl text-3xl bg-gradient-to-r ${role.gradient} text-white shadow-md`}
              >
                {role.icon}
              </div>
              <h2 className="ml-4 text-2xl font-bold text-gray-800">{role.type}</h2>
            </div>

            <p className="text-gray-600 mb-6">{role.description}</p>

            <ul className="space-y-2 text-gray-700">
              {role.features.map((feature) => (
                <li key={feature} className="flex items-center gap-2">
                  <span className="text-indigo-500 font-bold">•</span> {feature}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      {/* Modal for Login */}
      <AnimatePresence>
        {isModalOpen && (
          <Modal onClose={handleCloseModal}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="p-6 bg-white rounded-2xl shadow-xl w-full max-w-md"
            >
              <h2 className="text-2xl font-bold mb-4 text-gray-800">
                {userType} Login
              </h2>
              <LoginForm userType={userType} onClose={handleCloseModal} />
            </motion.div>
          </Modal>
        )}
      </AnimatePresence>

    
    </div>
  );
}
