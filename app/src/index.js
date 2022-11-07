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
import { GUI } from 'dat.gui';

import basicVertex from './basic.vertex.glsl';
import defaultFragment from './shadertoy.fragment.glsl';
import shadertoyDefault from './shadertoy.default';
import noise01 from './noise.01';

const shader = noise01;

function resize() {
    renderer.setSize(container.clientWidth, container.clientHeight);
}

function animate() {
    requestAnimationFrame(animate);
    mat.uniforms.u_time.value = clock.getElapsedTime();
    mat.uniforms.iResolution.value = [container.clientWidth, container.clientHeight, 0];
    renderer.render(scene, camera);
}

const container = document.querySelector("#shader");
const scene = new Scene();
const camera = new OrthographicCamera(-1, 1, 1, -1, 0, 1);
const renderer = new WebGLRenderer();

const geo = new PlaneGeometry(2, 2);
const defaultUniforms = {
    u_time: { value: 0 },
    iResolution: { value: [container.clientWidth, container.clientHeight, 0]}
};
const opts = Object.assign(
    {
        side: DoubleSide
    },
    shader.materialOptions
);
Object.assign(opts.uniforms, defaultUniforms);

const mat = new ShaderMaterial(opts);
const plane = new Mesh(geo, mat);
scene.add(plane);

const clock = new Clock();
clock.start();

const gui = new GUI();
shader.buildGui(gui, mat);

container.appendChild(renderer.domElement);
window.addEventListener("resize", resize);

resize();
animate();
