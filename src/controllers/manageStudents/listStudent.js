import { query, response, Router } from "express";
const router = Router();
import studentModel from "../../models/studentModel.js";
import RESPONSE from "../../config/Global.js";
import { send, setErrorsRes } from "../../helper/responseHelper.js";
import { STATE } from "../../config/Constants.js";
import validator from "validator";

router.get("/", async (req, res) => {
  try {
    let student_id = req.query.id;
    let rollno = req.query.rollno;
    let query = {};
    query.isactive = STATE.ACTIVE;
    rollno != undefined ? (query.rollno = rollno) : "";

    let studentData = await studentModel.aggregate([
      {
        $match:
          // rollno: rollno,
          // isactive: STATE.ACTIVE,
          query,
      },
      {
        $match: { $expr: { $eq: ["$_id", { $toObjectId: student_id }] } },
      },
      {
        $project: {
          //   isactive: 0,
          __v: 0,
        },
      },
    ]);

    if (studentData.length === 0) {
      return send(res, setErrorsRes(RESPONSE.NOTFOUND, "Student Data "));
    }

    return send(res, RESPONSE.SUCCESS, studentData);
  } catch (error) {
    console.log(error);
    return send(res, RESPONSE.ERROR);
  }
});

export default router;
