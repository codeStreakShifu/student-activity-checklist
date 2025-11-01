import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function StudentDashboard() {
  const [activeQuarter, setActiveQuarter] = useState("Quarter 1");
  const [activeCategory, setActiveCategory] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState({});

  const quarters = ["Quarter 1", "Quarter 2", "Quarter 3", "Quarter 4"];
  const categories = ["Quizzes", "Activities", "Performance Tasks"];
  
  // Calculate progress for visual feedback
  useEffect(() => {
    const calculateProgress = () => {
      const newProgress = {};
      quarters.forEach(quarter => {
        newProgress[quarter] = {
          total: Math.floor(Math.random() * 40 + 60), // Random progress 60-100%
          categories: {}
        };
        categories.forEach(category => {
          newProgress[quarter].categories[category] = Math.floor(Math.random() * 40 + 60);
        });
      });
      setProgress(newProgress);
    };
    calculateProgress();
  }, []);

  const completedTasks = {
    "Quarter 1": {
      Quizzes: ["Task 1"],
      Activities: ["Task 2"],
      "Performance Tasks": [],
    },
  };

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 800);
  }, []);

  const handleCategoryClick = (category) => {
    setActiveCategory(activeCategory === category ? null : category);
  };

  const handleTaskClick = (quarter, category, task) => {
    const isCompleted =
      completedTasks[quarter]?.[category]?.includes(task) || false;
    setSelectedTask({ quarter, category, task, isCompleted });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-indigo-50 to-white p-8"
    >
      {/* Header with Progress Overview */}
      <motion.header
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        className="mb-12 text-center max-w-5xl mx-auto"
      >
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <h1 className="text-4xl font-extrabold text-indigo-700 mb-3 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Welcome Back, Student!
          </h1>
          <p className="text-gray-600 text-lg mb-6">
            Track your progress and review your academic activities.
          </p>
          
          {/* Progress Overview */}
          {!isLoading && progress[activeQuarter] && (
            <div className="mt-6">
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="text-3xl font-bold text-indigo-600">
                  {progress[activeQuarter].total}%
                </div>
                <div className="h-2 flex-1 max-w-md bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress[activeQuarter].total}%` }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
                  />
                </div>
                <div className="text-sm text-gray-600">Overall Progress</div>
              </div>
              
              <div className="flex flex-wrap justify-center gap-4">
                {categories.map((category, idx) => (
                  <motion.div
                    key={category}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="bg-indigo-50 rounded-lg p-3 min-w-[120px]"
                  >
                    <div className="text-sm font-medium text-indigo-700 mb-1">{category}</div>
                    <div className="text-lg font-bold text-indigo-900">
                      {progress[activeQuarter].categories[category]}%
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.header>

      {/* Quarter Buttons */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {quarters.map((quarter, index) => (
          <motion.button
            key={index}
            onClick={() =>
              setActiveQuarter(activeQuarter === quarter ? null : quarter)
            }
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`px-8 py-4 rounded-xl font-semibold shadow-lg transition-all duration-300 transform ${
              activeQuarter === quarter
                ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white scale-105"
                : "bg-white text-gray-800 hover:bg-indigo-50 hover:scale-105"
            }`}
          >
            {quarter}
          </motion.button>
        ))}
      </div>

      {/* Quarter Overview */}
      <AnimatePresence mode="wait">
        {activeQuarter && !isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white p-8 rounded-2xl shadow-xl max-w-5xl mx-auto border border-indigo-50"
          >
            <motion.h2
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              className="text-2xl font-bold text-center bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-8"
            >
              {activeQuarter} Overview
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {categories.map((category, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => handleCategoryClick(category)}
                  className={`p-6 rounded-xl shadow-lg border cursor-pointer transition-all duration-300 ${
                    activeCategory === category
                      ? "bg-gradient-to-br from-indigo-50 to-white border-indigo-200"
                      : "bg-gradient-to-br from-white to-indigo-50 border-indigo-100"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-indigo-700">
                      {category}
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
                        3 Tasks
                      </span>
                      {progress[activeQuarter] && (
                        <motion.div 
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.3 }}
                          className="w-8 h-8 rounded-full flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xs font-bold"
                        >
                          {progress[activeQuarter].categories[category]}%
                        </motion.div>
                      )}
                    </div>
                  </div>

                  {/* Task List (only visible when active) */}
                  <AnimatePresence>
                    {activeCategory === category && (
                      <motion.ul
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-4 space-y-3"
                      >
                        {["Task 1", "Task 2", "Task 3"].map((task, i) => {
                          const isCompleted =
                            completedTasks[activeQuarter]?.[category]?.includes(
                              task
                            ) || false;
                          return (
                            <motion.li
                              key={i}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleTaskClick(activeQuarter, category, task);
                              }}
                              whileHover={{ scale: 1.03 }}
                              className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition ${
                                isCompleted
                                  ? "bg-green-50 border border-green-200"
                                  : "bg-white hover:bg-indigo-50 border border-indigo-100"
                              }`}
                            >
                              <span
                                className={`${
                                  isCompleted
                                    ? "text-green-500"
                                    : "text-indigo-500"
                                }`}
                              >
                                {isCompleted ? "✓" : "•"}
                              </span>
                              <span className="text-gray-800">{task}</span>
                            </motion.li>
                          );
                        })}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Task Modal */}
      <AnimatePresence>
        {selectedTask && (
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedTask(null)}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center"
            >
              <h3 className="text-2xl font-bold text-indigo-700 mb-4">
                {selectedTask.task}
              </h3>
              {selectedTask.isCompleted ? (
                <p className="text-green-600 font-medium">
                  ✅ You have already completed this task. Good Job!
                </p>
              ) : (
                <>
                  <p className="text-gray-700 mb-6">
                    📘 Task Instructions: Please complete this activity based on
                    the teacher’s directions. Once verified, your teacher will
                    mark it as completed.
                  </p>
                  <button
                    onClick={() => setSelectedTask(null)}
                    className="mt-4 px-6 py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
                  >
                    Close
                  </button>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Loading Spinner */}
      {isLoading && (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
        </div>
      )}
    </motion.div>
  );
}
