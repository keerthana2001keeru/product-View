const productHandler=require('../helpers/productHelper');
const {upload} = require("../middleware/multer");



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
  module.exports ={
    addProduct,
    getAddProduct,
    adminProduct,
    editProduct,
    editproduct
  }