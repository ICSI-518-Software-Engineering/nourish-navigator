import { Request, Response, Router } from "express";
import { ZodError } from "zod";

const userProfileRoutes = Router();

// Sign up api
userProfileRoutes.post(
  "/profile/:userid",
  async (req: Request, res: Response) => {
    try {
    } catch (ex) {
      if (ex instanceof ZodError) {
        return res.status(400).json(ex.issues[0].message);
      }
      console.log(ex);
      return res.status(500).send("Unknown error occured.");
    }
  }
);

export default userProfileRoutes;
