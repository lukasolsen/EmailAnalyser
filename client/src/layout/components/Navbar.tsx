import React, { useState } from "react";
import { FaBars, FaMoon, FaSun } from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [themeMenuOpen, setThemeMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    // Implement your dark/light mode logic here
  };

  const toggleThemeMenu = () => {
    setThemeMenuOpen(!themeMenuOpen);
  };

  return (
    <nav className="border-b dark:border-b-blue-dark-600 border-b-blue-dark-300">
      <div className="container mx-auto flex items-center justify-between p-4 relative">
        <div className="flex items-center">
          <button
            className={`menu-icon text-2xl mr-4 transition-transform ${
              isMenuOpen ? "rotate-90" : "rotate-0"
            }`}
            onClick={toggleMenu}
          >
            <FaBars />
          </button>
          <div className="logo text-xl font-bold">Threat Operative</div>
        </div>
        <div className="flex items-center">
          {/* A list for the current location, such as Modules / localhost / Security Events example */}
          <ol className="flex items-center w-full space-x-2 text-sm font-medium text-center">
            <li className="flex items-center">
              <span className="">Modules</span>

              <svg
                className="w-3 h-3 mx-2 fill-current text-blue-600"
                viewBox="0 0 320 512"
              >
                <path d="M300.5 233.5L19.8 3.7C15.6-.5 9.7-.5 5.5 3.7c-4.2 4.2-4.2 10.2 0 14.4L271.6 256 5.5 498.9c-4.2 4.2-4.2 10.2 0 14.4 4.2 4.2 10.2 4.2 14.4 0l280.7-229.8c4.2-4.2 4.2-10.2 0-14.4z" />
              </svg>
            </li>
            <li className="flex items-center">
              <span className="">localhost</span>

              <svg
                className="w-3 h-3 mx-2 fill-current text-blue-600"
                viewBox="0 0 320 512"
              >
                <path d="M300.5 233.5L19.8 3.7C15.6-.5 9.7-.5 5.5 3.7c-4.2 4.2-4.2 10.2 0 14.4L271.6 256 5.5 498.9c-4.2 4.2-4.2 10.2 0 14.4 4.2 4.2 10.2 4.2 14.4 0l280.7-229.8c4.2-4.2 4.2-10.2 0-14.4z" />
              </svg>
            </li>
            <li className="flex items-center">
              <span className="">Security Events</span>

              <svg
                className="w-3 h-3 mx-2 fill-current text-blue-600"
                viewBox="0 0 320 512"
              >
                <path d="M300.5 233.5L19.8 3.7C15.6-.5 9.7-.5 5.5 3.7c-4.2 4.2-4.2 10.2 0 14.4L271.6 256 5.5 498.9c-4.2 4.2-4.2 10.2 0 14.4 4.2 4.2 10.2 4.2 14.4 0l280.7-229.8c4.2-4.2 4.2-10.2 0-14.4z" />
              </svg>
            </li>
          </ol>
        </div>
        <div className="mode-toggle flex items-center relative">
          <button
            className="theme-button ml-2"
            onClick={toggleThemeMenu}
            onBlur={() => setTimeout(() => setThemeMenuOpen(false), 100)}
          >
            {isDarkMode ? <FaSun /> : <FaMoon />}
            {themeMenuOpen && (
              <ul className="theme-menu absolute top-full left-0 mt-2 p-2 bg-gray-800 text-white rounded w-28">
                {/* Add your theme options here */}
                <li
                  onClick={toggleDarkMode}
                  className="flex flex-row items-center justify-evenly cursor-pointer"
                >
                  <FaSun /> <span>Light</span>
                </li>
                <hr className="my-2 dark:text-blue-dark-200 text-blue-dark-700" />
                <li
                  onClick={toggleDarkMode}
                  className="flex flex-row items-center justify-evenly cursor-pointer"
                >
                  <FaMoon /> <span>Dark</span>
                </li>
              </ul>
            )}
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <ul className="p-4 w-3/12">
          {/* Add your navigation links here */}
          <li className="mb-2">
            <button className="p-1w-full hover:text-blue-500">
              <Link to="/" className="">
                Home
              </Link>
            </button>
          </li>
          <li className="mb-2">
            <button className="p-1w-full hover:text-blue-500">
              <Link to="/" className="">
                Report
              </Link>
            </button>
          </li>
          <li className="mb-2">
            <button className="p-1w-full hover:text-blue-500">
              <Link to="/" className="">
                Alerts
              </Link>
            </button>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
