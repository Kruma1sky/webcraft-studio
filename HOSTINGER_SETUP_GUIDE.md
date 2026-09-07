# Hostinger CI/CD Deployment Guide 🚀

This repository is configured to automatically deploy your website to **Hostinger** every time you push to the `main` branch using **GitHub Actions**.

---

## 📋 One-Time Setup: Add GitHub Secrets

To allow GitHub Actions to connect to your Hostinger hosting, add your Hostinger FTP credentials to GitHub Secrets.

### 1. Get FTP Details from Hostinger hPanel
1. Log in to [Hostinger hPanel](https://hpanel.hostinger.com/).
2. Go to **Websites** and click **Manage** next to your domain.
3. In the left sidebar, navigate to **Files** > **FTP Accounts**.
4. You will see your FTP credentials:
   - **FTP IP / Hostname** (e.g. `ftp.yourdomain.com` or an IP address like `185.xxx.xxx.xxx`)
   - **FTP Username** (e.g. `u123456789`)
   - **FTP Password** (click *Change Password* if you don't remember it)
   - **Port**: `21` (default)

---

### 2. Add Secrets to Your GitHub Repository
1. Open this repository on GitHub (`https://github.com/Kruma1sky/<your-repo-name>`).
2. Click on **Settings** (tab at the top right of the repo).
3. In the left menu, select **Secrets and variables** > **Actions**.
4. Click **New repository secret** and add the following 3 secrets:

| Secret Name | Value | Example |
| :--- | :--- | :--- |
| `FTP_SERVER` | Your Hostinger FTP Host or IP | `185.199.110.153` or `ftp.yourdomain.com` |
| `FTP_USERNAME` | Your Hostinger FTP Username | `u123456789` |
| `FTP_PASSWORD` | Your Hostinger FTP Password | `yourSecretPassword123` |

*(Optional)* If your domain is in a specific subdirectory or addon domain:
| Secret Name | Value | Default if omitted |
| :--- | :--- | :--- |
| `FTP_SERVER_DIR` | Directory on Hostinger | `public_html/` (or `domains/example.com/public_html/`) |

---

## ⚡ How It Works

1. You make changes to your website files in `public/` (or anywhere in the project).
2. Commit and push:
   ```bash
   git add .
   git commit -m "Update homepage banner"
   git push origin main
   ```
3. GitHub Actions triggers automatically.
4. Changed files are synced to Hostinger in ~15-30 seconds.
5. Your live website is updated with zero downtime!

---

## 📬 Contact Form Handling on Hostinger
- **Shared Hosting (Standard)**: The form submits to `/api/contact`, which is routed by `.htaccess` to `api/contact.php`. Open `public/api/contact.php` and set `$toEmail` to your preferred notification email.
- **Node.js (Local & VPS)**: When running locally (`npm run dev`), Node + Express (`server.js`) handles `/api/contact` using Nodemailer.
