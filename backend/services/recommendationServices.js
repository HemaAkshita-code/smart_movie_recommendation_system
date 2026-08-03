
const llmService = require('./llmServices');
const UserTasteGraph = require('../models/userTastegraph');
const MovieFeatureGraph = require('../models/movieFeatureModel');
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
    const movieFeature = await MovieFeatureGraph.findOne({ movie: movieID });
    const userTasteFeature = await UserTasteGraph.findOne({ user: userID });

    const movieText = preprocess.graphToText(movieFeature.features);
    const userTasteText = preprocess.graphToText(userTasteFeature);

    const embeddingA = await llmService.createEmbedding(movieText);
    const embeddingB = await llmService.createEmbedding(userTasteText);
    return cosineSimilarity(embeddingA, embeddingB);
}

async function comedySimilarity(movieID, userID) 
{
    const movieFeature = await MovieFeatureGraph.findOne({ movie: movieID });
    const userTasteFeature = await UserTasteGraph.findOne({ user: userID });

    try
    {
        const movieText = preprocess.graphToText(movieFeature.features.comedy);
        const userTasteText = preprocess.graphToText(userTasteFeature);

        const embeddingA = await llmService.createEmbedding(movieText);
        const embeddingB = await llmService.createEmbedding(userTasteText);
        return cosineSimilarity(embeddingA, embeddingB);
    }
    catch (error) {
        console.error("Error occurred while calculating comedy similarity:", error);
        throw error;
    }
    
}

async function actionSimilarity(movieID, userID) 
{
    const movieFeature = await MovieFeatureGraph.findOne({ movie: movieID });
    const userTasteFeature = await UserTasteGraph.findOne({ user: userID });

    try
    {
        const movieText = preprocess.graphToText(movieFeature.features.action);
        const userTasteText = preprocess.graphToText(userTasteFeature);

        const embeddingA = await llmService.createEmbedding(movieText);
        const embeddingB = await llmService.createEmbedding(userTasteText);
        return cosineSimilarity(embeddingA, embeddingB);
    }
    catch (error) {
        console.error("Error occurred while calculating action similarity:", error);
        throw error;
    }
}

async function storySimilarity(movieID, userID) 
{
    const movieFeature = await MovieFeatureGraph.findOne({ movie: movieID });
    const userTasteFeature = await UserTasteGraph.findOne({ user: userID });

    try
    {
        const movieText = preprocess.graphToText(movieFeature.features.story);
        const userTasteText = preprocess.graphToText(userTasteFeature);

        const embeddingA = await llmService.createEmbedding(movieText);
        const embeddingB = await llmService.createEmbedding(userTasteText);
        return cosineSimilarity(embeddingA, embeddingB);
    }
    catch (error) {
        console.error("Error occurred while calculating story similarity:", error);
        throw error;
    }
}

async function themeSimilarity(movieID, userID) 
{
    const movieFeature = await MovieFeatureGraph.findOne({ movie: movieID });
    const userTasteFeature = await UserTasteGraph.findOne({ user: userID });

    try
    {
        const movieText = preprocess.graphToText(movieFeature.features.theme);
        const userTasteText = preprocess.graphToText(userTasteFeature);

        const embeddingA = await llmService.createEmbedding(movieText);
        const embeddingB = await llmService.createEmbedding(userTasteText);
        return cosineSimilarity(embeddingA, embeddingB);
    }
    catch (error) {
        console.error("Error occurred while calculating theme similarity:", error);
        throw error;
    }
}

async function genreSimilarity(movieID, userID) 
{
    const movieFeature = await MovieFeatureGraph.findOne({ movie: movieID });
    const userTasteFeature = await UserTasteGraph.findOne({ user: userID });

    try
    {
        const movieText = preprocess.graphToText(movieFeature.features.genre);
        const userTasteText = preprocess.graphToText(userTasteFeature);

        const embeddingA = await llmService.createEmbedding(movieText);
        const embeddingB = await llmService.createEmbedding(userTasteText);
        return cosineSimilarity(embeddingA, embeddingB);
    }
    catch (error) {
        console.error("Error occurred while calculating genre similarity:", error);
        throw error;
    }
}

async function musicSimilarity(movieID, userID) 
{
    const movieFeature = await MovieFeatureGraph.findOne({ movie: movieID });
    const userTasteFeature = await UserTasteGraph.findOne({ user: userID });

    try
    {
        const movieText = preprocess.graphToText(movieFeature.features.music);
        const userTasteText = preprocess.graphToText(userTasteFeature);

        const embeddingA = await llmService.createEmbedding(movieText);
        const embeddingB = await llmService.createEmbedding(userTasteText);
        return cosineSimilarity(embeddingA, embeddingB);
    }
    catch (error) {
        console.error("Error occurred while calculating music similarity:", error);
        throw error;
    }
}

async function endingSimilarity(movieID, userID) 
{
    const movieFeature = await MovieFeatureGraph.findOne({ movie: movieID });
    const userTasteFeature = await UserTasteGraph.findOne({ user: userID });

    try
    {
        const movieText = preprocess.graphToText(movieFeature.features.ending);
        const userTasteText = preprocess.graphToText(userTasteFeature);

        const embeddingA = await llmService.createEmbedding(movieText);
        const embeddingB = await llmService.createEmbedding(userTasteText);
        return cosineSimilarity(embeddingA, embeddingB);
    }
    catch (error) {
        console.error("Error occurred while calculating ending similarity:", error);
        throw error;
    }
}

async function directionSimilarity(movieID, userID) 
{
    const movieFeature = await MovieFeatureGraph.findOne({ movie: movieID });
    const userTasteFeature = await UserTasteGraph.findOne({ user: userID });

    try
    {
        const movieText = preprocess.graphToText(movieFeature.features.direction);
        const userTasteText = preprocess.graphToText(userTasteFeature);

        const embeddingA = await llmService.createEmbedding(movieText);
        const embeddingB = await llmService.createEmbedding(userTasteText);
        return cosineSimilarity(embeddingA, embeddingB);
    }
    catch (error) {
        console.error("Error occurred while calculating direction similarity:", error);
        throw error;
    }
}

module.exports = {cosineSimilarity, overallSimilarity, comedySimilarity, actionSimilarity, storySimilarity, themeSimilarity, genreSimilarity, musicSimilarity, directionSimilarity};