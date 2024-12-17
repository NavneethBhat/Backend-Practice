// const app=express();
// import express from "express";

// import dotenv from "dotenv";
// import { connectDB } from "./src/helper/dbConnection.js";
// dotenv.config();

// const PORT=process.env.PORT;

// app.use(express.json());
// app.use(express.urlencoded({extended:true}));
// connectDB();

// app.listen(PORT,()=>{
//     console.log("Server is running on port:", PORT);
// })

import { Router } from "express";
import express from "express";
import { connectDB } from "./src/helper/dbConnection.js";
import routes from "./router.js";
import dotenv from "dotenv";
const app = express();
// const router=Router();

dotenv.config();
console.log(process.env.PORT);

const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
connectDB();

routes(app);

app.listen(PORT, () => {
  console.log("Server listing on PORT:", PORT);
});
