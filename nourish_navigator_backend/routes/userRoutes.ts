import { Request, Response, Router } from "express";
import { ZodError } from "zod";
import User, {
  validateSignInRequest,
  validateSignUpRequest,
} from "../models/userModel";

const userRoutes = Router();

// Sign up api
userRoutes.post("/sign-up", async (req: Request, res: Response) => {
  try {
    const userData = validateSignUpRequest(req.body);

    const userRec = await User.findOne({
      email: userData.email,
    });

    if (userRec) {
      return res.status(400).send("User already exists");
    }

    const newUserRec = new User({
      isAdmin: false,
      ...userData,
    });

    await newUserRec.save();

    return res.send(newUserRec.generateAuthToken());
  } catch (ex) {
    if (ex instanceof ZodError) {
      return res.status(400).json(ex.issues[0].message);
    }
    console.log(ex);
    return res.status(500).send("Unknown error occured.");
  }
});

// Sign in api
userRoutes.post("/sign-in", async (req: Request, res: Response) => {
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

export default userRoutes;
