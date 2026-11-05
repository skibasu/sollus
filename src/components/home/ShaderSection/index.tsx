import { ButtonLink } from "@/components/ui/Button";
import { content } from "@/lib/content";
export function ShaderSection() {
  return <section className="shader-section" aria-labelledby="shader-heading">
    <div className="shader-content">
      <h2 id="shader-heading">{content.shader.title}</h2>
      <ButtonLink href="#" label={content.shader.button} />
      <p>{content.shader.subtitle}</p>
    </div>
  </section>;
}
