export type StrapiRoutesTypes = "admin" | "content-api";

export type StrapiRoute = {
  method: "GET" | "POST" | "PUT" | "DELETE";
  path: string;
  handler: string;
  config?: {
    policies?: string[];
    auth?: boolean;
  };
};

export type StrapiRoutes = {
  type: StrapiRoutesTypes;
  routes: StrapiRoute[];
};

export type LocalizationRoutes = {
  [key: string]: StrapiRoutes;
};
