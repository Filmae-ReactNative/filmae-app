import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { fetchMoviesByCategory } from '../../../services/api';
import Icon from 'react-native-vector-icons/FontAwesome';
import { styles } from './style'; 
import MovieModal from '../../model/ModelFilmes'; 

const MelhoresFilmes = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const data = await fetchMoviesByCategory('top_rated');
        setMovies(data);
      } catch (err) {
        setError('Erro ao carregar filmes.');
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, []);

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating / 2); 
    const halfStar = rating % 2 >= 1 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;

    // Adiciona as estrelas cheias
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Icon key={`full-${i}`} name="star" size={12} color="#FFD700" />);
    }

    // Adiciona a estrela meia cheia, se necessário
    if (halfStar) {
      stars.push(<Icon key="half" name="star-half" size={12} color="#FFD700" />);
    }

    // Adiciona as estrelas vazias
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Icon key={`empty-${i}`} name="star-o" size={12} color="#FFD700" />);
    }

    return stars;
  };
// Modal
  const handleMoviePress = (movie) => {
    setSelectedMovie(movie); 
    setModalVisible(true); 
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedMovie(null); 
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Carregando filmes...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        style={styles.carousel}
        showsHorizontalScrollIndicator={false}>
        {movies.map((movie) => (
          <TouchableOpacity
            key={movie.id}
            style={styles.movieItem}
            onPress={() => handleMoviePress(movie)} 
          >
            <Image
              source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
              style={styles.poster}
              resizeMode="cover"
            />
            <Text style={styles.movieTitle} numberOfLines={1}>
              {movie.title}
            </Text>
            <View style={styles.ratingContainer}>
              <View style={styles.starsContainer}>{renderStars(movie.vote_average)}</View>
              <Text style={styles.movieRating}>{`${movie.vote_average.toFixed(1)} / 10`}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Modal para exibir detalhes do filme */}
      <MovieModal
        visible={modalVisible}
        movie={selectedMovie}
        onClose={closeModal}
      />
    </View>
  );
};

export default MelhoresFilmes;


