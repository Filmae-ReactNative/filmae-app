import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#14213D',
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 80,
    height: 40,
    resizeMode: 'contain',
  },
  settingsIcon: {
    padding: 10,
  },
  iconText: {
    color: '#fff',
    fontSize: 20,
  },
  profileContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    resizeMode: 'cover',
  },
  profileIcon: {
    fontSize: 50,
    color: '#00b4d8',
  },
  username: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  editTitle: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#e0e0e0',
    borderRadius: 25,
    width: '75%',
    height: 50,
    marginBottom: 15,
    paddingHorizontal: 15,
    fontSize: 16,
    marginHorizontal: 'auto'
  },
  deleteAccount: {
    color: '#e63946',
    textAlign: 'center',
    marginTop: 15,
  },
  label: {
    marginLeft: '20%',
    marginBottom: 10,
    color: '#FFFFFF',
    fontSize: 16
  }
  
});

export default styles;
