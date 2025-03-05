import React from 'react';

// Define the type for a Building object
type Building = {
  id: number;
  name: string;
  location: string;
  latitude: number;
  longitude: number;
  nocStatus: 'Applied' | 'Pending' | 'Approved' | 'Denied';
};

const buildings: Building[] = [
  {
    id: 1,
    name: 'Skyline Tower',
    location: '123 Main St, Downtown',
    latitude: 40.7128,
    longitude: -74.0060,
    nocStatus: 'Pending',
  },
  {
    id: 2,
    name: 'Greenwood Heights',
    location: '456 Oak Rd, Uptown',
    latitude: 40.7306,
    longitude: -73.9352,
    nocStatus: 'Approved',
  },
  
  {
    id: 3,
    name: 'Ocean View Apartments',
    location: '789 Seaside Blvd, Beachside',
    latitude: 40.6782,
    longitude: -73.9442,
    nocStatus: 'Applied',
  },
  {
    id: 4,
    name: 'Ocean View Apartments',
    location: '789 Seaside Blvd, Beachside',
    latitude: 40.6782,
    longitude: -73.9442,
    nocStatus: 'Applied',
  },
  {
    id: 5,
    name: 'Ocean View Apartments',
    location: '789 Seaside Blvd, Beachside',
    latitude: 40.6782,
    longitude: -73.9442,
    nocStatus: 'Applied',
  },
  {
    id: 6,
    name: 'Ocean View Apartments',
    location: '789 Seaside Blvd, Beachside',
    latitude: 40.6782,
    longitude: -73.9442,
    nocStatus: 'Applied',
  }
 
];

const BuildingCard: React.FC = () => {
  return (
    <div className='px-16 py-8'>
    <h1 className="text-5xl md:text-4xl font-extrabold text-white">Building List</h1>
    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-8 mt-5">
      {buildings.map((building) => (
        <div
          key={building.id}
          className="flex items-center bg-white shadow-lg rounded-xl p-4 hover:shadow-xl transition duration-300 ease-in-out"
        >
          {/* Left side: Image or Icon */}
          {/* <div className="flex-shrink-0 w-54 h-50 bg-gray-200 rounded-lg mr-6">
        
            <img
              src="/fire-noc-certificates.jpg" // Replace with actual image URL
              alt="Building Image"
              className="object-cover w-full h-full rounded-lg"
            />
          </div> */}

          {/* Right side: Building Info */}
          <div className="flex-1 ">
            <h3 className="text-xl font-semibold">{building.name}</h3>
            <p className="text-gray-600">{building.location}</p>
            <div className="flex justify-between mt-4 text-sm">
              <p>
                <strong>Latitude:</strong> {building.latitude}
              </p>
              <p>
                <strong>Longitude:</strong> {building.longitude}
              </p>
            </div>
            <div className="mt-4">
              <p>
                <strong>NOC Status:</strong>{' '}
                <span
                  className={`${
                    building.nocStatus === 'Approved'
                      ? 'text-green-500'
                      : building.nocStatus === 'Denied'
                      ? 'text-red-500'
                      : 'text-yellow-500'
                  }`}
                >
                  {building.nocStatus}
                </span>
              </p>
              {building.nocStatus === 'Pending' || building.nocStatus === 'Denied' ? (
                <button className="mt-2 bg-blue-500 text-white p-2 w-full rounded-xl hover:bg-blue-600 transition duration-300 ease-in-out">
                  Apply for NOC
                </button>
              ) : null}
            </div>
          </div>
        </div>
      ))}
    </div>
    </div>
  );
};

export default BuildingCard;
