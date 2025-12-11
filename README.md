# 🎨 Meme Maker
### Next.js + Canvas

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=flat&logo=react)](https://react.dev/)
[![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-black?logo=vercel)](https://meme-maker-wine.vercel.app/)

A fast, fully client-side meme generator built with Next.js, HTML Canvas, and React. Upload an image, drag text, add stickers, and export your creation instantly.

[**🚀 View Live Demo**](https://meme-maker-wine.vercel.app/)

---

## ✨ Features

### 🖼️ Image Editing
* **Universal Upload:** Supports JPG, PNG, and WebP formats.
* **Smart Resize:** Auto-resizes for the best canvas quality.
* **Text Control:**
  * Drag-to-move Top and Bottom text.
  * Multi-line text support with wrapping.
  * Multiple fonts (Impact, Arial, Comic Sans, etc.).
* **Styling:** Adjustable font size, text color, outline color, and outline thickness.

### 😎 Stickers & Emojis
* **Emoji Support:** Add fire, laughs, hearts, and more (🔥 😁 ❤️).
* **Custom Stickers:** Upload and overlay your own images.
* **Interaction:** Drag stickers freely on the canvas or remove them individually.

### ✂️ Masks & Shapes
* **Rounded Corners:** Adjustable radius for softer edges.
* **Circular Mask:** Create perfect DP-style memes.

### 📤 Export & Share
* **High Res Export:** Downloads as PNG or JPEG (uses `canvas.toDataURL`).
* **Mobile Sharing:** Integrated Web Share API for direct sharing to apps on mobile devices.

---

## 🧱 Tech Stack

* **Framework:** Next.js 16 (App deployed as static export)
* **Library:** React 19
* **Graphics:** HTML5 Canvas API
* **Styling:** Custom CSS
* **Hosting:** Vercel

---

## 🛠️ Local Development

Follow these steps to run the project locally.

**1. Clone the repository**
```bash
git clone [https://github.com/hrishikhapekar/Meme-maker.git](https://github.com/hrishikhapekar/Meme-maker.git)
cd Meme-maker
```
**2. Install dependencies**

```bash

npm install
```
**3. Run the development server**

```Bash
npm run dev
```
The app will be available at http://localhost:3000.

## 📦 Building & Deployment
Build for Production
To build the Next.js application:

```Bash

npm run build
```
Static Export
To create a static export (generates an out/ directory):

```Bash

npm run export
```
Deploy to Vercel
Push your changes to GitHub and Vercel will auto-build. Alternatively, deploy manually via CLI:

```Bash

vercel --prod
```
## 🧩 Project Structure
```Bash

/
├── pages/
│   ├── index.jsx        # Main UI + Canvas logic
│   └── _app.js          # Global wrapper
├── styles/
│   └── globals.css      # Styling
├── public/              # Static assets & sample images
├── package.json
└── README.md
```
## 🤝 Contributing
Contributions are welcome! Feel free to open issues or Pull Requests. Here are some ideas for future improvements:

* Add shapes (arrows, boxes, speech bubbles).

* Add rotation and scaling handles for text/stickers.

* Add preset templates (Drake, Doge, Distracted Boyfriend, etc.).

* Add Dark/Light UI theme toggle.
