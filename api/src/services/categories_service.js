const getAll = async function () {
    const dto = [
        "business",
        "entertainment",
        "general",
        "health",
        "science",
        "sports",
        "technology"
    ];

    return dto;
}

module.exports = {
    getAll
};