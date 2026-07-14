
const UserTasteGraph = require('../models/userTastegraph');
const Movie = require('../models/movies');


async function updateTasteGraph(userId, movieId, action, rating = null, review = null)
{
    const userPreferences = await UserTasteGraph.findOneById(userId);
    const movie = await Movie.findOne({ user: userId });

    const weight = {
        search: 1,
        watch: 5,
        rating: 2,
        review: 2,
        rewatch: 2
    }[action];

    if(action === 'rating')
    {
        switch(rating)
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

    for (const genre of movie.genres)
    {
        userPreferences.genres.set(
            genre,
            (userPreferences.genres.get(genre) || 0) + weight
        );
    }

    for (const actor of movie.actors)
    {
        userPreferences.actors.set(
            actor,
            (userPreferences.actors.get(actor) || 0) + weight
        );
    }

    graph.directors.set(
        movie.director,
        (userPreferences.directors.get(movie.director) || 0) + weight
    );

    await graph.save();
}

