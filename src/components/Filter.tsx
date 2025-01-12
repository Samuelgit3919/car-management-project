import React from 'react';
import { Search } from 'lucide-react';

interface FiltersProps {
    search: string;
    setSearch: (search: string) => void;
    typeFilter: string;
    setTypeFilter: (type: string) => void;
    availabilityFilter: boolean | null;
    setAvailabilityFilter: (available: boolean | null) => void;
}

export function Filters({
    search,
    setSearch,
    typeFilter,
    setTypeFilter,
    availabilityFilter,
    setAvailabilityFilter
}: FiltersProps) {
    return (
        <div className="bg-white p-4 rounded-lg shadow-md space-y-4">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                    type="text"
                    placeholder="Search cars..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Type</label>
                <select
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">All Types</option>
                    <option value="SUV">SUV</option>
                    <option value="Sedan">Sedan</option>
                    <option value="Sports">Sports</option>
                    <option value="Luxury">Luxury</option>
                </select>
            </div>

            <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Availability</label>
                <select
                    value={availabilityFilter === null ? '' : availabilityFilter.toString()}
                    onChange={(e) => {
                        const value = e.target.value;
                        setAvailabilityFilter(value === '' ? null : value === 'true');
                    }}
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">All</option>
                    <option value="true">Available</option>
                    <option value="false">Not Available</option>
                </select>
            </div>
        </div>
    );
}