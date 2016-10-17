/**
 * Created by Stig on 17.10.2016.
 */
"use strict"
let angle = 0.0;
let rotationSpeed = 1.0;
let program, gl;
function main() {
    let canvas = document.getElementById("webgl");

    gl = WebGLUtils.setupWebGL(canvas);

    program = initShaders(gl, "vertex-shader", "fragment-shader");

    let vertices = new Float32Array([
        -0.5, -0.5, 0.0,0.5, 0.5,-0.5
    ]);

    let bufferId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);

    gl.useProgram(program);
    let a_Position = gl.getAttribLocation(program, "a_Position");
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0,0);
    gl.enableVertexAttribArray(a_Position);
    gl.clearColor(0.0,0.0,0.0,1.0);

    render();

}

function render() {
    angle += rotationSpeed;
    let cosB = Math.cos(radians(angle));
    let sinB = Math.sin(radians(angle));

    let rotationMatrix = new Float32Array([
        cosB, 0.0, sinB, 0.0,
        0.0,1.0, 0.0, 0.0,
        -sinB, 0.0, cosB, 0.0,
        0.0, 0.0, 0.0, 1.0
    ]);

    let u_rotationMatrix = gl.getUniformLocation(program, "u_rotationMatrix");
    gl.uniformMatrix4fv(u_rotationMatrix, false, rotationMatrix);


    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.drawArrays(gl.TRIANGLES, 0, 3);
    requestAnimationFrame(render);
}

main();
