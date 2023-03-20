import { LocalizationRoutes } from "../../types";
import admin from "./admin";
import client from "./client";

const routes: LocalizationRoutes = {
  admin,
  "content-api": client,
};

export default routes;
