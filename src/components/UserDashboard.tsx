// import React, { useState, useEffect } from 'react';
// import { supabase } from '../lib/supabase';
// import { CarCard } from './CarCard';
// import { Filters } from './Filter';
// import { Car } from '../types/car';

// export function UserDashboard() {
//     const [cars, setCars] = useState<Car[]>([]);
//     const [loading, setLoading] = useState(true);
//     const [search, setSearch] = useState('');
//     const [typeFilter, setTypeFilter] = useState('');
//     const [availabilityFilter, setAvailabilityFilter] = useState<boolean | null>(null);

//     useEffect(() => {
//         fetchCars();
//     }, []);

//     const fetchCars = async () => {
//         try {
//             const { data, error } = await supabase
//                 .from('cars')
//                 .select('*')
//                 .order('created_at', { ascending: false });

//             if (error) throw error;
//             setCars(data || []);
//         } catch (error) {
//             console.error('Error fetching cars:', error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const filteredCars = cars.filter(car => {
//         const matchesSearch =
//             car.make.toLowerCase().includes(search.toLowerCase()) ||
//             car.model.toLowerCase().includes(search.toLowerCase());

//         const matchesType = !typeFilter || car.type === typeFilter;

//         const matchesAvailability =
//             availabilityFilter === null || car.available === availabilityFilter;

//         return matchesSearch && matchesType && matchesAvailability;
//     });

//     if (loading) {
//         return (
//             <div className="flex items-center justify-center min-h-screen">
//                 <div className="text-xl">Loading...</div>
//             </div>
//         );
//     }

//     return (
//         <div className="min-h-screen bg-gray-100 p-6">
//             <div className="max-w-7xl mx-auto">
//                 <h1 className="text-3xl font-bold text-gray-900 mb-8">Available Cars</h1>

//                 <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
//                     <div className="lg:col-span-1">
//                         <Filters
//                             search={search}
//                             setSearch={setSearch}
//                             typeFilter={typeFilter}
//                             setTypeFilter={setTypeFilter}
//                             availabilityFilter={availabilityFilter}
//                             setAvailabilityFilter={setAvailabilityFilter}
//                         />
//                     </div>

//                     <div className="lg:col-span-3">
//                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
//                             {filteredCars.map(car => (
//                                 <CarCard key={car.id} car={car} />
//                             ))}
//                         </div>

//                         {filteredCars.length === 0 && (
//                             <div className="text-center py-12">
//                                 <p className="text-gray-500 text-lg">No cars found matching your criteria.</p>
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }