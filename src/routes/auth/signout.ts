import express from "express";

const signoutRouter = express.Router();

signoutRouter.get("/", (req, res) => {
  req.session = null;

  res.send({});
});

export { signoutRouter };
