import express,{Request, Response} from 'express';
import { body, validationResult } from 'express-validator';

import * as BookService from './book.service';

export class BookController{
    static async createBook(req:Request, res:Response){
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return res.status(400).json({
                    errors: errors.array()
                })
            }
            const book = req.body;
         const books = await BookService.createBook(book);
         return res.status(200).json({
            status:'success',
            books
         })
        } catch (error: any) {
            return res.status(500).json({
                status:'fail',
                message: error.message
             })
        }
    }
    static async updateBook(req:Request, res:Response){
        try {
            const id:number = parseInt(req.params.id)
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return res.status(400).json({
                    errors: errors.array()
                })
            }
            const author = req.body;
         const books = await BookService.updateBook(author,id);
         return res.status(200).json({
            status:'success',
            books
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
         const books = await BookService.listBooks();
         return res.status(200).json({
            status:'success',
            books
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
         const books = await BookService.listBookById(id);
         if(!books){
            return res.status(404).json({
                status:'fail',
                message: 'Book not found'
             })    
         }
         return res.status(200).json({
            status:'success',
            books
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
         const books = await BookService.listBookById(id);
         if(!books){
            return res.status(404).json({
                status:'fail',
                message: 'Book not found'
             })    
         }
        await BookService.deleteBookById(id);
         return res.status(200).json({
            status:'success',
            message: 'Book deleted successfully'
         })
        } catch (error: any) {
            return res.status(500).json({
                status:'fail',
                message: error.message
             })
        }
    }
}