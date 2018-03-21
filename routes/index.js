const express = require('express');
const navController = require('../controllers/navController');
const productController = require('../controllers/productController');
const projectController = require('../controllers/projectController');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
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
router.post(
  '/addProduct',
  productController.upload,
  catchErrors(productController.resize),
  catchErrors(productController.createProduct)
);
router.get('/products', catchErrors(productController.getProducts));
router.get('/products/:slug', catchErrors(productController.getProductsByType));
router.get('/products/:id/edit', catchErrors(productController.editProduct));
router.post(
  '/addProduct/:id',
  productController.upload,
  catchErrors(productController.resize),
  catchErrors(productController.updateProduct)
);

// project
router.get('/addProject', projectController.addProject);
router.post(
  '/addProject',
  projectController.upload,
  catchErrors(projectController.resize),
  catchErrors(projectController.createProject)
);
router.get('/projects', catchErrors(projectController.getProjects));
router.get('/projects/:slug', catchErrors(projectController.getProjectsByType));
// TODO
router.get('/projects/:id/edit');
// TODO
router.post('/addProject/:id');

// user
router.get('/login', userController.loginForm);
router.get('/register', userController.registerForm);
router.post(
  '/register',
  userController.validateRegister, // 1. Validate the registration data
  catchErrors(userController.register), // 2. Register the user
  authController.login // 3. Log them in
);

module.exports = router;
