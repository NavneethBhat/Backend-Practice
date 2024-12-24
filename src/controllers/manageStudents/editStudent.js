import { query, response, Router } from "express";
const router = Router();
import studentModel from "../../models/studentModel.js";
import RESPONSE from "../../config/Global.js";
import { send, setErrorsRes } from "../../helper/responseHelper.js";
import { STATE } from "../../config/Constants.js";
import validator from "validator";

router.put("/", async (req, res) => {
  try {
    let student_id = req.query.student_id;
    let { name, email, rollno } = req.body;
    let updates = {};

    if (!student_id || student_id == undefined) {
      return send(res, setErrorsRes(RESPONSE.REQUIRED, "Student ID"));
    }
    let studentData = await studentModel.aggregate([
      {
        $match: {
          $expr: { $eq: ["$_id", { $toObjectId: student_id }] },
          isactive: STATE.ACTIVE,
        },
      },
    ]);
    if (studentData.length === 0) {
      return send(res, setErrorsRes(RESPONSE.NOTFOUND, "Student Data"));
    }
    // console.log(studentData);

    if (name && name != undefined) {
      updates.name = name;
    }

    if (rollno && rollno != undefined) {
      let isExist = await studentModel.aggregate([
        {
          $match: {
            rollno: rollno,
            isactive: STATE.ACTIVE,
          },
        },
      ]);
      if (isExist.length > 0) {
        return send(res, setErrorsRes(RESPONSE.ALREADY_EXISTS, "rollno"));
      }
      updates.rollno = rollno;
    }

    if (email && email != undefined) {
      let isEmail = validator.isEmail(email);
      if (!isEmail) {
        return send(res, setErrorsRes(RESPONSE.INVALIDID, "email"));
      }
      updates.email = email;
    }

    // await studentModel.findByIdAndUpdate(
    //   {
    //     _id: student_id,
    //     isactive: STATE.ACTIVE,
    //   },
    //   {
    //     isactive: STATE.INACTIVE,
    //   }
    // );

    return send(res, RESPONSE.SUCCESS);
  } catch (error) {
    console.log(error);
    return send(res, RESPONSE.ERROR);
  }
});

export default router;
