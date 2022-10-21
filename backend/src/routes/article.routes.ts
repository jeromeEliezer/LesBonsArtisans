import * as joi from 'joi';
import { Router } from 'express';

import { isValid } from '../helpers/isValid';
import * as articleCtrl from '../controllers/article.controller';

const routerArticle = Router();

routerArticle.get('/articles', articleCtrl.getArticles);

routerArticle.get("/articles/:id", isValid({
    params: joi.object({
        id: joi.number().positive().required(),
    }),
}), articleCtrl.getArticleById);

routerArticle.post('/articles', isValid({
    body: joi.object({
        name: joi.string().required(),
        type: joi.string().required(),
        price: joi.number().positive().min(0),
        rating: joi.number(),
        warranty_years: joi.number(),
        available: joi.boolean(),
    }),
}), articleCtrl.createArticles);

routerArticle.delete("/articles/:id",
    isValid({
        params: joi.object({
            id: joi.string().required(),
        }),
    }),
    articleCtrl.deleteArticle);

routerArticle.put('/articles/:id', isValid({
    params: joi.object({
        id: joi.string().required(),
    }),
    body: joi.object({
        name: joi.string(),
        type: joi.string(),
        price: joi.number(),
        rating: joi.number(),
        warranty_years: joi.number(),
        available: joi.boolean(),
    }),
}), articleCtrl.updateArticle);

export default routerArticle