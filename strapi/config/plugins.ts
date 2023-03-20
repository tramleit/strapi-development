import { join } from "path";

const plugin = (...paths: string[]) => join("./src/plugins", ...paths);

export default ({ env }) => ({
  localization: {
    enabled: true,
    resolve: plugin("strapi-plugin-localization"),
  },
});
