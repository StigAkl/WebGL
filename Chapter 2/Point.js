/**
 * Created by Stig on 08.10.2016.
 */
"use strict";
const RED = 0;
const GREEN = 1;
const BLUE = 2;
const YELLOW = 3;

class PointGL {
    constructor(model) {

        this.model = model;
        this.points = [];
        this.colors = [];
        this.canvas = document.getElementById("webgl");

        this.currentColor = RED;
        this.gl = WebGLUtils.setupWebGL( this.canvas );

        if(!this.gl ) {
            alert("WebGL isnt avaiable");
        }

        this.program = initShaders(this.gl, "vertex-shader", "fragment-shader");
        this.gl.useProgram(this.program);

        //Getting shader attributes and uniform
        this.a_Position = this.gl.getAttribLocation(this.program, "a_Position");
        this.a_PointSize = this.gl.getAttribLocation(this.program, "a_PointSize");
        this.u_FragColor = this.gl.getUniformLocation(this.program, "u_FragColor");

        //Sender punktstørrelse til vertex shaderen
        this.gl.vertexAttrib1f(this.a_PointSize,5.0);

        if(this.a_Position < 0) {
            alert("Failed to get the storage location of a_Position");
        }


        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);

    }

    get _canvas() {
        return this.canvas;
    }

    set _currentColor(color) {
        this.currentColor = color;
    }

    drawPoint(event) {
        let x = event.clientX;
        let y = event.clientY;
        let rect = event.target.getBoundingClientRect();

        x = ((x-rect.left) - this.canvas.height/2)/(this.canvas.height/2);
        y = (this.canvas.width/2 - (y - rect.top)) / (this.canvas.width/2);

        this.points.push([x,y]);

        this.gl.clear(this.gl.COLOR_BUFFER_BIT);

        this.colors.push(this.colorPoint());
        for(let i = 0; i < this.points.length; i++) {
            let xy = this.points[i];
            let rgb = this.colors[i];
            this.gl.vertexAttrib3f(this.a_Position, xy[0], xy[1], 0.0);
            this.gl.uniform4f(this.u_FragColor, rgb[0], rgb[1], rgb[2], rgb[3]);
            this.gl.drawArrays(this.gl.POINTS, 0,1);
        }
    }

    colorPoint() {
        if(this.currentColor === RED)
            return this.model.red;
        if(this.currentColor === GREEN)
            return this.model.green;
        if(this.currentColor === BLUE)
            return this.model.blue;
        if(this.currentColor === YELLOW)
            return this.model.yellow;
    }
}
