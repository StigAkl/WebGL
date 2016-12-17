/**
 * Created by Stig on 16.12.2016.
 */

let gl, program;
let angle = 0.0;

let modelMatrixLoc;
function main() {

    //Setup
    let canvas = document.getElementById("webgl");
    gl = WebGLUtils.setupWebGL(canvas);
    program = initShaders(gl, "vertex-shader", "fragment-shader");

    //Punkter for trekant
    let vertices = new Float32Array([
        0.0, 0.5,
        -0.5, -0.5,
        0.5, -0.5
    ]);

    //Trekantens farge i RGB
    let color = new Float64Array([
        0.0,1.0,0.0,1.0
    ]);


    //Sender data til shadere
    gl.useProgram(program);
    let u_FragColor = gl.getUniformLocation(program, "u_FragColor");
    gl.uniform4f(u_FragColor, color[0], color[1], color[2], color[3]);

    let bufferId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    let a_Position = gl.getAttribLocation(program, "a_Position");
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(a_Position);

    modelMatrixLoc = gl.getUniformLocation(program, "modelMatrix");

    //Setter canvas-farge og rendrer
    gl.clearColor(0.0,0.0,0.0,1.0);
    render();
}

function render() {

    gl.clear(gl.COLOR_BUFFER_BIT);
    angle += 1.0;
    let modelMatrix = rotate(angle, [0,1,0]);

    gl.uniformMatrix4fv(modelMatrixLoc, false, flatten(modelMatrix));
    gl.drawArrays(gl.TRIANGLES, 0, 3);

    requestAnimationFrame(render);
}

window.addEventListener("DOMContentLoaded", main, true);