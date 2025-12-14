export const TMDB_CONFIG = {
  BASE_URL: 'https://api.themoviedb.org/3',
  API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`,
  },
};

export const fetchMovies = async ({query} : {query: string}) => {
    const endpoint = query 
        ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}` 
        : `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`;

    const response = await fetch(endpoint, {
        method: 'GET',
        headers: TMDB_CONFIG.headers,
    });

    if (!response.ok) {
        throw new Error('Failed to fetch movies');

    }
    const data = await response.json();
    return data.results;
}

export const fetchMovieDetails = async (movieId: string) : Promise<any> => {
    try {
        const response = await fetch(
            `${TMDB_CONFIG.BASE_URL}/movie/${movieId}?api_key=${TMDB_CONFIG.API_KEY}`,
            {
                method: 'GET',
                headers: TMDB_CONFIG.headers,
            }
        );
        if (!response.ok) {
            throw new Error('Failed to fetch movie details');
        }
        const data = await response.json();
        return data;
    } catch (e) {
        console.error('Error fetching movie details:', e);
        throw e;
    }
}

// const url = 'https://api.themoviedb.org/3/authentication';
// const options = {
//   method: 'GET',
//   headers: {
//     accept: 'application/json',
//     Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyYzk2YjFmNGU2NzA2MjExNzRlNGUxNTZiMzhhMDM2MCIsIm5iZiI6MTc2MzQ2NDg3OS41OTcsInN1YiI6IjY5MWM1NmFmMjgwMTY5NzZkZjUyZWVkNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.XQO-9qR0QHrMjijC0SBKpRrKOvKPaaf_wV9-d4BilKU'
//   }
// };

// fetch(url, options)
//   .then(res => res.json())
//   .then(json => console.log(json))
//   .catch(err => console.error(err));
