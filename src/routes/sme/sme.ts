import { Router } from "express";
import {
  Create__USER__POST,
  Fetch__USERS__GET
} from "../../controllers/User-Controller";
import {
  Create__SME__POST,
  Fetch__SME__GET,
  Create__SME_REQUEST__POST
} from "../../controllers/SME-Controller";
import { query, validationResult, body } from "express-validator";

let organizationRouter = Router();

organizationRouter.get("/", Fetch__SME__GET);

organizationRouter.post(
  "/",
  [
    body("name", "Organization name is required").notEmpty(),
    body("address", "Organization address is required").notEmpty(),
    body("token", "Organization access token is required").notEmpty()
  ],
  Create__SME__POST
);

organizationRouter.post(
  "/request",
  [
    body("name", "Organization name is required").notEmpty(),
    body("address", "Organization address is required").notEmpty(),
    body("token", "Organization access token is required").notEmpty()
  ],
  Create__SME_REQUEST__POST
);

// organizationRouter.put("/", Create__USER__POST);

export default organizationRouter;
