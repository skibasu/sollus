export function FooterLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      className="footer-link"
    >
      {label}
      <span
        aria-hidden="true"
        className="footer-link-highlight"
      >
        {label}
      </span>
    </a>
  );
}
