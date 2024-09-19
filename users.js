import express from "express";
import { getUsers } from "../controllers/user.js";
import { addUser } from "../controllers/user.js";
import { updateUser } from "../controllers/user.js";
import { deleteUser } from "../controllers/user.js";


const router = express.Router();

router.get("/", getUsers);

router.post("/", addUser);

router.put("/:id", updateUser);

router.delete("/:id", deleteUser)

export default router;