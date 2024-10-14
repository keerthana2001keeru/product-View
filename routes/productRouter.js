const express=require('express');
const router = express.Router();


const { getAddProduct, addProduct, adminProduct, editproduct, editProduct, showProduct } = require("../controller/productController");


router.get("/",getAddProduct);
router.post("/add-product",addProduct);
router.get("/view-products", adminProduct);
router.get("/editProduct/:id", editproduct);
router.post("/edit_product/:id", editProduct);
router.get("/shop", showProduct);
module.exports= router;