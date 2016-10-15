/**
 * Created by Stig on 15.10.2016.
 */
"use strict"

let program, gl;
let rotationSpeed = 1.0;
let angle = 0.0;
function main() {
    let canvas = document.getElementById("webgl");

    gl = WebGLUtils.setupWebGL(canvas);
    program  = initShaders(gl, "vertex-shader", "fragment-shader");

    let vertices = new Float32Array([
        //x, y
        -0.5, -0.5,
        0.0, 0.5,
        0.5, -0.5
    ]);

    let bufferId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    gl.useProgram(program);

    let a_Position = gl.getAttribLocation(program, "a_Position");
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0,0);
    gl.enableVertexAttribArray(a_Position);

    gl.clearColor(0.0,0.0,0.0,1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    document.getElementById("hastighet").innerHTML=rotationSpeed;
    render();
}

function render() {
    angle += rotationSpeed;
    let radian = Math.PI * angle / 180.0;
    let cosB = Math.cos(radian);
    let sinB = Math.sin(radian);

    gl.uniform1f(gl.getUniformLocation(program, "u_CosB"), cosB);
    gl.uniform1f(gl.getUniformLocation(program, "u_SinB"), sinB);

    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    requestAnimationFrame(render);

}

function increase() {
    rotationSpeed += 1.0;
    document.getElementById("hastighet").innerHTML = rotationSpeed;
}

function decrease() {
    rotationSpeed -= 1.0;
    document.getElementById("hastighet").innerHTML = rotationSpeed;
}

main();