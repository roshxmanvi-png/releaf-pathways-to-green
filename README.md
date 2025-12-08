### Optional: Run local upload server for Tasks (optional)

If you'd like to store uploaded task photos on a server rather than localStorage, you can run a simple Express server included in the repo.

To run locally:

```bash
npm install
npm run start-server
# Server will be at http://localhost:4000
```

The front-end `Tasks` page will attempt to upload images to `VITE_UPLOAD_SERVER` (if set), or fallback to `http://localhost:4000` by default. If the server is not accessible, the app will fallback to localStorage and base64-encoded images.

### Optional: Use NewsAPI for real headlines

To fetch live sustainability news instead of the static headlines:
1. Sign up for an API key at https://newsapi.org/ (or another news provider).
2. Add the `NEWS_API_KEY` to your GitHub Secrets (the scheduled job uses it) and to your local environment if you run the script locally.
	- For GitHub Actions: `NEWS_API_KEY` secret.
	- For local dev: export `NEWS_API_KEY` before running `npm run send-news`.

# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/594fb149-c2c2-46f1-99a6-52e22322b012

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/594fb149-c2c2-46f1-99a6-52e22322b012) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## Changing the Site Logo

To update the site logo (used both in the navbar and Open Graph tags), add your logo image into the `public/` folder and name it `og-image.svg` or `og-image.png`.
Then replace the file if you want to use another format. The project references `/og-image.svg` by default. If you have the provided image, place it at `public/og-image.svg` or replace the file with `public/og-image.png` and update references in `index.html` accordingly.

## EmailJS: Daily Sustainability News Setup 🔔

This project includes a scheduled job that sends a short daily sustainability digest using EmailJS. It uses two mechanisms:

- Client-side: The site uses `src/lib/email.ts` and the `@emailjs/browser` package to send a one-off email at signup/login (if configured).
- Server-side (GitHub Actions): A scheduled GitHub Actions job runs daily and sends the digest to a configured recipient via EmailJS REST API.

Configuration steps:

1. Sign up at https://www.emailjs.com/ and create a service and template following their docs.
2. Configure your EmailJS template to accept `to_name`, `to_email`, and `message` variables.
3. Add repository secrets under Settings → Secrets (Actions):
	 - `EMAILJS_SERVICE_ID` — your EmailJS service ID
	 - `EMAILJS_TEMPLATE_ID` — your EmailJS template ID
	 - `EMAILJS_USER_ID` — your EmailJS public key (user id)
	 - `NEWS_RECIPIENT` — (optional) recipient email for scheduled news (defaults to rishab.menon13@gmail.com)
	 - (Optional client-side environment vars) Add Vite env vars in your hosting provider (Vercel / Netlify / GitHub Pages build config):
		 - `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, `VITE_EMAILJS_PUBLIC_KEY`

4. To manually test the scheduled send locally, run:
```bash
EMAILJS_SERVICE_ID=service_xxx EMAILJS_TEMPLATE_ID=template_xxx EMAILJS_USER_ID=user_xxx NEWS_RECIPIENT=rishab.menon13@gmail.com npm run send-news
```

5. The GitHub Actions scheduled job (`.github/workflows/daily-news.yml`) will automatically run daily at 08:00 UTC and send the digest to `NEWS_RECIPIENT`.

Notes:
- The digest is generated with placeholder headlines (for demo). You can extend `scripts/sendDailyNews.js` to fetch a real news API for live data.
- Client-side EmailJS usage is optional but convenient for logging in and signup events. Server-side scheduled job uses GitHub Actions for reliability and to ensure emails are sent daily.

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/594fb149-c2c2-46f1-99a6-52e22322b012) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
