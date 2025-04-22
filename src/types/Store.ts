export interface Store {
    storeId: string;
    name: string;
    location: {
      type: 'Point';
      coordinates: [number, number];
    };
    createdAt: string;
    updatedAt: string;
  }