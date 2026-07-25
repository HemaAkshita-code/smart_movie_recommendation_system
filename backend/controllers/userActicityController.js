
const userActivityServices = require("../services/userActivityServices");

function updateWatchHistory(req, res, next)
{
    if(req.params.movie && req.params.movie.trim())
    {
        try
        {
            const movie = await userActivityServices.getMovieByName(req.params.movie);
            await userActivityServices.updateWatchHistory(req.params.userid, movie);
        }
        catch(err)
        {
            return res.status(400).json({ error: err.message });
        }
    }

    return res.status(400).json({error : "Incorrect Movie Title"});
}