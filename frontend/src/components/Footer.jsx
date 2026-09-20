import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-200 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* About */}
          <div>
            <h3 className="text-lg font-700 text-white mb-4">AgniDrishti</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Advanced forest fire monitoring and predictive system protecting Nepal's forests through real-time satellite data and machine learning.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-600 text-white mb-4">Platform</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/live-map" className="text-slate-400 hover:text-forest-400 transition-colors">Live Fire Map</Link></li>
              <li><Link to="/predict" className="text-slate-400 hover:text-forest-400 transition-colors">Risk Prediction</Link></li>
              <li><Link to="/stats" className="text-slate-400 hover:text-forest-400 transition-colors">Statistics</Link></li>
              <li><Link to="/alerts" className="text-slate-400 hover:text-forest-400 transition-colors">Fire Alerts</Link></li>
              <li><Link to="/report-fire" className="text-slate-400 hover:text-forest-400 transition-colors">Report Fire</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-lg font-600 text-white mb-4">Resources</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/how-it-works" className="text-slate-400 hover:text-forest-400 transition-colors">How It Works</Link></li>
              <li><Link to="/contact" className="text-slate-400 hover:text-forest-400 transition-colors">Contact Us</Link></li>
              <li><a href="#" className="text-slate-400 hover:text-forest-400 transition-colors">Documentation</a></li>
              <li><a href="#" className="text-slate-400 hover:text-forest-400 transition-colors">API Reference</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-600 text-white mb-4">Contact</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-forest-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
                <span className="text-slate-400">Kathmandu, Nepal</span>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-forest-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-slate-400">support@agnidrishti.org</span>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-forest-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="text-slate-400">+977-1-XXXX-XXXX</span>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-slate-500">
              © 2026 AgniDrishti. All rights reserved.
            </p>
            <div className="flex gap-8 text-sm">
              <a href="#" className="text-slate-500 hover:text-slate-300 transition-colors">Privacy Policy</a>
              <a href="#" className="text-slate-500 hover:text-slate-300 transition-colors">Terms of Service</a>
              <a href="#" className="text-slate-500 hover:text-slate-300 transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>

        {/* Attribution */}
        <div className="mt-8 pt-8 border-t border-slate-800 text-center text-xs text-slate-600">
          <p>Powered by advanced satellite technology • Developed with ❤️ for forest protection in Nepal</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
