
const userActivityServices = require("../services/userActivityServices");

async function updateWatchHistory(req, res, next)
{
    if (req.params.movie && req.params.movie.trim())
    {
        try
        {   
            const movie = await userActivityServices.getMovieByName(req.params.movie);
            if (!movie) {
                return res.status(404).json({ error: "Movie not found" });
            }
            await userActivityServices.updateWatchHistory(req.params.userid, movie);
            await userActivityServices.updateWatchList(req.params.userid, movie);
            return res.json({ message: "Watch history updated successfully" });
        }
        catch(err)
        {
            return res.status(400).json({ error: err.message });
        }
    }

    return res.status(400).json({error : "Incorrect Movie Title"});
}