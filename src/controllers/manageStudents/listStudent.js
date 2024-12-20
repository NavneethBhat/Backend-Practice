import { response, Router } from "express";
const router = Router();
import studentModel from "../../models/studentModel.js";
import RESPONSE from "../../config/Global.js";
import { send, setErrorsRes } from "../../helper/responseHelper.js";
import { STATE } from "../../config/Constants.js";
import validator from "validator";

router.post("/", async (req, res) => {
  try {
    return send(res, RESPONSE.SUCCESS);
  } catch (error) {
    console.log(error);
    return send(res, RESPONSE.ERROR);
  }
});

export default router;
