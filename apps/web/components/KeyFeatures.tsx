"use client";

const features = [
    {
      title: "Real-Time Fire Truck Tracking",
      description: "Monitor live locations of fire trucks with GPS tracking and dynamic routing.",
      icon: (
        <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="1" y="3" width="22" height="13" rx="2" ry="2" />
          <path d="M1 10h22" />
          <circle cx="5" cy="19" r="2" />
          <circle cx="19" cy="19" r="2" />
        </svg>
      ),
    },
    {
      title: "Smart Alarm System",
      description: "Automated fire alerts triggered by IoT sensors and AI-based fire spread prediction.",
      icon: (
        <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2L2 12h3v8h6v-6h2v6h6v-8h3z" />
        </svg>
      ),
    },
    {
      title: "Fire NOC Application",
      description: "Online application for Fire No Objection Certificate (NOC) with automated verification.",
      icon: (
        <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2L3 7v6c0 5 4 9 9 9s9-4 9-9V7l-9-5z" />
          <path d="M9 22V12h6v10" />
        </svg>
      ),
    },
    {
      title: "Shortest Evacuation Path",
      description: "AI-powered pathfinding system for emergency exits using Dijkstra’s Algorithm.",
      icon: (
        <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2L2 12h3v8h6v-6h2v6h6v-8h3z" />
        </svg>
      ),
    },
  ];

const KeyFeatures = () => {
  return (
    <section className="py-14">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-5xl font-extrabold text-center mb-14 text-white">Key Features</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-x-16 gap-y-10 text-white">
          {features.map((feature, index) => (
            <div key={index} className="bg-white/20 p-4 shadow-md rounded-xl flex flex-col justify-center hover:shadow-lg transition">
              <div className="text-red-500 mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2 ">{feature.title}</h3>
              <p className="text-white/80">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KeyFeatures;