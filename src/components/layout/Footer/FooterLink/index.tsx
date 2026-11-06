export function FooterLink({ href, label }: { href: string; label: string }) {
  // TODO: Use next/link for internal footer links when their destination routes are added.
  return (
    <a
      href={href}
      className="footer-link"
    >
      {label}
    </a>
  );
}
