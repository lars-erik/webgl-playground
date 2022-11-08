import basicVertex from './basic.vertex.glsl';
import defaultFragment from './shadertoy.fragment.glsl';

const materialOptions = {
    vertexShader: basicVertex,
    fragmentShader: defaultFragment,
    uniforms: {
        u_time: { value: 0 },
        u_speed: { value: 1.0 }
    }
}

function buildGui(gui, mat) {
    gui.add(mat.uniforms.u_speed, 'value', 0.1, 5.0, .1).name('Speed');
}

export default {
    materialOptions,
    buildGui
}