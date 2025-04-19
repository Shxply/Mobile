import { StyleSheet } from 'react-native';

const CompareScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 32,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingVertical: 28,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 4,
    marginBottom: 24,
  },
  scanText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginTop: 12,
    textAlign: 'center',
  },
  rescanBtn: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
  },
  rescanText: {
    fontWeight: '600',
    fontSize: 16,
    color: '#fff',
  },
  resultCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingVertical: 24,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 4,
    marginBottom: 16,
  },
  resultHeader: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 10,
    color: '#333',
    textAlign: 'center',
  },
  resultText: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    lineHeight: 22,
  },
});

export default CompareScreenStyles;


