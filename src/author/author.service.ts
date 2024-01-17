import prisma from "../utils/db.server";

export type Author = {
    id: number;
    firstName: string;
    lastName: string;
    createdAt?: Date
}

export const listAuthors = async ():Promise <Author[]> =>{
    return prisma.author.findMany({
        select:{
            id: true,
            firstName: true,
            lastName: true,
            createdAt:true
        }
    })
}
export const listAuthorById = async (id : number):Promise <Author | null> =>{
    return prisma.author.findUnique({
        where:{
            id
        }
    })
}
export const createAuthor = async (author: Omit <Author, "id">):Promise <Author> =>{
    const {firstName, lastName} = author;
    return prisma.author.create({
        data:{
            firstName,
            lastName
        }
    })
}
export const updateAuthor = async (author: Omit <Author, "id">, id: number):Promise <Author> =>{
    const {firstName, lastName} = author;
    return prisma.author.update({
        where:{
            id
        },
        data:{
            firstName,
            lastName
        }
    })
}
export const deleteAuthorById = async (id : number):Promise <void> =>{
    await prisma.author.delete({
        where:{
            id
        }
    })
}