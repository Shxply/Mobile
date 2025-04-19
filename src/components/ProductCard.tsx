import React from 'react';
import { View, Text, Image } from 'react-native';
import { Product } from '@/types/Product'; // Adjust if needed
import ProductCardStyles from '@/styles/ProductCardStyles';

type Props = {
  product: Product;
};

const ProductCard: React.FC<Props> = ({ product }) => {
  return (
    <View style={ProductCardStyles.card}>
      <View style={ProductCardStyles.imageContainer}>
        {product.imageFrontUrl ? (
          <Image source={{ uri: product.imageFrontUrl }} style={ProductCardStyles.image} />
        ) : (
          <Text style={ProductCardStyles.imageFallback}>📦</Text>
        )}
      </View>

      <View style={ProductCardStyles.details}>
        <Text style={ProductCardStyles.name}>{product.name || 'Unnamed Product'}</Text>
        <Text style={ProductCardStyles.brand}>{product.brand}</Text>
        {product.energyKcal !== undefined && (
          <Text style={ProductCardStyles.nutrition}>🔥 {product.energyKcal} kcal</Text>
        )}
        <Text style={ProductCardStyles.nutrition}>🍬 Sugar: {product.sugar ?? 'N/A'}g</Text>
        <Text style={ProductCardStyles.nutrition}>🧂 Salt: {product.salt ?? 'N/A'}g</Text>
        {product.nutriScore && (
          <Text style={ProductCardStyles.nutriScore}>
            NutriScore: {product.nutriScore.toUpperCase()}
          </Text>
        )}
      </View>
    </View>
  );
};

export default ProductCard;


