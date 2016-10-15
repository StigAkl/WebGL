/**
 * Created by Stig on 15.10.2016.
 */
"use strict"
let program, gl;
let angle = 0;
function main() {
    let canvas = document.getElementById("webgl");

    gl = WebGLUtils.setupWebGL(canvas);
    program = initShaders(gl, "vertex-shader", "fragment-shader");

    let vertices = new Float32Array([

        //X,   Y
        -0.5, -0.5,
        0.0, 0.5,
        0.5, -0.5
    ]);

    let bufferId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    let a_Position = gl.getAttribLocation(program, "a_Position");
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);

    gl.enableVertexAttribArray(a_Position);

    gl.useProgram(program);
    rotateTriangle(angle);

}

function rotateTriangle(angle2) {
    angle += angle2;
    console.log(angle);
    let radian = Math.PI * angle / 180.0;
    let cosB = Math.cos(radian);
    let sinB = Math.sin(radian);

    console.log(cosB + " " + sinB);
    let u_CosB = gl.getUniformLocation(program, "u_CosB");
    let u_SinB = gl.getUniformLocation(program, "u_SinB");
    gl.uniform1f(u_CosB, cosB);
    gl.uniform1f(u_SinB, sinB);

    gl.clearColor(0.0,0.0,0.0,1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.drawArrays(gl.TRIANGLES, 0, 3);
}
main();