function getCosineSimilarity(vector1, vector2) {
    try {
        if (vector1?.length === 0 || vector2?.length === 0) {
            return 0;
        }

        const dotProduct = vector1.reduce(
            (sum, value, index) => sum + value * vector2[index],
            0
        );
        const normVector1 = Math.sqrt(
            vector1.reduce((sum, value) => sum + value ** 2, 0)
        );
        const normVector2 = Math.sqrt(
            vector2.reduce((sum, value) => sum + value ** 2, 0)
        );

        const cosineSimilarity = dotProduct / (normVector1 * normVector2);

        return cosineSimilarity;
    } catch (err) {
        console.error(err);
    }
}

export default getCosineSimilarity;
