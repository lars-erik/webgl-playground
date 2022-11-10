uniform float u_time;
uniform float u_speed;
uniform vec3 iResolution;
uniform float scale;
uniform int octaves;
uniform bool turbulence;
uniform float shift;
uniform float startAmp;

varying vec2 fragCoord;

#include snoise.glsl;

float fbm (in vec3 st) {
    // Initial values
    float value = 0.0;
    float amplitude = startAmp;
    float frequency = 0.;

    // Loop of octaves
    for (int i = 0; i < octaves; i++) {
        value += amplitude * snoise(st);
        st *= 2.;
        amplitude *= .5;
    }
    return value;
}

void main () {
    vec2 uv = (fragCoord-.5) * iResolution.xy/iResolution.y*2.;
    float time = u_time * u_speed;

    uv *= scale;

    float mag = .2;

    float n = fbm(vec3(uv, time*.2));
    n = fbm(vec3(uv - time*.2, n * mag + time*.1));
    n = fbm(vec3(uv - time*.4, n * mag + time*.2));

    if (turbulence) {
        n = abs(n);
    } else {
        n = n*.5 + .5;
    }

    n = pow(n, shift + fragCoord.y * (1.-shift));
    n *= 1. - fragCoord.y;

    vec3 color = vec3(n*.98, n*.95, n*.997);
    
    gl_FragColor = vec4(color, 1.0);
}

