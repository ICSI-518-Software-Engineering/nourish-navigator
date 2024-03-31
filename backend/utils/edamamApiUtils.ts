import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const appId = process.env.MEAL_PLAN_API_APP_ID;
const appKey = process.env.MEAL_PLAN_API_APP_KEY;

const edamamApi = axios.create({
  baseURL: "https://api.edamam.com",
  params: {
    app_key: appKey,
    app_id: appId,
  },
  // headers: {
  //   "Edamam-Account-User": process.env.MEAL_PLAN_API_USER_ID,
  // },
});

export { appId, appKey, edamamApi };
