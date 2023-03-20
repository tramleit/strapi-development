import { StrapiRoutes } from "../../types";

const routes: StrapiRoutes = {
  type: "admin",
  routes: [
    {
      method: "GET",
      path: "/config",
      handler: "admin.config",
      config: {
        policies: [],
      },
    },
    {
      method: "GET",
      path: "/default-locale",
      handler: "admin.getDefaultLocale",
      config: {
        policies: [],
      },
    },
    {
      method: "GET",
      path: "/",
      handler: "admin.get",
      config: {
        policies: [],
      },
    },
    {
      method: "GET",
      path: "/:locale",
      handler: "admin.getByLocale",
      config: {
        policies: [],
      },
    },
    {
      method: "POST",
      path: "/:locale",
      handler: "admin.post",
      config: {
        policies: [],
      },
    },
    {
      method: "PUT",
      path: "/:locale",
      handler: "admin.put",
      config: {
        policies: [],
      },
    },
    {
      method: "DELETE",
      path: "/:locale",
      handler: "admin.delete",
      config: {
        policies: [],
      },
    },
  ],
};

export default routes;
