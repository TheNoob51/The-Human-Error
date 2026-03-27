export const trainingCategories = [
  {
    id: "emails",
    title: "Fake Emails",
    description: "Business email compromise, cloned invoices, and fake verification flows.",
    icon: "✉️",
    difficulty: "Medium",
    scamIds: ["ceo-fraud", "mfa-alert", "clone-phishing"],
  },
  {
    id: "trojans",
    title: "Trojans",
    description: "Malware disguised as updates, leaked media, and fake premium app offers.",
    icon: "🪲",
    difficulty: "High",
    scamIds: ["astaroth", "trojan-im", "whatsapp-gold"],
  },
  {
    id: "mobile",
    title: "Mobile Scams",
    description: "Smishing, delivery fee traps, and WhatsApp pairing compromise tricks.",
    icon: "📱",
    difficulty: "Medium",
    scamIds: ["smishing", "delivery-scam", "ghost-pairing"],
  },
  {
    id: "social",
    title: "Social Threats",
    description: "Emotion-driven social fraud, image payloads, and payment impersonation.",
    icon: "👥",
    difficulty: "High",
    scamIds: ["friend-scam", "steganography", "payment-fraud"],
  },
];

export const getCategoryById = (id) => trainingCategories.find((category) => category.id === id);
