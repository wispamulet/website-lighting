const express = require('express');
const navController = require('../controllers/navController');
const productController = require('../controllers/productController');
const projectController = require('../controllers/projectController');
const { catchErrors } = require('../handlers/errorHandlers');

const router = express.Router();

// navbar
router.get('/', navController.index);
router.get('/home', navController.home);
router.get('/support', navController.support);
router.get('/about-us', navController.aboutUs);
router.get('/contact', navController.contact);

// product
router.get('/addProduct', productController.addProduct);
router.post('/addProduct', catchErrors(productController.createProduct));
router.get('/products', productController.getProducts);
router.get('/products/:id/edit', catchErrors(productController.editProduct));
router.post('/addProduct/:id', catchErrors(productController.updateProduct));

// project
router.get('/addProject', projectController.addProject);
router.post(
  '/addProject',
  projectController.upload,
  catchErrors(projectController.resize),
  catchErrors(projectController.createProject)
);
router.get('/projects', catchErrors(projectController.getProjects));
// editProject
router.post(
  '/addProject/:id',
  projectController.upload,
  catchErrors(projectController.resize),
  catchErrors(projectController.updateProject)
);

module.exports = router;
