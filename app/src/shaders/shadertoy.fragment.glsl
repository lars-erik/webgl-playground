uniform float u_time;
uniform float u_speed;
uniform vec3 iResolution;

varying vec2 fragCoord;

void main () {
    vec3 uv = vec3(fragCoord, 0.); // vec3((fragCoord-.5*iResolution.xy)/iResolution.y, 0);
    vec3 color = vec3(0.0);
    
    float speed = u_time * u_speed;

    color.r = abs(sin(uv.x + speed));
    color.g = abs(cos(uv.y + speed));
    color.b = abs(sin(uv.y + speed));
    
    gl_FragColor = vec4(color, 1.0);
}