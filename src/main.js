import api_key from "./api-key.js";
export {getTrendingMoviesPreview}
export {getCategoriesPreview}
export {getMoviesByCategory}
export {getMoviesBySearch}
const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
    },
    params: {
        'api_key': api_key,
    },
});

function createMovie(movies, container) {
    container.innerHTML = '';

    movies.forEach(movie => {
        const movieContainer = document.createElement('div')  
        movieContainer.classList.add('movie-container');

        const movieImg = document.createElement('img');
        movieImg.classList.add('movie-img');
        movieImg.setAttribute('alt', movie.title);
        movieImg.setAttribute(
            'src', 
            'https://image.tmdb.org/t/p/w300/' 
            + movie.poster_path);
        movieContainer.appendChild(movieImg);
        container.appendChild(movieContainer);
    }); 
};

function createCategory(categories, container) {
    container.innerHTML = '';

    categories.forEach(category => {

        const categoryContainer = document.createElement('div');  
        categoryContainer.classList.add('category-container');

        const categoryTitle = document.createElement('h3');
        categoryTitle.classList.add('category-title');
        categoryTitle.setAttribute('id', 'id' + category.id);
        categoryTitle.addEventListener('click', () => {
            location.hash = `#category=${category.id}-${category.name}`
        });
        const categoryTitleText = document.createTextNode(category.name)
        categoryTitle.appendChild(categoryTitleText);
        categoryContainer.appendChild(categoryTitle);

        container.appendChild(categoryContainer);
    }); 
}

async function getTrendingMoviesPreview() {
    const { data } = await api('trending/movie/day');

    const movies = data.results;

    console.log({ data, movies});

    createMovie(movies, trendingMoviesPreviewList);
}

async function getCategoriesPreview() {
    const { status, data } = await api('genre/movie/list');

    const categories = data.genres;

    console.log({ data, categories});

    createCategory(categories, categoriesPreviewList);

};

async function getMoviesByCategory(id) {
    const { data } = await api('discover/movie?with_genres', {
        params: {
            'with_genres': id,
        },
    });

    const movies = data.results;

    console.log({ data, movies});

    createMovie(movies, genericSection);

}

async function getMoviesBySearch(query) {
    const { data } = await api('search/movie', {
        params: {
            query
        },
    });

    const movies = data.results;

    console.log({ data, movies});

    createMovie(movies, genericSection);

}
