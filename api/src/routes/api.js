const express = require('express');
const router = express.Router();
const articlesController = require('../controllers/articles_controller');
const categoriesController = require('../controllers/categories_controller');
const healthcheckController = require('../controllers/healthcheck_controller');

router.get('/healthcheck', healthcheckController.healthcheck);

router.get('/articles', articlesController.get);
router.get('/categories', categoriesController.get);

module.exports = router;