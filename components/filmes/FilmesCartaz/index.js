import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { fetchMoviesByCategory } from '../../../services/api';  
import Icon from 'react-native-vector-icons/FontAwesome'; 
import { styles } from "../FilmesCartaz/style";
import ModalDetalhes from '../../model/ModelFilmes'; 

const FilmesCartaz = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalVisible, setModalVisible] = useState(false); // Estado para controlar a visibilidade do modal
  const [selectedMovie, setSelectedMovie] = useState(null); // Estado para o filme selecionado

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const data = await fetchMoviesByCategory('now_playing'); 
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

  const handleMoviePress = (movie) => {
    setSelectedMovie(movie); // Define o filme selecionado
    setModalVisible(true); // Exibe o modal
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
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
      <ScrollView horizontal={true} style={styles.carousel}>
        {movies.map((movie) => (
          <TouchableOpacity
            key={movie.id}
            style={styles.movieItem}
            onPress={() => handleMoviePress(movie)} // Abre o modal ao clicar no filme
          >
            <Image
              source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
              style={styles.poster}
            />
            <Text style={styles.movieTitle} numberOfLines={1} ellipsizeMode="tail">
              {movie.title}
            </Text>

            <View style={styles.ratingContainer}>
              <Text style={styles.movieRating}>
                <View style={styles.starsContainer}>{renderStars(movie.vote_average)}</View>
                {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'} / 10
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Modal */}
      <ModalDetalhes 
        visible={modalVisible} 
        movie={selectedMovie} 
        onClose={() => setModalVisible(false)} 
      />
    </View>
  );
};

export default FilmesCartaz;