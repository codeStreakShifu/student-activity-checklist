import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function TeacherDashboard() {
  const [view, setView] = useState("main");
  const [selectedSection, setSelectedSection] = useState(null);
  const [activeTab, setActiveTab] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedQuarter, setSelectedQuarter] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [activities, setActivities] = useState([
    { id: 1, title: "Quiz on Chapter 1", description: "Short quiz about introduction." },
    { id: 2, title: "Group Activity 1", description: "Work in pairs on a topic presentation." },
    { id: 3, title: "Performance Task 1", description: "Prepare a summary report." },
  ]);

  const [assignedActivities, setAssignedActivities] = useState({});
  const [selectedActivities, setSelectedActivities] = useState([]);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);

  const sections = ["Section A", "Section B", "Section C"];
  const students = ["Juan Dela Cruz", "Maria Santos", "Carlos Reyes"];
  const quarters = ["Quarter 1", "Quarter 2", "Quarter 3", "Quarter 4"];
  const categories = ["Quizzes", "Activities", "Performance Tasks"];
  const sampleTasks = ["Task 1", "Task 2", "Task 3"];

  const handleAddActivity = () => {
    const title = prompt("Enter activity title:");
    if (!title) return;
    const description = prompt("Enter description:");
    setActivities([
      ...activities,
      { id: activities.length + 1, title, description },
    ]);
  };

  const handleAssignToSection = () => {
    if (!selectedSection || !selectedQuarter || !selectedCategory) {
      alert("Please open a specific quarter and category first.");
      return;
    }
    if (selectedActivities.length === 0) {
      alert("Select at least one activity.");
      return;
    }

    setAssignedActivities((prev) => ({
      ...prev,
      [selectedSection]: {
        ...(prev[selectedSection] || {}),
        [selectedQuarter]: {
          ...(prev[selectedSection]?.[selectedQuarter] || {}),
          [selectedCategory]: selectedActivities.map((id) =>
            activities.find((act) => act.id === id)
          ),
        },
      },
    }));

    setSelectedActivities([]);
    setIsAssignModalOpen(false);
    alert("Activities assigned successfully!");
  };

  const toggleActivitySelection = (id) => {
    setSelectedActivities((prev) =>
      prev.includes(id) ? prev.filter((actId) => actId !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white p-8">
      {/* Header */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="mb-12 text-center max-w-4xl mx-auto"
      >
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <h1 className="text-4xl font-extrabold mb-3 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Teacher Dashboard
          </h1>
          <p className="text-gray-600 text-lg mb-6">
            Manage activities and monitor your sections efficiently.
          </p>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="bg-indigo-50 rounded-xl p-4 border border-indigo-100">
              <div className="text-3xl font-bold text-indigo-600">{sections.length}</div>
              <div className="text-sm text-indigo-600">Active Sections</div>
            </div>
            <div className="bg-purple-50 rounded-xl p-4 border border-purple-100">
              <div className="text-3xl font-bold text-purple-600">{activities.length}</div>
              <div className="text-sm text-purple-600">Total Activities</div>
            </div>
            <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
              <div className="text-3xl font-bold text-blue-600">{students.length}</div>
              <div className="text-sm text-blue-600">Students</div>
            </div>
          </div>
        </div>
        
        {/* Quick Actions */}
        <div className="flex justify-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAddActivity}
            className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
          >
            + New Activity
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setView("sections")}
            className="px-6 py-3 bg-white text-indigo-600 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
          >
            View Sections
          </motion.button>
        </div>
      </motion.header>

      {/* MAIN VIEW */}
      {view === "main" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
        >
          <motion.div
            whileHover={{ scale: 1.02, y: -5 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setView("activities")}
            className="group bg-white rounded-2xl shadow-xl p-10 text-center cursor-pointer border border-indigo-100 hover:border-indigo-300 hover:shadow-2xl transition-all duration-300"
          >
            <div className="mb-6">
              <motion.div
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.3 }}
                className="w-16 h-16 mx-auto bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center text-white text-2xl mb-4 group-hover:shadow-lg transition-all duration-300"
              >
                📚
              </motion.div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
                Activities
              </h2>
              <p className="text-gray-600">
                Create and manage activities for your sections
              </p>
            </div>
            <div className="text-indigo-600 text-sm font-medium group-hover:underline">
              Manage Activities →
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02, y: -5 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setView("sections")}
            className="group bg-white rounded-2xl shadow-xl p-10 text-center cursor-pointer border border-purple-100 hover:border-purple-300 hover:shadow-2xl transition-all duration-300"
          >
            <div className="mb-6">
              <motion.div
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.3 }}
                className="w-16 h-16 mx-auto bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white text-2xl mb-4 group-hover:shadow-lg transition-all duration-300"
              >
                👥
              </motion.div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                Sections
              </h2>
              <p className="text-gray-600">
                View and manage your class sections and students
              </p>
            </div>
            <div className="text-purple-600 text-sm font-medium group-hover:underline">
              Manage Sections →
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* ACTIVITIES VIEW */}
      <AnimatePresence>
        {view === "activities" && (
          <motion.div
            key="activities"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8 mt-6"
          >
            <button
              onClick={() => setView("main")}
              className="text-indigo-600 font-semibold hover:underline mb-6"
            >
              ← Back
            </button>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-indigo-700">Activities</h2>
              <button
                onClick={handleAddActivity}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                + Add Activity
              </button>
            </div>
            <ul className="space-y-4">
              {activities.map((activity) => (
                <li
                  key={activity.id}
                  className="border border-indigo-100 rounded-xl p-4 hover:bg-indigo-50 transition"
                >
                  <h3 className="text-lg font-semibold text-indigo-700">
                    {activity.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{activity.description}</p>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SECTIONS VIEW */}
      <AnimatePresence>
        {view === "sections" && !selectedSection && (
          <motion.div
            key="sections"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8 mt-6"
          >
            <button
              onClick={() => setView("main")}
              className="text-indigo-600 font-semibold hover:underline mb-6"
            >
              ← Back
            </button>
            <h2 className="text-2xl font-bold text-indigo-700 mb-6">
              Your Sections
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {sections.map((sec, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setSelectedSection(sec)}
                  className="p-6 bg-indigo-50 border border-indigo-100 rounded-xl text-center cursor-pointer hover:bg-indigo-100 transition"
                >
                  <h3 className="text-xl font-semibold text-indigo-700">{sec}</h3>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SECTION DETAILS */}
      <AnimatePresence>
        {selectedSection && !activeTab && (
          <motion.div
            key="sectionDetails"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8 mt-6"
          >
            <button
              onClick={() => setSelectedSection(null)}
              className="text-indigo-600 font-semibold hover:underline mb-6"
            >
              ← Back to Sections
            </button>
            <h2 className="text-2xl font-bold text-indigo-700 mb-6">
              {selectedSection}
            </h2>
            <div className="flex flex-col md:flex-row gap-6">
              <button
                onClick={() => setActiveTab("students")}
                className="flex-1 bg-indigo-600 text-white rounded-xl py-4 text-lg font-semibold hover:bg-indigo-700"
              >
                Students
              </button>
              <button
                onClick={() => setActiveTab("quarter")}
                className="flex-1 bg-purple-600 text-white rounded-xl py-4 text-lg font-semibold hover:bg-purple-700"
              >
                Quarter
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* QUARTERS */}
      <AnimatePresence>
        {activeTab === "quarter" && !selectedQuarter && (
          <motion.div
            key="quarters"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8 mt-6"
          >
            <button
              onClick={() => setActiveTab(null)}
              className="text-indigo-600 font-semibold hover:underline mb-6"
            >
              ← Back
            </button>
            <h2 className="text-2xl font-bold text-indigo-700 mb-6">
              Quarters - {selectedSection}
            </h2>
            <div className="grid grid-cols-2 gap-6">
              {quarters.map((qtr, i) => (
                <div
                  key={i}
                  onClick={() => setSelectedQuarter(qtr)}
                  className="p-6 bg-purple-50 rounded-xl border border-purple-100 hover:bg-purple-100 cursor-pointer text-center transition"
                >
                  <span className="font-semibold text-purple-700">{qtr}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CATEGORIES */}
      <AnimatePresence>
        {selectedQuarter && !selectedCategory && (
          <motion.div
            key="categories"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8 mt-6"
          >
            <button
              onClick={() => setSelectedQuarter(null)}
              className="text-indigo-600 font-semibold hover:underline mb-6"
            >
              ← Back to Quarters
            </button>
            <h2 className="text-2xl font-bold text-indigo-700 mb-6">
              {selectedQuarter} - Categories
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {categories.map((cat, i) => (
                <div
                  key={i}
                  onClick={() => setSelectedCategory(cat)}
                  className="p-6 bg-indigo-50 border border-indigo-100 rounded-xl text-center cursor-pointer hover:bg-indigo-100 transition"
                >
                  <h3 className="text-lg font-semibold text-indigo-700">{cat}</h3>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CATEGORY ACTIVITIES WITH ADD BUTTON */}
      <AnimatePresence>
        {selectedCategory && (
          <motion.div
            key="categoryActivities"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8 mt-6"
          >
            <button
              onClick={() => setSelectedCategory(null)}
              className="text-indigo-600 font-semibold hover:underline mb-6"
            >
              ← Back to Categories
            </button>
            <h2 className="text-2xl font-bold text-indigo-700 mb-4">
              {selectedQuarter} - {selectedCategory}
            </h2>

            <button
              onClick={() => setIsAssignModalOpen(true)}
              className="mb-6 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              + Add Activity
            </button>

            <div className="space-y-3">
              {(assignedActivities[selectedSection]?.[selectedQuarter]?.[selectedCategory] || []).map(
                (act) => (
                  <div
                    key={act.id}
                    className="p-4 border border-indigo-100 rounded-lg bg-indigo-50 text-gray-800"
                  >
                    {act.title}
                  </div>
                )
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ASSIGN MODAL */}
      <AnimatePresence>
        {isAssignModalOpen && (
          <motion.div
            key="assignModal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md border border-indigo-100"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Select Activities
                </h2>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsAssignModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </motion.button>
              </div>
              
              <div className="bg-indigo-50/50 rounded-lg p-4 mb-6">
                <div className="text-sm text-indigo-600 font-medium mb-1">Assignment Details</div>
                <div className="text-gray-600">
                  {selectedSection} • {selectedQuarter} • {selectedCategory}
                </div>
              </div>

              <ul className="space-y-3 mb-6 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {activities.map((act) => (
                  <motion.li
                    key={act.id}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => toggleActivitySelection(act.id)}
                    className={`p-4 border rounded-xl cursor-pointer transition-all duration-200 ${
                      selectedActivities.includes(act.id)
                        ? "bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200 shadow-md"
                        : "bg-white border-gray-200 hover:border-indigo-200 hover:shadow-sm"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                        selectedActivities.includes(act.id)
                          ? "border-indigo-500 bg-indigo-500 text-white"
                          : "border-gray-300"
                      }`}>
                        {selectedActivities.includes(act.id) && "✓"}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">{act.title}</p>
                        <p className="text-sm text-gray-600">{act.description}</p>
                      </div>
                    </div>
                  </motion.li>
                ))}
              </ul>

              <div className="flex justify-end gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setIsAssignModalOpen(false)}
                  className="px-6 py-2 border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAssignToSection}
                  className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all duration-200"
                >
                  Assign {selectedActivities.length} Selected
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>
    </div>
  );
}
