import validator from 'validator';
import bcrypt from 'bcryptjs';
import session from 'express-session';
// import { mongoose } from "../db/db.js";
import jwt from "jsonwebtoken";

import env from "dotenv";
env.config();

import mongoose from "mongoose";

mongoose.set('strictQuery', false);
//Set up default mongoose connection

const DB = "mongodb+srv://kartikhatwar98:9371865060k@cluster0.w3714lm.mongodb.net/Text-Tools?retryWrites=true&w=majority";

mongoose.connect(DB, { useNewUrlParser: true }).then(()=>{
    // console.log('Connected');
})

const userSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true,
    },
    email :{
        type: String,
        required : true,
        unique: true,

        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email Id is not Valid');
            }
        }
    },
    contact : {
        type : String,
        unique : true,
        minLength : [10,"********Invalid Contact"]
    },
    password : {
        type : String,
        required : true,
        minLength : [6,"********Password should be of minimum 8 Letters"]
    }
});

userSchema.methods.generateAuthToken = async function(){
    try {
        const gentoken = await jwt.sign({email :this.email},"Text-Tools_secret_key_CreatedBy_Kartik_Hatwar_for_registered_users");
        return gentoken;

    } catch (error) {
        console.log('i am sending error ' ,error);
        return error;
    }
}

// Hashing Password for security
userSchema.pre("save", async function (next){

    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password,10);
    }
    next();

})

export const User = new mongoose.model("User",userSchema);