const express=require('express');
const {ProductModel}=require('../model/product.model');
const { CategoryModel } = require('../model/category.model');
const productRoute=express.Router();


// add product into your database
productRoute.post("/addproduct",async(req,res)=>{
    const {product_name,product_price,product_description,availability,categoryName}=req.body
    try {
       // Validate that all required fields are present
        if (!product_name || !product_price || !product_description || availability === undefined || !categoryName) {
          res.status(400).json({ msg: 'All required fields must be provided' });
         }else{

       const data=await CategoryModel.find({name:categoryName});

        // Check if the category exists
         if (data.length === 0) {
          res.status(404).json({ msg: 'Category not found' });
         }else{
         // creating instance with given data through ProductModel
       const newproduct = await new ProductModel({product_name,product_price,product_description,availability,categoryID:data[0]._id});
       newproduct.save() // saving the product instance into db
       res.status(201).send({msg:"Product added!"})
         }
      }
    } catch (error) {
     
    // Handle other errors
    console.error(error);
    res.status(500).send({ msg: 'Internal Server Error' });
  }
    
})

//get product through categoryId

productRoute.get('/getproduct/:Id',async(req,res)=>{
     try {
        let data=await ProductModel.find({categoryID:req.params.Id}) //finding the product into db through id passed into params
        res.status(200).send({msg:data})
     } catch (error) {
        res.status(400).send({msg:error.message});  // capturing error
     }
})


// get product through productID

productRoute.get('/getproductbyid/:productId',async(req,res)=>{
    const {productId}=req.params  // extracting productId from url params
    try {
       let data=await ProductModel.findOne({_id:productId}) // finding product in db
       res.status(200).send({msg:data})  // will send the response
    } catch (error) {
       res.status(400).send({msg:error.message}); // catching the server error
    }
})

// get all the product

productRoute.get('/getproduct',async(req,res)=>{
    
    try {
       let data=await ProductModel.find() // finding all the product in the db
       res.status(200).send({msg:data})   // sending response
    } catch (error) {
       res.status(400).send({msg:error.message});  // catching the error
    }
})


module.exports={productRoute}