    const Groq = require("groq-sdk");

    const groq = new Groq({
        apiKey: process.env.GROQ_API_KEY
    });

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

    console.log(chatCompletion.choices[0].message.content);