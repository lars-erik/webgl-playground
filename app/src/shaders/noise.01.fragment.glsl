uniform float u_time;
uniform float u_speed;
uniform vec3 iResolution;
uniform float scale;
uniform int octaves;
uniform bool turbulence;

varying vec2 fragCoord;

#include snoise.glsl;

float fbm (in vec3 st) {
    // Initial values
    float value = 0.0;
    float amplitude = 1.0;
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

    float n = fbm(vec3(uv, time*.2));
    if (turbulence) {
        n = abs(n);
    } else {
        n = n*.5 + .5;
    }
    vec3 color = vec3(n);
    
    gl_FragColor = vec4(color, 1.0);
}

