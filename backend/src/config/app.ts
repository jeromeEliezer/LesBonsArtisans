
import express from 'express';
import cors from 'cors'
import morgan from 'morgan';

import routerArticle from '../routes/article.routes';
import config  from './env';

import './database';


const app = express()

app.set('port', config.app_port); 

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(routerArticle);   


export default app;