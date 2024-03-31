import axios from "axios";
import axiosRetry from "axios-retry";
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

axiosRetry(edamamApi, {
  retries: 5,

  retryCondition: (error) => {
    switch (error.response?.status) {
      case 429:
        return true;
      default:
        return false;
    }
  },

  retryDelay: (...arg) => axiosRetry.exponentialDelay(...arg, 10000),
});

export { appId, appKey, edamamApi };
