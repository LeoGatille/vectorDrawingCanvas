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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ CanvasWindow)\n/* harmony export */ });\n/* harmony import */ var _Coordinate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Coordinate */ \"./dist/Coordinate.js\");\n/* harmony import */ var _Drawing__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Drawing */ \"./dist/Drawing.js\");\n\r\n\r\nclass CanvasWindow {\r\n    constructor(width, height) {\r\n        this.canvas = document.getElementById('myCanvas');\r\n        this.drawings = [];\r\n        this.isDrawing = false;\r\n        this.skipFrame = 0;\r\n        this.smoothing = 10;\r\n        this.canceledPaths = [];\r\n        this.fps = 0;\r\n        this.times = [];\r\n        this.canvasWidth = () => {\r\n            return this.canvas.width;\r\n        };\r\n        this.canvasHeight = () => {\r\n            return this.canvas.height;\r\n        };\r\n        this.ctx = this.canvas.getContext('2d');\r\n        // this.drawings = new Drawing(this.ctx);\r\n        this.canvas.width = width;\r\n        this.canvas.height = height;\r\n        this.canvasPosLeft = this.canvas.offsetLeft + this.canvas.clientLeft;\r\n        this.canvasPosTop = this.canvas.offsetTop + this.canvas.clientTop;\r\n        this.canvas.addEventListener('mousedown', (event) => {\r\n            this.initDrawing(event);\r\n        });\r\n        this.canvas.addEventListener('mouseup', (event) => {\r\n            this.stopDrawing(event);\r\n        });\r\n        this.canvas.addEventListener('mousemove', (event) => {\r\n            this.recordMouseMove(event);\r\n        });\r\n        window.addEventListener('resize', () => {\r\n            this.canvasPosLeft = this.canvas.offsetLeft + this.canvas.clientLeft;\r\n            this.canvasPosTop = this.canvas.offsetTop + this.canvas.clientTop;\r\n        });\r\n    }\r\n    removePath() {\r\n        if (this.drawings.length) {\r\n            const canceledDrawing = this.drawings.pop();\r\n            canceledDrawing.toggleDisplay();\r\n            this.canceledPaths.push(canceledDrawing);\r\n            this.draw();\r\n        }\r\n    }\r\n    setFrameToSkip(val) {\r\n        if (((this.smoothing + val) > 0) && ((this.smoothing + val) < 70)) {\r\n            this.smoothing += val;\r\n        }\r\n        console.log(this.smoothing);\r\n    }\r\n    reAddPath() {\r\n        if (this.canceledPaths.length) {\r\n            const pathToReAdd = this.canceledPaths.pop();\r\n            pathToReAdd.toggleDisplay();\r\n            this.drawings.push(pathToReAdd);\r\n            this.draw();\r\n        }\r\n    }\r\n    initDrawing(event) {\r\n        this.isDrawing = true;\r\n        this.drawings.push(new _Drawing__WEBPACK_IMPORTED_MODULE_1__.default(new _Coordinate__WEBPACK_IMPORTED_MODULE_0__.default(this.getCanvasRelatedCoordinates(event)), this.ctx));\r\n    }\r\n    getCanvasRelatedCoordinates(event) {\r\n        return {\r\n            posX: event.pageX - this.canvasPosLeft,\r\n            posY: event.pageY - this.canvasPosTop,\r\n        };\r\n    }\r\n    recordMouseMove(event) {\r\n        if (!this.isDrawing)\r\n            return;\r\n        //! Might need an array of isDrawing to avoid problems (or not...)\r\n        this.frameRequest = requestAnimationFrame(() => {\r\n            const currentDrawing = this.drawings[this.drawings.length - 1];\r\n            if (this.skipFrame === 0) {\r\n                // this.clearCanvas()\r\n                currentDrawing.addCoordinate(this.getCanvasRelatedCoordinates(event));\r\n                currentDrawing.removeUglyPath();\r\n                this.skipFrame = this.smoothing;\r\n            }\r\n            else {\r\n                currentDrawing.addUglyCoordinate(this.getCanvasRelatedCoordinates(event));\r\n                this.skipFrame--;\r\n            }\r\n            this.draw();\r\n        });\r\n    }\r\n    draw() {\r\n        this.clearCanvas();\r\n        this.drawings.forEach(path => {\r\n            path.draw();\r\n        });\r\n    }\r\n    refreshLoop() {\r\n        window.requestAnimationFrame(() => {\r\n            const now = performance.now();\r\n            while (this.times.length > 0 && this.times[0] <= now - 1000) {\r\n                this.times.shift();\r\n            }\r\n            this.times.push(now);\r\n            this.fps = this.times.length;\r\n            console.log(this.fps);\r\n            this.refreshLoop();\r\n        });\r\n    }\r\n    stopDrawing(event) {\r\n        // if (this.skipFrame !== 0) {\r\n        const currentPath = this.drawings[this.drawings.length - 1];\r\n        console.log('1 => ', currentPath);\r\n        currentPath.removeUglyPath();\r\n        currentPath.addCoordinate({\r\n            posX: event.pageX - this.canvasPosLeft,\r\n            posY: event.pageY - this.canvasPosTop,\r\n        });\r\n        console.log('1 => ', currentPath);\r\n        this.draw();\r\n        // }\r\n        this.isDrawing = false;\r\n    }\r\n    clearCanvas() {\r\n        this.ctx.clearRect(0, 0, 1024, 768);\r\n    }\r\n}\r\n//# sourceMappingURL=CanvasWindow.js.map\n\n//# sourceURL=webpack:///./dist/CanvasWindow.js?");

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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Drawing)\n/* harmony export */ });\n/* harmony import */ var _Coordinate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Coordinate */ \"./dist/Coordinate.js\");\n\r\nclass Drawing {\r\n    constructor(originPoint, ctx, color = 'black') {\r\n        this.path = [];\r\n        this.uglyPath = [];\r\n        this.display = true;\r\n        this.color = color;\r\n        this.ctx = ctx;\r\n        // this.originPoint = originPoint;\r\n        this.addCoordinate({ posX: originPoint.x, posY: originPoint.y });\r\n    }\r\n    draw() {\r\n        this.initPath();\r\n        this.createPath();\r\n        this.ctx.stroke();\r\n        this.uglyPath.forEach((point, i) => {\r\n            // this.ctx.beginPath();\r\n            // this.ctx.arc(point.x, point.y, 1, 0, 2 * Math.PI);\r\n            // this.ctx.fillStyle = 'red';\r\n            // this.ctx.fill();\r\n            //     // if (i % 2) {\r\n            //     //     this.ctx.beginPath();\r\n            //     //     this.ctx.arc((point.x + this.path[i - 1].x) / 2, (point.y + this.path[i - 1].y) / 2, 3, 0, 2 * Math.PI);\r\n            //     //     this.ctx.fillStyle = 'green';\r\n            //     //     this.ctx.fill();\r\n            //     // } else {\r\n            //     //     this.ctx.beginPath();\r\n            //     //     this.ctx.arc(point.x, point.y, 3, 0, 2 * Math.PI);\r\n            //     //     this.ctx.fillStyle = 'red';\r\n            //     //     this.ctx.fill();\r\n            //     // }\r\n        });\r\n    }\r\n    drawUgly() {\r\n        this.initPath();\r\n        this.createUglyPath();\r\n        this.ctx.stroke();\r\n    }\r\n    createUglyPath() {\r\n        if (!this.display)\r\n            return;\r\n        this.ctx.moveTo(this.path[0].x, this.path[0].y);\r\n        if (this.path.length > 2) {\r\n            this.path.forEach((point, i) => {\r\n                if (i < this.path.length - 1) {\r\n                    this.ctx.quadraticCurveTo(point.x, point.y, this.path[i + 1].x, this.path[i + 1].y);\r\n                }\r\n            });\r\n        }\r\n    }\r\n    addCoordinate(coordinate) {\r\n        this.path.push(new _Coordinate__WEBPACK_IMPORTED_MODULE_0__.default(coordinate));\r\n        // this.draw();\r\n    }\r\n    addUglyCoordinate(coordinate) {\r\n        this.uglyPath.push(new _Coordinate__WEBPACK_IMPORTED_MODULE_0__.default(coordinate));\r\n    }\r\n    removeUglyPath() {\r\n        this.uglyPath = [];\r\n    }\r\n    toggleDisplay() {\r\n        this.display = !this.display;\r\n        // this.draw();\r\n    }\r\n    initPath() {\r\n        this.ctx.beginPath();\r\n        this.ctx.lineCap = 'round';\r\n        this.ctx.lineJoin = 'round';\r\n        this.ctx.lineWidth = 5;\r\n    }\r\n    createPath() {\r\n        if (!this.display)\r\n            return;\r\n        this.ctx.moveTo(this.path[0].x, this.path[0].y);\r\n        if (this.path.length > 2) {\r\n            for (let i = 1; i < this.path.length - 2; i++) {\r\n                // if (i > this.path.length - 2) {\r\n                const p0 = this.path[i], p1 = this.path[i + 1], midx = (p0.x + p1.x) / 2, midy = (p0.y + p1.y) / 2;\r\n                this.ctx.quadraticCurveTo(p0.x, p0.y, midx, midy);\r\n                // }\r\n            }\r\n            ;\r\n            const p0 = this.path[this.path.length - 2], p1 = this.path[this.path.length - 1];\r\n            this.ctx.quadraticCurveTo(p0.x, p0.y, p1.x, p1.y);\r\n        }\r\n        if (this.uglyPath.length > 2) {\r\n            this.ctx.moveTo(this.path[this.path.length - 1].x, this.path[this.path.length - 1].y);\r\n            this.uglyPath.forEach((point, i) => {\r\n                if (i < this.uglyPath.length - 1) {\r\n                    this.ctx.quadraticCurveTo(point.x, point.y, this.uglyPath[i + 1].x, this.uglyPath[i + 1].y);\r\n                }\r\n            });\r\n        }\r\n    }\r\n}\r\n//# sourceMappingURL=Drawing.js.map\n\n//# sourceURL=webpack:///./dist/Drawing.js?");

/***/ }),

/***/ "./dist/FrameRate.js":
/*!***************************!*\
  !*** ./dist/FrameRate.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"FrameRate\": () => (/* binding */ FrameRate)\n/* harmony export */ });\nclass FrameRate {\r\n    constructor() {\r\n        this.lastFrameTimeStamp = performance.now();\r\n        // this.setFrameRate()\r\n        requestAnimationFrame(() => {\r\n            this.setFrameRate()\r\n                .then(() => {\r\n                requestAnimationFrame(() => {\r\n                    this.setFrameRate();\r\n                });\r\n            });\r\n        });\r\n    }\r\n    setFrameRate() {\r\n        return new Promise(res => {\r\n            const currentFrameTimestamp = performance.now();\r\n            // console.log('old => ', this.lastFrameTimeStamp, 'new => ', currentFrameTimestamp);\r\n            this.frameRate = (currentFrameTimestamp - this.lastFrameTimeStamp);\r\n            // console.log('frameRate => ', this.frameRate);\r\n            this.lastFrameTimeStamp = currentFrameTimestamp;\r\n            res();\r\n        });\r\n    }\r\n}\r\n//# sourceMappingURL=FrameRate.js.map\n\n//# sourceURL=webpack:///./dist/FrameRate.js?");

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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _CanvasWindow__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CanvasWindow */ \"./dist/CanvasWindow.js\");\n\r\nconsole.log('------COMPILED------', new Date().getMinutes() + ' : ' + new Date().getSeconds());\r\nconst canvas = new _CanvasWindow__WEBPACK_IMPORTED_MODULE_0__.default(1024, 768);\r\ndocument.querySelector('#undo').addEventListener('click', () => undo());\r\ndocument.querySelector('#redo').addEventListener('click', () => redo());\r\ndocument.querySelector('#addFrameToSkip').addEventListener('click', () => setFrameToSkip(2));\r\ndocument.querySelector('#removeFrameToSkip').addEventListener('click', () => setFrameToSkip(-2));\r\nfunction setFrameToSkip(val) {\r\n    canvas.setFrameToSkip(val);\r\n}\r\nfunction undo() {\r\n    canvas.removePath();\r\n}\r\nfunction redo() {\r\n    canvas.reAddPath();\r\n}\r\n//# sourceMappingURL=main.js.map\n\n//# sourceURL=webpack:///./dist/main.js?");

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