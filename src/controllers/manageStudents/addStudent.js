import { response, Router } from "express";
const router = Router();
import studentModel from "../../models/studentModel.js";
import RESPONSE from "../../config/Global.js";
import { send, setErrorsRes } from "../../helper/responseHelper.js";

router.post("/", (req, res) => {
  try {
    const { name, rollno, email } = req.body;

    if (!name || name == undefined) {
      // const response = RESPONSE.REQUIRED;
      // return res.json({
      //   code: response.code,
      //   message: "name" + response.message,
      // });
      return send(res, setErrorsRes(RESPONSE.REQUIRED, "name"));
    }

    if (!rollno || rollno == undefined) {
      // const response = RESPONSE.REQUIRED;
      // return res.json({
      //   code: response.code,
      //   message: "rollno" + response.message,
      // });

      return send(res, setErrorsRes(RESPONSE.REQUIRED, "rollno"));
    }

    if (!email || email == undefined) {
      // const response = RESPONSE.REQUIRED;
      // return res.json({
      //   code: response.code,
      //   message: "email" + response.message,
      // });

      return send(res, setErrorsRes(RESPONSE.REQUIRED, "email"));
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
