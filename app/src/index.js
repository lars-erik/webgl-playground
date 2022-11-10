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

import shaders from './shaders';

const container = document.querySelector("#shader");

const current = {
    shader: 'noise03'
};

const defaultUniforms = {
    u_time: { value: 0 },
    iResolution: { value: [container.clientWidth, container.clientHeight, 0]}
};

let shader = shaders[current.shader];
let gui = new GUI();
let mat = {};

function resize() {
    renderer.setSize(container.clientWidth, container.clientHeight);
}

function animate() {
    requestAnimationFrame(animate);
    mat.uniforms.u_time.value = clock.getElapsedTime();
    mat.uniforms.iResolution.value = [container.clientWidth, container.clientHeight, 0];
    renderer.render(scene, camera);
}

function createMaterial() {
    const opts = Object.assign(
        {
            side: DoubleSide
        },
        shader.materialOptions
    );
    Object.assign(opts.uniforms, defaultUniforms);
    
    return new ShaderMaterial(opts);
}

const scene = new Scene();
const camera = new OrthographicCamera(-1, 1, 1, -1, 0, 1);
const renderer = new WebGLRenderer();

const geo = new PlaneGeometry(2, 2);

mat = createMaterial();
const plane = new Mesh(geo, mat);
scene.add(plane);

const clock = new Clock();
clock.start();

function shaderChanged(v) {
    shader = shaders[v];
    gui.destroy();
    gui = new GUI();
    gui.add(current, 'shader', Object.keys(shaders)).name('Shader').onChange(shaderChanged);
    mat = createMaterial();
    shader.buildGui(gui, mat);
    plane.material = mat;
}

gui.add(current, 'shader', Object.keys(shaders)).onChange(shaderChanged);
shader.buildGui(gui, mat);

container.appendChild(renderer.domElement);
window.addEventListener("resize", resize);

resize();
animate();
