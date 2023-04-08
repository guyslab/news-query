const categoriesService = require('../services/categories_service');

const get = async function (req, res) {
    let categories;
    try {
        categories = await categoriesService.getAll();
    } catch (error) {
        console.error(error);
        res.status(500).end(`Error getting news categories`);
    }

    res.status(200).json({categories});
}
module.exports = {
    get
};