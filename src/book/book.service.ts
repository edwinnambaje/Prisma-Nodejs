import { Author } from "../author/author.service";
import prisma from "../utils/db.server";

type Book = {
    id: number;
    title: string;
    datePublished: Date;
    isFiction: boolean;
    author : Author
}
type BookRead = {
    id: number;
    title: string;
    datePublished: Date;
    isFiction: boolean;
    authorId: number
}

export const listBooks = async ():Promise <Book[]> =>{
    return prisma.book.findMany({
        select:{
            id: true,
            title: true,
            datePublished : true,
            isFiction:true,
            author:{
                select:{
                    id: true,
                    lastName: true,
                    firstName: true
                }
            }
        }
    })
}
export const listBookById = async (id : number):Promise <Book | null> =>{
    return prisma.book.findUnique({
        where:{
            id
        },
        select:{
            id: true,
            title: true,
            datePublished : true,
            isFiction:true,
            author:{
                select:{
                    id: true,
                    lastName: true,
                    firstName: true
                }
            }
        }
    })
}
export const createBook = async (book : BookRead):Promise <Book> =>{
    const { title, isFiction, datePublished, authorId} = book;
    const parsedDate:Date= new Date(datePublished)
    return prisma.book.create({
        data:{
            title,
            isFiction,
            authorId,
            datePublished: parsedDate
        },
        select:{
            id: true,
            title: true,
            datePublished : true,
            isFiction:true,
            author:{
                select:{
                    id: true,
                    lastName: true,
                    firstName: true
                }
            }
        }
    })
}
export const updateBook = async (book: BookRead, id: number):Promise <Book> =>{
    const { title, isFiction, datePublished, authorId} = book;
    const parsedDate:Date= new Date(datePublished)
    return prisma.book.update({
        where:{
            id
        },
        data:{
            title,
            isFiction,
            authorId,
            datePublished: parsedDate
        },
        select:{
            id: true,
            title: true,
            datePublished : true,
            isFiction:true,
            author:{
                select:{
                    id: true,
                    lastName: true,
                    firstName: true
                }
            }
        }
    })
}
export const deleteBookById = async (id : number):Promise <void> =>{
    await prisma.book.delete({
        where:{
            id
        }
    })
}