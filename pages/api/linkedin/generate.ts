import type { NextApiRequest, NextApiResponse } from 'next';

const REBELROOT_PRESETS: Record<string, { title: string; link: string; description: string; commentary: string }> = {
  omnibrowser: {
    title: 'Omni Browser by RebelRoot — Fast & Private Android Web Browser',
    link: 'https://www.rebelroot.xyz/omnibrowser',
    description: 'Built on Mozilla GeckoView with built-in uBlock Origin, offline translation & hardware vault.',
    commentary: `🌐 Take back control of your mobile web experience with Omni Browser by REBELROOT!

Built for speed, privacy, and digital sovereignty:
🔒 Hardware-Backed Safe Locker (AES-256 GCM encrypted vault with biometrics)
🔌 Native Firefox WebExtensions support (uBlock Origin, Violentmonkey)
🧠 On-device offline page translation (Google ML Kit, 14 languages)
📺 Hardware ExoPlayer video player with stream sniffer & Picture-in-Picture
🎨 Real-time custom CSS site styling engine (OLED Black, Sepia, Grayscale)

100% Free and Open Source under GPLv3 with zero ads & zero telemetry.

👉 Learn more and download the latest release: https://www.rebelroot.xyz/omnibrowser

#REBELROOT #OmniBrowser #OpenSource #Android #Privacy #WebDev #CyberSecurity`,
  },
  mocnovel: {
    title: 'MOCNovel — Decentralized Publishing for Independent Authors',
    link: 'https://www.rebelroot.xyz/mocnovel',
    description: 'Zero ads, zero fees, zero tracking publishing platform connecting authors directly with readers.',
    commentary: `📖 Re-imagining digital publishing for independent creators with MOCNovel by REBELROOT!

Connecting authors directly with their audience without middleman paywalls or telemetry:
🤖 Conversational novel discovery assistant powered by Llama 3.3 70B
💬 Real-time chapter feeds & live community chat
🔒 Client-side encrypted sync & offline-ready library cache
✍️ Markdown-friendly distraction-free writer workspace

Zero ads. Zero tracking. 100% author sovereignty.

👉 Check out the platform: https://www.rebelroot.xyz/mocnovel

#REBELROOT #MOCNovel #Publishing #Authors #WritingCommunity #OpenSource`,
  },
  campcart: {
    title: 'CampCart — Secure Campus Peer-to-Peer Exchange Marketplace',
    link: 'https://www.rebelroot.xyz/campcart',
    description: 'Edge-deployed student-to-student trading network for textbooks, dorm gear & electronics.',
    commentary: `🛒 Trade textbooks, dorm gear, and electronics safely with CampCart by REBELROOT!

A secure campus marketplace designed exclusively for university students:
🎓 Verified .edu student network verification
💳 Escrow settlement protection via Stripe & Juspay SDKs
💬 Live WebSocket chat for instant negotiations & safe zone meetups

Trade smart. Save money. Stay safe on campus.

👉 Explore CampCart: https://www.rebelroot.xyz/campcart

#REBELROOT #CampCart #StudentMarketplace #CampusLife #Fintech #PeerToPeer`,
  },
  mocoffice: {
    title: 'MOC Office — Privacy-First Offline PDF & Document Suite',
    link: 'https://www.rebelroot.xyz/mocoffice',
    description: '12 built-in offline document utilities including merge, split, compress, lock/unlock & OCR.',
    commentary: `📄 Privacy-first document editing in your pocket with MOC Office by REBELROOT!

100% offline document toolkit with zero tracking or server uploads:
🛠️ 12+ built-in utilities: PDF Merge, Split, Compress, Lock & Unlock
🔍 On-device ML Kit text extraction & OCR
🔐 Biometric passcode encryption for sensitive documents

Everything stays strictly on your physical device.

👉 Read the official announcement: https://www.rebelroot.xyz/mocoffice

#REBELROOT #MOCOffice #PDFTools #Privacy #AndroidDev #Productivity`,
  },
  rootlock: {
    title: 'RootLock — Native Per-App Security Engine for Android',
    link: 'https://www.rebelroot.xyz/rootlock',
    description: 'Hardened C++17 native security engine for locking individual Android applications.',
    commentary: `🔐 Protect your sensitive Android apps with RootLock by REBELROOT!

Per-app security backed by a hardened C++17 native security engine:
🛡️ Hardware KeyStore credentials vault
👆 Biometric fingerprint & stealth PIN lock screens
⚡ Sub-millisecond app interception with zero battery drain

Digital sovereignty starts on your home screen.

👉 Learn more about RootLock: https://www.rebelroot.xyz/rootlock

#REBELROOT #RootLock #AndroidSecurity #CyberSecurity #CPlusPlus #OpenSource`,
  },
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { presetKey } = req.body;

  if (presetKey && REBELROOT_PRESETS[presetKey]) {
    return res.status(200).json({ success: true, post: REBELROOT_PRESETS[presetKey] });
  }

  return res.status(400).json({ error: 'Invalid or missing preset key' });
}
