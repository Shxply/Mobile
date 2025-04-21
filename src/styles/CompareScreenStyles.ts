import { StyleSheet } from 'react-native';

const CompareScreenStyles = StyleSheet.create({
  container: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 100,
  },
  card: {
    width: '100%',
    height: 300,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#fff',
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraCard: {
    width: '100%',
    height: 300,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#000',
    marginBottom: 20,
    position: 'relative',
  },
  cameraView: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  placeholderCard: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 300,
    width: '100%',
  },
  rescanBtn: {
    marginTop: 12,
    alignSelf: 'center',
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  rescanText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  scanText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#007AFF',
    textAlign: 'center',
  },
  scanAgainButton: {
    position: 'absolute',
    bottom: 16,
    alignSelf: 'center',
    backgroundColor: '#ffffffcc',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  scanAgainText: {
    color: '#000',
    fontWeight: 'bold',
  },
  resultCard: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginTop: 12,
    elevation: 2,
  },
  resultHeader: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  resultText: {
    fontSize: 16,
    color: '#555',
  },
  resetButton: {
    marginTop: 16,
    alignSelf: 'center',
    backgroundColor: '#ff3b30',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  resetButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default CompareScreenStyles;





