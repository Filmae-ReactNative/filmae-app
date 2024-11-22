import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      marginBottom: 20,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    loadingText: {
      marginTop: 10,
      fontSize: 16,
      color: '#0000ff',
    },
    errorContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 20,
    },
    errorText: {
      color: 'red',
      fontSize: 16,
    },
    carousel: {
      flexDirection: 'row',
    },
    movieItem: {
      marginRight: 15,
      width: 100,
      alignItems: 'center',
    },
    poster: {
      width: 100,
      height: 150,
      borderRadius: 8,
    },
    movieTitle: {
      color: '#fff',
      fontSize: 14,
      fontWeight: 'bold',
      marginTop: 5,
      textAlign: 'center',
    },
    ratingContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 5,
    },
    starsContainer: {
      flexDirection: 'row',
      marginRight: 5,
    },
    movieRating: {
      color: '#fca311',
      fontSize: 12,
    },
  });
  