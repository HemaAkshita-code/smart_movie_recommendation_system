
const UserTasteGraph = require('../models/userTastegraph');
const Movie = require('../models/movies');


async function updateTasteGraph(userId, movieId, action, rating = null, review = null)
{
    let userPreferences = await UserTasteGraph.findOne({ user: userId });
    if (!userPreferences) {
        userPreferences = new UserTasteGraph({ user: userId });
    }

    const movie = await Movie.findById(movieId);
    if (!movie) {
        console.error(`[TasteGraph] Movie with ID ${movieId} not found.`);
        return;
    }

    let weight = {
        search: 1,
        watch: 5,
        rating: 2,
        review: 2,
        rewatch: 2
    }[action] || 1;

    if(action === 'rating')
    {
        switch(Number(rating))
        {
            case 1:
                weight *= -2;
                break;
                
            case 2:
                weight *= -1;
                break;

            case 3:
                weight *= 1;
                break;

            case 4:
                weight *= 2;
                break;
            
            case 5:
                weight *= 3;
                break;
        }
    }

    if (movie.genre) {
        for (const genre of movie.genre)
        {
            userPreferences.genres.set(
                genre,
                (userPreferences.genres.get(genre) || 0) + weight
            );
        }
    }

    if (movie.cast) {
        for (const actor of movie.cast)
        {
            userPreferences.actors.set(
                actor,
                (userPreferences.actors.get(actor) || 0) + weight
            );
        }
    }

    if (movie.director) {
        userPreferences.directors.set(
            movie.director,
            (userPreferences.directors.get(movie.director) || 0) + weight
        );
    }

    await userPreferences.save();
}

