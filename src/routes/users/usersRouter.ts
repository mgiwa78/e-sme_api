import { Router } from "express";
import {
  Create__USER__POST,
  Fetch__USERS__GET
} from "../../controllers/User-Controller";

let userRouter = Router();

userRouter.get("/", Fetch__USERS__GET);

userRouter.post("/", Create__USER__POST);

userRouter.delete("/", (res, req) => {
  console.log(`Auth Route`);
  req.send();
});

userRouter.put("/", Create__USER__POST);

export default userRouter;
