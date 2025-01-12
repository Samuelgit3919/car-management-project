export interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  available: boolean;
  image: string;
  type: 'SUV' | 'Sedan' | 'Sports' | 'Luxury';
  fuelType: 'Petrol' | 'Diesel' | 'Electric' | 'Hybrid';
  transmission: 'Automatic' | 'Manual';
}