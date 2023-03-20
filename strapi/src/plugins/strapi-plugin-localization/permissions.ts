"use strict";

export default {
  render: function (uid: string) {
    return `plugin::localization.${uid}`;
  },
  localization: {
    read: "read",
    update: "update",
  },
};
