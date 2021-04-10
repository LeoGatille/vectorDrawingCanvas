class CanvasWindow {
    constructor(width, height) {
        this.canvas = document.getElementById('myCanvas');
        this.canvas.width = width;
        this.canvas.height = height;
        this.context = this.canvas.getContext('2d');
        this.canvasPosLeft = this.canvas.offsetLeft + this.canvas.clientLeft;
        this.canvasPosTop = this.canvas.offsetTop + this.canvas.clientTop;
        this.canvas.addEventListener('mousedown', (event) => {
            this.getClickedCircle(event);
        });
        window.addEventListener('mouseup', (event) => {
            this.stopDragging();
        });
        this.canvas.addEventListener('mousemove', (event) => {
            this.recordMouseMove(event);
        })
        window.addEventListener('resize', () => {
            this.canvasPosLeft = this.canvas.offsetLeft + this.canvas.clientLeft;
            this.canvasPosTop = this.canvas.offsetTop + this.canvas.clientTop;
        })
        this.createInitialsCircles();
    }
    canvas;
    context;
    canvasPosLeft;
    canvasPosTop;
    draggableCircles = [];
    referenceCircle;
    draggedCircle;
    frameRequest;
    colorTxt;
    canvasWidth = () => {
        return this.canvas.width;
    }
    canvasHeight = () => {
        return this.canvas.height;
    }
    stopDragging() {
        if (!this.draggedCircle) {
            return;
        }
        this.draggedCircle.stopDragging()
        this.draggedCircle = null;
    }
    recordMouseMove(event) {
        if (!this.draggedCircle) {
            return;
        }
        this.draggedCircle.editPosition(event.pageX, event.pageY);
        this.frameRequest = requestAnimationFrame(() => this.setCanvasAnimation());
    }
    setCanvasAnimation = () => {
        this.clearCanvas();
        this.referenceCircle.createCircle();
        this.draggableCircles.forEach(circle => {
            circle.createCircle();
        })
        this.setText(this.getClosestItem().item.color);
    }
    clearCanvas() {
        this.context.clearRect(0, 0, 1024, 768);
    }
}