import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { path: "/", label: "Trang chủ" },
    { path: "/features", label: "Tính năng" },
    { path: "/pricing", label: "Bảng giá" },
    { path: "/contact", label: "Liên hệ" },
  ];

  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link
          to="/"
          className="text-3xl font-extrabold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500"
        >
          AutoMarketing
        </Link>

        {/* Hamburger Icon (mobile) */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? (
              <XMarkIcon className="w-6 h-6 text-gray-700" />
            ) : (
              <Bars3Icon className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <nav className="flex items-center space-x-6 text-sm font-semibold text-gray-700">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `no-underline ${
                    isActive
                      ? "text-blue-600"
                      : "hover:text-purple-600 transition"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Buttons */}
          <div className="flex space-x-3">
            <Link
              to="/login"
              className="px-4 py-2 text-sm font-medium text-white rounded-full bg-gradient-to-r bg-blue-600 shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-200"
            >
              Đăng nhập
            </Link>
            <Link
              to="/signup"
              className="px-4 py-2 text-sm font-medium text-white rounded-full bg-gradient-to-r from-blue-500  to-pink-500 shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-200"
            >
              Đăng ký
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 bg-white shadow overflow-hidden">
          <nav className="flex flex-col space-y-2 text-sm font-semibold text-gray-700">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `no-underline ${
                    isActive
                      ? "text-blue-600"
                      : "hover:text-purple-600 transition"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Button Row */}
          <div className="mt-4 flex flex-row gap-x-3">
            {[
              {
                to: "/login",
                text: "Đăng nhập",
                gradient: "from-blue-500 to-pink-500",
              },
              {
                to: "/signup",
                text: "Đăng ký",
                gradient: "from-blue-500 to-pink-500",
              },
            ].map(({ to, text, gradient }) => (
              <Link
                key={to}
                to={to}
                onClick={() => setMenuOpen(false)}
                className={`flex-1 text-center px-4 py-2 text-sm font-medium text-white rounded shadow hover:shadow-lg transition bg-gradient-to-r ${gradient}`}
              >
                {text}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
