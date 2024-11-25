import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet, Image } from 'react-native';
import { fetchTrendingMoviesOfWeek } from '../../services/api';

const Review = () => {
  const [movies, setMovies] = useState([]);
  const [comments, setComments] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const trendingMovies = await fetchTrendingMoviesOfWeek(); 
        setMovies(trendingMovies);
      } catch (err) {
        setError('Erro ao carregar os filmes da semana.');
        console.error('Erro ao buscar filmes:', err.message || err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const handleCommentChange = (movieId, text) => {
    setComments((prev) => ({
      ...prev,
      [movieId]: { ...prev[movieId], draft: text },
    }));
  };

  const handleCommentSubmit = (movieId) => {
    const movieComments = comments[movieId] || {};
    const comment = movieComments.draft?.trim();

    if (comment) {
      setComments((prev) => ({
        ...prev,
        [movieId]: {
          draft: '',
          submitted: [...(movieComments.submitted || []), comment], // Adiciona o comentário à lista
        },
      }));
      console.log(`Review enviado para "${movies.find((m) => m.id === movieId)?.title}": ${comment}`);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Carregando os filmes da semana...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Melhores Filmes da Semana</Text>
      {movies.map((movie) => (
        <View key={movie.id} style={styles.movieCard}>
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
            }}
            style={styles.movieImage}
          />
          <View style={styles.movieInfo}>
            <Text style={styles.movieTitle}>{movie.title}</Text>
            <Text style={styles.movieDetails}>
              {movie.release_date ? `${new Date(movie.release_date).getFullYear()} · ` : ''}
              {movie.vote_average ? `Nota: ${movie.vote_average}` : 'Sem avaliação'}
            </Text>
            <Text style={styles.movieOverview}>{movie.overview || 'Descrição não disponível.'}</Text>
          </View>
          <View style={styles.commentSection}>
            <Text style={styles.commentTitle}>Deixe seu review:</Text>
            <TextInput
              style={styles.commentInput}
              placeholder="Escreva aqui..."
              value={comments[movie.id]?.draft || ''}
              onChangeText={(text) => handleCommentChange(movie.id, text)}
            />
            <Button
              title="Enviar Review"
              onPress={() => handleCommentSubmit(movie.id)}
              color="#FF4500"
            />
            {/* Exibe os comentários enviados */}
            {comments[movie.id]?.submitted?.length > 0 && (
              <View style={styles.commentList}>
                <Text style={styles.commentListTitle}>Comentários:</Text>
                {comments[movie.id].submitted.map((comment, index) => (
                  <Text key={index} style={styles.comment}>
                    - {comment}
                  </Text>
                ))}
              </View>
            )}
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#1a1a2e',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 16,
  },
  movieCard: {
    marginBottom: 20,
    backgroundColor: '#162447',
    borderRadius: 10,
    overflow: 'hidden',
    padding: 16,
    borderWidth: 1,
    borderColor: '#1f4068',
  },
  movieImage: {
    width: '100%',
    height: 300,
    borderRadius: 8,
    marginBottom: 12,
  },
  movieInfo: {
    marginBottom: 16,
  },
  movieTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
  },
  movieDetails: {
    fontSize: 14,
    color: '#c1c1c1',
    marginVertical: 4,
  },
  movieOverview: {
    fontSize: 14,
    color: '#e0e0e0',
    marginBottom: 12,
  },
  commentSection: {
    borderTopWidth: 1,
    borderTopColor: '#1f4068',
    paddingTop: 16,
  },
  commentTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 8,
  },
  commentInput: {
    borderWidth: 1,
    borderColor: '#3f72af',
    borderRadius: 8,
    padding: 8,
    fontSize: 16,
    backgroundColor: '#FFF',
    marginBottom: 12,
  },
  commentList: {
    marginTop: 16,
  },
  commentListTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 8,
  },
  comment: {
    fontSize: 14,
    color: '#FFF',
    marginVertical: 2,
  },
  loadingText: {
    fontSize: 18,
    color: '#FFF',
  },
  errorText: {
    fontSize: 18,
    color: '#FF4500',
  },
});

export default Review;
