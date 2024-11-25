import axios from 'axios';

const TMDB_API_KEY = '4dfa11742481684ebf91963a480f13e9'; // chave da api

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

// Função para buscar os provedores de streaming e cinemas do filme
export const fetchMovieProviders = async (movieId) => {
  try {
    const response = await api.get(`movie/${movieId}/watch/providers`, {  // Corrigido o endpoint
      params: {
        language: 'pt-BR', // Pode modificar o idioma, se necessário
        region: 'BR', // Região do Brasil
      },
    });

    // Verificação e formatação dos provedores de streaming e cinemas
    const availableStreaming = response.data.results?.BR?.flatrate || []; // Streaming disponível no Brasil
    const cinemasAvailable = response.data.results?.BR?.cinemas || []; // Cinemas disponíveis no Brasil

    return {
      availableStreaming, // Lista de plataformas de streaming
      cinemasAvailable, // Lista de cinemas
    };
  } catch (error) {
    console.error('Erro ao buscar provedores de exibição:', error);
    return { availableStreaming: [], cinemasAvailable: [] }; // Retorna listas vazias caso não haja dados
  }
};


export const fetchMoviesByQuery = async (query, page = 1) => {
  try {
    if (!query || query.trim() === '') {
      throw new Error('Texto de busca inválido.');
    }

    const response = await api.get('search/movie', {
      params: {
        query, 
        page, 
        language: 'pt-BR',
        region: 'BR', 
      },
    });

    if (response.data && response.data.results) {
      return response.data.results;
    } else {
      throw new Error(`Nenhum filme encontrado para: ${query}`);
    }
  } catch (error) {
    console.error('Erro ao buscar filmes pela query:', error.message || error);
    throw new Error('Erro ao buscar filmes. Tente novamente mais tarde.');
  }
};
