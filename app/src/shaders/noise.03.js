import basicVertex from './basic.vertex.glsl';
import fragment from './noise.03.fragment.glsl';

const materialOptions = {
    vertexShader: basicVertex,
    fragmentShader: fragment,
    uniforms: {
        u_time: { value: 0 },
        u_speed: { value: 0.3 },
        scale: { value: 7.2 },
        repeats: { value: 1 },
        octaves: { value: 4 },
        turbulence: { value: false }
    }
}

function buildGui(gui, mat) {
    gui.add(mat.uniforms.u_speed, 'value', 0, 5.0, .1).name('Speed');
    gui.add(mat.uniforms.scale, 'value', 0.1, 20.0, .1).name('Scale');
    gui.add(mat.uniforms.repeats, 'value', 0., 10.0, 1).name('Repeats');
    gui.add(mat.uniforms.octaves, 'value', 1.0, 10.0, 1).name('Octaves');
    gui.add(mat.uniforms.turbulence, 'value').name('Turbulence');
}

export default {
    materialOptions,
    buildGui
}