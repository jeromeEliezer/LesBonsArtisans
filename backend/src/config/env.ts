import dotenv from 'dotenv';
dotenv.config();

const config = {
    front_end_url: process.env.FRONT_END,
    app_port:Number(process.env.PORT) ,
    mongo_uri : String(process.env.MONGODB_URL)
}

export default config;