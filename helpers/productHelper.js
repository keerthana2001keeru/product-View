const mongoose = require("mongoose");

const Products=require('../models/productSchema');




module.exports={
addProduct: async function (body,fileNames) {
    const { name, brand, category, price,description, countInStock,color,specification } = body;
    const productAdd = await Products.create({
      name: name,
      brand: brand,
      category: category,
      description: description,
      price: price,
      color:color,
      specification:specification,
      countInStock: countInStock,
      image: fileNames.map(fileName => fileName),
    });
    return productAdd
  },
  getAllProducts:async function(){
    const allproducts= await Products.find().lean();
    return allproducts;
},
getProduct: async function(proId){
  if (mongoose.Types.ObjectId.isValid(proId)) {
    const product=await Products.findOne({_id: new mongoose.Types.ObjectId(proId) }).lean();
    return product;
  }else{
    throw new Error("Invalid Product ID");
}},
editProduct: async function (proId, body) {
  if (mongoose.Types.ObjectId.isValid(proId)) {
    const editProduct = await Products.findByIdAndUpdate(proId, body, {
      new: true,
    });
    return editProduct;
  }else{
    throw new Error("invalid product Id");
  }
  },
  productSearch : async function (keyword) {
    try {
      // Use MongoDB's regex to perform a case-insensitive search in the product name and description fields
      const searchRegex = new RegExp(keyword, 'i');
  
      // Search for products that match the keyword in name, description, or category
      const searchResults = await Products.find({
        $or: [
          { name: { $regex: searchRegex } },
          { description: { $regex: searchRegex } },
          { category: { $regex: searchRegex } },
        ]
      }).lean();
  
      return searchResults;
    } catch (error) {
      console.error("Error searching products:", error);
      return [];
    }
  },

}