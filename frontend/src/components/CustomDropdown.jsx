import React, { useState, useEffect, useRef } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";

const CustomDropdown = ({ options, selected, setSelected, category }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const [isMobile, setIsMobile] = useState(window.innerWidth < 1060);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1060);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      ref={dropdownRef}
      className="relative inline-block text-left w-48 max-[736px]:w-full whitespace-nowrap"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center bg-white border border-gray-300 
                   text-gray-700 rounded-lg px-4 py-2 shadow-sm hover:bg-gray-100 
                   focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
      >
        {/* Shows selected value */}
        {/* {selected || category === "Sorting" ? "Select Sorting" : "Select Employee"}  */}
        {isMobile
          ? selected ||
            (category === "Sorting" ? "Select Sorting" : "Select Employee")
          : selected || "Select"}
        <IoIosArrowDown className="text-gray-600 text-lg ml-2" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: 1, scaleY: 1 }}
            exit={{ opacity: 0, scaleY: 0 }}
            transition={{ duration: 0.1 }}
            className="absolute mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10 origin-top"
          >
            {options.map((option, index) => (
              <div
                key={option}
                onClick={() => {
                  setSelected(option);
                  setIsOpen(false);
                }}
                className={`px-4 py-2 text-gray-700 hover:bg-blue-500 hover:text-white cursor-pointer transition
                  ${index === 0 ? "rounded-t-lg" : ""} 
                  ${index === options.length - 1 ? "rounded-b-lg" : ""}`}
              >
                {option}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CustomDropdown;
