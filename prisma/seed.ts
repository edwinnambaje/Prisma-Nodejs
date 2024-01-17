import prisma from "../src/utils/db.server";


type Author = {
    firstName : string;
    lastName :string
}

type Book = {
    title : string;
    isFiction: boolean;
    datePublished :Date;
}

async function seed(){
    await Promise.all(
        getAuthors().map((author)=>{
            return prisma.author.create({
                data:{
                    firstName : author.firstName,
                    lastName : author.lastName
                }
            })
        }));
        const author = await prisma.author.findFirst({
            where:{
                firstName: "John"
            }
        })
        if (!author) {
            console.error("Author 'John' not found.");
            return;
        }
        await Promise.all(
            getBooks().map((book)=>{
                const { title, isFiction, datePublished} = book
                return prisma.book.create({
                    data:{
                        title,
                        isFiction,
                        datePublished,
                        authorId : author.id,
                    }
                })
            }));
    }

seed()

function getAuthors(): Array<Author>{
    return [
        {
            firstName : "John",
            lastName :"Edwin"
        },
        {
            firstName : "William",
            lastName :"Saliba"
        },
        {
            firstName : "Alpha",
            lastName :"Comedian"
        }
    ]
}
function getBooks(): Array<Book>{
    return [
        {
            title : "Sapiens",
            isFiction : false,
            datePublished : new Date()
        },
        {
            title : "Homo Deus",
            isFiction : false,
            datePublished : new Date()
        },
        {
            title : "The ugly Ducking",
            isFiction : false,
            datePublished : new Date()
        },
    ]
}