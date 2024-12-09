"use client";
import { useState } from "react";
import Link from "next/link";
import { AiFillHome } from "react-icons/ai";
import { FaMusic, FaCompass, FaCog, FaSignOutAlt } from "react-icons/fa";
import { HiMenuAlt3 } from "react-icons/hi";
import { FaArrowTrendUp } from "react-icons/fa6";

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const menuItems = [
    { name: "Home", href: "/", icon: <AiFillHome fill="#FF4C4C" /> },
    {
      name: "Trends",
      href: "/trends",
      icon: <FaArrowTrendUp fill="#FF4C4C" />,
    },
    { name: "Library", href: "/library", icon: <FaMusic fill="#FF4C4C" /> },
    { name: "Discover", href: "/discover", icon: <FaCompass fill="#FF4C4C" /> },
  ];

  const generalItems = [
    { name: "Settings", href: "/settings", icon: <FaCog fill="#FF4C4C" /> },
    { name: "Log Out", href: "/logout", icon: <FaSignOutAlt fill="#FF4C4C" /> },
  ];

  return (
    <>
      {/* Hamburger Menu for Small Screens */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed top-4 left-4 z-50 bg-[#FF4C4C] p-2 rounded-md text-white"
      >
        <HiMenuAlt3 size={24} />
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 bg-[#151515] w-64 p-6 h-full aside className="bg-[#151515] flex flex-col justify-between h-full" transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 transition-transform duration-300 z-40`}
      >
        {/* Logo Section */}
        <div>
          <h1 className="text-2xl font-bold text-[#FF4C4C] mb-8 flex items-center">
            <span className="text-3xl mr-2">
              <FaMusic />
            </span>{" "}
            <span>Dream</span>
            <span className="text-white">Music</span>
          </h1>

          {/* Menu Items */}
          <nav>
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center gap-4 py-2 px-4 text-gray-400 rounded-md hover:bg-[#242424] hover:text-white transition"
              >
                <span className="text-xl">{item.icon}</span>
                <span className="font-medium">{item.name}</span>
              </Link>
            ))}
          </nav>
        </div>

        {/* General Section */}
        <div>
          {generalItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center gap-4 py-2 px-4 text-gray-400 rounded-md hover:bg-[#242424] hover:text-white transition"
            >
              <span className="text-xl">{item.icon}</span>
              <span className="font-medium">{item.name}</span>
            </Link>
          ))}
        </div>
      </aside>

      {/* Overlay for Mobile Sidebar */}
      {isOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black opacity-50 z-30 lg:hidden"
        ></div>
      )}
    </>
  );
};
