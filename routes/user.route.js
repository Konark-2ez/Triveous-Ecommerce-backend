const express=require('express');
const { UserModel } = require('../model/user.model');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const userRoute=express.Router();



/**
 * @swagger
 * components:
 *   schemas:
 *     userSchema:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *         password:
 *           type: string
 *         Name:
 *           type: string
 */

/**
 * @swagger
 * /user/register:
 *   post:
 *     tags:
 *       - User
 *     summary: Register a new user
 *     description: Register a new user with an email, password, and name.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/userSchema'
 *     responses:
 *       201:
 *         description: User registered successfully.
 *       400:
 *         description: Bad request. All fields (email, password, and name) are required.
 *       409:
 *         description: Conflict. User with the same email already exists.
 *       500:
 *         description: Internal server error. Unable to register the user.
 */


userRoute.post("/register",async(req,res)=>{
    const {name,email,password}=req.body;  
    const user=await UserModel.find({email});  //finding whether user with given email exist or not
    
    if(email&&password&&name){
        try {
        
            if(user.length===0){              //checking if user with given email exist 
                bcrypt.hash(password,5,async(err,hash)=>{  //hashing the password
                    if(err){
                        throw err
                    }
                    let userp=await new UserModel({name,email,password:hash}); //creating a new instance of UserModel
                     userp.save();
                    res.status(201).send({msg:"user registered!"});  //saving the instance into database
                })
            }
            else{
                res.status(409).send({msg:"user already exist please try logging in!"})   //response incase email already registered
            }
        } catch (error) {
            res.status(500).send({msg:"error can't register the user"})    // Internal server error
        }
    }else{
        res.status(400).send({msg:'All fields are required i.e Name,email and password'})  // response if any field is missing. 
    }  
})

/**
 * @swagger
 * /user/login:
 *   post:
 *     tags:
 *       - User
 *     summary: User login
 *     description: Authenticate a user with their email and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful. Returns an access token in the response cookie.
 *       400:
 *         description: Bad request. Both email and password are required for login.
 *       401:
 *         description: Unauthorized. Wrong credentials or user not registered.
 *       500:
 *         description: Internal server error.
 */

userRoute.post("/login",async(req,res)=>{
    const {email,password}=req.body;

    if(email&&password){
        try {
            let user=await UserModel.find({email})
            
            if(user.length>0){  // checking if user with given email is registered or not
                //comparing the hashed password
                bcrypt.compare(password,user[0].password,async(err,result)=>{   
                    if(err)
                    throw err;
                    if(result){
                        // response if email and password are right.
                        const token=jwt.sign({'userID':user[0]._id},process.env.jwt)   // created a jwt token
                        res.cookie("accessToken",token,{maxAge:1000*60*60}) // setting token into the cookie with expire of 1hr
                        res.status(200).send({msg:"sucessfully Login!"})  
                    }else{
                        res.status(401).send({msg:"Wrong credentials"})
                    }
                })
            }else{
                res.status(401).send({msg:"You are not registered.Registered yourself first!"})  // response if user is not registered.
            }
        } catch (error) {
            res.status(400).send({"msg":error.message});
        }
    }else{
        // if email or password is missing

        res.status(400).send({msg:"Both email and password is required for login"})
    }
    
})

/**
 * @swagger
 * /user/logout:
 *   get:
 *     tags:
 *       - User
 *     summary: User logout
 *     description: Clear the access token cookie to log the user out.
 *     responses:
 *       200:
 *         description: Logout successful. Clears the access token cookie.
 */

userRoute.get("/logout",async(req,res)=>{

    // Clear a cookie  
    res.clearCookie('accessToken');
    
    res.status(200).send({msg:"logout successfull!"})
})








module.exports={userRoute}