
function graphToText(graph) {
    let text = "";

    for (const [category, value] of Object.entries(graph)) {

        if (value.liked) {
            for (const item of value.liked) {
                text += `${category}: likes ${item.feature}. Reason: ${item.reason}. `;
            }
        }

        if (value.disliked) {
            for (const item of value.disliked) {
                text += `${category}: dislikes ${item.feature}. Reason: ${item.reason}. `;
            }
        }
    }

    return text.trim();
}

module.exports = { graphToText };