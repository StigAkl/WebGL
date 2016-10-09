/**
 * Created by Stig on 08.10.2016.
 */
"use strict";

function main() {

    //Retrievee the canvas element
    let canvas = document.getElementById("webgl");

    //Get the rendering context for WebGL
    let gl = WebGLUtils.setupWebGL( canvas );

    if(!gl) {
        console.log("Failet to get the rendering context for WebGL");
        return;
    }

    gl.clearColor(0.0, 0.0, 0.0, 1.0);

    //Clear the canvas
    gl.clear(gl.COLOR_BUFFER_BIT);
}