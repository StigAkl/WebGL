/**
 * Created by Stig on 12.10.2016.
 */
"use strict"

function main() {
    //Getting the canvas
    let canvas = document.getElementById("webgl");

    //Get the rendering context for WebGL
    let gl = WebGLUtils.setupWebGL(canvas);

    let mode = gl.TRIANGLES;

    let program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    let vertices = new Float32Array([
       0.0, 0.5,   -0.5, -0.5, 0.5,-0.5
    ]);

    //Lager buffer-objektet
    let bufferId = gl.createBuffer();

    //Binder bufferobjektet til target
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);

    //Skriver data til buffer-objektet
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    //Henter a_Position fra vertex-shaderen
    let a_Position = gl.getAttribLocation(program, "a_Position");

    //Legger buffer-objekt informasjonen inn i a_Position
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);

    //Enable assignment to a_Position in vertex shader
    gl.enableVertexAttribArray(a_Position);

    //Tegner trekanten
    gl.drawArrays(mode, 0, vertices.length/2);
}

function initVertexBuffers(gl, program) {
    let vertices = new Float32Array([
        -0.5, 0.5,   -0.5, -0.5,    0.5,-0.5
    ]);

    let numOfVertices = 3;

    let bufferId = gl.createBuffer();
    if(!bufferId) {
        console.log("KA FARSKEN");
        return -1;
    }

    //Bind bufferobjektet til target
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
    //Skriv data til bufferobjektet
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    let a_Position = gl.getAttribLocation(program, "a_Position");

    //Assign buffer object to a_Position
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);

    //Enable assignment to a_Position in vertex shader
    gl.enableVertexAttribArray(a_Position);

    return numOfVertices;
}

main();
