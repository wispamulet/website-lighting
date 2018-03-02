const express = require('express');
const productController = require('../controllers/productController');
const { catchErrors } = require('../handlers/errorHandlers');

const router = express.Router();

// Do work here
router.get('/', productController.index);

router.get('/addProduct', productController.addProduct);
router.post('/addProduct', catchErrors(productController.createProduct));
router.get('/products', productController.getProducts);

module.exports = router;
