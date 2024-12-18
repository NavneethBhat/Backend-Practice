import { response, Router } from "express";
const router = Router();
import studentModel from "../../models/studentModel.js";
import RESPONSE from "../../config/Global.js";

router.post("/", (req, res) => {
  try {
    const { name, rollno, email } = req.body;

    if (!name || name == undefined) {
      const response = RESPONSE.REQUIRED;
      return res.json({
        code: response.code,
        message: "name" + response.message,
      });
    }

    if (!rollno || rollno == undefined) {
      const response = RESPONSE.REQUIRED;
      return res.json({
        code: response.code,
        message: "rollno" + response.message,
      });
    }

    if (!email || email == undefined) {
      const response = RESPONSE.REQUIRED;
      return res.json({
        code: response.code,
        message: "email" + response.message,
      });
    }

    console.log({ name, rollno, email });

    studentModel.create({
      name: name,
      rollno: rollno,
      email: email,
    });

    res.json(RESPONSE.SUCCESS);
  } catch (error) {
    console.log("Error!");
    res.json(RESPONSE.ERROR);
  }
});

export default router;
