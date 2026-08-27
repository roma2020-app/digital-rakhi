"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import html2canvas from "html2canvas";

type Screen =
  | "welcome"
  | "names"
  | "rakhi"
  | "message"
  | "preview"
  | "send"
  | "brother"
  | "tie"
  | "rules"
  | "accepted"
  | "shagun"
  | "agreement";

const rakhiOptions = [
  {
    id: "traditional",
    image: "/rakhi/om-rakhi.jpg",
    name: "ॐ Rakhi",
    emoji: "🕉️",
    color: "#8B1E2D",
  },
  {
    id: "love",
    image: "/rakhi/love-rakhi.jpg",
    name: "Love Rakhi",
    emoji: "❤️",
    color: "#C94C5A",
  },
  {
    id: "royal",
    image: "/rakhi/swastik-rakhi.jpg",
    name: "Swastik Rakhi",
    emoji: "🪷",
    color: "#B68A35",
  },
];

function makeRakhiLink(
  brother: string,
  sister: string,
  rakhiId: string,
  message: string
) {
  if (typeof window === "undefined") return "";

  const payload = btoa(
    encodeURIComponent(
      JSON.stringify({
        brother,
        sister,
        rakhiId,
        message,
      })
    )
  );

  return `${window.location.origin}/?rakhi=${payload}`;
}

function makeAgreementLink(
  brother: string,
  sister: string,
  shagun: string,
  brotherMessage: string
) {
  if (typeof window === "undefined") return "";

  const payload = btoa(
    encodeURIComponent(
      JSON.stringify({
        brother,
        sister,
        shagun,
        brotherMessage,
      })
    )
  );

  return `${window.location.origin}/?agreement=${payload}`;
}

function decodeRakhiLink(payload: string) {
  try {
    return JSON.parse(decodeURIComponent(atob(payload))) as {
      brother: string;
      sister: string;
      rakhiId: string;
      message: string;
    };
  } catch {
    return null;
  }
}

function decodeAgreementLink(payload: string) {
  try {
    return JSON.parse(decodeURIComponent(atob(payload))) as {
      brother: string;
      sister: string;
      shagun: string;
      brotherMessage: string;
    };
  } catch {
    return null;
  }
}

export default function Home() {
  const [screen, setScreen] = useState<Screen>("welcome");
  const [brother, setBrother] = useState("");
  const [sister, setSister] = useState("");
  const [selectedRakhi, setSelectedRakhi] = useState(rakhiOptions[0]);
  const [message, setMessage] = useState("");
  const [shagun, setShagun] = useState("");
  const [brotherMessage, setBrotherMessage] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [music, setMusic] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [ritualStep, setRitualStep] = useState<
    "aarti" | "tilak" | "mithai" | "aashirwaad" | "rakhi" | "tying"
  >("aarti");
  const [mithaiFed, setMithaiFed] = useState(false);
  const [blessingTaken, setBlessingTaken] = useState(false);

  const [rakhiLink, setRakhiLink] = useState("");
  const [linkCopied, setLinkCopied] = useState(false);
  const [agreementLink, setAgreementLink] = useState("");
  const [agreementCopied, setAgreementCopied] = useState(false);
  const agreementCardRef = useRef<HTMLDivElement | null>(null);
  const [imageGenerating, setImageGenerating] = useState(false);
  const [imageGenerated, setImageGenerated] = useState(false);

  useEffect(() => {
    if (screen === "tie") {
      setRitualStep("aarti");
      setMithaiFed(false);
      setBlessingTaken(false);
    }
  }, [screen]);

  const startMusic = async () => {
    try {
      if (!audioRef.current) return;
      await audioRef.current.play();
      setMusic(true);
    } catch (error) {
      console.log("Music needs a user interaction or the audio file is missing.", error);
      setMusic(false);
    }
  };

  const stopMusic = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setMusic(false);
  };

  const toggleMusic = async () => {
    if (!audioRef.current) return;

    try {
      if (audioRef.current.paused) {
        await audioRef.current.play();
        setMusic(true);
      } else {
        audioRef.current.pause();
        setMusic(false);
      }
    } catch (error) {
      console.log("Unable to play music.", error);
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const agreementPayload = params.get("agreement");
    if (agreementPayload) {
      const agreement = decodeAgreementLink(agreementPayload);
      if (agreement) {
        setBrother(agreement.brother || "");
        setSister(agreement.sister || "");
        setShagun(agreement.shagun || "");
        setBrotherMessage(agreement.brotherMessage || "");
        setScreen("agreement");
        return;
      }
    }

    const rakhiPayload = params.get("rakhi");
    if (!rakhiPayload) return;

    const data = decodeRakhiLink(rakhiPayload);
    if (!data) return;

    setBrother(data.brother || "");
    setSister(data.sister || "");
    setMessage(data.message || "Happy Raksha Bandhan Bhai ❤️");

    const selected = rakhiOptions.find((item) => item.id === data.rakhiId);
    if (selected) setSelectedRakhi(selected);

    // A shared Rakhi link always opens directly on the Brother side.
    setScreen("brother");
  }, []);

  const next = (nextScreen: Screen) => {
    setScreen(nextScreen);
  };

  const createShareLink = () => {
    const link = makeRakhiLink(
      brother,
      sister,
      selectedRakhi.id,
      message || "Happy Raksha Bandhan Bhai ❤️"
    );
    setRakhiLink(link);
    return link;
  };

  const copyRakhiLink = async () => {
    const link = rakhiLink || createShareLink();

    try {
      await navigator.clipboard.writeText(link);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2200);
    } catch {
      window.prompt("Copy this Rakhi link:", link);
    }
  };

  const shareOnWhatsApp = () => {
    const link = rakhiLink || createShareLink();

    const text =
      `🪷 ${sister} ki taraf se ek special Rakhi ❤️\n\n` +
      `${brother}, tumhare liye Rakhi ready hai! 😄\n\n` +
      `Link kholo aur Aarti, Tilak, Rakhi aur baaki special moments complete karo:\n` +
      `${link}`;

    window.open(
      `https://wa.me/?text=${encodeURIComponent(text)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const generateAgreementImage = async () => {
    if (!agreementCardRef.current) return;

    setImageGenerating(true);
    setImageGenerated(false);

    try {
      const canvas = await html2canvas(agreementCardRef.current, {
        backgroundColor: "#fff9f0",
        scale: Math.min(2, Math.max(1.5, window.devicePixelRatio || 1.5)),
        useCORS: true,
        logging: false,
        scrollX: 0,
        scrollY: -window.scrollY,
        windowWidth: document.documentElement.clientWidth,
        windowHeight: document.documentElement.scrollHeight,
      });

      const link = document.createElement("a");
      link.download = `Sibling-Agreement-${sister || "Sister"}-${brother || "Bhai"}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();

      setImageGenerated(true);
    } catch (error) {
      console.error("Agreement image generation failed:", error);
      alert("Agreement image generate nahi ho paayi. Please try again.");
    } finally {
      setImageGenerating(false);
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        loop
        preload="auto"
        onError={() => {
          console.error(
            "Rakhi music could not be loaded. Put the MP3 in public/audio/."
          );
          setMusic(false);
        }}
      >
        {/* Supports both filenames used during the project. */}
        <source src="/audio/rakhi-theme.mp3" type="audio/mpeg" />
        <source src="/audio/rakhi-hindi-original-theme.mp3" type="audio/mpeg" />
      </audio>
      <main className="min-h-screen overflow-x-hidden bg-[#fff9f0] pb-4 text-[#2d2420]">
      <AnimatePresence mode="wait">

        {/* WELCOME */}
        {screen === "welcome" && (
          <motion.section
            key="welcome"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex min-h-screen flex-col items-center justify-center px-6 text-center"
          >
            <motion.div
              animate={{ y: [0, -10, 0], rotate: [-2, 2, -2] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="mb-8 text-8xl"
            >
              🪷
            </motion.div>

            <p className="mb-3 text-sm uppercase tracking-[0.35em] text-[#9b6b32]">
              A Digital Rakhi Experience
            </p>

            <h1 className="max-w-3xl text-5xl font-bold leading-tight text-[#7a1f2b] md:text-7xl">
              Meri Rakhi,
              <br />
              Mere Bhai Ke Naam ❤️
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-[#6b5b52]">
              Ek chhoti si Rakhi...
              <br />
              bahut saare pyaar ke saath.
            </p>

            <button
              onClick={() => next("names")}
              className="mt-10 rounded-full bg-[#7a1f2b] px-8 py-4 text-lg font-semibold text-white shadow-xl transition hover:scale-105"
            >
              Rakhi Banayein ❤️
            </button>

            <p className="mt-8 text-sm text-[#9b6b32]">
              Made with love for a very special bond
            </p>
          </motion.section>
        )}

        {/* NAMES */}
        {screen === "names" && (
          <motion.section
            key="names"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex min-h-screen items-center justify-center px-6 py-16 pb-24"
          >
            <div className="w-full max-w-lg">
              <div className="mb-10 text-center">
                <div className="mb-4 text-5xl">❤️</div>
                <h2 className="text-4xl font-bold text-[#7a1f2b]">
                  Ek chhoti si shuruaat...
                </h2>
                <p className="mt-4 text-[#6b5b52]">
                  Har Rakhi ke peeche do naam hote hain.
                </p>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="mb-2 block font-semibold">
                    Bhai ka naam
                  </label>
                  <input
                    value={brother}
                    onChange={(e) => setBrother(e.target.value)}
                    placeholder="Apne bhai ka naam..."
                    className="w-full rounded-2xl border border-[#e2cdbb] bg-white px-5 py-4 outline-none transition focus:border-[#7a1f2b] focus:ring-2 focus:ring-[#7a1f2b]/20"
                  />
                </div>

                <div>
                  <label className="mb-2 block font-semibold">
                    Aur ye Rakhi bhej kaun raha hai? 😊
                  </label>
                  <input
                    value={sister}
                    onChange={(e) => setSister(e.target.value)}
                    placeholder="Apna naam..."
                    className="w-full rounded-2xl border border-[#e2cdbb] bg-white px-5 py-4 outline-none transition focus:border-[#7a1f2b] focus:ring-2 focus:ring-[#7a1f2b]/20"
                  />
                </div>
              </div>

              <button
                disabled={!brother.trim() || !sister.trim()}
                onClick={() => next("rakhi")}
                className="mt-8 w-full rounded-2xl bg-[#7a1f2b] px-6 py-4 font-semibold text-white transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-40"
              >
                Hamari Rakhi Shuru Karein ❤️
              </button>
            </div>
          </motion.section>
        )}

        {/* RAKHI SELECT */}
        {screen === "rakhi" && (
          <motion.section
            key="rakhi"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen px-6 py-16"
          >
            <div className="mx-auto max-w-5xl text-center">
              <p className="text-sm uppercase tracking-[0.3em] text-[#9b6b32]">
                For {brother}
              </p>

              <h2 className="mt-3 text-4xl font-bold text-[#7a1f2b] md:text-5xl">
                Apni Rakhi Choose Karo 🪷
              </h2>

              <p className="mx-auto mt-4 max-w-xl text-[#6b5b52]">
                Jo Rakhi tumhe lage —
                <br />
                <b>“Ye mere bhai ke liye hai.”</b>
                <br />
                wahi select karo.
              </p>

              <div className="mt-12 grid gap-6 md:grid-cols-3">
                {rakhiOptions.map((rakhi) => (
                  <motion.button
                    key={rakhi.id}
                    whileHover={{ y: -8, scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setSelectedRakhi(rakhi)}
                    className={`rounded-3xl border-2 bg-white p-8 shadow-lg transition ${
                      selectedRakhi.id === rakhi.id
                        ? "border-[#d4a84f] shadow-[#d4a84f]/30"
                        : "border-transparent"
                    }`}
                  >
                    <div
                      className="mx-auto flex h-44 w-44 items-center justify-center overflow-hidden rounded-full border-4 border-white shadow-xl"
                      style={{
                        background: `radial-gradient(circle, white 20%, ${rakhi.color} 100%)`,
                      }}
                    >
                      <img
                        src={rakhi.image}
                        alt={rakhi.name}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    <h3 className="mt-6 text-xl font-bold">
                      {rakhi.name}
                    </h3>

                    {selectedRakhi.id === rakhi.id && (
                      <p className="mt-2 text-sm text-[#9b6b32]">
                        ✓ Selected
                      </p>
                    )}
                  </motion.button>
                ))}
              </div>

              <button
                onClick={() => next("message")}
                className="mt-12 rounded-full bg-[#7a1f2b] px-10 py-4 font-semibold text-white shadow-lg transition hover:scale-105"
              >
                Ye Wali Mere Bhai Ki Rakhi ❤️
              </button>
            </div>
          </motion.section>
        )}

        {/* MESSAGE */}
        {screen === "message" && (
          <motion.section
            key="message"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex min-h-screen items-center justify-center px-6 py-16 pb-24"
          >
            <div className="w-full max-w-2xl">
              <div className="text-center">
                <div className="text-6xl">💌</div>
                <h2 className="mt-5 text-4xl font-bold text-[#7a1f2b]">
                  Bhai ke liye kuch dil se likho...
                </h2>
                <p className="mt-4 text-[#6b5b52]">
                  Jo saamne bolna mushkil hota hai,
                  <br />
                  shayad yahan likhna easy ho. ❤️
                </p>
              </div>

              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Bhai, bas itna kehna hai..."
                className="mt-10 h-48 w-full resize-none rounded-3xl border border-[#e2cdbb] bg-white p-6 outline-none focus:border-[#7a1f2b] focus:ring-2 focus:ring-[#7a1f2b]/20"
              />

              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {[
                  "❤️ Hamesha khush rehna",
                  "🫶 Always there for you",
                  "😂 Pareshan karte rahungi",
                  "🥹 Bachpan ki yaadein hamesha rahengi",
                ].map((text) => (
                  <button
                    key={text}
                    onClick={() => setMessage(text)}
                    className="rounded-full border border-[#e2cdbb] bg-white px-4 py-2 text-sm hover:bg-[#fff0e5]"
                  >
                    {text}
                  </button>
                ))}
              </div>

              <button
                onClick={() => next("preview")}
                className="mt-8 w-full rounded-2xl bg-[#7a1f2b] px-6 py-4 font-semibold text-white"
              >
                Rakhi Ready Hai ❤️
              </button>
            </div>
          </motion.section>
        )}

        {/* PREVIEW */}
        {screen === "preview" && (
          <motion.section
            key="preview"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex min-h-screen items-center justify-center px-6 py-16 pb-24"
          >
            <div className="w-full max-w-md rounded-[2rem] border border-[#d4a84f]/40 bg-white p-10 text-center shadow-2xl">
              <div className="text-7xl"><img src={selectedRakhi.image} alt={selectedRakhi.name} className="w-32 h-32 object-contain mx-auto" /></div>

              <p className="mt-8 text-xs uppercase tracking-[0.3em] text-[#9b6b32]">
                A Rakhi For
              </p>

              <h2 className="mt-2 text-4xl font-bold text-[#7a1f2b]">
                {brother}
              </h2>

              <p className="mt-3 text-sm text-[#6b5b52]">
                From {sister} ❤️
              </p>

              <div className="my-8 h-px bg-[#eadaca]" />

              <p className="text-lg italic text-[#5e5048]">
                “{message || "Happy Raksha Bandhan Bhai ❤️"}”
              </p>

              <button
                onClick={() => next("send")}
                className="mt-10 w-full rounded-2xl bg-[#7a1f2b] px-6 py-4 font-semibold text-white"
              >
                Rakhi Bhai Ko Bhejein 📱
              </button>
            </div>
          </motion.section>
        )}

        {/* SEND RAKHI - SISTER SIDE ENDS HERE */}
        {screen === "send" && (
          <motion.section
            key="send"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex min-h-screen items-center justify-center px-6 py-16 pb-24"
          >
            <div className="w-full max-w-2xl text-center">
              <motion.div
                animate={{ y: [0, -8, 0], rotate: [-3, 3, -3] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="text-7xl"
              >
                🪷
              </motion.div>

              <p className="mt-6 text-sm uppercase tracking-[0.3em] text-[#9b6b32]">
                Rakhi Ready Hai
              </p>

              <h2 className="mt-3 text-4xl font-bold text-[#7a1f2b] md:text-5xl">
                Ab Ye Rakhi Bhai Tak Pahunchni Chahiye ❤️
              </h2>

              <p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-[#5e5048]">
                {sister} ki Rakhi {brother} ke liye ready hai.
                <br />
                <b>Ab baaki kahaani Bhai ki kalai par likhi jayegi... 🪷</b>
              </p>

              <div className="mx-auto mt-10 max-w-xl rounded-[2rem] border border-[#d4a84f]/50 bg-white p-7 shadow-xl">
                <div className="text-5xl">📱</div>

                <h3 className="mt-4 text-2xl font-bold text-[#7a1f2b]">
                  Rakhi Bhai Ko Pyaar Se Bhejiye
                </h3>

                <p className="mt-3 text-sm leading-6 text-[#6b5b52]">
                  WhatsApp par bhejiye ya link copy karke {brother} ko send kariye.
                  <br />
                  Bhai link kholkar Aarti, Tilak, Rakhi, Shagun aur final
                  agreement complete karenge. ❤️
                </p>

                <div className="mt-7 grid gap-3 sm:grid-cols-2">
                  <button
                    type="button"
                    onClick={shareOnWhatsApp}
                    className="rounded-2xl bg-[#25D366] px-5 py-4 font-bold text-white shadow-lg transition hover:-translate-y-1"
                  >
                    💬 WhatsApp Par bhai ko Bhejiye
                  </button>

                  <button
                    type="button"
                    onClick={copyRakhiLink}
                    className="rounded-2xl border-2 border-[#7a1f2b] bg-white px-5 py-4 font-bold text-[#7a1f2b] transition hover:-translate-y-1"
                  >
                    {linkCopied ? "✅ Link Copied!" : "🔗 Link Copy Kariye"}
                  </button>
                </div>

                {rakhiLink && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-5 rounded-2xl bg-[#fff8ef] p-4 text-left"
                  >
                    <p className="text-xs font-semibold text-[#7a1f2b]">
                      Your Rakhi Link
                    </p>
                    <p className="mt-2 break-all text-xs leading-5 text-[#6b5b52]">
                      {rakhiLink}
                    </p>
                  </motion.div>
                )}
              </div>

              <div className="mx-auto mt-7 max-w-xl rounded-2xl bg-[#fff0e5] p-5">
                <p className="text-sm leading-6 text-[#7a1f2b]">
                  ❤️ <b>Rakhi bhej di? Bas.</b>
                  <br />
                  Ab Sister ki taraf se ceremony complete.
                  <br />
                  <b>Next step Bhai karenge. 😄</b>
                </p>
              </div>
            </div>
          </motion.section>
        )}

        {/* BROTHER WELCOME */}
        {screen === "brother" && (
          <motion.section
            key="brother"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex min-h-screen flex-col items-center justify-center px-6 text-center"
          >
            <div className="text-8xl">🪷</div>

            <p className="mt-8 text-sm uppercase tracking-[0.3em] text-[#9b6b32]">
              A Special Rakhi For You
            </p>

            <h2 className="mt-4 text-5xl font-bold text-[#7a1f2b]">
              {brother} ❤️
            </h2>

            <p className="mt-6 max-w-xl text-lg leading-8 text-[#6b5b52]">
              {sister} ne tumhare liye kuch bheja hai.
              <br />
              Is baar Rakhi thodi digital hai...
              <br />
              <b>but feelings bilkul real hain.</b>
            </p>

            <button
              onClick={() => {
                next("tie");
              }}
              className="mt-10 rounded-full bg-[#7a1f2b] px-10 py-5 text-lg font-bold text-white shadow-xl transition hover:scale-105"
            >
              🪷 Rakhi Kholiye
            </button>

            {music && (
              <p className="mt-5 text-sm text-[#9b6b32]">
                🎵 Music On
              </p>
            )}
          </motion.section>
        )}

        {/* TIE / FULL RAKSHA BANDHAN CEREMONY */}
        {screen === "tie" && (
          <motion.section
            key="tie"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#fffaf2] via-[#fff0df] to-[#f8dcc4] px-5 py-10 pb-28 text-center"
          >
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              {["🌸", "✨", "🌺", "🪷", "✨", "🌸"].map((item, i) => (
                <motion.span
                  key={i}
                  animate={{
                    y: [20, -120],
                    opacity: [0.15, 0.8, 0],
                    rotate: [0, 30, -20],
                  }}
                  transition={{
                    duration: 4 + i * 0.4,
                    repeat: Infinity,
                    delay: i * 0.5,
                  }}
                  className="absolute text-2xl"
                  style={{ left: `${8 + i * 16}%`, bottom: "-20px" }}
                >
                  {item}
                </motion.span>
              ))}
            </div>

            <button
              type="button"
              onClick={toggleMusic}
              className="absolute right-4 top-4 z-20 rounded-full border border-[#eadaca] bg-white/90 px-4 py-2 text-sm font-semibold text-[#7a1f2b] shadow-md backdrop-blur"
              aria-label={music ? "Pause music" : "Play music"}
            >
              {music ? "🔊 Music On" : "🔇 Music Off"}
            </button>

            <div className="relative z-10 mx-auto flex min-h-[calc(100vh-8rem)] max-w-3xl flex-col items-center justify-center">
              <p className="text-xs uppercase tracking-[0.3em] text-[#9b6b32]">
                {sister} ❤️ {brother}
              </p>

              <AnimatePresence mode="wait">
                {ritualStep === "aarti" && (
                  <motion.div
                    key="aarti"
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="w-full"
                  >
                    <h2 className="mt-4 text-4xl font-bold text-[#7a1f2b] md:text-5xl">
                      Pehle Ek Chhoti Si Aarti... 🪔
                    </h2>
                    <p className="mx-auto mt-4 max-w-xl leading-7 text-[#6b5b52]">
                      Bhai hai toh rasam bhi toh banti hai. ❤️
                      <br />
                      Thoda sa pyaar, thodi si Aarti...
                    </p>

                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                      className="mx-auto mt-10 flex h-64 w-64 items-center justify-center rounded-full bg-white shadow-2xl"
                    >
                      <div className="flex h-48 w-48 items-center justify-center rounded-full border-8 border-[#d4a84f]/50 bg-gradient-to-br from-[#fff8d8] to-[#f3c36a] text-8xl">
                        🪔
                      </div>
                    </motion.div>

                    <button
                      type="button"
                      onClick={() => setRitualStep("tilak")}
                      className="mt-8 rounded-full bg-[#7a1f2b] px-9 py-4 font-bold text-white shadow-lg transition hover:scale-105"
                    >
                      Aarti Sampann Hui ❤️
                    </button>
                  </motion.div>
                )}

                {ritualStep === "tilak" && (
                  <motion.div
                    key="tilak"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="w-full"
                  >
                    <h2 className="mt-4 text-4xl font-bold text-[#7a1f2b] md:text-5xl">
                      Ab Tilak Bhi Ho Jaye... 🌹
                    </h2>
                    <p className="mx-auto mt-4 max-w-xl leading-7 text-[#6b5b52]">
                      Thoda sa tika... aur Bhai ki VIP entry complete. 😄❤️
                    </p>

                    <div className="relative mx-auto mt-10 flex h-80 w-full max-w-md items-center justify-center overflow-hidden rounded-[3rem] border border-[#eadaca] bg-gradient-to-b from-[#fffdf9] to-[#fff1df] shadow-2xl">
                      {/* Bhai */}
                      <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="relative text-[10rem] leading-none"
                      >
                        👦

                        {/* Forehead tilak: appears exactly on the forehead */}
                        <motion.span
                          initial={{ opacity: 0, scaleY: 0, y: -5 }}
                          animate={{ opacity: 1, scaleY: 1, y: 0 }}
                          transition={{ delay: 1.15, duration: 0.8, ease: "easeOut" }}
                          className="absolute left-1/2 top-[20%] z-20 h-8 w-3 -translate-x-1/2 rounded-full bg-[#b32636] shadow-md"
                        />
                      </motion.div>

                      {/* Sister's hand applying tilak */}
                      <motion.div
                        initial={{ x: 75, y: 95, opacity: 0, rotate: 18 }}
                        animate={{ x: 25, y: 38, opacity: 1, rotate: 4 }}
                        transition={{ delay: 0.55, duration: 1.25, ease: "easeInOut" }}
                        className="absolute right-[19%] top-[18%] z-30 text-5xl"
                      >
                        ☝️
                      </motion.div>

                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.7, duration: 0.6 }}
                        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-sm font-semibold text-[#7a1f2b]"
                      >
                        🌹 Pyaar se Tilak lag gaya ❤️
                      </motion.p>
                    </div>

                    <p className="mt-6 font-semibold text-[#7a1f2b]">
                      Tilak lag gaya! ✨
                    </p>

                    <button
                      type="button"
                      onClick={() => setRitualStep("mithai")}
                      className="mt-7 rounded-full bg-[#7a1f2b] px-9 py-4 font-bold text-white shadow-lg transition hover:scale-105"
                    >
                      Tilak Bhi Ho Gaya 🌹
                    </button>
                  </motion.div>
                )}

                {ritualStep === "mithai" && (
                  <motion.div
                    key="mithai"
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="w-full"
                  >
                    <h2 className="mt-4 text-4xl font-bold text-[#7a1f2b] md:text-5xl">
                      🍬 Ab Mithai Lijiye, Bhai! ❤️
                    </h2>
                    <p className="mx-auto mt-4 max-w-xl leading-7 text-[#6b5b52]">
                      Rakhi ki ceremony mein mithai mandatory hai. 😄
                      <br />
                      <b>Kripya ek mithai zaroor lijiye. ❤️</b> ❤️
                    </p>

                    <div className="relative mx-auto mt-10 flex h-72 w-full max-w-lg items-center justify-center rounded-[3rem] border border-[#eadaca] bg-white shadow-2xl">
                      <motion.div
                        animate={
                          mithaiFed
                            ? { x: 100, y: -20, scale: 0.7, rotate: 15 }
                            : { y: [0, -8, 0] }
                        }
                        transition={
                          mithaiFed
                            ? { duration: 0.8 }
                            : { duration: 2, repeat: Infinity }
                        }
                        className="text-8xl"
                      >
                        🍬
                      </motion.div>
                      <div className="absolute bottom-7 text-6xl">
                        {mithaiFed ? "😋" : "👦"}
                      </div>
                    </div>

                    {!mithaiFed ? (
                      <button
                        type="button"
                        onClick={() => setMithaiFed(true)}
                        className="mt-8 rounded-full bg-[#7a1f2b] px-9 py-4 font-bold text-white shadow-lg transition hover:scale-105"
                      >
                        🍬 Mithai Lijiye, Bhai
                      </button>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-7"
                      >
                        <p className="font-bold text-[#7a1f2b]">
                          Mithai bhi ho gayi... ab ek pyari si smile bhi ho jaye. 😊❤️
                        </p>
                        <button
                          type="button"
                          onClick={() => setRitualStep("aashirwaad")}
                          className="mt-6 rounded-full bg-[#7a1f2b] px-9 py-4 font-bold text-white shadow-lg"
                        >
                          Mithai Le Lijiye ❤️
                        </button>
                      </motion.div>
                    )}
                  </motion.div>
                )}

                {ritualStep === "aashirwaad" && (
                  <motion.div
                    key="aashirwaad"
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="w-full"
                  >
                    <h2 className="mt-4 text-4xl font-bold text-[#7a1f2b] md:text-5xl">
                      😏 Bhai, ab ek chhoti si baat maan lijiye... ❤️
                    </h2>
                    <p className="mx-auto mt-4 max-w-xl text-lg leading-8 text-[#6b5b52]">
                      Mithai bhi kha li?
                      <br />
                      <b>Ab itna bhi khush mat ho jaiye, Bhai! 😄</b>
                      <br />
                      Ab zara Behen ka Aashirwaad bhi le lijiye. 🙏😌
                    </p>

                    <motion.div
                      animate={{ y: [0, -8, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="mx-auto mt-10 flex h-64 w-full max-w-lg items-center justify-center rounded-[3rem] border border-[#eadaca] bg-white shadow-2xl"
                    >
                      <div className="text-8xl">
                        {blessingTaken ? "🙏❤️" : "😏🙏"}
                      </div>
                    </motion.div>

                    {!blessingTaken ? (
                      <button
                        type="button"
                        onClick={() => setBlessingTaken(true)}
                        className="mt-8 rounded-full bg-[#7a1f2b] px-9 py-4 font-bold text-white shadow-lg transition hover:scale-105"
                      >
                        🙏 Behen Ka Aashirwaad Le Lijiye
                      </button>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mx-auto mt-7 max-w-xl"
                      >
                        <p className="font-semibold leading-7 text-[#7a1f2b]">
                          Khush rahiye, Bhai... ❤️
                          <br />
                          Hamesha haste rahiye, tarakki karte rahiye,
                          <br />
                          aur haan... apni Behen ko kabhi bhooliyega mat! 😊
                        </p>
                        <p className="mt-4 font-bold text-[#9b6b32]">
                          Aashirwaad toh dil se hai... ❤️
                          <br />
                          <span className="text-[#7a1f2b]">
                            aur Shagun ki umeed toh rahegi hi! 😄🎁
                          </span>
                        </p>

                        <button
                          type="button"
                          onClick={() => setRitualStep("rakhi")}
                          className="mt-7 rounded-full bg-[#7a1f2b] px-9 py-4 font-bold text-white shadow-lg transition hover:scale-105"
                        >
                          🪷 Ab Rakhi Baandhne Ka Pyaara Sa Pal Hai ❤️
                        </button>
                      </motion.div>
                    )}
                  </motion.div>
                )}

                {ritualStep === "rakhi" && (
                  <motion.div
                    key="rakhi"
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="w-full"
                  >
                    <h2 className="mt-4 text-4xl font-bold text-[#7a1f2b] md:text-5xl">
                      🪷 Ab Rakhi Bandhne Ka Time Hai
                    </h2>

                    <p className="mx-auto mt-4 max-w-xl leading-7 text-[#6b5b52]">
                      Bhai, kripya apni kalai aage kijiye... 😊
                      <br />
                      <b>Rakhi hum khud pyaar se baandh denge. ❤️</b>
                    </p>

                    <div className="relative mx-auto mt-9 h-[25rem] w-full max-w-xl overflow-hidden rounded-[3rem] border border-[#eadaca] bg-gradient-to-b from-white to-[#fff7ee] shadow-2xl">
                      {/* soft spotlight */}
                      <motion.div
                        animate={{ scale: [1, 1.08, 1], opacity: [0.35, 0.6, 0.35] }}
                        transition={{ duration: 2.5, repeat: Infinity }}
                        className="absolute left-1/2 top-8 h-40 w-40 -translate-x-1/2 rounded-full bg-[#f5d37c] blur-3xl"
                      />

                      {/* Brother */}
                      <div className="absolute left-1/2 top-6 -translate-x-1/2 text-7xl">
                        👦
                      </div>

                      {/* wrist / hand illustration */}
                      <div className="absolute bottom-8 left-1/2 h-32 w-[82%] -translate-x-1/2 rounded-[5rem] border-4 border-[#d8a86c] bg-gradient-to-r from-[#eeb98e] via-[#f6c9a2] to-[#e9ad80] shadow-inner">
                        <div className="absolute -right-5 top-1/2 h-24 w-20 -translate-y-1/2 rounded-r-[2.5rem] border-4 border-l-0 border-[#d8a86c] bg-[#efb98e]" />
                        <div className="absolute left-1/2 top-1/2 h-24 w-36 -translate-x-1/2 -translate-y-1/2 rounded-[2rem] border-2 border-[#e2a675]/40 bg-[#f3c29a]/50" />
                        <p className="absolute left-1/2 top-1/2 -translate-x-1/2 translate-y-7 whitespace-nowrap text-xs font-bold text-[#7a1f2b]">
                          🤲 Bhai Ki Kalai
                        </p>
                      </div>

                      {/* Rakhi resting above the wrist before animation */}
                      <motion.div
                        className="absolute left-1/2 z-20 flex h-24 w-24 -translate-x-1/2 items-center justify-center rounded-full border-4 border-[#d4a84f]/70 bg-white shadow-xl"
                        initial={{ top: "26%", scale: 0.8, opacity: 0.85 }}
                        animate={{ top: "57%", scale: 1, opacity: 1 }}
                        transition={{ duration: 0.9, ease: "easeInOut" }}
                      >
                      <img src={selectedRakhi.image} alt={selectedRakhi.name} className="w-32 h-32 object-contain mx-auto" />
                      </motion.div>

                      {/* Decorative thread guides */}
                      <div className="pointer-events-none absolute left-1/2 top-[58%] h-1 w-[62%] -translate-x-1/2 rounded-full bg-[#b1263a]/80" />
                      <div className="pointer-events-none absolute left-1/2 top-[58%] h-1 w-[62%] -translate-x-1/2 rotate-180 rounded-full bg-[#d4a84f]/60" />

                      <p className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xs font-medium text-[#9b6b32]">
                        ❤️ Bas ek click... phir Rakhi apne aap bandh jayegi
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        // IMPORTANT: play() is called directly inside the
                        // user's tap/click so mobile browsers allow audio.
                        const audio = audioRef.current;

                        if (audio) {
                          audio.currentTime = 0;
                          audio.volume = 1;

                          const playPromise = audio.play();

                          if (playPromise !== undefined) {
                            playPromise
                              .then(() => {
                                setMusic(true);
                              })
                              .catch((error) => {
                                console.error(
                                  "Rakhi music could not start:",
                                  error
                                );
                                setMusic(false);
                              });
                          }
                        }

                        setRitualStep("tying");

                        // Slow ceremony: music + animation stay together.
                        window.setTimeout(() => {
                          stopMusic();
                          next("rules");
                        }, 10500);
                      }}
                      className="mt-8 rounded-full bg-[#7a1f2b] px-10 py-4 text-base font-bold text-white shadow-xl transition hover:scale-105"
                    >
                      🪷 Rakhi Baandh Lijiye ❤️
                    </button>
                  </motion.div>
                )}

                {ritualStep === "tying" && (
                  <motion.div
                    key="tying"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="w-full"
                  >
                    <h2 className="mt-4 text-4xl font-bold text-[#7a1f2b] md:text-5xl">
                      ❤️ Rakhi Baandh Rahe Hain...
                    </h2>

                    <p className="mx-auto mt-3 max-w-xl text-[#6b5b52]">
                      Dheere se... pyaar se... bilkul asli Rakhi ki tarah. 🪷
                    </p>

                    {!music && (
                      <button
                        type="button"
                        onClick={() => {
                          const audio = audioRef.current;
                          if (!audio) return;
                          audio.currentTime = 0;
                          audio.volume = 1;
                          audio
                            .play()
                            .then(() => setMusic(true))
                            .catch((error) =>
                              console.error("Music playback failed:", error)
                            );
                        }}
                        className="mb-4 rounded-full border-2 border-[#7a1f2b] bg-white px-7 py-3 font-bold text-[#7a1f2b] shadow-md"
                      >
                        🎵 Play Rakhi Music
                      </button>
                    )}

                    <div className="relative mx-auto mt-8 h-[30rem] w-full max-w-xl overflow-hidden rounded-[3rem] border border-[#eadaca] bg-gradient-to-b from-white via-[#fff8ee] to-[#fde8d5] shadow-2xl">
                      {/* glow */}
                      <motion.div
                        initial={{ scale: 0.6, opacity: 0 }}
                        animate={{ scale: [0.8, 1.2, 0.95], opacity: [0, 0.7, 0.25] }}
                        transition={{ duration: 4.5 }}
                        className="absolute left-1/2 top-[36%] h-52 w-52 -translate-x-1/2 rounded-full bg-[#f5c96c] blur-3xl"
                      />

                      {/* smiling brother */}
                      <motion.div
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute left-1/2 top-5 -translate-x-1/2 text-7xl"
                      >
                        👦
                      </motion.div>

                      {/* forearm */}
                      <div className="absolute bottom-10 left-1/2 h-36 w-[86%] -translate-x-1/2 rounded-[5rem] border-4 border-[#d8a86c] bg-gradient-to-r from-[#e9ad80] via-[#f6c9a2] to-[#eab184] shadow-inner">
                        <div className="absolute -right-5 top-1/2 h-28 w-24 -translate-y-1/2 rounded-r-[3rem] border-4 border-l-0 border-[#d8a86c] bg-[#efb98e]" />
                      </div>

                      {/* thread wrapping around wrist */}
                      <motion.div
                        initial={{ scaleX: 0, opacity: 0 }}
                        animate={{ scaleX: 1, opacity: 1 }}
                        transition={{ delay: 1.2, duration: 1.4 }}
                        className="absolute bottom-[7.2rem] left-1/2 h-5 w-[68%] -translate-x-1/2 rounded-full border-2 border-[#8e1c2d] bg-[#c52e45] shadow-md"
                      />

                      {/* second thread crossing */}
                      <motion.div
                        initial={{ width: 0, opacity: 0, rotate: -12 }}
                        animate={{ width: "62%", opacity: 1, rotate: 12 }}
                        transition={{ delay: 2.6, duration: 1.5 }}
                        className="absolute bottom-[7.4rem] left-1/2 h-3 -translate-x-1/2 rounded-full bg-[#e0ad42]"
                      />

                      {/* Rakhi moving into position */}
                      <motion.div
                        initial={{ top: "24%", scale: 0.65, rotate: -12, opacity: 0.9 }}
                        animate={{
                          top: "67%",
                          scale: [0.65, 1.05, 1],
                          rotate: [-12, 8, 0],
                          opacity: 1,
                        }}
                        transition={{
                          duration: 1.7,
                          ease: "easeInOut",
                          times: [0, 0.75, 1],
                        }}
                        className="absolute left-1/2 z-30 flex h-28 w-28 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-4 border-[#d4a84f] bg-white shadow-2xl"
                      >
                      <img src={selectedRakhi.image} alt={selectedRakhi.name} className="w-32 h-32 object-contain mx-auto" />
                      </motion.div>

                      {/* looping thread around the rakhi */}
                      <motion.div
                        initial={{ opacity: 0, rotate: -35, scale: 0.7 }}
                        animate={{
                          opacity: [0, 1, 1, 0],
                          rotate: [-35, 25, -20, 0],
                          scale: [0.7, 1.1, 1.05, 1],
                        }}
                        transition={{ delay: 3.4, duration: 2.4 }}
                        className="absolute bottom-[6.1rem] left-1/2 z-20 h-36 w-64 -translate-x-1/2 rounded-full border-8 border-[#b1263a]/80"
                      />

                      {/* knot */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0, rotate: -25 }}
                        animate={{ opacity: 1, scale: [0, 1.25, 1], rotate: 0 }}
                        transition={{ delay: 5.8, duration: 1.2 }}
                        className="absolute bottom-[6rem] left-1/2 z-40 flex -translate-x-1/2 items-center justify-center"
                      >
                        <span className="text-5xl">🪢</span>
                      </motion.div>

                      {/* bow ends */}
                      <motion.div
                        initial={{ opacity: 0, scaleX: 0 }}
                        animate={{ opacity: 1, scaleX: 1 }}
                        transition={{ delay: 7.0, duration: 1.0 }}
                        className="absolute bottom-[4.7rem] left-1/2 z-30 h-12 w-52 -translate-x-1/2"
                      >
                        <span className="absolute left-0 top-1/2 -translate-y-1/2 -rotate-12 text-4xl">
                          🎀
                        </span>
                        <span className="absolute right-0 top-1/2 -translate-y-1/2 rotate-12 text-4xl">
                          🎀
                        </span>
                      </motion.div>

                      {/* celebration */}
                      {["✨", "🌸", "❤️", "✨", "🌺"].map((item, i) => (
                        <motion.span
                          key={i}
                          initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                          animate={{
                            opacity: [0, 1, 0],
                            scale: [0.4, 1.2, 0.6],
                            x: (i - 2) * 70,
                            y: -90 - Math.abs(i - 2) * 20,
                          }}
                          transition={{ delay: 8.0 + i * 0.18, duration: 1.6 }}
                          className="absolute left-1/2 top-[58%] z-50 text-3xl"
                        >
                          {item}
                        </motion.span>
                      ))}

                      <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 8.7, duration: 1 }}
                        className="absolute bottom-5 left-1/2 w-[88%] -translate-x-1/2 text-center text-base font-bold leading-6 text-[#7a1f2b] md:text-lg"
                      >
                        🪷 Rakhi bandh gayi... dil bhi jud gaya. ❤️
                        <br />
                        <span className="text-sm font-semibold text-[#9b6b32]">
                          Rakhi Accepted! ✨
                        </span>
                      </motion.p>
                    </div>

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 4.1 }}
                      className="mt-7 text-sm font-medium text-[#9b6b32]"
                    >
                      ✨ Ek rishta kalai par... aur ek dil mein. ❤️
                    </motion.div>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>
          </motion.section>
        )}

        {/* RULES */}
        {screen === "rules" && (
          <motion.section
            key="rules"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen px-6 py-12"
          >
            <div className="mx-auto max-w-2xl">
              <div className="text-center">
                <div className="text-6xl">😄</div>
                <h2 className="mt-4 text-4xl font-bold text-[#7a1f2b]">
                  Bhai Sahab, Kuch Rules Hain
                </h2>
                <p className="mt-3 text-[#6b5b52]">
                  Rakhi baandh di hai...
                  <br />
                  ab kuch baatein maan ni bhi padengi. 😉
                </p>
              </div>

              <div className="mt-10 space-y-4">
                {[
                  "📱 Behen ka call ignore nahi karna.",
                  "🤫 Behen ke secrets safe rakhna.",
                  "❤️ Zarurat mein hamesha saath dena.",
                  "😂 Fight allowed hai, relationship cancellation nahi.",
                  "🍕 Food sharing rules apply.",
                  "🎁 Rakhi ka Digital Shagun dena padega.",
                  "♾️ Ye relationship lifetime valid hai.",
                ].map((rule, index) => (
                  <div
                    key={index}
                    className="rounded-2xl border border-[#eadaca] bg-white p-5 shadow-sm"
                  >
                    <b>Rule #{index + 1}</b>
                    <p className="mt-1 text-[#5e5048]">{rule}</p>
                  </div>
                ))}
              </div>

              <label className="mt-8 flex cursor-pointer items-center gap-3 rounded-2xl bg-[#fff0e5] p-5">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="h-5 w-5"
                />
                <span className="text-sm font-medium">
                  Maine saare rules padh liye hain. ❤️
                </span>
              </label>

              <button
                disabled={!agreed}
                onClick={() => next("accepted")}
                className="mt-6 w-full rounded-2xl bg-[#7a1f2b] px-6 py-5 text-lg font-bold text-white disabled:cursor-not-allowed disabled:opacity-40"
              >
                ❤️ Rakhi Accept Hai
              </button>
            </div>
          </motion.section>
        )}

        {/* ACCEPTED - BROTHER SIDE */}
        {screen === "accepted" && (
          <motion.section
            key="accepted"
            initial={{ opacity: 0, scale: 0.75 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex min-h-screen flex-col items-center justify-center px-6 py-16 pb-24 text-center"
          >
            <motion.div
              animate={{ scale: [1, 1.12, 1] }}
              transition={{ duration: 1.8, repeat: Infinity }}
              className="text-7xl"
            >
              ✨
            </motion.div>

            <h2 className="mt-6 text-5xl font-bold text-[#7a1f2b]">
              Rakhi Accepted! ❤️
            </h2>

            <p className="mt-5 max-w-xl text-lg leading-8 text-[#5e5048]">
              {sister} ki Rakhi officially accepted by {brother}. 💕
              <br />
              <b>Ab bhai ki baari hai! 🎁</b>
            </p>

            <div className="mt-8 text-6xl">🪷</div>

            <p className="mt-5 max-w-lg text-[#6b5b52]">
              Rakhi accept ho gayi...
              <br />
              ab bachpan ke hisaab aur Shagun ki baari. 😄
            </p>

            <button
              type="button"
              onClick={() => next("shagun")}
              className="mt-9 rounded-full bg-[#7a1f2b] px-10 py-4 font-bold text-white shadow-lg transition hover:scale-105"
            >
              Ab Meri Baari 🎁
            </button>
          </motion.section>
        )}

        {/* SHAGUN */}
        {screen === "shagun" && (
          <motion.section
            key="shagun"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex min-h-screen items-center justify-center px-6 py-16 pb-24"
          >
            <div className="w-full max-w-xl text-center">
              <div className="text-7xl">🎁</div>

              <h2 className="mt-6 text-4xl font-bold text-[#7a1f2b] md:text-5xl">
                Ab Bachpan Ka Hisaab Chukane Ki Baari... 😏
              </h2>

              <p className="mt-5 leading-8 text-[#6b5b52]">
                Rakhi {sister} ne bheji... ❤️
                <br />
                Ab bhai ki taraf se <b>Shagun toh banta hai!</b> 🎁
                <br />
                Waise yaad hai...
                <br />
                <b>bachpan mein meri chocolate bhi tum kha jaate the? 😂</b>
                <br />
                Ab thoda interest ke saath wapas karo. 😜
              </p>

              <div className="mt-8">
                <h3 className="text-xl font-bold text-[#7a1f2b]">
                  🥹 Pehle Kuch Purani Yaadein Yaad Kar Lo...
                </h3>

                <div className="mt-5 grid gap-3 text-left sm:grid-cols-2">
                  {[
                    ["🍫", "Chocolate", "Meri chocolate ka aadha hissa hamesha tumhara kaise ho jaata tha? 😂"],
                    ["📺", "TV Remote", "Remote ke liye ladai... aur mummy ke saamne dono innocent. 😂"],
                    ["🛏️", "Room Ki Ladai", "Ek room, do log aur unlimited fights. 😤😂"],
                    ["🤫", "Secrets", "Tum meri secrets jaante ho... isliye tumse panga nahi le sakti. 😏"],
                    ["👩‍👧", "Mummy Ki Daant", "Galti kisi ki bhi ho... daant dono ko padti thi. 😂"],
                    ["🎒", "Bachpan", "Mera samaan tumhara, tumhara samaan bhi tumhara. Ye rule kisne banaya tha? 😒"],
                  ].map(([emoji, title, text]) => (
                    <motion.div
                      key={title}
                      whileHover={{ y: -3 }}
                      className="rounded-2xl border border-[#eadaca] bg-white p-4 shadow-sm"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{emoji}</span>
                        <span className="font-bold text-[#7a1f2b]">{title}</span>
                      </div>
                      <p className="mt-2 text-sm leading-6 text-[#6b5b52]">
                        {text}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="mt-10">
                <h3 className="text-xl font-bold text-[#7a1f2b]">
                  🎁 Ab batao bhai...
                </h3>
                <p className="mt-2 text-[#6b5b52]">
                  Itni purani yaadon ke baad{" "}
                  <b>Shagun kitna banta hai? 😜</b>
                </p>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4">
                {[
                  ["₹501", "Chalo, shuruaat achhi hai 😄"],
                  ["₹1,001", "Ab lag raha hai bhai ho ❤️"],
                  ["₹2,001", "Bachpan ka interest bhi diya 👑😂"],
                  ["❤️ Apni Marzi", "Amount nahi, dil dekha hai ❤️"],
                ].map(([amount, caption]) => (
                  <motion.button
                    key={amount}
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShagun(amount)}
                    className={`rounded-2xl border-2 bg-white p-5 text-center transition ${
                      shagun === amount
                        ? "border-[#d4a84f] bg-[#fff7e6] shadow-md"
                        : "border-[#eadaca]"
                    }`}
                  >
                    <div className="font-bold">{amount}</div>
                    <div className="mt-2 text-xs leading-5 text-[#7b6a60]">
                      {caption}
                    </div>
                  </motion.button>
                ))}
              </div>

              {shagun && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-5 rounded-2xl bg-[#fff0e5] p-4 text-sm font-medium text-[#7a1f2b]"
                >
                  {shagun === "₹501" &&
                    "Hmm... bhai ne minimum legal limit toh cross kar di. 😂"}
                  {shagun === "₹1,001" &&
                    "Aaj lag raha hai meri parvarish successful thi. 😌❤️"}
                  {shagun === "₹2,001" &&
                    "Bhai ho toh aisa! 👑😂"}
                  {shagun === "❤️ Apni Marzi" &&
                    "Amount nahi dekha... dil dekha hai. ❤️"}
                </motion.div>
              )}

              <div className="mt-9">
                <h3 className="text-xl font-bold text-[#7a1f2b]">
                  💌 Ek baat aur...
                </h3>
                <p className="mt-2 text-[#6b5b52]">
                  Bachpan mein jo nahi bol paaye, <b>aaj bol do.</b>
                  <br />
                  Ya phir bas ek line likho jo sirf hum dono samajhte hain. ❤️
                </p>
              </div>

              <textarea
                value={brotherMessage}
                onChange={(e) => setBrotherMessage(e.target.value)}
                placeholder="“Yaad hai jab hum dono ne mummy se... 😂”"
                className="mt-5 h-32 w-full resize-none rounded-2xl border border-[#e2cdbb] bg-white p-5 outline-none focus:border-[#7a1f2b] focus:ring-2 focus:ring-[#7a1f2b]/20"
              />

              <p className="mt-4 text-sm italic text-[#8b7b70]">
                “Bachpan mein tum meri chocolates lete the...
                <br />
                aaj main tumhara Shagun le rahi hoon. 😌😂”
              </p>

              <button
                disabled={!shagun}
                onClick={() => next("agreement")}
                className="mt-7 w-full rounded-2xl bg-[#7a1f2b] px-6 py-4 font-bold text-white shadow-lg transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-40"
              >
                Shagun Aur Message Bhej Do ❤️
              </button>
            </div>
          </motion.section>
        )}

        {/* AGREEMENT - BROTHER SIDE */}
        {screen === "agreement" && (
          <motion.section
            key="agreement"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex min-h-screen items-center justify-center px-6 py-16 pb-24"
          >
            <div className="w-full max-w-2xl rounded-[2rem] border-2 border-[#d4a84f] bg-white p-8 text-center shadow-2xl md:p-12">
              {/* ONLY this inner card is converted to the shareable PNG.
                  Buttons, link, status text and sharing instructions are
                  deliberately outside this ref. */}
              <div
                ref={agreementCardRef}
                className="pb-10 md:pb-14"
              >
                <div className="text-6xl">🤝</div>

                <h2 className="mt-5 text-4xl font-bold text-[#7a1f2b]">
                  Sibling Agreement ❤️
                </h2>

                <p className="mt-2 text-lg text-[#9b6b32]">
                  Bhai-Behen Ka Lifetime Agreement
                </p>

                <div className="my-8 flex items-center justify-center gap-4 text-2xl font-bold">
                  <span>{sister}</span>
                  <span>❤️</span>
                  <span>{brother}</span>
                </div>

                <div className="grid gap-3 text-left">
                  <div className="rounded-xl bg-[#fff8ef] p-4">
                    🪷 Rakhi — <b>Accepted ✓</b>
                  </div>
                  <div className="rounded-xl bg-[#fff8ef] p-4">
                    🎁 Shagun — <b>{shagun}</b>
                  </div>
                  <div className="rounded-xl bg-[#fff8ef] p-4 text-left">
                    <div className="font-semibold text-[#7a1f2b]">
                      💌 Bhai ka Message
                    </div>
                    <div className="mt-3 rounded-xl border border-[#eadaca] bg-white p-4 text-base leading-7 text-[#5e5048]">
                      “{brotherMessage.trim() || "Dil ki baat likhna reh gaya... par pyaar hamesha rahega. ❤️"}”
                    </div>
                  </div>
                  <div className="rounded-xl bg-[#fff8ef] p-4">
                    ♾️ Validity — <b>Lifetime</b>
                  </div>
                </div>

                <div className="my-10 border-y border-[#eadaca] py-8">
                  <p className="text-lg italic leading-8 text-[#5e5048]">
                    “Rakhi ek din ki hoti hai...
                    <br />
                    par bhai-behen ka rishta lifetime ka hota hai.” ❤️
                  </p>
                </div>

                <div className="mt-9 text-3xl">🪷❤️♾️</div>

                <p className="mt-4 text-sm text-[#8b7b70]">
                  With all my ❤️, for a bond that lasts forever — Roma Gupta 🪷
                </p>
              </div>

              {/* UI controls stay outside the image area */}
              <div className="mt-8 border-t border-[#eadaca] pt-7">
                <h3 className="text-2xl font-bold text-[#7a1f2b]">
                  Ab ye Agreement Sister ko bhejo 💌
                </h3>

              <p className="mt-3 text-sm leading-6 text-[#6b5b52]">
                {sister} ko WhatsApp par completed Sibling Agreement bhejo.
                <br />
                Ye final moment dono ke paas rahega. ❤️
              </p>

              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={async () => {
                    const link = makeAgreementLink(
                      brother,
                      sister,
                      shagun,
                      brotherMessage
                    );
                    setAgreementLink(link);

                    const text =
                      `🤝 Our Sibling Agreement is Official! ❤️\n\n` +
                      `${sister} ❤️ ${brother}\n\n` +
                      `🪷 Rakhi — Accepted ✓\n` +
                      `🎁 Shagun — ${shagun}\n` +
                      `💌 Bhai ka Message — ${brotherMessage || "Dil se, Bhai ❤️"}\n` +
                      `♾️ Validity — Lifetime\n\n` +
                      `“Rakhi ek din ki hoti hai... par bhai-behen ka rishta lifetime ka hota hai.” ❤️\n\n` +
                      `Happy Raksha Bandhan! 🪷❤️\n\n` +
                      `Open your completed Sibling Agreement:\n${link}`;

                    window.open(
                      `https://wa.me/?text=${encodeURIComponent(text)}`,
                      "_blank",
                      "noopener,noreferrer"
                    );

                    await generateAgreementImage();
                  }}
                  className="rounded-2xl bg-[#25D366] px-5 py-4 font-bold text-white shadow-lg transition hover:-translate-y-1"
                >
                  💬 WhatsApp Share + Agreement Image
                </button>

                <button
                  type="button"
                  onClick={async () => {
                    const link = makeAgreementLink(
                      brother,
                      sister,
                      shagun,
                      brotherMessage
                    );
                    setAgreementLink(link);

                    try {
                      await navigator.clipboard.writeText(link);
                      setAgreementCopied(true);
                      setTimeout(() => setAgreementCopied(false), 2200);
                    } catch {
                      window.prompt("Copy this Agreement link:", link);
                    }
                  }}
                  className="rounded-2xl border-2 border-[#7a1f2b] bg-white px-5 py-4 font-bold text-[#7a1f2b] transition hover:-translate-y-1"
                >
                  {agreementCopied
                    ? "✅ Agreement Link Copied!"
                    : "🔗 Agreement Link Copy Karo"}
                </button>
              </div>

              <button
                type="button"
                onClick={generateAgreementImage}
                disabled={imageGenerating}
                className="mt-4 w-full rounded-2xl border border-[#d4a84f] bg-[#fff8ef] px-5 py-3 font-semibold text-[#7a1f2b] transition hover:bg-[#fff0df] disabled:opacity-60"
              >
                {imageGenerating
                  ? "🖼️ Agreement Image Bana Rahe Hain..."
                  : imageGenerated
                    ? "✅ Agreement Image Generated"
                    : "🖼️ Agreement Image Banayein"}
              </button>

              {agreementLink && (
                <div className="mt-5 rounded-xl bg-[#fff8ef] p-3 text-left">
                  <p className="break-all text-xs leading-5 text-[#6b5b52]">
                    {agreementLink}
                  </p>
                </div>
              )}
              </div>
            </div>
          </motion.section>
        )}

      </AnimatePresence>
      </main>

      <footer className="border-t border-[#eadaca]/70 bg-[#fff9f0] px-4 py-4 text-center">
        <p className="text-xs tracking-wide text-[#8b7b70]">
          Made with <span className="text-[#7a1f2b]">❤️</span> by{" "}
          <span className="font-semibold text-[#7a1f2b]">
            Roma Gupta
          </span>{" "}
          <span aria-hidden="true">🪷</span>
        </p>
      </footer>
    </>
  );
}
