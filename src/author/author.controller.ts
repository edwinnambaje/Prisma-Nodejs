import express,{Request, Response} from 'express';
import { body, validationResult } from 'express-validator';

import * as AuthorService from './author.service';

export class AuthorController{
    static async createAuthor(req:Request, res:Response){
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return res.status(400).json({
                    errors: errors.array()
                })
            }
            const author = req.body;
         const authors = await AuthorService.createAuthor(author);
         return res.status(200).json({
            status:'success',
            authors
         })
        } catch (error: any) {
            return res.status(500).json({
                status:'fail',
                message: error.message
             })
        }
    }
    static async updateAuthor(req:Request, res:Response){
        try {
            const id:number = parseInt(req.params.id)
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return res.status(400).json({
                    errors: errors.array()
                })
            }
            const author = req.body;
         const authors = await AuthorService.updateAuthor(author,id);
         return res.status(200).json({
            status:'success',
            authors
         })
        } catch (error: any) {
            return res.status(500).json({
                status:'fail',
                message: error.message
             })
        }
    }
    static async getAll(req:Request, res:Response){
        try {
         const authors = await AuthorService.listAuthors();
         return res.status(200).json({
            status:'success',
            authors
         })
        } catch (error: any) {
            return res.status(500).json({
                status:'fail',
                message: error.message
             })
        }
    }
    static async getId(req:Request, res:Response){
        try {
         const id:number = parseInt(req.params.id);
         const authors = await AuthorService.listAuthorById(id);
         if(!authors){
            return res.status(404).json({
                status:'fail',
                message: 'Author not found'
             })    
         }
         return res.status(200).json({
            status:'success',
            authors
         })
        } catch (error: any) {
            return res.status(500).json({
                status:'fail',
                message: error.message
             })
        }
    }
    static async deleteId(req:Request, res:Response){
        try {
         const id:number = parseInt(req.params.id);
         const authors = await AuthorService.listAuthorById(id);
         if(!authors){
            return res.status(404).json({
                status:'fail',
                message: 'Author not found'
             })    
         }
        await AuthorService.deleteAuthorById(id);
         return res.status(200).json({
            status:'success',
            message: 'Author deleted successfully'
         })
        } catch (error: any) {
            return res.status(500).json({
                status:'fail',
                message: error.message
             })
        }
    }
}