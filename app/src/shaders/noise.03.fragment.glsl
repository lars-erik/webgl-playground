uniform float u_time;
uniform float u_speed;
uniform vec3 iResolution;
uniform float scale;
uniform int octaves;
uniform int repeats;
uniform bool turbulence;

varying vec2 fragCoord;

#include snoise.glsl;

float fbm (in vec3 st) {
    float value = 0.0;
    float amplitude = 1.;
    float total = 0.;

    for (int i = 0; i < octaves; i++) {
        total += amplitude;
        value += amplitude * snoise(st);
        st *= 2.;
        amplitude *= 0.5;
    }

    return value / total;
}

void main () {
    vec2 uv = (fragCoord-.5) * iResolution.xy/iResolution.y*2.;
    float time = u_time * u_speed;
    float dist = sqrt(uv.x*uv.x+uv.y*uv.y);

    uv *= scale;

    float mag = .2;

    float n = fbm(vec3(uv, time*.2));
    
    for (int i = 0; i<repeats; i++) {
      float ang = n * 3.141592;
      n = fbm(vec3(uv + vec2(cos(ang), sin(ang)) * n, time*.2));
    }

    if (turbulence) {
        n = abs(n);
    } else {
        n = n*.5 + .5;
    }

    vec3 color = vec3(n*.58, n*.65, n*.997);
    
    if (dist < (snoise(vec3(uv * vec2(1., 2.5), time*.2))+1.) * .5 && color.b > .3) {
      color.r *= 1. + (.9 - dist);
      color.b *= dist;
    }

    if (n > 1.) {
      color = vec3(0, 1, 0);
    } else if (n < 0.) {
      color = vec3(1, 0, 0);
    }

    gl_FragColor = vec4(color, 1.0);
}

