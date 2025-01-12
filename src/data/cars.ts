import { Car } from '../types/car';

export const cars: Car[] = [
  {
    id: '1',
    make: 'Tesla',
    model: 'Model S',
    year: 2023,
    price: 89990,
    available: true,
    image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399',
    type: 'Luxury',
    fuelType: 'Electric',
    transmission: 'Automatic'
  },
  {
    id: '2',
    make: 'BMW',
    model: 'M5',
    year: 2023,
    price: 105000,
    available: true,
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e',
    type: 'Sports',
    fuelType: 'Petrol',
    transmission: 'Automatic'
  },
  {
    id: '3',
    make: 'Mercedes',
    model: 'GLE',
    year: 2023,
    price: 75000,
    available: false,
    image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6',
    type: 'SUV',
    fuelType: 'Diesel',
    transmission: 'Automatic'
  },
  {
    id: '4',
    make: 'Toyota',
    model: 'Camry',
    year: 2023,
    price: 35000,
    available: true,
    image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb',
    type: 'Sedan',
    fuelType: 'Hybrid',
    transmission: 'Automatic'
  }
];