export const settingsShops = ["All shops (2)", "Maikhana Adelaide", "Scoop Shoppe"] as const;

export const generalToggles = [
  {
    id: "order-instructions",
    label: "Enable Order Instructions",
    description: "Allow customers to add special instructions to their order.",
    enabled: true,
  },
  {
    id: "special-instructions",
    label: "Enable special item instructions",
    description: "Allow customers to add special instructions to their order.",
    enabled: true,
  },
  {
    id: "edit-menu-hours",
    label: "Edit menu hours in Tiffin Finder Order Manager?",
    description: "Anybody with access to the Tiffin Finder Order Manager app will be able to change menu hours.",
    enabled: true,
  },
  {
    id: "optimise-menu",
    label: "Automatically optimise your menu",
    description:
      "By opting in, your menu will be tweaked to help attract more sales. This may involve rearranging the order of your items or adding suggested combos.",
    enabled: true,
  },
] as const;

export const offeringsToggles = [
  {
    id: "busy-mode",
    label: "Enable Busy Mode in Tiffin Finder Order Manager?",
    description: "Staff with access to your in-store device can temporarily add extra preparation time to all new orders.",
    enabled: true,
  },
  {
    id: "ai-descriptions",
    label: "Auto-approve AI-suggested descriptions",
    description: "You would have to manually review and approve suggestions for all items if you disable this option.",
    enabled: true,
  },
  {
    id: "allergy-requests",
    label: "Allow allergy requests",
    description:
      "Customers can select their food allergies from a list when placing an order. You'll see a banner highlighting their allergies.",
    enabled: true,
  },
  {
    id: "share-phone",
    label: "Share shop phone number",
    description: "Customers will be able to call your shop if they have food allergies",
    enabled: false,
  },
] as const;

export const documentsNeeded = [
  "Food Safety Supervisor Certificate [Only if applicable]",
  "Premise inspection or audit conducted by local authority [Only if applicable]",
  "Food handlers food safety training [Only if applicable]",
  "Liquor Licence [Only if applicable]",
] as const;

export const documentsCompleted = [{ name: "Self Declaration", status: "Approved" as const }] as const;

export const notification = {
  message: "Enable 2FA to secure admin accounts from unauthorised access. See email for info",
  time: "15 days ago",
  category: "Account security",
} as const;
