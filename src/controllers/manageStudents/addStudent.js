import { response, Router } from "express";
const router = Router();
import studentModel from "../../models/studentModel.js";
import RESPONSE from "../../config/Global.js";
import { send, setErrorsRes } from "../../helper/responseHelper.js";

router.post("/", async (req, res) => {
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

    let isExist = await studentModel.aggregate([
      {
        $match: {
          rollno: rollno,
        },
      },
    ]);

    // let isExist = await studentModel.find({
    //   rollno: rollno,
    // });

    if (isExist.length > 0) {
      return send(res, setErrorsRes(RESPONSE.ALREADY_EXISTS, "rollno"));
    }

    // console.log({ name, rollno, email });
    // studentModel.create({
    //   name: name,
    //   rollno: rollno,
    //   email: email,
    // });

    res.json(RESPONSE.SUCCESS);
    return send(res, RESPONSE.SUCCESS);
  } catch (error) {
    console.log(error);
    // res.json(RESPONSE.ERROR);
    return send(res, RESPONSE.ERROR);
  }
});

export default router;
