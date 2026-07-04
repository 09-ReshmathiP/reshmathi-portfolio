import emailjs from "@emailjs/browser";

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID as string | undefined;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string | undefined;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string | undefined;

export function isEmailJsConfigured(): boolean {
  return Boolean(SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY);
}

export interface ContactFormParams {
  name: string;
  email: string;
  message: string;
}

/**
 * Sends via EmailJS if VITE_EMAILJS_* env vars are set (see .env.example).
 * Until then, isEmailJsConfigured() returns false and the Contact section
 * falls back to a mailto: link — a real, working delivery path with zero
 * signup, rather than a submit button that silently does nothing.
 */
export async function sendContactEmail(params: ContactFormParams) {
  if (!isEmailJsConfigured()) {
    throw new Error("EmailJS is not configured");
  }
  return emailjs.send(
    SERVICE_ID!,
    TEMPLATE_ID!,
    { from_name: params.name, from_email: params.email, message: params.message },
    { publicKey: PUBLIC_KEY! }
  );
}
