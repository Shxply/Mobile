import { StyleSheet } from 'react-native';

const CARD_WIDTH = 160;

const HomeScreenStyles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    paddingHorizontal: 16,
    backgroundColor: '#f0f0f0',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  cardWrapper: {
    alignItems: 'center',
    marginHorizontal: 8,
  },
  card: {
    width: CARD_WIDTH,
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    position: 'relative',
  },
  productImage: {
    width: 80,
    height: 80,
    marginBottom: 12,
    borderRadius: 8,
    resizeMode: 'contain',
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    color: '#333',
    marginBottom: 8,
  },
  tileAddButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#28a745',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  counterBar: {
    marginTop: 6,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    width: '100%',
  },
  counterButton: {
    padding: 4,
  },
  counterText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
});

export default HomeScreenStyles;








  