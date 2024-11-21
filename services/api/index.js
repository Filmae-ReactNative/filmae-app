// services/movieService.js
import axios from 'axios';

const TMDB_API_KEY = '4dfa11742481684ebf91963a480f13e9';//chave da api

// Instância do axios configurada com a URL base da API e a chave
const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  params: {
    api_key: TMDB_API_KEY,
  },
});

// Função para buscar filmes por categoria
export const fetchMoviesByCategory = async (category, page = 1) => {
  try {
    // Requisição para obter os filmes 
    const response = await api.get(`movie/${category}`, {
      params: {
        page, 
        language: 'pt-BR', 
        region: 'BR', 
      },
    });

    // Verificação e retorno dos filmes
    if (response.data && response.data.results) {
      return response.data.results; 
    } else {
      throw new Error(`Nenhum filme encontrado para a categoria: ${category}.`);
    }
  } catch (error) {

    // Exibe o erro detalhado apenas em desenvolvimento
    if (process.env.NODE_ENV === 'development') {
      console.error('Erro ao buscar filmes:', error.message || error);
    }
    throw new Error('Erro ao buscar filmes. Tente novamente mais tarde.');
  }
};
