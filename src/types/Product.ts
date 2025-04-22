export interface Product {
  productId?: string;
  barcode: string;
  name: string;
  brand: string;
  brandOwner?: string;
  category: string;
  ingredients?: string;
  nutriScore?: string;
  energyKcal?: number;
  salt?: number;
  sugar?: number;
  imageUrl?: string;
  imageFrontUrl?: string;
  imageIngredientsUrl?: string;
  imageNutritionUrl?: string;
  ingredientTags?: string[];
}
  