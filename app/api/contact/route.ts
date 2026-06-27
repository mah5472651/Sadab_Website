import { NextResponse } from "next/server";

const WHATSAPP_NUMBER = "8801617893050";
const MAX_FIELD_LENGTH = 2000;

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  message?: unknown;
};

function cleanText(value: unknown, maxLength = MAX_FIELD_LENGTH) {
  return String(value || "")
    .replace(/[\u0000-\u001F\u007F]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function buildWhatsAppUrl(name: string, email: string, message: string) {
  const text = [
    "Hello Mufidujjaman, I want to start a video editing project.",
    "",
    `Name: ${name}`,
    `Email: ${email}`,
    "",
    `Message: ${message}`
  ].join("\n");

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

export async function POST(request: Request) {
  let payload: ContactPayload;

  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ message: "Invalid form data." }, { status: 400 });
  }

  const name = cleanText(payload.name, 120);
  const email = cleanText(payload.email, 180).toLowerCase();
  const message = cleanText(payload.message, MAX_FIELD_LENGTH);

  if (!name || !email || !message) {
    return NextResponse.json(
      { message: "Please fill in your name, email, and message." },
      { status: 400 }
    );
  }

  if (!isEmail(email)) {
    return NextResponse.json(
      { message: "Please enter a valid email address." },
      { status: 400 }
    );
  }

  return NextResponse.json({
    message: "WhatsApp is ready with your message.",
    whatsappUrl: buildWhatsAppUrl(name, email, message)
  });
}
