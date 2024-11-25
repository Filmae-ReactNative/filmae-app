import React from "react";
import { View, ScrollView, Text, StyleSheet } from "react-native";
import FilmesCartaz from "../../components/filmes/FilmesCartaz";
import FilmesDestaque from "../../components/filmes/FilmesDestaque";
import MelhoresFilmes from "../../components/filmes/MelhoresFilmes";

const Home = () => {
  return (
    <View>
      <Text>Home</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#14213D",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginVertical: 10,
  },
});

export default Home;
