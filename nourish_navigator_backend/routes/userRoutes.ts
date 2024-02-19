import { Request, Response, Router } from "express";
import { pick } from "lodash";
import { ZodError } from "zod";
import User, {
  validateSignInRequest,
  validateSignUpRequest,
} from "../models/userModel";

const router = Router();

// Sign up api
router.post("/sign-up", async (req: Request, res: Response) => {
  try {
    const userData = validateSignUpRequest(req.body);

    const userRec = await User.findOne({
      email: userData.email,
    });

    if (userRec) {
      return res.status(400).send("User already exists");
    }

    const newUserRec = new User({
      ...userData,
    });

    await newUserRec.save();

    return res.json(pick(newUserRec, ["_id", "name", "email"]));
  } catch (ex) {
    if (ex instanceof ZodError) {
      return res.status(400).json(ex.issues[0].message);
    }
    console.log(ex);
    return res.status(500).send("Unknown error occured.");
  }
});

// Sign in api
router.post("/sign-in", async (req: Request, res: Response) => {
  try {
    const userData = validateSignInRequest(req.body);

    const userRec = await User.findOne({
      email: userData.email,
    });

    if (!userRec) {
      return res.status(400).send("User not found");
    }

    if (!userRec.validatePassword(userData.password)) {
      return res.status(400).send("Invalid Email / Password");
    }

    return res.send(userRec.generateAuthToken());
  } catch (ex) {
    if (ex instanceof ZodError) {
      return res.status(400).json(ex.issues[0].message);
    }
    console.log(ex);
    return res.status(500).send("Unknown error occured.");
  }
});

export default router;
