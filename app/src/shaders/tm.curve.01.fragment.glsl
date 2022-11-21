uniform float u_time;
uniform float u_speed;
uniform vec3 iResolution;
uniform int type;

varying vec2 fragCoord;

float line(vec2 uv) {
    float dist = smoothstep(.0, .005, abs(uv.y));
    return dist;
}

float tmStep(vec2 uv) {
    return step(0.005, abs(uv.y));
}

#define PULSE(a, b, x) (step(a, x) - step(b, x))
float pulse(vec2 uv) {
    return 1.-PULSE(.0, .5, uv.y);
}

float run(vec2 uv) {
    switch(type) {
        case 1: return line(uv);
        case 2: return tmStep(uv);
        case 3: return pulse(uv);
        case 4: return clamp(abs(uv.y), .0, .5);
    }
    return 0.;
}

void main () {
    vec2 uv = (fragCoord-.5) * iResolution.xy/iResolution.y*2.;
    vec3 color = vec3(0.0);

    float col = run(uv);
    color = vec3(col);

    gl_FragColor = vec4(color, 1.0);
}