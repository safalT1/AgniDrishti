import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";

function Navbar() {
  const { isAuthenticated, userRole } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`bg-white sticky top-0 z-[9999] transition-all duration-300 border-b ${isScrolled ? 'border-slate-200 shadow-md' : 'border-slate-100 shadow-sm'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center group flex-shrink-0">
            <div className="relative">
              <img
                src="/images/logoo.png"
                alt="Nepal Wildfire Watch Logo"
                className="h-12 md:h-16 w-auto object-contain"
              />
            </div>
          </Link>

          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex items-center gap-1">
            <Link
              to="/live-map"
              className="px-3.5 py-2 rounded-button text-slate-700 hover:text-forest-600 hover:bg-forest-50 font-medium text-sm transition-all duration-200"
            >
              Live Map
            </Link>

            <Link
              to="/predict"
              className="px-3.5 py-2 rounded-button text-slate-700 hover:text-warning-600 hover:bg-warning-50 font-medium text-sm transition-all duration-200"
            >
              Predict Fire
            </Link>

            <Link
              to="/alerts"
              className="px-3.5 py-2 rounded-button text-slate-700 hover:text-fire-600 hover:bg-fire-50 font-medium text-sm transition-all duration-200"
            >
              Alerts
            </Link>

            <Link
              to="/report-fire"
              className="px-3.5 py-2 rounded-button text-slate-700 hover:text-red-600 hover:bg-red-50 font-medium text-sm transition-all duration-200"
            >
              Report Fire
            </Link>

            <Link
              to="/stats"
              className="px-3.5 py-2 rounded-button text-slate-700 hover:text-sky-600 hover:bg-sky-50 font-medium text-sm transition-all duration-200"
            >
              Statistics
            </Link>

            <Link
              to="/contact"
              className="px-3.5 py-2 rounded-button text-slate-700 hover:text-slate-900 hover:bg-slate-100 font-medium text-sm transition-all duration-200"
            >
              Contact
            </Link>
          </div>

          {/* Right Side - Auth & Mobile Menu */}
          <div className="flex items-center gap-2 md:gap-3">
            {isAuthenticated ? (
              <Link
                to={userRole === 'admin' ? "/admin-dashboard" : "/user-dashboard"}
                className="hidden sm:flex items-center gap-2 bg-forest-600 hover:bg-forest-700 text-white px-3.5 py-2 rounded-button font-medium text-sm transition-all duration-200 shadow-sm hover:shadow-md"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span>{userRole === 'admin' ? 'Admin' : 'Dashboard'}</span>
              </Link>
            ) : (
              <Link
                to="/login"
                className="hidden sm:flex items-center gap-2 bg-forest-600 hover:bg-forest-700 text-white px-3.5 py-2 rounded-button font-medium text-sm transition-all duration-200 shadow-sm hover:shadow-md"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                <span>Login</span>
              </Link>
            )}

            {/* Mobile Auth Button */}
            <Link
              to={isAuthenticated ? (userRole === 'admin' ? "/admin-dashboard" : "/user-dashboard") : "/login"}
              className="sm:hidden flex items-center justify-center bg-forest-600 hover:bg-forest-700 text-white p-2 rounded-button transition-all duration-200"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isAuthenticated ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                )}
              </svg>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 rounded-button text-slate-700 hover:bg-slate-100 transition-all duration-200"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden animate-slide-down border-t border-slate-100 bg-white">
            <div className="px-3 py-3 space-y-1">
              <Link
                to="/live-map"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-button text-slate-700 hover:bg-forest-50 transition-all duration-200 font-medium"
              >
                Live Map
              </Link>
              <Link
                to="/predict"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-button text-slate-700 hover:bg-warning-50 transition-all duration-200 font-medium"
              >
                Predict Fire
              </Link>
              <Link
                to="/alerts"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-button text-slate-700 hover:bg-fire-50 transition-all duration-200 font-medium"
              >
                Alerts
              </Link>
              <Link
                to="/report-fire"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-button text-slate-700 hover:bg-red-50 hover:text-red-600 transition-all duration-200 font-medium"
              >
                Report Fire
              </Link>
              <Link
                to="/stats"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-button text-slate-700 hover:bg-sky-50 transition-all duration-200 font-medium"
              >
                Statistics
              </Link>
              <Link
                to="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-button text-slate-700 hover:bg-slate-100 transition-all duration-200 font-medium"
              >
                Contact
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;