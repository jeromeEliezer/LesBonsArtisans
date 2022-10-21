import mongoose, { ConnectOptions } from "mongoose";

import  config  from "./env";

(async () => {
    try {
        const mongooseOptions: ConnectOptions = {

       }
        await mongoose.connect(config.mongo_uri, mongooseOptions);
        console.log('Mongodb connected')
    } catch (error) {
       console.log(error, "err") 
    }
})()