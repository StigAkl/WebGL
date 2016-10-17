/**
 * Created by Stig on 17.10.2016.
 */
"use strict"

let gl, program;

let modelViewMatrix;

let translation = 0.0;
let translateSpeed = 0.05;
let angle = 0.0;
let rotationSpeed = 1.0;

function main()  {
    let canvas = document.getElementById("webgl");

    gl = WebGLUtils.setupWebGL(canvas);

    program = initShaders(gl, "vertex-shader", "fragment-shader");

    let vertices = new Float32Array([
        0.0, 0.3,   -0.3, -0.3,     0.3, -0.3
    ]);

    let colors = new Float32Array([
        25.0/255.0, 25.0/255.0,112.0/255.0, 1.0,
        65.0/255.0, 105.0/255.0, 255.0/255.0, 1.0,
        40.0/255.0, 118.0/255.0, 245.0/255.0, 1.0
    ]);


    gl.useProgram(program);

    let colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW);

    let v_Color = gl.getAttribLocation(program, "a_Color");
    gl.vertexAttribPointer(v_Color, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(v_Color);

    let bufferId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);

    let a_Position = gl.getAttribLocation(program, "a_Position");
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0,0);
    gl.enableVertexAttribArray(a_Position);

    gl.clearColor(0.0,0.0,0.0,1.0);
    render();
}

function render() {
    angle += rotationSpeed;
    translation+=translateSpeed;
    if(translation > 0.9)
        translateSpeed *=-1;
    if(translation < -0.9)
        translateSpeed *= -1;

    modelViewMatrix = rotate(angle, 0, 1, 0);
    modelViewMatrix = mult(modelViewMatrix, translate(translation, 0, 0));


    let modelViewMatrixLoc = gl.getUniformLocation(program, "u_ModelViewMatrix");
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));
    console.log(flatten(modelViewMatrix));
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.drawArrays(gl.TRIANGLES, 0, 3);

    requestAnimationFrame(render);

}

main();
