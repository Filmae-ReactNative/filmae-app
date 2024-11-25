import { useState, useEffect } from 'react';
import { fetchMoviesByCategory } from '../../services/api';

export const useMovies = (category) => {
  // Estado para armazenar os filmes carregados
  const [movies, setMovies] = useState([]);  
  // Estado para gerenciar o carregamento da lista de filmes (verdadeiro ou falso)
  const [loading, setLoading] = useState(true);  
  // Estado para armazenar e exibir erros em caso de falha na requisição
  const [error, setError] = useState(null);  

  useEffect(() => {  
    const loadMovies = async () => {
      try {
        // Chama a função para buscar filmes da API com base na categoria
        const fetchedMovies = await fetchMoviesByCategory(category); 
        setMovies(fetchedMovies);  // Atualiza o estado com os filmes carregados
      } catch (err) {
        setError('Something went wrong while fetching movies.');  // Caso ocorra algum erro, atualiza o estado de erro
      } finally {
        setLoading(false);  // Após a requisição, define que o carregamento terminou
      }
    };

    loadMovies(); 
  }, [category]);  // Dependência do useEffect: a função será chamada sempre que a categoria mudar

  return { movies, loading, error };  // Retorna os estados para que possam ser usados em outros componentes
};
