# Live Sub Count — README

A small, lightweight **YouTube live subscriber goal overlay** (HTML/CSS/JS). Use it as a browser source in OBS or open in any browser. It shows a subscriber goal bar, current count, and a filling animation. The bundle includes demo assets so it works instantly without configuring an API.

---

## What’s in this ZIP

```
Live Sub Count/
├─ index.html       # main page (overlay)
├─ style.css        # styles and animations
├─ script.js        # logic: demo values + optional YouTube API polling
├─ BG_Frame.png     # background/frame asset
├─ Follow_Icon.png  # icon used in the UI
└─ readme.md        # original (contains an example API key placeholder)
```

> I inspected the included files: `index.html`, `style.css`, `script.js`, and two images. `script.js` contains comments showing how to enable live updates via the YouTube Data API.

---

## Quick start — run locally

1. Unzip the folder.
2. Open `index.html` in your browser (double-click).
3. You should immediately see the overlay with demo subscriber numbers.

To use in OBS as an overlay: add a **Browser** source and point the URL to the local file or host it on a small web server (see Hosting below). Set the source size to match your stream layout.

---

## Configure for live YouTube subscriber counts

Open `script.js` and edit the top variables:

```js
const apiKey = "";     // your YouTube Data API key
const channelId = "";  // your channel ID (starts with UC...)
let goal = 1000;         // subscriber goal you want to show
let pollInterval = 15;   // seconds between YouTube API requests
```

1. Put your API key in `apiKey`.
2. Put the YouTube channel ID to monitor in `channelId`.
3. Adjust `goal` to what you want the bar to reach.

When both `apiKey` and `channelId` are non-empty the script will call the YouTube Data API periodically and update the displayed subscriber count.

**Important:** the included `readme.md` file in the ZIP contains a string that looks like an API key. Treat any keys in public repos as sensitive — do not commit private API keys to a public GitHub repo. Use environment variables or GitHub Secrets for production.

---

## How to get a YouTube Data API key

1. Go to the Google Cloud Console: [https://console.cloud.google.com/](https://console.cloud.google.com/)
2. Create a new project (or select an existing one).
3. Enable the **YouTube Data API v3** for the project.
4. Under **APIs & Services → Credentials** create an **API key**.
5. (Optional but recommended) Restrict the key to just the YouTube Data API and optionally to specific referrers or IPs.
6. Copy the API key and paste into `script.js` as `apiKey`.

To find your channel ID:

* Go to your YouTube channel page → Settings → Advanced settings, or visit `https://www.youtube.com/account` and look for the channel ID (it begins with `UC`).

---

## Hosting & using in OBS

Options:

* **Local file**: OBS Browser source can load a local file URL like `file:///C:/path/to/Live%20Sub%20Count/index.html`. On some systems OBS may restrict local file access, so test first.
* **Simple local server**: run `python -m http.server 8000` from the folder and open `http://localhost:8000/` in OBS Browser.
* **Host on GitHub Pages**: push the repo to GitHub and enable GitHub Pages (choose `main` branch / `gh-pages` or `docs/`), then use the published URL in OBS.

When adding as a Browser source in OBS, set the resolution to match your overlay design and enable/disable local file access depending on your hosting choice.

---

## Customization (what to change & where to find it)

* `index.html` — structure and element ids/classes used by CSS/JS. Change text labels (title) or add elements.
* `style.css` — visuals, fonts, colors, and the filling animation. You can modify variables (colors) and layout here.
* `script.js` — logic for demo values, API polling, formatting, and animation timing. Update `goal`, `pollInterval`, and the API config here.
* `BG_Frame.png`, `Follow_Icon.png` — swap these with your own assets (same file names or update the HTML to match new file names).

If you want the icon box square with rounded corners and red fill (from your earlier message), edit `.icon` in `style.css` and change background to your red color and border-radius to a value like `8px`.

---

## Security & best practices for GitHub

* **DO NOT** push your API key to a public repo. Instead:

  * Use a config file excluded by `.gitignore` (e.g., `config.js`) and add that to `.gitignore`.
  * Or set the key at runtime via a small server that injects it, or use GitHub Actions / Secrets when deploying.
* For GitHub Pages, keep keys out of client-side JS. If you need live server-side calls, host a small endpoint (serverless function) that holds the key and returns the count to the client.

**Recommended license:** MIT — simple and permissive for UI widgets. If you prefer more restrictions, choose GPL or an appropriate alternative.

---

## Troubleshooting

* **Count not updating**: ensure `apiKey` and `channelId` are set and valid. Check browser console for `YT fetch error` messages (open DevTools).
* **CORS issues**: if hosting behind a server, ensure CORS headers are correct. When using GitHub Pages, client-side calls to Google APIs are normally allowed.
* **OBS shows blank**: try enabling local file access or host via `http://localhost:8000/`.

---

## Credits

Assets included in the ZIP: `BG_Frame.png`, `Follow_Icon.png` (edit or replace as you like).

---

## Example quick edit (square red icon)

In `style.css` find the `.icon` rule and replace or add:

```css
.icon{ width:48px; height:48px; border-radius:8px; background:#c81010; display:flex; align-items:center; justify-content:center; }
```

---

If you want, I can:

* generate a `.gitignore` and `config.example.js` showing how to keep your key out of GitHub,
* produce a short `README.md` tailored for GitHub with badges,
* or convert this to a one-file HTML template that reads a key from `config.js`.

Tell me which you'd like next.
