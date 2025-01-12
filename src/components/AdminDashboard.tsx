// import React, { useState, useEffect } from 'react';
// import { supabase } from '../lib/supabase';
// import { Plus, Edit, Trash2, Check, X } from 'lucide-react';
// import { CarForm } from './CarForm';

// export function AdminDashboard() {
//     const [cars, setCars] = useState<any[]>([]);
//     const [showForm, setShowForm] = useState(false);
//     const [editingCar, setEditingCar] = useState<any | null>(null);
//     const [loading, setLoading] = useState(true);

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

//     const handleDelete = async (id: string) => {
//         if (!confirm('Are you sure you want to delete this car?')) return;

//         try {
//             const { error } = await supabase
//                 .from('cars')
//                 .delete()
//                 .eq('id', id);

//             if (error) throw error;
//             setCars(cars.filter(car => car.id !== id));
//         } catch (error) {
//             console.error('Error deleting car:', error);
//         }
//     };

//     const toggleAvailability = async (id: string, currentAvailability: boolean) => {
//         try {
//             const { error } = await supabase
//                 .from('cars')
//                 .update({ available: !currentAvailability })
//                 .eq('id', id);

//             if (error) throw error;
//             setCars(cars.map(car =>
//                 car.id === id ? { ...car, available: !car.available } : car
//             ));
//         } catch (error) {
//             console.error('Error updating availability:', error);
//         }
//     };

//     const handleFormSubmit = async (carData: any) => {
//         try {
//             const {
//                 data: { user },
//             } = await supabase.auth.getUser();

//             if (!user) throw new Error('No authenticated user');

//             const carWithUserId = {
//                 ...carData,
//                 user_id: user.id
//             };

//             if (editingCar) {
//                 const { error } = await supabase
//                     .from('cars')
//                     .update(carWithUserId)
//                     .eq('id', editingCar.id);

//                 if (error) throw error;
//             } else {
//                 const { error } = await supabase
//                     .from('cars')
//                     .insert([carWithUserId]);

//                 if (error) throw error;
//             }

//             fetchCars();
//             setShowForm(false);
//             setEditingCar(null);
//         } catch (error) {
//             console.error('Error saving car:', error);
//         }
//     };

//     if (loading) {
//         return (
//             <div className="flex items-center justify-center min-h-screen">
//                 <div className="text-xl">Loading...</div>
//             </div>
//         );
//     }

//     return (
//         <div className="p-6">
//             <div className="flex justify-between items-center mb-6">
//                 <h1 className="text-2xl font-bold">Car Management</h1>
//                 <button
//                     onClick={() => setShowForm(true)}
//                     className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
//                 >
//                     <Plus size={20} />
//                     Add New Car
//                 </button>
//             </div>

//             {showForm && (
//                 <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
//                     <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
//                         <CarForm
//                             onSubmit={handleFormSubmit}
//                             onCancel={() => {
//                                 setShowForm(false);
//                                 setEditingCar(null);
//                             }}
//                             initialData={editingCar}
//                         />
//                     </div>
//                 </div>
//             )}

//             <div className="bg-white rounded-lg shadow overflow-hidden">
//                 <table className="min-w-full divide-y divide-gray-200">
//                     <thead className="bg-gray-50">
//                         <tr>
//                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                 Car
//                             </th>
//                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                 Details
//                             </th>
//                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                 Status
//                             </th>
//                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                 Actions
//                             </th>
//                         </tr>
//                     </thead>
//                     <tbody className="bg-white divide-y divide-gray-200">
//                         {cars.map((car) => (
//                             <tr key={car.id}>
//                                 <td className="px-6 py-4 whitespace-nowrap">
//                                     <div className="flex items-center">
//                                         <div className="h-20 w-20 flex-shrink-0">
//                                             <img
//                                                 className="h-20 w-20 rounded-lg object-cover"
//                                                 src={car.image}
//                                                 alt={`${car.make} ${car.model}`}
//                                             />
//                                         </div>
//                                         <div className="ml-4">
//                                             <div className="text-sm font-medium text-gray-900">
//                                                 {car.make} {car.model}
//                                             </div>
//                                             <div className="text-sm text-gray-500">
//                                                 {car.year}
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </td>
//                                 <td className="px-6 py-4">
//                                     <div className="text-sm text-gray-900">{car.type}</div>
//                                     <div className="text-sm text-gray-500">
//                                         {car.fuel_type} · {car.transmission}
//                                     </div>
//                                     <div className="text-sm font-medium text-gray-900">
//                                         ${car.price.toLocaleString()}
//                                     </div>
//                                 </td>
//                                 <td className="px-6 py-4">
//                                     <button
//                                         onClick={() => toggleAvailability(car.id, car.available)}
//                                         className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${car.available
//                                             ? 'bg-green-100 text-green-800'
//                                             : 'bg-red-100 text-red-800'
//                                             }`}
//                                     >
//                                         {car.available ? (
//                                             <Check size={16} className="mr-1" />
//                                         ) : (
//                                             <X size={16} className="mr-1" />
//                                         )}
//                                         {car.available ? 'Available' : 'Not Available'}
//                                     </button>
//                                 </td>
//                                 <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                                     <div className="flex items-center gap-2">
//                                         <button
//                                             onClick={() => {
//                                                 setEditingCar(car);
//                                                 setShowForm(true);
//                                             }}
//                                             className="text-blue-600 hover:text-blue-900"
//                                         >
//                                             <Edit size={20} />
//                                         </button>
//                                         <button
//                                             onClick={() => handleDelete(car.id)}
//                                             className="text-red-600 hover:text-red-900"
//                                         >
//                                             <Trash2 size={20} />
//                                         </button>
//                                     </div>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// }