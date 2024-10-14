const productHandler=require('../helpers/productHelper');
const {upload} = require("../middleware/multer");
const Products=require('../models/productSchema');


const getAddProduct = function (req, res) {
    res.render("addProduct");
  };
  const addProduct = async function (req, res) {
    
    const uploadMiddleware = upload();
  
    uploadMiddleware(req, res, async (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Error uploading file.");
      }
  //console.log("rr",req.body);
  console.log(req.files);
      const fileNames = req.files.map(file=>file.filename);
      const addedProduct = await productHandler.addProduct(req.body, fileNames);
      if (addedProduct) {
        res.redirect("/");
      }
    });
  };
  const adminProduct = async function (req, res) {
    const products = await productHandler.getAllProducts();
    
    // const images = products?.image[0]
    // products.images = images
    res.render("viewProducts", { products: products });
   
  };
  const editproduct = async function (req, res) {
    const proId = req.params.id;
    const product = await productHandler.getProduct(proId);
    res.render("edit-product", { product: product });
  };
  const editProduct = async function (req, res) {
    try {
      const editedProduct = await productHandler.editProduct(
        req.params.id,
        req.body
      );
  
      if (editedProduct) {
        res.redirect("/view-products");
      }
    } catch (err) {
      res.status(404);
      console.log(err);
    }
  };
  const showProduct = async function (req, res) {
    try {
      const keyword = req.query.keyword;
      const category = req.query.category; // Get the category from query params
      const minPrice = req.query.minPrice;
      const maxPrice = req.query.maxPrice;
      const sizes = req.query.sizes;
  
      let filter = {};
  
      if (category) {
        // Add the category filter if it exists
        filter.category = category;
      }
  
      if (keyword) {
        filter.$or = [
          { name: { $regex: new RegExp(keyword, 'i') } },
          { description: { $regex: new RegExp(keyword, 'i') } },
          { category: { $regex: new RegExp(keyword, 'i') } },
        ];
      }
  
      const products = await Products.find(filter).lean();
  
      if (req.xhr) {
        // If it's an AJAX request, return JSON data
        return res.json(products);
      } else {
        // For non-AJAX requests, render the full page
        res.render("shop", { products });
      }
    } catch (error) {
      console.error("Error displaying products:", error);
      res.status(500).json({ message: "Error displaying products." });
    }
  };
  
  module.exports ={
    addProduct,
    getAddProduct,
    adminProduct,
    editProduct,
    editproduct,
    showProduct
  }