import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';

const inputVariants = {
  focus: { scale: 1.02, transition: { type: "spring", stiffness: 300, damping: 30 } }
};

const buttonVariants = {
  hover: { scale: 1.02 },
  tap: { scale: 0.98 }
};

export default function LoginForm({ userType, onClose }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', {
        username,
        password,
        userType, // 🔥 send which login type
      });

      if (response.data.status === 'success') {
        if (response.data.role === 'teacher') navigate('/teacher-dashboard');
        else if (response.data.role === 'student') navigate('/student-dashboard');
        onClose();
      } else {
        setError('Invalid credentials');
      }
    } catch (err) {
      console.error(err);
      setError('Invalid username or password');
    }
  };

  return (
    <motion.form 
      onSubmit={handleLogin} 
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
    >
      {/* Welcome Message */}
      <div className="text-center mb-6">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="inline-block p-3 rounded-full bg-indigo-100 mb-4"
        >
          {userType === 'Teacher' ? '👩‍🏫' : '👨‍🎓'}
        </motion.div>
        <h3 className="text-xl font-bold text-gray-800">Welcome back!</h3>
        <p className="text-gray-600 text-sm">Sign in to continue as {userType}</p>
      </div>

      <div className="space-y-4">
        <motion.div variants={inputVariants} whileFocus="focus">
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Username
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
              👤
            </span>
            <input
              type="text"
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl
                focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none
                transition-all duration-200 bg-white/50 backdrop-blur-sm"
              placeholder="your_username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
        </motion.div>

        <motion.div variants={inputVariants} whileFocus="focus">
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Password
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
              🔒
            </span>
            <input
              type={showPassword ? "text" : "password"}
              className="w-full pl-10 pr-12 py-2.5 border border-gray-200 rounded-xl
                focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none
                transition-all duration-200 bg-white/50 backdrop-blur-sm"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-3 flex items-center bg-transparent border-0 
                outline-none cursor-pointer shadow-none p-0 m-0 focus:outline-none focus:ring-0 
                active:outline-none active:border-0 focus:border-0"
              style={{ background: 'transparent', WebkitTapHighlightColor: 'transparent' }}
            >
              {showPassword ? "👁️" : "👁️‍🗨️"}
            </button>
          </div>
        </motion.div>

        {error && (
          <motion.p 
            className="text-red-500 text-sm bg-red-50 p-2 rounded-lg flex items-center gap-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            ⚠️ {error}
          </motion.p>
        )}

        <motion.button
          type="submit"
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-semibold 
            py-3 rounded-xl transition-all duration-200 shadow-lg shadow-indigo-200
            hover:shadow-xl hover:shadow-indigo-300"
        >
          Log In as {userType}
        </motion.button>

        <p className="text-center text-sm text-gray-500 mt-4">
          Forgot your password? <a href="#" className="text-indigo-600 hover:underline">Reset it here</a>
        </p>
      </div>
    </motion.form>
  );
}
