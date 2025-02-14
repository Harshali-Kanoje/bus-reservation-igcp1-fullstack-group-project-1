import mongoose from "mongoose";
import express from "express";
import dotenv from 'dotenv';
dotenv.config();
import User from "./src/Model/User.js";
import Book from "./src/Model/Book.js"

import {postApiSearch,getSearchApi,postSearchBuses,getSearchBuses}from "./src/controlers/search.js"
import { PostApiV1Blogs , GetApiV1Blogs } from "./src/controlers/Blog.js";

import path from 'path';
const __dirname = path.resolve();

const app = express();
app.use(express.json());

const connectDB = async () => {
    const connection = await mongoose.connect(process.env.MONGODB_URL);

    if (connection) {
        console.log('MongoDB Connected....💖')
    }
}
connectDB();

app.post('/signup', async (req, res) => {
    const { name, email, password, mobile, address, gender } = req.body

    const user = new User({
        name: name,
        email: email,
        password: password,
        mobile: mobile,
        address: address,
        gender: gender
    })

    try {
        const saveduser = await user.save();

        res.json({
            success: true,
            data: saveduser,
            message: "Congratulations! Signup Successfully"
        })
    }

    catch (e) {
        res.json({
            success: false,
            message: e.message
        })
    }
})

app.post('/api/book', async (req, res) => {

    const { name, price, category, productImg } = req.body

    const newBook= new Book({
        name, price, category, productImg
    })


    try {
        const savedBook= await newBook.save()

        return res.json({
            data: savedBook,
            success: true,
            message: "Booking added"
        })
    }
    catch (e) {
        return res.json(
            {
                message: (e.message)
            }
        )
    }
})
// get all products
app.get('/api/book', async (req, res) => {

    const book = await Book.find();

    res.json({
        success: true,
        data: book,
        message: "all fetched successfuly"

    })
})


//get data by id 

app.get('/api/book/:_id',async(req,res)=>{

    const{ _id }= req.params
    
    const findOneBook = await Book.findOne({ _id:_id} )

    res.json({
        data:findOneBook,
        message:"fetch product successfully"
    })


})

app.post('/login', async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.json({
            success: false,
            message: "Email and Password is required"
        })
    }

    const user = await User.findOne({
        email: email,
        password: password
    }).select(" name email mobile")

    if (user) {
        res.json({
            success: true,
            data: user,
            message: "Login Successfully"
        })
    } else {
        res.json({
            success: false,
            message: "Invalid Credentials"
        })
    }
})

app.post('/api/searchbuses',postSearchBuses)

app.get('/api/searchbuses' ,getSearchBuses)

app.post("/api/v1/blogs" , PostApiV1Blogs)
app.get("/api/v1/blogs" , GetApiV1Blogs)

app.post("/api/search" , postApiSearch)
app.get("/api/search" , getSearchApi)

const PORT = process.env.PORT || 5000;


if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '..', 'client', 'build')));
  
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '..' , 'client', 'build', 'index.html'))
    });
  }

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})