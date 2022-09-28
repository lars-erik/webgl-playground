import {
    Scene,
    OrthographicCamera,
    WebGLRenderer,
    Vector2,
    Mesh,
    PlaneGeometry,
    ShaderMaterial,
    DoubleSide,
    Clock,
} from "three";

function resize() {
    renderer.setSize(container.clientWidth, container.clientHeight);
}

function animate() {
    requestAnimationFrame(animate);
    mat.uniforms.u_time.value += clock.getDelta();
    mat.uniforms.u_speed.value = document.getElementById("speed").value;
    renderer.render(scene, camera);
}

const scene = new Scene();
const camera = new OrthographicCamera(-1, 1, 1, -1, 0, 1);
const renderer = new WebGLRenderer();

const geo = new PlaneGeometry(2, 2);
const mat = new ShaderMaterial(
    {
        side: DoubleSide,
        vertexShader: `
        varying vec2 vUv;
        void main () {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position.xyz, 1.0);
        }
        `,
        fragmentShader: `
        #define PI 3.14

        uniform float u_time;
        uniform float u_speed;

        varying vec2 vUv;

        void main () {
            vec3 color = vec3(0.0);
            
            float speed = u_time * u_speed;

            color.r = abs(sin(vUv.x + speed));
            color.g = abs(cos(vUv.y + speed));
            color.b = abs(sin(vUv.y + speed));
            
            gl_FragColor = vec4(color, 1.0);
        }
        `,
        // The uniforms allow us to send values down into the shader
        uniforms: {
            // Here is how we define a float value
            u_time: { value: 0 },
            u_speed: { value: 0 },
            u_resolution: { value: new Vector2() }
        }
    }
);
const plane = new Mesh(geo, mat);
scene.add(plane);

camera.position.z = .2;

const clock = new Clock();

const container = document.querySelector("#shader");

container.appendChild(renderer.domElement);
window.addEventListener("resize", resize);

resize();
animate();
