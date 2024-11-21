import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window'); 

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  movieItem: {
    width: width, 
    position: 'relative', 
  },
  poster: {
    width: 400,
    height: 400,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  movieTitle: {
    position: 'absolute',
    bottom: 50,  
    left: 10,
    right: 10,
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingVertical: 5,
  },
  ratingContainer: {
    position: 'absolute',
    bottom: 10, 
    left: 10,
    right: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  movieRating: {
    color: '#fca311',
    fontSize: 14,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  starsContainer: {
    flexDirection: 'row',
    marginRight: 5, 
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    marginTop: 10,
    color: '#0000ff',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default styles;
