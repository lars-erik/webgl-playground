import basicVertex from './basic.vertex.glsl';
import fragment from './noise.02.fragment.glsl';

const materialOptions = {
    vertexShader: basicVertex,
    fragmentShader: fragment,
    uniforms: {
        u_time: { value: 0 },
        u_speed: { value: .3 },
        scale: { value: 2.2 },
        octaves: { value: 4.0 },
        startAmp: { value: .7 },
        shift: { value: .5 },
        turbulence: { value: false }
    }
}

function buildGui(gui, mat) {
    gui.add(mat.uniforms.u_speed, 'value', 0.1, 5.0, .1).name('Speed');
    gui.add(mat.uniforms.scale, 'value', 0.1, 20.0, .1).name('Scale');
    gui.add(mat.uniforms.octaves, 'value', 1.0, 10.0, 1).name('Octaves');
    gui.add(mat.uniforms.startAmp, 'value', 0.0, 1.0, .1).name('Start amplitude');
    gui.add(mat.uniforms.shift, 'value', 0.0, 1.0, .01).name('Shift');
    gui.add(mat.uniforms.turbulence, 'value').name('Turbulence');
}

export default {
    materialOptions,
    buildGui
}