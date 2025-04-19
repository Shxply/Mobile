import { StyleSheet } from 'react-native';

const ProductCardStyles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 14,
    marginVertical: 10,
    width: '100%',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageContainer: {
    marginRight: 16,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#f2f2f2',
    width: 90,
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 90,
    height: 90,
    resizeMode: 'contain',
  },
  imageFallback: {
    fontSize: 36,
  },
  details: {
    flex: 1,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
    color: '#333',
  },
  brand: {
    fontSize: 14,
    color: '#777',
    marginBottom: 4,
  },
  nutrition: {
    fontSize: 13,
    color: '#444',
    marginBottom: 2,
  },
  nutriScore: {
    marginTop: 4,
    fontSize: 12,
    fontWeight: '600',
    color: '#00796B',
  },
});

export default ProductCardStyles;
