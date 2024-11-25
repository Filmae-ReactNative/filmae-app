import React, { useEffect, useState } from 'react';
import { Modal, View, Text, Image, TouchableOpacity } from 'react-native';
import { modalStyles } from './style'; 
import { fetchMovieProviders } from '../../../services/api'; // Importa a função da API

const ModelFilmes = ({ visible, movie, onClose }) => {
  const [providers, setProviders] = useState(null);

  useEffect(() => {
    if (movie && visible) {
      const getProviders = async () => {
        try {
          const { availableStreaming, cinemasAvailable } = await fetchMovieProviders(movie.id);
          setProviders({ availableStreaming, cinemasAvailable });
        } catch (error) {
          console.error('Erro ao obter provedores:', error);
        }
      };
      getProviders();
    }
  }, [movie, visible]);

  const renderStreamingProviders = () => {
    if (providers?.availableStreaming?.length > 0) {
      return (
        <Text style={modalStyles.modalLocation}>
          Disponível em: {providers.availableStreaming.map((provider) => provider.provider_name).join(', ')}
        </Text>
      );
    }
    return <Text style={modalStyles.modalLocation}>Não disponível em plataformas de streaming.</Text>;
  };

  const renderCinemaAvailability = () => {
    if (providers?.cinemasAvailable?.length > 0) {
      return (
        <Text style={modalStyles.modalLocation}>
          Em exibição nos cinemas: {providers.cinemasAvailable.map((cinema) => cinema.name).join(', ')}
        </Text>
      );
    }
    return <Text style={modalStyles.modalLocation}>Não disponível nos cinemas.</Text>;
  };

  const renderMovieLocation = () => {
    if (providers?.availableStreaming?.length > 0 || providers?.cinemasAvailable?.length > 0) {
      return (
        <>
          {providers?.availableStreaming?.length > 0 && renderStreamingProviders()}
          {providers?.cinemasAvailable?.length > 0 && renderCinemaAvailability()}
        </>
      );
    }
    return <Text style={modalStyles.modalLocation}>Não disponível em nenhuma plataforma, somente nos cinema.</Text>;
  };

  if (!movie) return null; 

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={modalStyles.modalContainer}>
        <View style={modalStyles.modalContent}>
          <Image
            source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
            style={modalStyles.modalPoster}
          />
          <Text style={modalStyles.modalTitle}>{movie.title}</Text>
          <Text style={modalStyles.modalDescription}>{movie.overview}</Text>
          <Text style={modalStyles.modalRating}>
            {`Rating: ${movie.vote_average.toFixed(1)} / 10`}
          </Text>

          {/* Renderiza as informações sobre onde o filme está disponível */}
          {renderMovieLocation()}

          <TouchableOpacity onPress={onClose} style={modalStyles.closeButton}>
            <Text style={modalStyles.closeButtonText}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ModelFilmes;