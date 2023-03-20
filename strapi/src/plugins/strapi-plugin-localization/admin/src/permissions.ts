import permissions from "../../permissions";

const pluginPermissions = {
  access: [
    {
      action: permissions.render(permissions.localization.read),
      subject: null,
    },
  ],
  update: [
    {
      action: permissions.render(permissions.localization.update),
      subject: null,
    },
  ],
};

export default pluginPermissions;
