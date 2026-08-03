    const Groq = require("groq-sdk");

    const groq = new Groq({
        apiKey: process.env.GROQ_API_KEY
    });

    const { GoogleGenAI } = require("@google/genai");

    const ai = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY
    });

   async function reviewAnalyser(review) {

    const chatCompletion = await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [
            {
                role: "user",
                content: `
                            You are an expert in understanding movie preferences.

                            Your task is NOT to summarize the movie.

                            Instead, infer the USER'S PERSONAL TASTE from their review.

                            Return ONLY valid JSON.

                            Review: ${review}

                            Rules:

                            1. Extract every movie preference the user expresses.
                            2. Group preferences under appropriate categories.
                            3. Each preference must contain:
                            - feature
                            - reason
                            - confidence
                            4. Confidence must be between 0 and 1.
                            5. Do not invent preferences.
                            6. If the review doesn't mention a category, omit it.
                            7. Keep feature names short (2-5 words).
                            8. Keep reasons concise (one sentence).
                            9. Do not output Markdown.
                            10. Return ONLY valid JSON.

                            Possible categories include (but are not limited to):

                            - Comedy
                            - Action
                            - Story
                            - Acting
                            - Direction
                            - Music
                            - Soundtrack
                            - Cinematography
                            - Visual Effects
                            - Dialogue
                            - Characters
                            - Villain
                            - Romance
                            - Horror
                            - Thriller
                            - Mystery
                            - Sci-Fi
                            - Fantasy
                            - Drama
                            - Animation
                            - Emotion
                            - Pacing
                            - Ending
                            - World Building
                            - Screenplay
                            - Editing

                            Required JSON format:

                            {
                                "<Category>": 
                                {
                                    "liked": [
                                        {
                                            "feature": "",
                                            "reason": "",
                                            "confidence": confidence percentage(eg : 0.92)
                                        }
                                    ],
                                    "disliked": [
                                        {
                                            "feature": "",
                                            "reason": "",
                                            "confidence": confidence percentage(eg : 0.94)
                                        }
                                    ]
                                }
                            }
    `
            }
        ]
    });

    return await chatCompletion.choices[0].message.content;

}

async function extractMovieFeatures(movieText) {

    const extractMovieFeatures = await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [
            {
                role: "user",
                content: `
                            You are a movie analyst.

Analyze the movie using:

- title
- genres
- overview
- tagline
- cast
- director
- keywords
- Comedy
- Action
- Story
- Acting
- Direction
- Music
- Soundtrack
- Cinematography
- VisualEffects
- Dialogue
- Characters
- Romance
- Horror
- Thriller
- Mystery
- SciFi
- Fantasy
- Drama
- Animation
- Emotion
- Pacing
- Ending
- WorldBuilding
- Screenplay
- Editing

Return ONLY JSON.

Extract features that describe WHY someone would enjoy this movie.

Each category should contain

liked
feature
strength (0-1)

Example

{
    "Comedy": {
        "liked":[
            {
                "feature":"dark humor",
                "strength":0.91
            },
            {
                "feature":"satire",
                "strength":0.83
            }
        ]
    },

    "Action":{
        "liked":[
            {
                "feature":"martial arts",
                "strength":0.92
            }
        ]
    },

    "Story":{
        "liked":[
            {
                "feature":"time travel",
                "strength":0.88
            }
        ]
    },

    "Emotion":{
        "liked":[
            {
                "feature":"heartwarming",
                "strength":0.80
            }
        ]
    }
}`
            }
        ]
    });

    return await extractMovieFeatures.choices[0].message.content;
}

async function createEmbedding(text) {
    const response = await ai.models.embedContent({
        model: "gemini-embedding-001",
        contents: text
    });

    return response.embeddings[0].values;
}

module.exports = { reviewAnalyser, extractMovieFeatures, createEmbedding };