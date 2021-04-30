/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./dist/CanvasWindow.js":
/*!******************************!*\
  !*** ./dist/CanvasWindow.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ CanvasWindow)\n/* harmony export */ });\n/* harmony import */ var _Coordinate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Coordinate */ \"./dist/Coordinate.js\");\n/* harmony import */ var _Drawing__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Drawing */ \"./dist/Drawing.js\");\n\r\n\r\nclass CanvasWindow {\r\n    constructor() {\r\n        this.canvas = document.getElementById('myCanvas');\r\n        this.drawings = [];\r\n        this.isDrawing = false;\r\n        this.skipFrame = 0;\r\n        this.singleDotList = [];\r\n        this.isLocked = false;\r\n        this.color = 'black';\r\n        this.smoothing = 10;\r\n        this.canceledPaths = [];\r\n        this.canvasWidth = () => {\r\n            return this.canvas.width;\r\n        };\r\n        this.canvasHeight = () => {\r\n            return this.canvas.height;\r\n        };\r\n        this.ctx = this.canvas.getContext('2d');\r\n        // this.drawings = new Drawing(this.ctx);\r\n        this.canvas.width = window.innerWidth;\r\n        this.canvas.height = window.innerHeight;\r\n        this.canvasPosLeft = this.canvas.offsetLeft + this.canvas.clientLeft;\r\n        this.canvasPosTop = this.canvas.offsetTop + this.canvas.clientTop;\r\n        this.canvas.addEventListener('mousedown', (event) => {\r\n            this.initDrawing(event);\r\n        });\r\n        window.addEventListener('mouseup', (event) => {\r\n            if (!this.isLocked) {\r\n                this.stopDrawing(event);\r\n            }\r\n        });\r\n        this.canvas.addEventListener('mousemove', (event) => {\r\n            this.recordMouseMove(event);\r\n        });\r\n        window.addEventListener('resize', (event) => {\r\n            this.canvas.width = window.innerWidth;\r\n            this.canvas.height = window.innerHeight;\r\n            this.canvasPosLeft = this.canvas.offsetLeft + this.canvas.clientLeft;\r\n            this.canvasPosTop = this.canvas.offsetTop + this.canvas.clientTop;\r\n            this.draw();\r\n        });\r\n    }\r\n    setColor(color) {\r\n        this.color = color;\r\n    }\r\n    setSmoothing(value) {\r\n        this.smoothing = value;\r\n    }\r\n    toggleLockCanvas() {\r\n        this.isLocked = !this.isLocked;\r\n    }\r\n    removePath() {\r\n        if (this.drawings.length) {\r\n            const canceledDrawing = this.drawings.pop();\r\n            canceledDrawing.toggleDisplay();\r\n            this.canceledPaths.push(canceledDrawing);\r\n            this.draw();\r\n        }\r\n    }\r\n    setFrameToSkip(val) {\r\n        if (((this.smoothing + val) > 0) && ((this.smoothing + val) < 70)) {\r\n            this.smoothing += val;\r\n        }\r\n    }\r\n    reAddPath() {\r\n        if (this.canceledPaths.length) {\r\n            const pathToReAdd = this.canceledPaths.pop();\r\n            pathToReAdd.toggleDisplay();\r\n            this.drawings.push(pathToReAdd);\r\n            this.draw();\r\n        }\r\n    }\r\n    initDrawing(event) {\r\n        this.isDrawing = true;\r\n        this.drawings.push(new _Drawing__WEBPACK_IMPORTED_MODULE_1__.default(new _Coordinate__WEBPACK_IMPORTED_MODULE_0__.default(this.getCanvasRelatedCoordinates(event)), this.ctx, this.color));\r\n    }\r\n    getCanvasRelatedCoordinates(event) {\r\n        return {\r\n            posX: event.pageX - this.canvasPosLeft,\r\n            posY: event.pageY - this.canvasPosTop,\r\n        };\r\n    }\r\n    recordMouseMove(event) {\r\n        if (!this.isDrawing)\r\n            return;\r\n        const currentDrawing = this.drawings[this.drawings.length - 1];\r\n        if (this.skipFrame === 0) {\r\n            // this.clearCanvas()\r\n            currentDrawing.addCoordinate(this.getCanvasRelatedCoordinates(event));\r\n            currentDrawing.removeUglyPath();\r\n            this.skipFrame = this.smoothing;\r\n        }\r\n        else {\r\n            currentDrawing.addUglyCoordinate(this.getCanvasRelatedCoordinates(event));\r\n            this.skipFrame--;\r\n        }\r\n        // this.frameRequest = requestAnimationFrame(() => {\r\n        this.draw();\r\n        // });\r\n    }\r\n    // private recordMouseMove(event: MouseEvent) {\r\n    //     if (!this.isDrawing) return\r\n    //     this.frameRequest = requestAnimationFrame(() => {\r\n    //         const currentDrawing = this.drawings[this.drawings.length - 1]\r\n    //         if (this.skipFrame === 0) {\r\n    //             // this.clearCanvas()\r\n    //             currentDrawing.addCoordinate(this.getCanvasRelatedCoordinates(event));\r\n    //             currentDrawing.removeUglyPath();\r\n    //             this.skipFrame = this.smoothing;\r\n    //         } else {\r\n    //             currentDrawing.addUglyCoordinate(this.getCanvasRelatedCoordinates(event));\r\n    //             this.skipFrame--;\r\n    //         }\r\n    //         this.draw();\r\n    //     });\r\n    // }\r\n    draw() {\r\n        this.clearCanvas();\r\n        this.drawings.forEach(path => {\r\n            path.draw();\r\n        });\r\n        this.singleDotList.forEach(coordinate => {\r\n            this.ctx.beginPath();\r\n            this.ctx.arc(coordinate.x, coordinate.y, 3, 0, 2 * Math.PI);\r\n            this.ctx.fillStyle = this.color;\r\n            this.ctx.fill();\r\n        });\r\n    }\r\n    stopDrawing(event = null) {\r\n        if (event) {\r\n            this.finishDrawing(event);\r\n        }\r\n        this.isDrawing = false;\r\n    }\r\n    finishDrawing(event) {\r\n        const currentPath = this.drawings[this.drawings.length - 1];\r\n        if (currentPath.path.length === 1) {\r\n            this.singleDotList.push(new _Coordinate__WEBPACK_IMPORTED_MODULE_0__.default({ posX: currentPath.path[0].x, posY: currentPath.path[0].y }));\r\n        }\r\n        else if (currentPath.path.length > 2) {\r\n            currentPath.addCoordinate({\r\n                posX: event.pageX - this.canvasPosLeft,\r\n                posY: event.pageY - this.canvasPosTop,\r\n            });\r\n            currentPath.removeUglyPath();\r\n        }\r\n        this.draw();\r\n    }\r\n    clearCanvas() {\r\n        this.ctx.clearRect(0, 0, this.canvasWidth(), this.canvasHeight());\r\n    }\r\n}\r\n//# sourceMappingURL=CanvasWindow.js.map\n\n//# sourceURL=webpack:///./dist/CanvasWindow.js?");

/***/ }),

/***/ "./dist/Coordinate.js":
/*!****************************!*\
  !*** ./dist/Coordinate.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Coordinate)\n/* harmony export */ });\nclass Coordinate {\r\n    constructor({ posX, posY }) {\r\n        this.x = posX;\r\n        this.y = posY;\r\n    }\r\n    setX(val) {\r\n        this.x = val;\r\n    }\r\n    setY(val) {\r\n        this.y = val;\r\n    }\r\n}\r\n//# sourceMappingURL=Coordinate.js.map\n\n//# sourceURL=webpack:///./dist/Coordinate.js?");

/***/ }),

/***/ "./dist/Drawing.js":
/*!*************************!*\
  !*** ./dist/Drawing.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Drawing)\n/* harmony export */ });\n/* harmony import */ var _Coordinate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Coordinate */ \"./dist/Coordinate.js\");\n\r\nclass Drawing {\r\n    constructor(originPoint, ctx, color = 'black') {\r\n        this.path = [];\r\n        this.uglyPath = [];\r\n        this.display = true;\r\n        this.color = color;\r\n        this.ctx = ctx;\r\n        // this.originPoint = originPoint;\r\n        this.addCoordinate({ posX: originPoint.x, posY: originPoint.y });\r\n        this.addUglyCoordinate({ posX: originPoint.x, posY: originPoint.y });\r\n    }\r\n    draw() {\r\n        this.initPath();\r\n        this.createPath();\r\n        this.ctx.strokeStyle = this.color;\r\n        this.ctx.stroke();\r\n        this.uglyPath.forEach((point, i) => {\r\n            // this.ctx.beginPath();\r\n            // this.ctx.arc(point.x, point.y, 1, 0, 2 * Math.PI);\r\n            // this.ctx.fillStyle = 'red';\r\n            // this.ctx.fill();\r\n            //     // if (i % 2) {\r\n            //     //     this.ctx.beginPath();\r\n            //     //     this.ctx.arc((point.x + this.path[i - 1].x) / 2, (point.y + this.path[i - 1].y) / 2, 3, 0, 2 * Math.PI);\r\n            //     //     this.ctx.fillStyle = 'green';\r\n            //     //     this.ctx.fill();\r\n            //     // } else {\r\n            //     //     this.ctx.beginPath();\r\n            //     //     this.ctx.arc(point.x, point.y, 3, 0, 2 * Math.PI);\r\n            //     //     this.ctx.fillStyle = 'red';\r\n            //     //     this.ctx.fill();\r\n            //     // }\r\n        });\r\n    }\r\n    drawUgly() {\r\n        this.initPath();\r\n        this.createUglyPath();\r\n        this.ctx.stroke();\r\n    }\r\n    createUglyPath() {\r\n        if (!this.display)\r\n            return;\r\n        this.ctx.moveTo(this.path[0].x, this.path[0].y);\r\n        if (this.path.length > 2) {\r\n            this.path.forEach((point, i) => {\r\n                if (i < this.path.length - 1) {\r\n                    this.ctx.quadraticCurveTo(point.x, point.y, this.path[i + 1].x, this.path[i + 1].y);\r\n                }\r\n            });\r\n        }\r\n    }\r\n    addCoordinate(coordinate) {\r\n        this.path.push(new _Coordinate__WEBPACK_IMPORTED_MODULE_0__.default(coordinate));\r\n    }\r\n    addCircle() {\r\n        this.ctx.beginPath();\r\n        this.ctx.arc(this.path[0].x, this.path[0].y, 12, 0, 2 * Math.PI);\r\n        this.ctx.fillStyle = 'blue';\r\n        this.ctx.fill();\r\n    }\r\n    addUglyCoordinate(coordinate) {\r\n        this.uglyPath.push(new _Coordinate__WEBPACK_IMPORTED_MODULE_0__.default(coordinate));\r\n    }\r\n    removeUglyPath() {\r\n        this.uglyPath = [];\r\n    }\r\n    toggleDisplay() {\r\n        this.display = !this.display;\r\n        // this.draw();\r\n    }\r\n    initPath() {\r\n        this.ctx.beginPath();\r\n        this.ctx.lineCap = 'round';\r\n        this.ctx.lineJoin = 'round';\r\n        this.ctx.lineWidth = 5;\r\n    }\r\n    createPath() {\r\n        if (!this.display)\r\n            return;\r\n        this.ctx.moveTo(this.path[0].x, this.path[0].y);\r\n        if (this.path.length > 2) {\r\n            for (let i = 1; i < this.path.length - 2; i++) {\r\n                // if (i > this.path.length - 2) {\r\n                const p0 = this.path[i], p1 = this.path[i + 1], midx = (p0.x + p1.x) / 2, midy = (p0.y + p1.y) / 2;\r\n                this.ctx.quadraticCurveTo(p0.x, p0.y, midx, midy);\r\n                // }\r\n            }\r\n            ;\r\n            const p0 = this.path[this.path.length - 2], p1 = this.path[this.path.length - 1];\r\n            this.ctx.quadraticCurveTo(p0.x, p0.y, p1.x, p1.y);\r\n        }\r\n        if (this.uglyPath.length > 2) {\r\n            this.ctx.moveTo(this.path[this.path.length - 1].x, this.path[this.path.length - 1].y);\r\n            this.uglyPath.forEach((point, i) => {\r\n                if (i < this.uglyPath.length - 1) {\r\n                    this.ctx.quadraticCurveTo(point.x, point.y, this.uglyPath[i + 1].x, this.uglyPath[i + 1].y);\r\n                }\r\n            });\r\n        }\r\n    }\r\n}\r\n//# sourceMappingURL=Drawing.js.map\n\n//# sourceURL=webpack:///./dist/Drawing.js?");

/***/ }),

/***/ "./dist/FrameRate.js":
/*!***************************!*\
  !*** ./dist/FrameRate.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"FrameRate\": () => (/* binding */ FrameRate)\n/* harmony export */ });\nclass FrameRate {\r\n    constructor() {\r\n        this.lastFrameTimeStamp = performance.now();\r\n        // this.setFrameRate()\r\n        requestAnimationFrame(() => {\r\n            this.setFrameRate()\r\n                .then(() => {\r\n                requestAnimationFrame(() => {\r\n                    this.setFrameRate();\r\n                });\r\n            });\r\n        });\r\n    }\r\n    setFrameRate() {\r\n        return new Promise(res => {\r\n            const currentFrameTimestamp = performance.now();\r\n            // console.log('old => ', this.lastFrameTimeStamp, 'new => ', currentFrameTimestamp);\r\n            this.frameRate = (currentFrameTimestamp - this.lastFrameTimeStamp);\r\n            // console.log('frameRate => ', this.frameRate);\r\n            this.lastFrameTimeStamp = currentFrameTimestamp;\r\n            res();\r\n        });\r\n    }\r\n}\r\n//# sourceMappingURL=FrameRate.js.map\n\n//# sourceURL=webpack:///./dist/FrameRate.js?");

/***/ }),

/***/ "./dist/Menu.js":
/*!**********************!*\
  !*** ./dist/Menu.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Menu\": () => (/* binding */ Menu)\n/* harmony export */ });\nclass Menu {\r\n    constructor() {\r\n        this.allColorList = {\r\n            main: ['black', 'white', 'blue', 'red', 'green', 'yellow', 'orange'],\r\n            custom: [],\r\n            history: [],\r\n            secondary: ['pink', 'purple'],\r\n        };\r\n        this.selectedColor = 'black';\r\n        this.setEventListeners();\r\n        this.displayColorsOptions('main');\r\n    }\r\n    undo() {\r\n        this.emit('undo');\r\n    }\r\n    redo() {\r\n        this.emit('redo');\r\n    }\r\n    setSmoothing(val) {\r\n        this.emit('smoothingChange');\r\n    }\r\n    mouseEnter() {\r\n        this.emit('mouseEnterMenu');\r\n    }\r\n    mouseLeave() {\r\n        this.emit('mouseLeaveMenu');\r\n    }\r\n    emit(eventType, val = null) {\r\n        const customEvent = new CustomEvent(eventType, val ? { detail: val } : null);\r\n        window.dispatchEvent(customEvent);\r\n    }\r\n    displayColorsOptions(colorListName) {\r\n        const colorList = this.allColorList[colorListName];\r\n        const target = document.querySelector('#' + colorListName + '-color-container');\r\n        colorList.forEach(color => {\r\n            const DOMItem = document.createElement('div');\r\n            DOMItem.className = \"color\";\r\n            DOMItem.id = color;\r\n            DOMItem.dataset.color = color;\r\n            DOMItem.style.backgroundColor = color;\r\n            DOMItem.addEventListener('click', (e) => {\r\n                const target = e.target;\r\n                this.setSelectedColor(target.id);\r\n            });\r\n            target.appendChild(DOMItem);\r\n        });\r\n    }\r\n    setSelectedColor(color) {\r\n        if (this.selectedColor !== color) {\r\n            this.selectedColor = color;\r\n            this.emit('colorChange', this.selectedColor);\r\n            this.setSelectedColorDisplay();\r\n        }\r\n    }\r\n    setSelectedColorDisplay() {\r\n        const domColors = document.getElementsByClassName('color');\r\n        for (const domColor of domColors) {\r\n            if (domColor.id === this.selectedColor) {\r\n                domColor.classList.add('selected');\r\n            }\r\n            else {\r\n                domColor.classList.remove('selected');\r\n            }\r\n        }\r\n    }\r\n    setEventListeners() {\r\n        document.querySelector('#undo').addEventListener('click', () => this.undo());\r\n        document.querySelector('#redo').addEventListener('click', () => this.redo());\r\n        document.querySelector('#settings').addEventListener('mouseenter', () => this.mouseEnter());\r\n        document.querySelector('#settings').addEventListener('mouseleave', () => this.mouseLeave());\r\n        // document.querySelector('#smoothingRange').addEventListener('input', (e: any) => this.setSmoothing(parseInt(e.srcElement.value, 10)));\r\n    }\r\n}\r\n//# sourceMappingURL=Menu.js.map\n\n//# sourceURL=webpack:///./dist/Menu.js?");

/***/ }),

/***/ "./dist/Segment.js":
/*!*************************!*\
  !*** ./dist/Segment.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Segment)\n/* harmony export */ });\nclass Segment {\r\n    constructor(vector, coordinate) {\r\n        this.length = 0;\r\n        this.vector = vector;\r\n        this.coordinate = coordinate;\r\n    }\r\n}\r\n//# sourceMappingURL=Segment.js.map\n\n//# sourceURL=webpack:///./dist/Segment.js?");

/***/ }),

/***/ "./dist/UglyDrawing.js":
/*!*****************************!*\
  !*** ./dist/UglyDrawing.js ***!
  \*****************************/
/***/ (() => {

eval("// import Drawing from \"./Drawing\";\r\n// export class UglyDrawing extends Drawing {\r\n//     constructor(originPoint, ctx, color = 'black') {\r\n//         super(originPoint, ctx, color = 'black')\r\n//     }\r\n//     public drawUgly() {\r\n//         this.initPath();\r\n//         this.createUglyPath();\r\n//         this.ctx.lineCap = 'round';\r\n//         this.ctx.lineJoin = 'round';\r\n//         this.ctx.stroke();\r\n//     }\r\n//     private createUglyPath() {\r\n//         if (!this.display) return;\r\n//         this.ctx.moveTo(this.path[0].x, this.path[0].y);\r\n//         if (this.path.length > 2) {\r\n//             this.path.forEach((point, i) => {\r\n//                 if (i < this.path.length - 1) {\r\n//                     this.ctx.quadraticCurveTo(point.x, point.y, this.path[i + 1].x, this.path[i + 1].y);\r\n//                 }\r\n//             })\r\n//         }\r\n//     }\r\n// }\r\n//# sourceMappingURL=UglyDrawing.js.map\n\n//# sourceURL=webpack:///./dist/UglyDrawing.js?");

/***/ }),

/***/ "./dist/main.js":
/*!**********************!*\
  !*** ./dist/main.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Menu__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Menu */ \"./dist/Menu.js\");\n/* harmony import */ var _CanvasWindow__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CanvasWindow */ \"./dist/CanvasWindow.js\");\n\r\n\r\nconsole.log('------COMPILED------', new Date().getMinutes() + ' : ' + new Date().getSeconds());\r\ndocument.addEventListener('DOMContentLoaded', () => init());\r\nfunction init() {\r\n    const allColorList = {\r\n        main: ['black', 'white', 'blue', 'red', 'green', 'yellow', 'orange'],\r\n        custom: [],\r\n        history: [],\r\n        secondary: ['pink', 'purple'],\r\n    };\r\n    //! FUCK => Le smoothing doit être calculé à partir des points et pas des frame (les points ne marche pas non plus...)\r\n    //! sinon ça fait que si tu dessine trop vite ça tej la moité de ton dessin :D\r\n    const canvas = new _CanvasWindow__WEBPACK_IMPORTED_MODULE_1__.default();\r\n    const menu = new _Menu__WEBPACK_IMPORTED_MODULE_0__.Menu();\r\n    // document.querySelector('#undo').addEventListener('click', () => undo());\r\n    // document.querySelector('#redo').addEventListener('click', (e) => { e.stopPropagation(); redo(); });\r\n    // document.querySelector('#addFrameToSkip').addEventListener('click', () => setFrameToSkip(2));\r\n    // document.querySelector('#removeFrameToSkip').addEventListener('click', () => setFrameToSkip(-2));\r\n    // document.querySelector('#settings').addEventListener('mouseenter', () => canvas.toggleLockCanvas());\r\n    // document.querySelector('#settings').addEventListener('mouseleave', () => canvas.toggleLockCanvas());\r\n    // document.querySelector('#smoothingRange').addEventListener('input', (e: any) => canvas.setSmoothing(parseInt(e.srcElement.value, 10)));\r\n    //! Deprecated\r\n    // window.addEventListener('click', () => setFrameToSkip(2));\r\n    // window.addEventListener('click', () => setFrameToSkip(-2));\r\n    window.addEventListener('undo', () => canvas.removePath());\r\n    window.addEventListener('redo', () => canvas.reAddPath());\r\n    window.addEventListener('mouseEnterMenu', () => canvas.toggleLockCanvas());\r\n    window.addEventListener('mouseLeaveMenu', () => canvas.toggleLockCanvas());\r\n    //! Has a any type !\r\n    window.addEventListener('smoothingChange', (smoothingValue) => canvas.setSmoothing(smoothingValue));\r\n    window.addEventListener('colorChange', (e) => canvas.setColor(e.detail));\r\n    // function setSmoothing(val) {\r\n    //     console.log('setSmoothing => ', val);\r\n    // }\r\n    // function setFrameToSkip(val) {\r\n    //     canvas.setFrameToSkip(val);\r\n    // }\r\n    // function undo() {\r\n    //     canvas.removePath();\r\n    // }\r\n    // function redo() {\r\n    //     canvas.reAddPath();\r\n    // }\r\n    // function displayColorsOptions(colorListName: string) {\r\n    //     const colorList: string[] = allColorList[colorListName];\r\n    //     const target: HTMLElement = document.querySelector('#' + colorListName + '-color-container');\r\n    //     colorList.forEach(color => {\r\n    //         const DOMItem = document.createElement('div');\r\n    //         DOMItem.className = \"color\";\r\n    //         DOMItem.id = color;\r\n    //         DOMItem.dataset.color = color;\r\n    //         DOMItem.style.backgroundColor = color;\r\n    //         DOMItem.addEventListener('click', (e: MouseEvent) => {\r\n    //             const target = e.target as HTMLElement;\r\n    //             setSelectedColor(target.id)\r\n    //         });\r\n    //         target.appendChild(DOMItem);\r\n    //     });\r\n    // }\r\n    // function setSelectedColor(toto) {\r\n    //     console.log('TOTO')\r\n    // }\r\n}\r\n//# sourceMappingURL=main.js.map\n\n//# sourceURL=webpack:///./dist/main.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	__webpack_require__("./dist/CanvasWindow.js");
/******/ 	__webpack_require__("./dist/Coordinate.js");
/******/ 	__webpack_require__("./dist/Drawing.js");
/******/ 	__webpack_require__("./dist/FrameRate.js");
/******/ 	__webpack_require__("./dist/main.js");
/******/ 	__webpack_require__("./dist/Segment.js");
/******/ 	var __webpack_exports__ = __webpack_require__("./dist/UglyDrawing.js");
/******/ 	
/******/ })()
;