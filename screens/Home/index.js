import React from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import FilmesCartaz from '../../components/filmes/FilmesCartaz';
import FilmesDestaque from '../../components/filmes/FilmesDestaque';
import MelhoresFilmes from '../../components/filmes/MelhoresFilmes';

const Home = () => {
  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.sectionTitle}>Filmes em Destaque</Text>
        <FilmesDestaque />

        <Text style={styles.sectionTitle}>Filmes Em Cartaz</Text>
        <FilmesCartaz />

        <Text style={styles.sectionTitle}>Melhores Filmes</Text>
        <MelhoresFilmes />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginVertical: 10,
  },
});

export default Home;
