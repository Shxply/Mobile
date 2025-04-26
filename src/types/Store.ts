export interface Store {
  storeId: string;
  name: string;
  businessStatus: string;
  types: string[];
  vicinity: string;
  rating: number;
  userRatingsTotal: number;
  priceLevel: number;
  placeId: string;
  photoReference: string;
  photoAttributions: string[];
  location: {
    type: 'Point';
    coordinates: [number, number]; // [longitude, latitude]
  };
  openNow: boolean;
  createdAt: string; // ISO string
  updatedAt: string; // ISO string
}
