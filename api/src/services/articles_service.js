const TOP_HEADLINES_API_BASEURI = process.env.TOP_HEADLINES_API_BASEURI;
const ARTICLE_IMAGE_MOCK_URI = process.env.ARTICLE_IMAGE_MOCK_URI;
const axios = require('axios');

const get = async function (pageNum, pageSize, searchText, category) {
    let url = `${TOP_HEADLINES_API_BASEURI}&page=${pageNum}&pageSize=${pageSize}`;
    if (searchText) url += `&q=${searchText}`;
    if (category) url += `&category=${category}`;

    let response;
    try {
        response = await axios.get(url);
    } catch (err) {
        console.error('HTTP error: ', err.response.status, err.response.statusText, err.message, err.response.headers);
        throw new Error(err.response.statusText);
    }

    const { data } = response;
    const dto = data.articles.map(({title, publishedAt, urlToImage, description, author, content}) => ({
        title,
        published_date: publishedAt,
        image_url: urlToImage || ARTICLE_IMAGE_MOCK_URI,
        description,
        author,
        content
    }))

    return dto;
}

module.exports = {
    get
};