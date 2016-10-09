/**
 * Created by Stig on 08.10.2016.
 */
class PointController {

    constructor() {
        this.model = new Point();
        this.pointGL = new PointGL(this.model);
        this.canvas = this.pointGL._canvas;
        this.canvas.addEventListener("mousedown", this.pointGL.drawPoint.bind(this.pointGL));

        this.currentColor = document.getElementById("valgt");
        //Init red color
        this.pointGL._currentColor = RED;
    }

    blue() {
        this.pointGL._currentColor = BLUE;
        this.currentColor.style.backgroundColor = "blue";
    }

    red() {
        this.pointGL._currentColor = RED;
        this.currentColor.style.backgroundColor = "red";
    }

    green() {
        this.pointGL._currentColor = GREEN;
        this.currentColor.style.backgroundColor = "green";
    }

    yellow() {
        this.pointGL._currentColor = YELLOW;
        this.currentColor.style.backgroundColor = "yellow";
    }
}

let controller = new PointController();