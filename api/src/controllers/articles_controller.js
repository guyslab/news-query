const articlesService = require('../services/articles_service');

const get = async function (req, res) {
    let articles;
    const pageNum = req.query.page || 1;
    const pageSize = req.query.page_size || 25;
    const searchText = req.query.search_text;
    const category = req.query.category;
    try {
        articles = await articlesService.get(pageNum, pageSize, searchText, category);
    } catch (error) {
        console.error(error);
        res.status(500).end(`Error getting news articles`);
    }

    res.status(200).json({articles});
}
module.exports = {
    get
};