import React, { useState, useMemo } from 'react';
import { Car } from './types/car';
import { cars } from './data/cars';
import { CarCard } from './components/CarCard';
import { Filters } from './components/Filter';
import { Car as CarIcon } from 'lucide-react';

function App() {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [availabilityFilter, setAvailabilityFilter] = useState<boolean | null>(null);

  const filteredCars = useMemo(() => {
    return cars.filter((car) => {
      const matchesSearch =
        car.make.toLowerCase().includes(search.toLowerCase()) ||
        car.model.toLowerCase().includes(search.toLowerCase());

      const matchesType = !typeFilter || car.type === typeFilter;

      const matchesAvailability =
        availabilityFilter === null || car.available === availabilityFilter;

      return matchesSearch && matchesType && matchesAvailability;
    });
  }, [search, typeFilter, availabilityFilter]);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <CarIcon size={24} className="text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">Car Management System</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <Filters
              search={search}
              setSearch={setSearch}
              typeFilter={typeFilter}
              setTypeFilter={setTypeFilter}
              availabilityFilter={availabilityFilter}
              setAvailabilityFilter={setAvailabilityFilter}
            />
          </div>

          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredCars.length > 0 ? (
                filteredCars.map((car: Car) => (
                  <CarCard key={car.id} car={car} />
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-gray-500 text-lg">
                    No cars found matching your criteria.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;