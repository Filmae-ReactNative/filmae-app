import React, { useState } from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import FilmesCartaz from '../../components/filmes/FilmesCartaz';
import FilmesDestaque from '../../components/filmes/FilmesDestaque';
import MelhoresFilmes from '../../components/filmes/MelhoresFilmes';
import SearchInput from '../../components/SearchInput';
import { fetchMoviesByQuery } from '../../services/api';
import Filme from '../../components/filmes/FilmesEncontrados';

const Home = () => {

  const [searchQuery, setSearchQuery] = useState('');
  const [filmesEncontrados, setfilmesEncontrados] = useState([]);

  const handleSearch = async (texto) => {
    setSearchQuery(texto);

    if (texto.trim() === '') {
      setfilmesEncontrados([]);
      return;
    }

    try {
      const results = await fetchMoviesByQuery(texto);
      setfilmesEncontrados(results);
    } catch (error) {
      console.error('Erro ao buscar filmes:', error.message);
      setfilmesEncontrados([]);
    }
  };
  
  const handleClear = () => {
    setSearchQuery('');
    setfilmesEncontrados([]);
  };

  return (
    <View style={styles.container}>

     <View style={styles.searchContainer}>
        <SearchInput
        value={searchQuery}
        onChangeText={handleSearch}
        onClear={handleClear}
      />
      </View>

      <ScrollView>
      {filmesEncontrados.length > 0 ? (
        <>
          <Text style={styles.sectionTitle}>Resultados da Busca</Text>
          {filmesEncontrados.map((movie) => (
            <Filme key={movie.id} movie={movie} />
          ))}
        </>
      ) : (
        <>
        <Text style={styles.sectionTitle}>Filmes em Destaque</Text>
        <FilmesDestaque />

        <Text style={styles.sectionTitle}>Filmes Em Cartaz</Text>
        <FilmesCartaz />

        <Text style={styles.sectionTitle}>Melhores Filmes</Text>
        <MelhoresFilmes />
        </>
      )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1F1F1F',
    margin: 10,
    paddingHorizontal: 10,
    borderRadius: 8,
    height: 45,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    color: '#FFF',
    fontSize: 16,
    height: '100%',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginVertical: 10,
  },

});

export default Home;
