/**
 * Created by Stig on 14.10.2016.
 */
"use strict"

function main() {
    let canvas = document.getElementById("webgl");

    let gl = WebGLUtils.setupWebGL(canvas);

    let program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    let vertices = new Float32Array([
        0.0, 0.5, 0.5, -0.5,  -0.5, -0.5
    ]);

    //Lager buffer-objektet
    let bufferId = gl.createBuffer();

    //Binder bufferobjektet til target
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);


    let a_Position = gl.getAttribLocation(program, "a_Position");

    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);

    gl.enableVertexAttribArray(a_Position);

    translateTriangle(gl, program, 0.3, 0.9, 0.0 );

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.drawArrays(gl.TRIANGLES, 0, 3);
}

function translateTriangle(gl, program, x, y, z) {
    let u_Translation = gl.getUniformLocation(program, "u_Translation");
    gl.uniform4f(u_Translation, x, y, z, 2.0);
}

main();