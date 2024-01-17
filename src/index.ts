import * as dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import authRouter from './author/author.router';
import bookRouter from './book/book.router';

dotenv.config();

if(!process.env.PORT){
    process.exit(1)
}

const PORT:number = parseInt(process.env.PORT as string, 10)

const app = express();
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use('/authors', authRouter)
app.use('/books', bookRouter)

app.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}`)
})