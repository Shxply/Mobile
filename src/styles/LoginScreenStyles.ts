import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginBottom: 10,
  },
  title: {
    fontFamily: 'VarelaRound',
    fontSize: 32,
    textAlign: 'center',
    color: '#3C85FF',
    marginBottom: 30,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    fontFamily: 'VarelaRound',
    backgroundColor: '#f9f9f9',
  },
  button: {
    backgroundColor: '#3C85FF',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'VarelaRound',
  },
  error: {
    color: 'red',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 10,
  },
  link: {
    marginTop: 20,
    textAlign: 'center',
    color: '#888',
    fontFamily: 'VarelaRound',
  },
  linkBold: {
    color: '#3C85FF',
    fontWeight: 'bold',
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    marginTop: 15,
    justifyContent: 'center',
  },
  
  googleIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  
  googleButtonText: {
    fontSize: 16,
    color: '#444',
    fontFamily: 'VarelaRound',
  },  
});

