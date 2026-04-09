import Link from "next/link";

export function WhatsAppFloat() {
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "+919999999999";
  const href = `https://wa.me/${phone.replace(/[^\d]/g, "")}`;

  return (
    <Link
      href={href}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-6 right-6 z-[115] inline-flex items-center gap-2 rounded-full bg-[#1da851] px-5 py-3 text-[14px] font-semibold text-white shadow-[0_8px_24px_rgba(29,168,81,0.15)] transition duration-300 hover:scale-[1.04] hover:shadow-[0_8px_32px_rgba(29,168,81,0.25)] max-md:bottom-20"
      style={{ animation: "fadeUp 600ms var(--ease-spring) 1.6s both" }}
      aria-label="Chat on WhatsApp"
    >
      <svg viewBox="0 0 32 32" className="h-5 w-5 fill-current" aria-hidden="true">
        <path d="M19.11 17.33c-.29-.14-1.69-.83-1.95-.92-.26-.1-.45-.14-.64.15-.19.29-.73.92-.9 1.11-.17.19-.33.22-.62.07-.29-.14-1.22-.45-2.33-1.43-.86-.77-1.44-1.72-1.61-2.01-.17-.29-.02-.45.13-.6.13-.13.29-.33.43-.5.14-.17.19-.29.29-.48.1-.19.05-.36-.02-.5-.07-.14-.64-1.55-.88-2.12-.23-.55-.47-.48-.64-.49l-.55-.01c-.19 0-.5.07-.76.36-.26.29-1 1-.96 2.44.05 1.43 1 2.81 1.14 3 .14.19 1.95 2.98 4.73 4.18.66.29 1.18.46 1.59.59.67.21 1.29.18 1.78.11.54-.08 1.69-.69 1.92-1.35.24-.67.24-1.24.17-1.35-.07-.12-.26-.19-.55-.33Z" />
        <path d="M16.01 3.2c-7.06 0-12.77 5.72-12.77 12.77 0 2.25.59 4.45 1.7 6.38L3 29l6.86-1.8a12.72 12.72 0 0 0 6.15 1.58h.01c7.05 0 12.78-5.72 12.78-12.77 0-3.42-1.33-6.63-3.75-9.05A12.68 12.68 0 0 0 16.01 3.2Zm0 23.42h-.01a10.6 10.6 0 0 1-5.4-1.49l-.39-.23-4.07 1.07 1.09-3.96-.25-.41a10.59 10.59 0 0 1 1.64-13.23A10.53 10.53 0 0 1 16.01 5.4c2.84 0 5.5 1.1 7.5 3.11a10.54 10.54 0 0 1 3.1 7.5c0 5.84-4.76 10.61-10.6 10.61Z" />
      </svg>
      WhatsApp
    </Link>
  );
}
