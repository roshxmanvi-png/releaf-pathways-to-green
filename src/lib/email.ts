import emailjs from "@emailjs/browser";

// Helper to send daily news using EmailJS (client-side)
// Configure via environment variables:
// VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, VITE_EMAILJS_PUBLIC_KEY
// Template variables used: to_name, to_email, message
export async function sendDailyNews(toEmail: string, toName?: string) {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  if (!serviceId || !templateId || !publicKey) {
    console.warn("EmailJS not configured. Skipping sendDailyNews.");
    return { ok: false, message: "EmailJS not configured" };
  }

  try {
    emailjs.init(publicKey);
    const newsText = await fetchLatestSustainabilityNews();
    const templateParams = {
      to_name: toName || "Player",
      to_email: toEmail,
      message: newsText,
    };
    const result = await emailjs.send(serviceId, templateId, templateParams);
    return { ok: true, result };
  } catch (err) {
    console.error("sendDailyNews error", err);
    return { ok: false, message: String(err) };
  }
}

// Simple example: fetch an RSS or news API to generate digest text.
async function fetchLatestSustainabilityNews() {
  try {
    // Using a brief placeholder; a real integration would call a news API (e.g., Bing News, GNews, Guardian) and return a formatted digest.
    const headlines = [
      "New community tree-planting program expanded to 1000 acres",
      "Researchers map coastline biodiversity hotspots to protect fisheries",
      "Cities adopt greener public transit policies this month",
    ];
    return `Today's sustainability highlights:\n- ${headlines.join('\n- ')}`;
  } catch (err) {
    return "Latest sustainability updates: (no news available)";
  }
}
