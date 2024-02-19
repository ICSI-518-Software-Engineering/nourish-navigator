import { Response, Router } from "express";
import { ZodError } from "zod";
import User from "../models/userModel";
import { validateNewUserProfileRequest } from "../models/userProfileModel";

const userProfileRoutes = Router();

// profile setup api
userProfileRoutes.post("/profile/:userid", async (req, res: Response) => {
  try {
    const reqBody = validateNewUserProfileRequest(req.body);

    const user = await User.findByIdAndUpdate(req.params.userid, {
      userProfile: reqBody,
    });
    await user?.save();

    return res.send("User profile updated successfully");
  } catch (ex) {
    if (ex instanceof ZodError) {
      return res.status(400).json(ex.issues[0].message);
    }
    console.log(ex);
    return res.status(500).send("Unknown error occured.");
  }
});

// get profile api
userProfileRoutes.get("/profile/:userid", async (req, res: Response) => {
  try {
    if (!req.params.userid) return res.status(400).send("User id is missing");

    const user = await User.findById(req.params.userid);

    return res.send(user?.userProfile);
  } catch (ex) {
    if (ex instanceof ZodError) {
      return res.status(400).json(ex.issues[0].message);
    }
    console.log(ex);
    return res.status(500).send("Unknown error occured.");
  }
});

export default userProfileRoutes;
