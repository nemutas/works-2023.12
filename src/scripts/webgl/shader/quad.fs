precision mediump float;

uniform float uAspect;
uniform float uTime;
uniform float uProgress;

varying vec2 vUv;

#include './module/snoise.glsl'

float rand(vec2 n) {
  return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
}

void main() {
  float time = uTime * 0.05;
  vec2 uv = (vUv - 0.5) * vec2(uAspect * 0.8, 1.0) + 0.5;

  float n = snoise(vec3(uv * 1.5 - time, -time));
  n += snoise(vec3(uv * 4.0 - time, time)) * 0.3;
  n = smoothstep(-2.0, 5.0, n);

  float dist = distance(vUv, vec2(0.1, -0.2));
  dist = 1.0 - smoothstep(0.0, 1.2, dist);
  n *= dist;

  float r = rand(vUv * 100.0);
  n *= r * (1.0 - 0.85) + 0.85;
  
  gl_FragColor = vec4(vec3(n), 1.0);
}