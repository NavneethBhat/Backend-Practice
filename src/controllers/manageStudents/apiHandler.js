import { Router } from "express";
const router = Router();
import addStudent from "./addStudent.js";
import listStudent from "./listStudent.js";
import deleteStudent from "./deleteStudent.js";
import editStudent from "./editStudent.js";

router.use("/add", addStudent);
router.use("/list", listStudent);
router.use("/delete", deleteStudent);
router.use("edit", editStudent);

export default router;
