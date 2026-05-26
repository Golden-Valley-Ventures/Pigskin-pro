# Pigskin.pro — iPad Upload Instructions

This document walks you through getting the project from a zip file on your iPad into a GitHub repository, with Vercel deploying it cleanly. **Read this first.**

---

## 1. Unzipping on iPad

1. Save `pigskin-pro-v1.1-github-upload.zip` into the **Files** app — anywhere works, but the **iCloud Drive → Downloads** folder is a good default.
2. Open **Files**.
3. **Tap the .zip file once.** iPadOS unzips it automatically and creates a folder next to it. (Long-press → *Uncompress* if a tap doesn't trigger it.)
4. You should now see a folder named **`pigskin-pro-v1.1-github-upload`**.
5. Tap that folder to open it.

### ✅ What you should see immediately inside the unzipped folder

At the **first level** (no extra wrapper folder), in alphabetical order:

```
.gitignore
IPAD_UPLOAD_INSTRUCTIONS.md
MANIFEST.md
PROJECT_FILE_TREE.md
README.md
next-env.d.ts
next.config.js
package-lock.json
package.json
postcss.config.js
public/
src/
tailwind.config.js
tsconfig.json
```

**Note:** iPadOS Files hides files that start with `.` (like `.gitignore`) by default. To show them, tap the **More menu (•••)** in the top-right of Files → **Show All Extensions** is on by default; for hidden files you may need a third-party file manager. For GitHub upload from Safari, you don't actually need to see `.gitignore` — the upload flow handles it for you.

### ❌ What you should NOT see

- You should **not** have to tap through `pigskin-pro-v1.1-github-upload → pigskin-pro → src/`.
- If you see a single folder named `pigskin-pro` inside the unzipped folder, that's a nested-folder problem. Open that inner folder and use its contents instead.

---

## 2. Confirm `package.json` and `src/` are at the root

Inside the unzipped folder, you should see **both** of these at the same level:

- `package.json` (a small file)
- `src` (a folder)

If you tap `src`, you should see four subfolders:

```
app/
components/
data/
lib/
```

If you see those four folders, the project is structured correctly.

---

## 3. Upload to GitHub from Safari (iPad)

GitHub's web UI works on Safari, but the iPad UI is slightly different from desktop. Here's the cleanest path:

### Step A: Create the empty repo

1. Open **Safari** and go to <https://github.com/new>.
2. Sign in if needed.
3. **Repository name:** `pigskin-pro` (or any name you prefer).
4. Set **Private** unless you want it public.
5. **Do NOT check** "Add a README file."
6. **Do NOT add** .gitignore or license.
7. Tap **Create repository**.

### Step B: Get to the upload screen

On the empty repo page, GitHub shows a "Quick setup" page. Look for the link that says **"uploading an existing file"** — it's a small text link in the middle of the page, in the "...or import code from another repository" section. Tap it.

(Direct URL if you can't find the link: `https://github.com/YOUR-USERNAME/pigskin-pro/upload/main`)

### Step C: Upload the files

1. Tap **"choose your files"** on the upload page.
2. Safari opens the iPadOS file picker.
3. Tap **Browse** at the bottom, then navigate to your unzipped `pigskin-pro-v1.1-github-upload` folder.
4. **Tap "Select"** in the top-right corner, then **tap each file and folder you want to upload, OR** use **"Select All"** if available.
5. Confirm the selection.

⚠️ **iPad limitation:** Safari's file picker on iPad sometimes doesn't let you select **folders** directly. If that's the case:
- Upload the **root-level files** first (package.json, tsconfig.json, README.md, next.config.js, next-env.d.ts, tailwind.config.js, postcss.config.js, .gitignore).
- Commit with message: `Add config files`.
- Then go back to the repo, tap **Add file → Upload files**, and upload `src/` by tapping it inside the picker. iPadOS should treat the folder as a navigable structure and let you select its contents.
- For folder structure preservation, the desktop GitHub Web UI works best. If iPad uploads flatten the structure, see **Section 5** below for the alternative.

### Step D: Commit

At the bottom of the upload page:

1. **Commit message:** `Pigskin.pro v1.1 foundation build`
2. Leave "Commit directly to the `main` branch" selected.
3. Tap **Commit changes**.

---

## 4. What it should look like after upload

The GitHub repo root should show this structure (you can verify by going to `https://github.com/YOUR-USERNAME/pigskin-pro`):

```
.gitignore
README.md
next-env.d.ts
next.config.js
package-lock.json
package.json
postcss.config.js
public/
src/
tailwind.config.js
tsconfig.json
```

Tap into `src/` and you should see:

```
app/
components/
data/
lib/
```

If that matches, you're ready for Vercel. **In Vercel, leave "Root Directory" as `./` (the default).** Do NOT set it to `pigskin-pro/` or any nested path.

---

## 5. What to do if GitHub uploads as one nested folder

If after uploading you see this in the GitHub repo root:

```
pigskin-pro/
  ├── package.json
  ├── src/
  └── ...
```

…instead of `package.json` being at the root, you have a nesting problem. Two ways to fix:

### Option A: Move files via GitHub Web UI (slowest but works on iPad)

For each file in the nested folder:
1. Tap the file.
2. Tap the **pencil icon** to edit.
3. In the filename field at the top, **delete the `pigskin-pro/` prefix** so it's just `package.json`, `tsconfig.json`, etc.
4. Scroll down and tap **Commit changes**.

For folders (`src/`, `public/`), you'll need to do this for every file inside them, which is tedious. Better: use Option B.

### Option B: Use Working Copy (recommended for iPad)

[Working Copy](https://workingcopy.app/) is a Git client for iPad that handles repo structure properly:

1. Install **Working Copy** from the App Store (free for basic use).
2. Open the app and tap **+ → Clone repository**.
3. Paste your GitHub repo URL.
4. After cloning, tap into the empty repo.
5. Tap **+ → Import files** → navigate to the unzipped `pigskin-pro-v1.1-github-upload` folder.
6. Working Copy preserves folder structure correctly.
7. Tap **Commit** with message `Pigskin.pro v1.1 foundation build`.
8. Tap **Push**.

Your GitHub repo will then have the correct flat structure.

### Option C: Use a Mac or PC for upload, just this once

If you have access to a Mac/PC for 5 minutes, drag-and-drop upload via desktop GitHub Web UI preserves folder structure perfectly. Everything after that (Vercel deployment, future edits) can be done from iPad.

---

## 6. After upload — connect to Vercel

Once GitHub is correct, on iPad Safari:

1. Go to <https://vercel.com>.
2. Sign in with GitHub.
3. **Add New → Project**.
4. Find `pigskin-pro` in your repo list and tap **Import**.
5. **Framework Preset:** Next.js (auto-detected — confirm).
6. **Root Directory:** `./` (leave the default — do not change).
7. **Build & Output Settings:** leave all defaults.
8. **Environment Variables:** none needed.
9. Tap **Deploy**.

First build takes 1–2 minutes. When it's done, Vercel gives you a `.vercel.app` URL — that's your live site.

---

## 7. Sanity check after deploy

Open the `.vercel.app` URL Vercel gave you. You should see:

- The Pigskin.pro homepage with the **"We don't have takes. We have reads."** hero.
- The header navigation across the top.
- A "**Featured — AFC West**" section showing the "Pending Verification" badge.
- A grid of seven other divisions marked "Coming Soon."

If the page renders broken (no styles, white background), Vercel likely picked up the wrong root directory. Go to **Vercel project → Settings → General → Root Directory** and confirm it's set to `./` (or blank). Redeploy.

---

## 8. Quick reference

| Question | Answer |
|---|---|
| Which zip do I open first? | `pigskin-pro-v1.1-github-upload.zip` |
| What's `package.json`? | Project configuration — must sit at the repo root |
| What's `src/`? | All the code lives here |
| Vercel Root Directory? | `./` (the default — leave blank/unchanged) |
| Build command? | `next build` (auto-detected, leave default) |
| Environment variables? | None needed |

You're good to go.
