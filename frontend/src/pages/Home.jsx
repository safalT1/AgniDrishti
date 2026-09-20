import { Link } from "react-router-dom";
import AlertBanner from "./AlertBanner";

function Home() {
  const emergencyContacts = [
    {
      id: 1,
      organization: "Nepal Police (Emergency)",
      number: "100",
      description: "24/7 Police Emergency Hotline",
      category: "Emergency",
      icon: "🚨"
    },
    {
      id: 2,
      organization: "Fire Brigade",
      number: "101",
      description: "Fire Emergency Services",
      category: "Emergency",
      icon: "🚒"
    },
    {
      id: 3,
      organization: "Department of Forests",
      number: "01-5520045",
      description: "Ministry of Forests & Environment",
      category: "Forest",
      icon: "🌲"
    },
    {
      id: 4,
      organization: "Disaster Management",
      number: "1130",
      description: "National Emergency Operations Center",
      category: "Disaster",
      icon: "📍"
    },
    {
      id: 5,
      organization: "Nepal Red Cross",
      number: "01-4270650",
      description: "Disaster Response & Relief",
      category: "Disaster",
      icon: "🔴"
    },
    {
      id: 6,
      organization: "Ambulance Service",
      number: "102",
      description: "Medical Emergency Ambulance",
      category: "Emergency",
      icon: "🚑"
    },
    {
      id: 7,
      organization: "Armed Police Force",
      number: "01-4411210",
      description: "Forest Security & Protection",
      category: "Forest",
      icon: "⚔️"
    },
    {
      id: 8,
      organization: "Tourist Police",
      number: "01-4247041",
      description: "Tourist Safety & Assistance",
      category: "Emergency",
      icon: "👮"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <div className="relative min-h-[40rem] md:min-h-[48rem] lg:min-h-[56rem] w-full overflow-hidden bg-black flex flex-col">
        {/* Background Image with Dark Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('/images/forest_fire.jpg')` }}
        >
          {/* Dark NASA-style overlay */}
          <div className="absolute inset-0 bg-black/30" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 flex flex-col flex-grow">
          {/* Optional: if you want the AlertBanner on top */}
          <div className="w-full">
            <AlertBanner />
          </div>

          {/* Center Content */}
          <div className="flex-grow flex flex-col items-center justify-center px-4 py-16 md:py-24 text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-6">
              Monitor Wildfires in Nepal
            </h1>
            <p className="text-xl md:text-2xl text-slate-200 max-w-3xl mb-12 font-light">
              Real-time fire detection and risk prediction using satellite data and AI
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6">
              <Link
                to="/live-map"
                className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-red-900/50 flex items-center justify-center text-lg"
              >
                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                View Live Map
              </Link>
              <Link
                to="/predict"
                className="px-8 py-4 bg-transparent border-2 border-white/80 hover:bg-white hover:text-black text-white font-semibold rounded-lg transition-all duration-300 flex items-center justify-center text-lg"
              >
                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Predict Fire Risk
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Forest Loss Article Section */}
      <section className="py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-white border-y border-slate-200">
        <div className="max-w-4xl mx-auto">
          <div>
            <h2 className="text-3xl lg:text-4xl font-700 text-slate-900 mb-6 lg:mb-8">
              Fires Are Emerging as a Top Driver of Forest Loss
            </h2>

            <div className="space-y-6 text-slate-700 leading-relaxed">
              <p className="text-base lg:text-lg">
                As fires worsen — including in historically low-risk areas, like the tropics — they are becoming an increasingly prevalent driver of global forest loss.
              </p>

              <p className="text-base lg:text-lg">
                Fires accounted for almost half (44%) of all tree cover loss per year between 2023 and 2024. This marks a sharp rise from 2001-2022, when fires accounted for about one-quarter of annual tree cover loss on average.
              </p>

              <p className="text-base lg:text-lg">
                <strong>AgniDrishti</strong> is a comprehensive platform developed to predict and monitor forest fires and fire risks across Nepal. Our system combines satellite data, meteorological information, and machine learning to provide real-time threat assessments and risk predictions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Contacts Section */}
      <section className="py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="section-header text-center mb-12">
            <h2 className="text-3xl font-700 text-slate-900 mb-4">Emergency Contacts</h2>
            <p className="text-lg text-slate-600">
              Keep these important numbers handy. In case of fire emergency, every second counts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {emergencyContacts.map((contact) => {
              let badgeClass = 'inline-block px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-800';
              if (contact.category === 'Emergency') badgeClass = 'inline-block px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800';
              else if (contact.category === 'Forest') badgeClass = 'inline-block px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800';
              else if (contact.category === 'Disaster') badgeClass = 'inline-block px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800';

              return (
                <div key={contact.id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 group hover:shadow-lg transition-shadow">
                  <div className="mb-4">
                    <span className="text-3xl mb-3 block">{contact.icon}</span>
                    <span className={badgeClass}>
                      {contact.category}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-600 text-slate-900 mb-3 group-hover:text-forest-600 transition-colors">
                    {contact.organization}
                  </h3>

                  <a 
                    href={`tel:${contact.number.replace(/[^0-9]/g, '')}`}
                    className="text-2xl lg:text-3xl font-700 text-forest-600 hover:text-forest-700 mb-4 block transition-colors"
                  >
                    {contact.number}
                  </a>

                  <p className="text-sm text-slate-600">
                    {contact.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* About the Platform Section */}
      <section className="py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-white border-t border-slate-200">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {/* Feature 1 */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-forest-100 rounded-2xl mb-4">
                <svg className="w-7 h-7 text-forest-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-600 text-slate-900 mb-2">Real-Time Monitoring</h3>
              <p className="text-slate-600">Live satellite hotspot detection across Nepal with updates every few hours.</p>
            </div>

            {/* Feature 2 */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-warning-100 rounded-2xl mb-4">
                <svg className="w-7 h-7 text-warning-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-600 text-slate-900 mb-2">Risk Prediction</h3>
              <p className="text-slate-600">AI-powered predictions identify high-risk areas before fires occur.</p>
            </div>

            {/* Feature 3 */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-sky-100 rounded-2xl mb-4">
                <svg className="w-7 h-7 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-600 text-slate-900 mb-2">Data Insights</h3>
              <p className="text-slate-600">Comprehensive statistics and historical analysis of forest fire patterns.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-forest-50 border-t border-slate-200">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-700 text-slate-900 mb-4">
            Start Monitoring Fires Today
          </h2>
          <p className="text-lg text-slate-600 mb-8">
            Access real-time hotspot data, predictive analytics, and comprehensive forest fire information for Nepal.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/live-map"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-forest-600 hover:bg-forest-700 transition-colors shadow-sm"
            >
              View Live Map
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-6 py-3 border border-slate-300 text-base font-medium rounded-lg text-slate-700 bg-white hover:bg-slate-50 transition-colors shadow-sm"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
