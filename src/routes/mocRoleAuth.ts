export const mocRoleAuth = {
  menuAccess: [
    {
      keyName: "dashboard",
      title_en: "Dashboard",
      title_th: "แดชบอร์ด",
      AccessPermission: ["create", "update", "delete", "viewers"],
    },
    {
      keyName: "settings",
      title_en: "Setting",
      title_th: "ตั้งค่า",
      AccessPermission: ["create", "update", "delete", "viewers"],
    },
  ],
  role: {
    admin: [
      {
        keyName: "dashboard",
        title_en: "Dashboard",
        title_th: "แดชบอร์ด",
        AccessPermission: ["create", "update", "delete", "viewers"],
      },
      {
        keyName: "settings",
        title_en: "Setting",
        title_th: "ตั้งค่า",
        AccessPermission: ["create", "update", "delete", "viewers"],
      },
    ],
    member: [
      {
        keyName: "dashboard",
        title_en: "Dashboard",
        title_th: "แดชบอร์ด",
        AccessPermission: ["create", "update", "delete", "viewers"],
      },
    ],
  },
};
