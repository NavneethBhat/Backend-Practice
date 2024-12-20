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
        _id: { $expr: [{ $toObjectId: student_id }] },
      },
    ]);

    return send(res, RESPONSE.SUCCESS);
  } catch (error) {
    console.log(error);
    return send(res, RESPONSE.ERROR);
  }
});

export default router;
