#!/usr/bin/env node
/**
 * scripts/sendDailyNews.js
 * Sends a simple sustainability digest via EmailJS using the REST API.
 * Expects the following environment variables:
 * - EMAILJS_SERVICE_ID
 * - EMAILJS_TEMPLATE_ID
 * - EMAILJS_USER_ID (public key for EmailJS)
 * - NEWS_RECIPIENT (defaults to rishab.menon13@gmail.com)
 */

const API_ENDPOINT = 'https://api.emailjs.com/api/v1.0/email/send';

async function fetchLatestSustainabilityNews() {
  // In a real app, you'd call an external news API.
  const headlines = [
    'New community tree-planting program expanded to 1,000 acres',
    'Researchers map coastline biodiversity hotspots to protect fisheries',
    'Cities adopt greener public transit policies this month',
  ];
  return `Today\'s sustainability highlights:\n- ${headlines.join('\n- ')}`;
}

(async function main() {
  const serviceId = process.env.EMAILJS_SERVICE_ID;
  const templateId = process.env.EMAILJS_TEMPLATE_ID;
  const userId = process.env.EMAILJS_USER_ID;
  const toEmail = process.env.NEWS_RECIPIENT || 'rishab.menon13@gmail.com';
  const toName = process.env.NEWS_NAME || 'Releaf';

  if (!serviceId || !templateId || !userId) {
    console.error('Missing EmailJS configuration. Set EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, and EMAILJS_USER_ID.');
    process.exit(2);
  }

  try {
    const msg = await fetchLatestSustainabilityNews();
    const body = {
      service_id: serviceId,
      template_id: templateId,
      user_id: userId,
      template_params: {
        to_name: toName,
        to_email: toEmail,
        message: msg,
      },
    };

    const res = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      console.error('sendDailyNews failed', res.status, await res.text());
      process.exit(1);
    }

    console.log('Daily news sent to', toEmail);
  } catch (err) {
    console.error('sendDailyNews error', err);
    process.exit(1);
  }
})();
