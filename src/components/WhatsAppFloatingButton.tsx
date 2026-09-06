import { getTranslations } from "next-intl/server";
import { whatsappLink } from "@/lib/business";

export async function WhatsAppFloatingButton() {
  const t = await getTranslations("whatsapp");

  return (
    <a
      href={whatsappLink(t("prefilledMessage"))}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t("floatingButtonLabel")}
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/20 transition-transform hover:scale-105 focus-visible:scale-105 sm:h-16 sm:w-16"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 32 32"
        className="h-7 w-7 sm:h-8 sm:w-8"
        fill="currentColor"
      >
        <path d="M16.04 3.5c-6.9 0-12.5 5.6-12.5 12.5 0 2.2.58 4.35 1.68 6.24L3.5 28.5l6.46-1.7a12.44 12.44 0 0 0 6.08 1.55h.01c6.9 0 12.5-5.6 12.5-12.5s-5.6-12.35-12.51-12.35Zm0 22.87h-.01a10.4 10.4 0 0 1-5.3-1.45l-.38-.22-3.83 1 1.02-3.74-.25-.38a10.36 10.36 0 0 1-1.59-5.53c0-5.73 4.66-10.39 10.4-10.39 2.78 0 5.39 1.08 7.35 3.05a10.32 10.32 0 0 1 3.04 7.35c0 5.73-4.67 10.31-10.45 10.31Zm5.7-7.72c-.31-.16-1.84-.91-2.13-1.01-.29-.1-.5-.16-.7.16-.21.31-.8 1.01-.98 1.22-.18.21-.36.23-.67.08-.31-.16-1.32-.49-2.51-1.56-.93-.83-1.56-1.85-1.74-2.16-.18-.31-.02-.48.14-.63.14-.14.31-.36.47-.55.16-.18.21-.31.31-.52.1-.21.05-.39-.03-.55-.08-.16-.7-1.7-.96-2.32-.25-.61-.51-.53-.7-.53h-.6c-.21 0-.55.08-.83.39-.29.31-1.09 1.06-1.09 2.6 0 1.53 1.12 3.01 1.27 3.22.16.21 2.2 3.37 5.34 4.72.75.32 1.33.51 1.78.66.75.24 1.43.2 1.97.13.6-.09 1.84-.75 2.1-1.48.26-.72.26-1.34.18-1.47-.08-.13-.28-.21-.59-.36Z" />
      </svg>
    </a>
  );
}
