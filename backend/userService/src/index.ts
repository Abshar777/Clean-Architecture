import "reflect-metadata"
import express from 'express'
import {config} from "dotenv"
import dbConnect from './database/dbConnect';
import { errorHandler, notFound } from './infrastructure/middleware/errorMiddilware';
import router from './infrastructure/routes/userRoute';
import cookieParser from "cookie-parser"

config()
dbConnect();



const app=express();
const port=process.env.PORT || 3000;
const apiRoot=process.env.API_ROOT || '/api'


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser())
app.use(apiRoot,router)
app.use(notFound);
app.use(errorHandler);


app.listen(port,()=>{
    console.log('user service running on '+port);
})

