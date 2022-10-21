import { RequestHandler } from "express";

import article from "../models/article";

export const getArticles: RequestHandler = async (req, res, next) => {
    try {
        const articles = await article.find();
        res.json(articles)
    } catch (error) {
        next();
    }
};

export const createArticles: RequestHandler = async (req, res, next) => {
    try {
        const findArticle = await article.findOne(req.body)
        if (findArticle) return res.status(301).json({ message: 'Cette article existe dejà' });
        const data = new article(req.body);
        const savedArticle = await data.save()
        return res.status(201).json(savedArticle);
    } catch (error) {
        return next();
    }
};

export const getArticleById: RequestHandler = async (req, res, next) => {
    try {
        const findArticle = await article.findOne({_id:req.params.id})
        if (!findArticle) return res.status(403).json({ message: "Cette article n'est pas connue ou n'existe pas" });
        return res.status(200).json(findArticle)
    } catch (error) {
        return next();
    }
};

export const updateArticle: RequestHandler = async (req, res, next) => {
    try {
        const findArticle = await article.findOne({_id: req.params.id})
        if (!findArticle) return res.status(403).json({ message: "Cette article n'est pas connue ou n'existe pas" });
        await article.updateOne({_id: req.params.id},{$set: req.body})
        return res.status(200).json({ message: "Votre article a bien été modifié" })
    } catch (error) {
        return next();
    }
};

export const deleteArticle: RequestHandler = async (req, res, next) => {
    try {
        const findArticle = await article.findOne({_id: req.params.id})
        if (!findArticle) return res.status(403).json({ message: "Cette article n'est pas connue ou n'existe pas" });
        const deletedArticle = await article.deleteOne({_id: req.params.id})
        res.json(deletedArticle)
    } catch (error) {
        next();
    }
};