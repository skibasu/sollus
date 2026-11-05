import { ButtonLink } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { content } from "@/lib/content";
export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 bg-black px-6 py-24 text-center text-white">
      <Logo inverted />
      <p className="text-hero font-bold text-action">{content.notFound.code}</p>
      <h1 className="max-w-[40rem] text-hero-mobile font-bold md:text-hero">
        {content.notFound.title}
      </h1>
      <p className="max-w-[32rem] text-lead">{content.notFound.description}</p>
      <ButtonLink
        href="/"
        label={content.notFound.button}
      />
    </main>
  );
}
