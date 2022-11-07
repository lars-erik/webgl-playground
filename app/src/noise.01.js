import basicVertex from './basic.vertex.glsl';
import fragment from './noise.01.fragment.glsl';

const materialOptions = {
    vertexShader: basicVertex,
    fragmentShader: fragment,
    uniforms: {
        u_time: { value: 0 },
        u_speed: { value: 1.0 },
        scale: { value: 1.0 }
    }
}

function buildGui(gui, mat) {
    gui.add(mat.uniforms.u_speed, 'value', 0.1, 5.0, .1).name('Speed');
    gui.add(mat.uniforms.scale, 'value', 0.1, 20.0, .1).name('Scale');
}

export default {
    materialOptions,
    buildGui
}