const Product = require('../models/Product');
const cloudinary = require('../config/cloudinary');

// Get all products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json({
      statusCode: 200,
      message: '',
      data: products
    });
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      message: error.message,
      data: null
    });
  }
};

// Get single product
const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({
        statusCode: 404,
        message: 'Product not found',
        data: null
      });
    }
    res.json({
      statusCode: 200,
      message: '',
      data: product
    });
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      message: error.message,
      data: null
    });
  }
};

// Create product
const createProduct = async (req, res) => {
  try {
    const { name, description, price } = req.body;
    const imageFile = req.file;

    if (!imageFile) {
      return res.status(400).json({
        statusCode: 400,
        message: 'Image is required',
        data: null
      });
    }

    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(imageFile.path);

    const product = new Product({
      name,
      description,
      price,
      imageUrl: result.secure_url
    });

    await product.save();

    res.status(201).json({
      statusCode: 201,
      message: 'Product created successfully',
      data: product
    });
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      message: error.message,
      data: null
    });
  }
};

// Update product
const updateProduct = async (req, res) => {
  try {
    const { description } = req.body;
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        statusCode: 404,
        message: 'Product not found',
        data: null
      });
    }

    product.description = description;
    await product.save();

    res.json({
      statusCode: 200,
      message: 'Product updated successfully',
      data: product
    });
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      message: error.message,
      data: null
    });
  }
};

// Delete product
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        statusCode: 404,
        message: 'Product not found',
        data: null
      });
    }

    await product.deleteOne();

    res.json({
      statusCode: 200,
      message: 'Product deleted successfully',
      data: null
    });
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      message: error.message,
      data: null
    });
  }
};

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
}; 