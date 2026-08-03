
const llmService = require('./llmServices');
const UserTasteGraph = require('../models/userTastegraph');
const MovieFetureGraph = require('../models/movieFeaturegraph');
const preprocess = require('./preprocessServices');

function cosineSimilarity(a, b) {

    let dot = 0;

    let normA = 0;

    let normB = 0;

    for(let i=0;i<a.length;i++){

        dot += a[i] * b[i];

        normA += a[i] * a[i];

        normB += b[i] * b[i];

    }

    return dot/(Math.sqrt(normA)*Math.sqrt(normB));
}

async function overallSimilarity(movieID, userID) 
{
    const movieFeature = await MovieFetureGraph.findOne({ movie: movieID });
    const userTasteFeature = await UserTasteGraph.findOne({ user: userID });

    const movieText = preprocess.graphToText(movieFeature);
    const userTasteText = preprocess.graphToText(userTasteFeature);

    const embeddingA = await llmService.createEmbedding(movieText);
    const embeddingB = await llmService.createEmbedding(userTasteText);
    return cosineSimilarity(embeddingA, embeddingB);
}

module.exports = {cosineSimilarity, overallSimilarity };