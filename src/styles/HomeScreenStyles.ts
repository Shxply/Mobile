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
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    position: 'relative',
  },
  productImage: {
    width: 90,
    height: 110,
    marginBottom: 12,
    borderRadius: 8,
    resizeMode: 'contain',
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    color: '#333',
    marginBottom: 4,
  },
  priceText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#007AFF',
    marginBottom: 6,
  },
  tileAddButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 26,
    height: 26,
    borderRadius: 13,
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
  searchBarWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    backgroundColor: '#f0f0f0',
    padding: 12,
    elevation: 2,
    marginLeft: 12,
    marginRight: 12,
  },
  searchBar: {
    marginBottom: 0,
  },
});

export default HomeScreenStyles;









  