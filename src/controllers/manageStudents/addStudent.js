import { Router } from "express";
const router = Router();

router.post("/", (req, res) => {
  try {
    const { name, rollno, email } = req.body;
    console.log({ name, rollno, email });

    res.json({
      responseMessage: "All Good",
    });
  } catch (error) {
    console.log(error);
  }
});

export default router;
