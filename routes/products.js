const express = require('express');
const router = express.Router();
const { 
  getProducts, 
  getProduct, 
  createProduct, 
  updateProduct, 
  deleteProduct 
} = require('../controllers/productController');
const auth = require('../middleware/auth');
const { upload } = require('../config/cloudinary');

// Get all products
router.get('/', getProducts);

// Get single product
router.get('/:id', getProduct);

// Create product (protected)
router.post('/', auth, upload.single('image'), createProduct);

// Update product (protected)
router.put('/:id', auth, updateProduct);

// Delete product (protected)
router.delete('/:id', auth, deleteProduct);

module.exports = router; 