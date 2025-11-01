import React, { useState } from 'react';
import Modal from './Modal';
import LoginForm from './LoginForm';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './Header';
import Footer from './Footer';

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
      icon: '�‍🏫',
      description:
        'Empower your teaching with our comprehensive activity management system. Track, assign, and monitor student progress effortlessly.',
      features: [
        'Create Interactive Activities',
        'Real-time Progress Tracking',
        'Detailed Performance Analytics',
      ],
      gradient: 'from-blue-600 to-indigo-600',
      hover: 'hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50',
    },
    {
      type: 'Student',
      icon: '�‍🎓',
      description:
        'Take control of your learning journey. Stay organized, track your progress, and achieve your academic goals with ease.',
      features: [
        'Smart Task Management',
        'Progress Visualization',
        'Achievement Tracking',
      ],
      gradient: 'from-emerald-600 to-teal-600',
      hover: 'hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50',
    },
  ];

  return (
    <div>
      <Header />
      <div className="min-h-[90vh] bg-gradient-to-br from-gray-50 via-white to-gray-100 flex flex-col items-center justify-center px-6 py-12 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-emerald-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-indigo-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative z-10">

        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 max-w-4xl"
        >
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-block mb-6 px-6 py-2 bg-indigo-50 rounded-full"
          >
            <span className="text-indigo-600 font-semibold">🎯 Streamline Your Academic Journey</span>
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-500">
            Welcome to{' '}
            <span className="block mt-2">Activity Checklist System</span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed">
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
              className={`rounded-2xl p-8 cursor-pointer bg-white backdrop-blur-sm bg-opacity-90 hover:bg-opacity-100 
                border-2 border-transparent hover:border-indigo-100 transition-all duration-300 
                transform hover:-translate-y-1 hover:shadow-2xl`}
              onClick={() => handleUserSelection(role.type)}
            >
              <div className="flex items-center mb-6">
                <div
                  className={`p-4 rounded-2xl text-4xl bg-gradient-to-r ${role.gradient} text-white shadow-lg
                    transform transition-transform group-hover:scale-110 group-hover:rotate-3`}
                >
                  {role.icon}
                </div>
                <h2 className="ml-4 text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-gray-600">
                  {role.type}
                </h2>
              </div>

              <p className="text-gray-600 mb-8 leading-relaxed">{role.description}</p>

              <ul className="space-y-3 text-gray-700">
                {role.features.map((feature, idx) => (
                  <motion.li
                    key={feature}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-center gap-3 group"
                  >
                    <span className={`text-lg p-1 rounded-full bg-gradient-to-r ${role.gradient} text-white
                      transform transition-transform group-hover:scale-110`}>
                      ✓
                    </span>
                    <span className="group-hover:text-indigo-600 transition-colors">
                      {feature}
                    </span>
                  </motion.li>
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
                className="p-8 bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl w-full max-w-md border-2 border-gray-50"
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
      </div>

      <Footer />
    </div>
  );
}
