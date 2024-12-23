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
    console.log(studentData);

    await studentModel.findByIdAndUpdate(
      {
        _id: student_id,
        isactive: STATE.ACTIVE,
      },
      {
        isactive: STATE.INACTIVE,
      }
    );

    return send(res, RESPONSE.SUCCESS);
  } catch (error) {
    console.log(error);
    return send(res, RESPONSE.ERROR);
  }
});

export default router;
