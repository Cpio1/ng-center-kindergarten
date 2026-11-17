/** Узнаваемый знак WhatsApp: облачко сообщения с телефонной трубкой. */
export function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      focusable={false}
      viewBox="0 0 24 24"
      className={className}
      fill="none"
    >
      <path
        d="M12 2.6a9.4 9.4 0 0 0-8.1 14.2L2.6 21.4l4.7-1.2A9.4 9.4 0 1 0 12 2.6z"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinejoin="round"
      />
      <path
        d="M8.6 7.4c.3-.3.8-.3 1 .1l.9 2c.1.3 0 .6-.2.8l-.6.6c.6 1.3 1.9 2.6 3.2 3.2l.6-.6c.2-.2.5-.3.8-.2l2 .9c.4.2.4.7.1 1l-.8.9c-.5.5-1.3.7-2 .4-2.3-.9-4.1-2.7-5-5-.3-.7-.1-1.5.4-2z"
        fill="currentColor"
      />
    </svg>
  );
}
