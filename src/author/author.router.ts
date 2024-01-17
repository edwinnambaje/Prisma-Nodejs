import { Router } from 'express';
import { body } from 'express-validator';
import { AuthorController } from './author.controller';

const authRouter = Router();

authRouter.post('/create', body("firstName").isString(), body("lastName").isString(),AuthorController.createAuthor);
authRouter.put('/update/:id', body("firstName").isString(), body("lastName").isString(),AuthorController.updateAuthor);
authRouter.get('/all', AuthorController.getAll);
authRouter.get('/:id', AuthorController.getId);
authRouter.delete('/:id', AuthorController.deleteId);

export default authRouter;