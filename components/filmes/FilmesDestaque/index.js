import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Image, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { fetchMoviesByCategory } from '../../../services/api';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './style'; 
import ModalDetalhes from '../../model/ModelFilmes'; 

const FilmesDestaque = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const flatListRef = useRef(null); 
  const indexRef = useRef(0); 
  const isUserInteracting = useRef(false); 

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const data = await fetchMoviesByCategory('popular');
        setMovies(data);
      } catch (err) {
        setError('Erro ao carregar filmes.');
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, []);

  useEffect(() => {
    if (movies.length > 0) {
      const interval = setInterval(() => {
        if (!isUserInteracting.current) {
          let nextIndex = indexRef.current + 1;
          if (nextIndex >= movies.length) nextIndex = 0; 
          indexRef.current = nextIndex;

          flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
        }
      }, 3000); 

      return () => clearInterval(interval);
    }
  }, [movies]);

  const handleScrollBeginDrag = () => {
    isUserInteracting.current = true;
  };

  const handleScrollEndDrag = () => {
    isUserInteracting.current = false;
  };

  const handleMoviePress = (movie) => {
    setSelectedMovie(movie);
    setModalVisible(true);
  };

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
      <FlatList
        ref={flatListRef}
        data={movies}
        horizontal
        pagingEnabled
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.movieItem}
            onPress={() => handleMoviePress(item)} // Ao clicar no filme, abre o modal
          >
            <Image
              source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
              style={styles.poster}
            />
            <Text style={styles.movieTitle}>
              {item.title.length > 30 ? `${item.title.slice(0, 30)}...` : item.title}
            </Text>
            <View style={styles.ratingContainer}>
              <View style={styles.starsContainer}>{renderStars(item.vote_average)}</View>
              <Text style={styles.movieRating}>{`${item.vote_average.toFixed(1)} / 10`}</Text>
            </View>
          </TouchableOpacity>
        )}
        showsHorizontalScrollIndicator={false}
        onScrollBeginDrag={handleScrollBeginDrag}
        onScrollEndDrag={handleScrollEndDrag}
      />

      {/* Modal */}
      <ModalDetalhes 
        visible={modalVisible} 
        movie={selectedMovie} 
        onClose={() => setModalVisible(false)} 
      />
    </View>
  );
};

export default FilmesDestaque;