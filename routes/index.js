const express = require('express');
const navController = require('../controllers/navController');
const productController = require('../controllers/productController');
const projectController = require('../controllers/projectController');
const certificateController = require('../controllers/certificateController');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const { catchErrors } = require('../handlers/errorHandlers');

const router = express.Router();

// navbar
router.get('/', navController.home);
router.get('/home', catchErrors(navController.home));
router.get('/about-us', navController.aboutUs);
router.get('/support', navController.support);
router.get('/support/team', authController.isLoggedIn, navController.team);
router.get('/contact', navController.contact);
router.post(
  '/query',
  catchErrors(navController.queryValidate),
  catchErrors(navController.query)
);

// products
router.get(
  '/add-product',
  authController.isLoggedIn,
  productController.addProduct
);
router.post(
  '/add-product',
  productController.multer,
  catchErrors(productController.save),
  catchErrors(productController.createProduct)
);
router.get('/products', catchErrors(productController.getProductsByType));
router.get('/products/:type', catchErrors(productController.getProductsByType));
router.get('/product/:slug', catchErrors(productController.getProductBySlug));
router.get('/download/:brochure', productController.downloadBrochure);
router.get('/products/:id/edit', catchErrors(productController.editProduct));
router.post(
  '/add-product/:id',
  productController.multer,
  catchErrors(productController.save),
  catchErrors(productController.updateProduct)
);

// gallery
router.get(
  '/add-project',
  authController.isLoggedIn,
  projectController.addProject
);
router.post(
  '/add-project',
  projectController.multer,
  catchErrors(projectController.save),
  catchErrors(projectController.createProject)
);
router.get('/gallery', catchErrors(projectController.getProjectsByType));
router.get('/gallery/:type', catchErrors(projectController.getProjectsByType));
router.get('/projects/:id/edit', catchErrors(projectController.editProject));
router.post(
  '/add-project/:id',
  projectController.multer,
  catchErrors(projectController.save),
  catchErrors(projectController.updateProject)
);

// support/certificates
router.get('/support/certificates', certificateController.getCertificates);
router.get(
  '/add-certificate',
  authController.isLoggedIn,
  certificateController.addCertificate
);
router.post(
  '/add-certificate',
  certificateController.multer,
  catchErrors(certificateController.save),
  catchErrors(certificateController.createCertificate)
);
router.get(
  '/certificates/:id/edit',
  catchErrors(certificateController.editCertificate)
);
router.post(
  '/add-certificate/:id',
  certificateController.multer,
  catchErrors(certificateController.save),
  catchErrors(certificateController.updateCertificate)
);

// user
router.get('/register', userController.registerForm);
router.post(
  '/register',
  userController.validateRegister, // 1. Validate the registration data
  catchErrors(userController.register), // 2. Register the user
  authController.login // 3. Log them in
);
router.get('/login', userController.loginForm);
router.post('/login', authController.login);
router.get('/logout', authController.logout);
router.get('/account', userController.account);
router.post('/account', catchErrors(userController.updateAccount));
router.post('/account/forgot', catchErrors(authController.forgot));
router.get('/account/reset/:token', catchErrors(authController.reset));
router.post(
  '/account/reset/:token',
  authController.confirmPasswords,
  catchErrors(authController.update)
);

module.exports = router;
