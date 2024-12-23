import { query, response, Router } from "express";
const router = Router();
import studentModel from "../../models/studentModel.js";
import RESPONSE from "../../config/Global.js";
import { send, setErrorsRes } from "../../helper/responseHelper.js";
import { STATE } from "../../config/Constants.js";
import validator from "validator";

router.delete("/", async (req, res) => {
  try {
    let student_id = req.query.student_id;
    let studentData = await studentModel.aggregate([
      {
        $match: { $expr: { $eq: ["$_id", { $toObjectId: student_id }] } },
      },
    ]);
    if (studentData.length === 0) {
      return send(res, setErrorsRes(RESPONSE.NOTFOUND, "Student Data"));
    }
    console.log(studentData);
    return send(res, RESPONSE.SUCCESS);
  } catch (error) {
    console.log(error);
    return send(res, RESPONSE.ERROR);
  }
});

export default router;
