import axios from 'axios';

const TMDB_API_KEY = '4dfa11742481684ebf91963a480f13e9';

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  params: {
    api_key: TMDB_API_KEY,
  },
});

export const fetchMoviesByCategory = async (category, page = 1) => {
  try {
    const response = await api.get(`movie/${category}`, {  // Correção aqui com crase
      params: {
        page,
        language: 'pt-BR',
        region: 'BR',
      },
    });
    return response.data.results || [];
  } catch (error) {
    console.error('Erro ao buscar filmes por categoria:', error.message || error);
    throw new Error('Erro ao buscar filmes. Tente novamente mais tarde.');
  }
};

export const fetchMovieProviders = async (movieId) => {
  try {
    const response = await api.get(`movie/${movieId}/watch/providers`, {  // Correção aqui com crase
      params: {
        language: 'pt-BR',
        region: 'BR',
      },
    });

    const availableStreaming = response.data.results?.BR?.flatrate || [];
    const cinemasAvailable = response.data.results?.BR?.cinemas || [];

    return {
      availableStreaming,
      cinemasAvailable,
    };
  } catch (error) {
    console.error('Erro ao buscar provedores de exibição:', error.message || error);
    return { availableStreaming: [], cinemasAvailable: [] };
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

    return response.data.results || [];
  } catch (error) {
    console.error('Erro ao buscar filmes pela query:', error.message || error);
    throw new Error('Erro ao buscar filmes. Tente novamente mais tarde.');
  }
};

export const fetchTrendingMoviesOfWeek = async (page = 1) => {
  try {
    const response = await api.get('trending/movie/week', {
      params: {
        page,
        language: 'pt-BR',
        region: 'BR',
      },
    });
    return response.data.results || [];
  } catch (error) {
    console.error('Erro ao buscar filmes em tendência:', error.message || error);
    throw new Error('Erro ao buscar filmes da semana. Tente novamente mais tarde.');
  }
};
