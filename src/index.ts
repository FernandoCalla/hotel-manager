import "reflect-metadata"
import * as dotenv from 'dotenv' 
import path from "path"
// dotenv.config({path: path.resolve(__dirname, process.env.NODE_ENV + '.env')});
dotenv.config()
import app from "./app"
import {AppDataSource} from './Utils/db'

async function main(){
    try{
        await AppDataSource.initialize()  
        console.log("Database connected")  
        app.listen(process.env.PORT)
        console.log('Server is listening on port',process.env.PORT)
    }catch(error){
        console.error(error)
    }
}

main()
