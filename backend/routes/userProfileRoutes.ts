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

    const user = await User.findById(req.params.userid, {
      password: false,
      isAdmin: false,
    });

    return res.send(user);
  } catch (ex) {
    if (ex instanceof ZodError) {
      return res.status(400).json(ex.issues[0].message);
    }
    console.log(ex);
    return res.status(500).send("Unknown error occured.");
  }
});

// get profile api
userProfileRoutes.get("/profile/", async (req, res: Response) => {
  try {
    const users = await User.find(
      { isAdmin: false },
      { password: false, isAdmin: false }
    );
    return res.send(users);
  } catch (ex) {
    console.log(ex);
    return res.status(500).send("Unknown error occured.");
  }
});

// delete profile api
userProfileRoutes.delete("/profile/:userId", async (req, res: Response) => {
  try {
    await User.findByIdAndDelete(req.params.userId);
    return res.send("user deleted successfully");
  } catch (ex) {
    console.log(ex);
    return res.status(500).send("Unknown error occured.");
  }
});

export default userProfileRoutes;
