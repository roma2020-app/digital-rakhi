# digital-rakhi
A heartfelt Digital Rakhi experience with Aarti, Tilak, Mithai, Rakhi tying animation, Shagun, sibling messages &amp; a final Sibling Agreement. ❤️



## 🌐 Live Demo



👉 https://digitalrakhi.vercel.app/ or 

👉 https://digital-rakhi-eight.vercel.app**


Experience the complete Digital Raksha Bandhan ceremony on mobile and desktop.
## 🎥 Experience

**Sister:** Choose Rakhi → Personalize → Share on WhatsApp

**Bhai:** Aarti → Tilak → Mithai → Rakhi → Shagun → Message → Sibling Agreement ❤️

# 🪷 Digital Rakhi – A Heartfelt Raksha Bandhan Experience ❤️

A creative and interactive **Digital Rakhi web experience** that brings the beautiful bond between a brother and sister into the digital world.

The sister can personalize a Rakhi, choose a beautiful Rakhi design, and share it with her brother through WhatsApp. The brother can then experience a virtual Raksha Bandhan ceremony with **Aarti, Tilak, Mithai, Rakhi tying, Shagun, a personal message, and a final Sibling Agreement**.

> ❤️ **Rakhi sirf ek dhaaga nahi, ek rishta hai jo dil se bandha hai.**

---

## ✨ Features

### 👩 Sister's Experience

- Enter Sister's name
- Enter Brother's name
- Choose a Rakhi design:
  - 🕉️ Om Rakhi
  - 🪷 Swastik Rakhi
  - ❤️ Love Rakhi
- Generate a personalized Rakhi link
- Share the Rakhi through WhatsApp
- Copy the Rakhi link
- Send the Rakhi with a heartfelt message

### 👦 Brother's Experience

When Bhai opens the personalized Rakhi link, he experiences a complete digital Raksha Bandhan ceremony:

1. 🪔 **Aarti**
2. 🌹 **Tilak**
3. 🍬 **Mithai**
4. 🪷 **Rakhi Tying**
5. 🎵 **Rakhi Theme Music**
6. 🎁 **Digital Shagun**
7. 💌 **Bhai's Personal Message**
8. 📜 **Sibling Agreement**
9. 🖼️ **Agreement Image Generation**
10. 📱 **WhatsApp Sharing**

---

## 🪷 Digital Raksha Bandhan Ceremony

The project is designed to make the experience feel warm, emotional, respectful, and natural.

### 🪔 Aarti

Bhai participates in a virtual Aarti ceremony before the Rakhi is tied.

### 🌹 Tilak

A dedicated Tilak animation applies the Tilak naturally on Bhai's forehead.

### 🍬 Mithai

The experience uses a respectful interaction:

> **"Bhai, Mithai Lijiye ❤️"**

### 🪷 Rakhi Tying

The selected Rakhi appears in the tying ceremony.

The animation includes:

- Rakhi approaching Bhai's wrist
- Rakhi positioning
- Thread wrapping
- Knot animation
- Final Rakhi appearance
- Emotional completion message

The animation is intentionally slow so the ceremony can be clearly seen on mobile devices.

### 🎵 Music

An original Rakhi-themed music track plays during the Rakhi ceremony.

Music:

- Starts through a user interaction
- Supports mobile browser restrictions
- Can be paused and resumed
- Stops after Rakhi acceptance

### 🎁 Digital Shagun

Bhai can give a digital Shagun as part of the Raksha Bandhan experience.

### 💌 Bhai's Message

Bhai can write a personal message for his sister.

The message becomes part of the final Sibling Agreement.

### 📜 Sibling Agreement

The final stage creates a personalized **Sibling Agreement** celebrating the unique bond between the brother and sister.

The agreement contains:

- Sister's name
- Brother's name
- Rakhi details
- Bhai's message
- Shagun details
- Emotional sibling commitments

The final agreement can be generated as an image.

The **WhatsApp sharing button is intentionally excluded from the generated agreement image**.

---

# 📱 Mobile-Friendly Design

The Digital Rakhi experience is designed to work smoothly on:

- 📱 Mobile phones
- 📲 Tablets
- 💻 Desktop computers

The interface uses responsive layouts so that:

- Text fits smaller screens
- Buttons remain easy to tap
- Rakhi images resize automatically
- Animations stay within the screen
- Ceremony content does not get cut off
- Horizontal scrolling is avoided

---

# 🏗️ Architecture

```text
                         🪷 DIGITAL RAKHI
                               │
                               ▼
                    ┌─────────────────────┐
                    │      Sister 👩      │
                    │                     │
                    │  Enter Names        │
                    │  Select Rakhi       │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │ Generate Rakhi Link │
                    │         🔗          │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │      WhatsApp 📱    │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │       Bhai 👦       │
                    │    Opens the Link   │
                    └──────────┬──────────┘
                               │
                               ▼
              ┌───────────────────────────────────┐
              │     DIGITAL RAKSHA BANDHAN 🪷     │
              │                                   │
              │       🪔 Aarti                    │
              │       🌹 Tilak                    │
              │       🍬 Mithai                   │
              │       🪷 Rakhi                     │
              │       🎵 Music                    │
              │       🎁 Shagun                   │
              │       💌 Message                  │
              └─────────────────┬─────────────────┘
                                │
                                ▼
                    ┌─────────────────────┐
                    │ Sibling Agreement   │
                    │        📜❤️         │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │ Generate Agreement  │
                    │       Image 🖼️       │
                    └──────────┬──────────┘
                               │
                               ▼
                         WhatsApp 📱
```

---

# 🛠️ Technology Stack

| Technology | Purpose |
|---|---|
| **Next.js** | Web application framework |
| **React** | Interactive UI |
| **TypeScript** | Type-safe development |
| **Tailwind CSS** | Responsive styling |
| **Framer Motion** | Animations |
| **HTML5 Audio** | Rakhi theme music |
| **WhatsApp Sharing** | Rakhi link sharing |
| **Client-side Image Generation** | Sibling Agreement image |

---

# 📂 Project Structure

```text
digital-rakhi/
│
├── app/
│   ├── page.tsx
│   ├── layout.tsx
│   └── globals.css
│
├── public/
│   ├── audio/
│   │   └── rakhi-theme.mp3
│   └── rakhi/
│       ├── om-rakhi.jpg
│       ├── swastik-rakhi.jpg
│       └── love-rakhi.jpg
│
├── .gitignore
├── LICENSE
├── README.md
├── package.json
├── package-lock.json
├── tsconfig.json
└── next.config.ts
```

---

# 🚀 Getting Started

## 1. Clone the repository

```bash
git clone https://github.com/roma2020-app/digital-rakhi.git
```

## 2. Navigate to the project

```bash
cd digital-rakhi
```

## 3. Install dependencies

```bash
npm install
```

## 4. Start the development server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

# 📱 Test on Mobile

To test the application on a phone connected to the same Wi-Fi network:

```bash
npm run dev -- -H 0.0.0.0
```

Find your computer's local IP address:

```bash
ipconfig
```

Then open:

```text
http://YOUR_LOCAL_IP:3000
```

---

# 🏗️ Production Build

```bash
npm run build
```

If the build succeeds:

```bash
npm start
```

---

# 🌐 Deployment

The project can be deployed to **Vercel** or another Next.js-compatible hosting platform.

Example:

```text
https://your-digital-rakhi.vercel.app
```

Once deployed:

```text
Sister
   ↓
Public Rakhi Website
   ↓
Generate Link
   ↓
WhatsApp
   ↓
Bhai's Phone
   ↓
Digital Raksha Bandhan ❤️
```

---

# 🔒 Privacy

This project is designed as a **frontend-only application**.

There is:

- No dedicated backend
- No database
- No server-side user account system

Personalized Rakhi information is handled within the client-side experience and generated sharing link.

---

# 🎯 Design Philosophy

Digital Rakhi is more than a digital form.

The goal is to recreate the **emotion and warmth of Raksha Bandhan digitally**.

The design combines:

```text
Technology
     +
Tradition
     +
Emotion
     +
Family Bond
```

The experience aims to be:

- ❤️ Emotional
- 🪷 Traditional
- 😊 Friendly
- 🙏 Respectful
- 📱 Mobile-friendly
- ✨ Interactive

---

# 🔮 Future Enhancements

Possible future improvements include:

- 🎙️ Personalized voice messages
- 📸 Brother/Sister photo integration
- 🎨 More Rakhi designs
- 🎵 Additional original Rakhi music
- 🌐 Multi-language support
- ✨ More realistic Rakhi animations
- 🎁 More Shagun options
- 📜 Customizable Sibling Agreement
- 💌 Voice-based sibling messages
- 🎉 Festival-specific themes

---

# 👩‍💻 Developed By

## ❤️ Roma Gupta

Created with love to celebrate the beautiful bond between brothers and sisters.

> **"Rakhi sirf ek dhaaga nahi, ek rishta hai jo dil se bandha hai."** ❤️

---

# 🪷 Happy Raksha Bandhan

**Bhai-Behen ka rishta —  
thoda pyaar, thodi masti, aur bahut saari yaadein. ❤️**

**Happy Raksha Bandhan! 🪷✨**

---

## GitHub Repository Details

### Description

> 🪷 A heartfelt Digital Rakhi experience with Aarti, Tilak, Mithai, Rakhi tying animation, Shagun, sibling messages & a final Sibling Agreement. ❤️

### Topics

```text
nextjs
react
typescript
digital-rakhi
raksha-bandhan
rakhi
sibling-bond
responsive-design
mobile-friendly
web-app
```

### License

**MIT License**
