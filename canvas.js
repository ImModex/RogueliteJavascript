export class Canvas {

    // Canvas html element
    canvasElement;
    // Canvas draw layer reference
    drawLayer;
    // Canvas boundaries on the html site
    canvasBoundaries;

    // Rows and columns
    columns;
    rows;

    // Calculated height and width for each field
    gridWidth;
    gridHeight;

    constructor(cols, rows, name) {
        // Grab canvas element from html by id
        this.canvasElement = document.getElementById(name);
        // Initialize canvas
        this.setData(cols, rows);
    }

    // Initialize and calculate canvas data
    setData(cols, rows) {
        this.cols = cols;
        this.rows = rows;
        this.drawLayer = this.canvasElement.getContext("2d");
        this.canvasBoundaries = {
            top: 0,
            right: this.canvasElement.width,
            bottom: this.canvasElement.height,
            left: 0
        };
        this.gridWidth = this.canvasElement.width / cols;
        this.gridHeight = this.canvasElement.height / rows;
    }
}