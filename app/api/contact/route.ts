import { NextResponse } from "next/server";

export const runtime = "nodejs";

const GOOGLE_SHEET_ID = "18GT314uSKw1Lt4x87DB81_OE8JxCrbE9_PSjy0vzF80";
const MAX_FIELD_LENGTH = 2000;
const CONTACT_EMAIL = "msadab2005@gmail.com";

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

function buildEmailFallbackUrl(name: string, email: string, message: string) {
  const subject = encodeURIComponent(`New project inquiry from ${name}`);
  const body = encodeURIComponent(
    [`Name: ${name}`, `Email: ${email}`, "", message].join("\n")
  );

  return `https://mail.google.com/mail/?view=cm&fs=1&to=${CONTACT_EMAIL}&su=${subject}&body=${body}`;
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

  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;

  if (!webhookUrl) {
    return NextResponse.json(
      {
        message:
          "Google Sheets is not connected yet. You can send this message by email instead.",
        sheetConnected: false,
        fallbackUrl: buildEmailFallbackUrl(name, email, message)
      }
    );
  }

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      sheetId: GOOGLE_SHEET_ID,
      submittedAt: new Date().toISOString(),
      name,
      email,
      message
    }),
    cache: "no-store"
  });

  if (!response.ok) {
    return NextResponse.json(
      { message: "Unable to submit right now. Please try again later." },
      { status: 502 }
    );
  }

  return NextResponse.json({ message: "Message sent successfully.", sheetConnected: true });
}
