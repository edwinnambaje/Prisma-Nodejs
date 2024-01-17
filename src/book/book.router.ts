import { Router } from "express";
import { body } from "express-validator";
import { BookController } from "./book.controller";

const bookRouter = Router();

bookRouter.post(
  "/create",
  body("title").isString(),
  body("authorId").isInt(),
  body("datePublished").isDate(),
  body("isFiction").isBoolean(),
  BookController.createBook
);
bookRouter.put(
  "/update/:id",
  body("title").isString(),
  body("authorId").isInt(),
  body("datePublished").isDate(),
  body("isFiction").isBoolean(),
  BookController.updateBook
);
bookRouter.get("/all", BookController.getAll);
bookRouter.get("/:id", BookController.getId);
bookRouter.delete("/:id", BookController.deleteId);

export default bookRouter;
