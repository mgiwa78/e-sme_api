import express from "express";
import { currentUser } from "../../middleware/current-user";

const currentuserRouter = express.Router();

currentuserRouter.get("/", currentUser, (req, res) => {
  res.send({ currentUser: req.currentUser || null });
});

export { currentuserRouter };
