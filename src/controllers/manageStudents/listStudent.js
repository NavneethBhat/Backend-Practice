import { response, Router } from "express";
const router = Router();
import studentModel from "../../models/studentModel.js";
import RESPONSE from "../../config/Global.js";
import { send, setErrorsRes } from "../../helper/responseHelper.js";
import { STATE } from "../../config/Constants.js";
import validator from "validator";

router.get("/", async (req, res) => {
  try {
    let studentData = await studentModel.aggregate([
      {
        $match: {
          isactive: STATE.ACTIVE,
        },
      },
    ]);

    return send(res, RESPONSE.SUCCESS, studentData);
  } catch (error) {
    console.log(error);
    return send(res, RESPONSE.ERROR);
  }
});

export default router;
