export const VERTEX_SHADER = `#version 300 es
void main() {
  vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2));
  gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0);
}`;

export const FRAGMENT_SHADER = `#version 300 es
precision highp float;
uniform float u_time;
uniform vec2 u_resolution;
uniform float u_intensity;
uniform sampler2D u_atlas;
out vec4 fragColor;

vec3 sampleFrame(float frame, vec2 uv) {
  vec2 tile = vec2(mod(frame, 10.0), floor(frame / 10.0));
  // Stay inside each tile's texel centers during linear filtering.
  vec2 pixel = tile * vec2(116.0, 41.0) + 0.5 + uv * vec2(115.0, 40.0);
  return texture(u_atlas, pixel / vec2(1160.0, 369.0)).rgb;
}

vec3 sampleSequence(float frame, vec2 uv) {
  float position = min(frame, 85.0);
  float first = floor(position);
  return mix(sampleFrame(first, uv), sampleFrame(min(first + 1.0, 85.0), uv), fract(position));
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution;
  float aspect = u_resolution.x / u_resolution.y;
  uv.x = (uv.x - 0.5) * clamp(aspect / 2.83, 0.65, 1.0) + 0.5;
  uv.y = 1.0 - uv.y;

  // The first 18 frames overlap the end of the take.
  const float OVERLAP_FRAMES = 18.0;
  const float LOOP_FRAMES = 68.0;
  float frame = mod(u_time * 15.0, LOOP_FRAMES) + OVERLAP_FRAMES;
  vec3 color = sampleSequence(frame, uv);
  if (frame >= LOOP_FRAMES) {
    float incomingFrame = frame - LOOP_FRAMES;
    float x = incomingFrame / OVERLAP_FRAMES;
    // Quintic easing keeps the fade's velocity and acceleration zero at both ends.
    float blend = x * x * x * (x * (6.0 * x - 15.0) + 10.0);
    color = mix(color, sampleSequence(incomingFrame, uv), blend);
  }
  vec3 base = mix(vec3(0.094), vec3(0.067), uv.y);
  fragColor = vec4(clamp(base + (color - base) * u_intensity, 0.0, 1.0), 1.0);
}`;

// Background-only frames reconstructed from the Stager reference.
export const ATLAS_URL = "/images/waves-atlas.png";
