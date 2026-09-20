import React, { useState } from 'react';
import LiveHotspotsMap from '../components/LiveHotspotsMap';
import AlertBanner from './AlertBanner';

export default function LiveFireMapPage() {
  const [sensor, setSensor] = useState('MODIS_NRT');
  const [days, setDays] = useState(1);

  return (
    <div className="min-h-screen bg-slate-50">
      <AlertBanner />

      {/* Header */}
      <div className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div>
            <h1 className="text-3xl font-700 text-slate-900">Live Fire Hotspots</h1>
            <p className="text-slate-600 mt-1">
              Real-time satellite detection of active fire hotspots around Nepal. Select a satellite sensor and time window to explore detections.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filter Controls */}
        <div className="card p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-6 items-end">
            {/* Satellite Sensor Selector */}
            <div className="flex-1">
              <label className="block text-sm font-600 text-slate-900 mb-2">
                <svg className="w-4 h-4 inline mr-2 -mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.658 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
                Satellite Sensor
              </label>
              <select
                value={sensor}
                onChange={e => setSensor(e.target.value)}
                className="w-full px-4 py-2.5 border border-slate-300 rounded-button focus:border-forest-500 focus:ring-2 focus:ring-forest-200 outline-none bg-white"
              >
                <option value="MODIS_NRT">MODIS (Terra/Aqua) - 1km resolution</option>
                <option value="VIIRS_SNPP_NRT">VIIRS Suomi NPP - 375m resolution</option>
                <option value="VIIRS_NOAA20_NRT">VIIRS NOAA-20 - 375m resolution</option>
              </select>
              <p className="text-xs text-slate-600 mt-2">
                MODIS: Daily updates • VIIRS: 6-hourly updates
              </p>
            </div>

            {/* Time Window Selector */}
            <div>
              <label className="block text-sm font-600 text-slate-900 mb-2">
                <svg className="w-4 h-4 inline mr-2 -mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Time Window
              </label>
              <select
                value={days}
                onChange={e => setDays(Number(e.target.value))}
                className="px-4 py-2.5 border border-slate-300 rounded-button focus:border-forest-500 focus:ring-2 focus:ring-forest-200 outline-none bg-white"
              >
                <option value={1}>Last 24 hours</option>
                <option value={2}>Last 2 days</option>
                <option value={3}>Last 3 days</option>
                <option value={5}>Last 5 days</option>
              </select>
            </div>

            {/* Info Banner */}
            <div className="md:col-span-2 bg-sky-50 border border-sky-200 rounded-card p-3 text-xs text-sky-900">
              <strong>ℹ️ Data Source:</strong> NASA FIRMS (Fire Information for Resource Management System) • Updated regularly throughout the day
            </div>
          </div>
        </div>

        {/* Map Container */}
        <div className="card p-0 overflow-hidden shadow-lg" style={{ height: '70vh', minHeight: '500px' }}>
          <LiveHotspotsMap sensor={sensor} days={days} />
        </div>

        {/* Legend and Information */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {/* Legend */}
          <div className="card p-6">
            <h3 className="text-lg font-600 text-slate-900 mb-4">Hotspot Indicators</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full bg-fire-600"></div>
                <span className="text-slate-700"><strong>High Confidence:</strong> Strong fire signal</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full bg-warning-500"></div>
                <span className="text-slate-700"><strong>Medium Confidence:</strong> Moderate signal</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full bg-sky-500"></div>
                <span className="text-slate-700"><strong>Low Confidence:</strong> Potential fire</span>
              </div>
            </div>
          </div>

          {/* About Sensors */}
          <div className="card p-6">
            <h3 className="text-lg font-600 text-slate-900 mb-4">About MODIS</h3>
            <p className="text-sm text-slate-700 leading-relaxed">
              MODIS instruments aboard NASA's Terra and Aqua satellites detect thermal anomalies indicating active fires. Provides daily global coverage with 1km resolution.
            </p>
          </div>

          {/* About VIIRS */}
          <div className="card p-6">
            <h3 className="text-lg font-600 text-slate-900 mb-4">About VIIRS</h3>
            <p className="text-sm text-slate-700 leading-relaxed">
              VIIRS (Visible Infrared Imaging Radiometer Suite) provides higher resolution (375m) fire detections with more frequent updates throughout the day.
            </p>
          </div>
        </div>

        {/* Tips Section */}
        <div className="alert-info mt-8">
          <h4 className="font-600 text-sky-900 mb-2">💡 How to Use This Map</h4>
          <ul className="text-sm text-sky-900 space-y-1 list-disc list-inside">
            <li>Switch between different satellite sensors to compare data accuracy and resolution</li>
            <li>Adjust the time window to see historical hotspot patterns over days or weeks</li>
            <li>Click on hotspots to view additional information and confidence levels</li>
            <li>Use this data to identify high-risk areas and inform fire prevention strategies</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
