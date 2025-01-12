import React from 'react';
import { Car } from '../types/car';
import { Check, X } from 'lucide-react';

interface CarCardProps {
    car: Car;
}

export function CarCard({ car }: CarCardProps) {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
                src={car.image}
                alt={`${car.make} ${car.model}`}
                className="w-full h-48 object-cover"
            />
            <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                    <h3 className="text-xl font-bold">{car.make} {car.model}</h3>
                    <span className="text-gray-600">{car.year}</span>
                </div>
                <div className="flex items-center gap-2 mb-2">
                    <span className={`px-2 py-1 rounded-full text-sm ${car.available
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                        }`}>
                        {car.available ? (
                            <span className="flex items-center gap-1">
                                <Check size={16} />
                                Available
                            </span>
                        ) : (
                            <span className="flex items-center gap-1">
                                <X size={16} />
                                Not Available
                            </span>
                        )}
                    </span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                        {car.type}
                    </span>
                </div>
                <div className="space-y-1 text-sm text-gray-600 mb-4">
                    <p>Fuel Type: {car.fuelType}</p>
                    <p>Transmission: {car.transmission}</p>
                </div>
                <div className="flex justify-between items-center">
                    {/* <span className="text-2xl font-bold">${car.price.toLocaleString()}</span> */}
                    <button
                        className={`px-4 py-2 rounded-lg ${car.available
                            ? 'bg-teal-600 text-white hover:bg-teal-700'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            }`}
                        disabled={!car.available}
                    >
                        {car.available ? 'Contact Us' : 'Unavailable'}
                    </button>
                </div>
            </div>
        </div>
    );
}