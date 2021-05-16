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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ CanvasWindow)\n/* harmony export */ });\n/* harmony import */ var _Coordinate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Coordinate */ \"./dist/Coordinate.js\");\n/* harmony import */ var _Drawing__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Drawing */ \"./dist/Drawing.js\");\n/* harmony import */ var _Utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Utils */ \"./dist/Utils.js\");\n\r\n\r\n\r\nclass CanvasWindow {\r\n    constructor() {\r\n        this.canvas = document.getElementById('myCanvas');\r\n        this.drawings = [];\r\n        this.isDrawing = false;\r\n        this.skipFrame = 0;\r\n        this.singleDotList = [];\r\n        this.isLocked = false;\r\n        this.color = 'black';\r\n        this.smoothing = 5;\r\n        //! Does it needs to be public ???\r\n        this.lineWeight = 4;\r\n        this.canceledPaths = [];\r\n        this.canvasWidth = () => {\r\n            return this.canvas.width;\r\n        };\r\n        this.canvasHeight = () => {\r\n            return this.canvas.height;\r\n        };\r\n        this.ctx = this.canvas.getContext('2d');\r\n        // this.drawings = new Drawing(this.ctx);\r\n        this.canvas.width = window.innerWidth;\r\n        this.canvas.height = window.innerHeight;\r\n        this.canvasPosLeft = this.canvas.offsetLeft + this.canvas.clientLeft;\r\n        this.canvasPosTop = this.canvas.offsetTop + this.canvas.clientTop;\r\n        this.canvas.addEventListener('mousedown', (event) => {\r\n            this.initDrawing(event);\r\n        });\r\n        window.addEventListener('mouseup', (event) => {\r\n            if (!this.isLocked) {\r\n                this.stopDrawing(event);\r\n            }\r\n        });\r\n        this.canvas.addEventListener('mousemove', (event) => {\r\n            this.recordMouseMove(event);\r\n        });\r\n        window.addEventListener('resize', (event) => {\r\n            this.canvas.width = window.innerWidth;\r\n            this.canvas.height = window.innerHeight;\r\n            this.canvasPosLeft = this.canvas.offsetLeft + this.canvas.clientLeft;\r\n            this.canvasPosTop = this.canvas.offsetTop + this.canvas.clientTop;\r\n            this.draw();\r\n        });\r\n    }\r\n    setColor(color) {\r\n        this.color = color;\r\n    }\r\n    setSmoothing(value) {\r\n        this.smoothing = value;\r\n    }\r\n    setLineWeight(value) {\r\n        console.log('wtf => ', value);\r\n        this.lineWeight = value;\r\n    }\r\n    toggleLockCanvas() {\r\n        this.isLocked = !this.isLocked;\r\n    }\r\n    removePath() {\r\n        if (this.drawings.length) {\r\n            const canceledDrawing = this.drawings.pop();\r\n            canceledDrawing.toggleDisplay();\r\n            this.canceledPaths.push(canceledDrawing);\r\n            this.draw();\r\n        }\r\n        return this.drawings.length;\r\n    }\r\n    setFrameToSkip(val) {\r\n        if (((this.smoothing + val) > 0) && ((this.smoothing + val) < 70)) {\r\n            this.smoothing += val;\r\n        }\r\n    }\r\n    reAddPath() {\r\n        if (this.canceledPaths.length) {\r\n            const pathToReAdd = this.canceledPaths.pop();\r\n            pathToReAdd.toggleDisplay();\r\n            this.drawings.push(pathToReAdd);\r\n            this.draw();\r\n        }\r\n    }\r\n    initDrawing(event) {\r\n        this.isDrawing = true;\r\n        console.log('initDrawing lineWeight => ', this.lineWeight);\r\n        this.drawings.push(new _Drawing__WEBPACK_IMPORTED_MODULE_1__.default(new _Coordinate__WEBPACK_IMPORTED_MODULE_0__.default(this.getCanvasRelatedCoordinates(event)), this.ctx, this.lineWeight, this.color));\r\n    }\r\n    getCanvasRelatedCoordinates(event) {\r\n        return {\r\n            posX: event.pageX - this.canvasPosLeft,\r\n            posY: event.pageY - this.canvasPosTop,\r\n        };\r\n    }\r\n    recordMouseMove(event) {\r\n        if (!this.isDrawing)\r\n            return;\r\n        this.frameRequest = requestAnimationFrame(() => {\r\n            const currentDrawing = this.drawings[this.drawings.length - 1];\r\n            if (this.skipFrame === 0) {\r\n                // this.clearCanvas()\r\n                currentDrawing.addCoordinate(this.getCanvasRelatedCoordinates(event));\r\n                currentDrawing.removeUglyPath();\r\n                this.skipFrame = this.smoothing;\r\n            }\r\n            else {\r\n                currentDrawing.addUglyCoordinate(this.getCanvasRelatedCoordinates(event));\r\n                this.skipFrame--;\r\n            }\r\n            this.draw();\r\n        });\r\n    }\r\n    draw() {\r\n        this.clearCanvas();\r\n        this.drawings.forEach(path => {\r\n            path.draw();\r\n        });\r\n        this.singleDotList.forEach(coordinate => {\r\n            this.ctx.beginPath();\r\n            this.ctx.arc(coordinate.x, coordinate.y, 3, 0, 2 * Math.PI);\r\n            console.debug(this.color);\r\n            this.ctx.fillStyle = this.color;\r\n            this.ctx.fill();\r\n        });\r\n    }\r\n    stopDrawing(event = null) {\r\n        if (event) {\r\n            this.finishDrawing(event);\r\n        }\r\n        this.isDrawing = false;\r\n        _Utils__WEBPACK_IMPORTED_MODULE_2__.Utils.emit('addPath');\r\n    }\r\n    finishDrawing(event) {\r\n        const currentPath = this.drawings[this.drawings.length - 1];\r\n        if (currentPath.path.length === 1) {\r\n            this.singleDotList.push(new _Coordinate__WEBPACK_IMPORTED_MODULE_0__.default({ posX: currentPath.path[0].x, posY: currentPath.path[0].y }));\r\n        }\r\n        else if (currentPath.path.length > 2) {\r\n            currentPath.addCoordinate({\r\n                posX: event.pageX - this.canvasPosLeft,\r\n                posY: event.pageY - this.canvasPosTop,\r\n            });\r\n            currentPath.removeUglyPath();\r\n        }\r\n        this.draw();\r\n    }\r\n    clearCanvas() {\r\n        this.ctx.clearRect(0, 0, this.canvasWidth(), this.canvasHeight());\r\n    }\r\n}\r\n//# sourceMappingURL=CanvasWindow.js.map\n\n//# sourceURL=webpack:///./dist/CanvasWindow.js?");

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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Drawing)\n/* harmony export */ });\n/* harmony import */ var _Coordinate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Coordinate */ \"./dist/Coordinate.js\");\n\r\nclass Drawing {\r\n    constructor(originPoint, ctx, weight, color = 'black') {\r\n        this.path = [];\r\n        this.uglyPath = [];\r\n        this.display = true;\r\n        this.color = color;\r\n        this.ctx = ctx;\r\n        this.weight = weight;\r\n        // this.originPoint = originPoint;\r\n        this.addCoordinate({ posX: originPoint.x, posY: originPoint.y });\r\n        this.addUglyCoordinate({ posX: originPoint.x, posY: originPoint.y });\r\n    }\r\n    draw() {\r\n        this.initPath();\r\n        this.createPath();\r\n        this.ctx.strokeStyle = this.color;\r\n        this.ctx.stroke();\r\n        this.uglyPath.forEach((point, i) => {\r\n            // this.ctx.beginPath();\r\n            // this.ctx.arc(point.x, point.y, 1, 0, 2 * Math.PI);\r\n            // this.ctx.fillStyle = 'red';\r\n            // this.ctx.fill();\r\n            //     // if (i % 2) {\r\n            //     //     this.ctx.beginPath();\r\n            //     //     this.ctx.arc((point.x + this.path[i - 1].x) / 2, (point.y + this.path[i - 1].y) / 2, 3, 0, 2 * Math.PI);\r\n            //     //     this.ctx.fillStyle = 'green';\r\n            //     //     this.ctx.fill();\r\n            //     // } else {\r\n            //     //     this.ctx.beginPath();\r\n            //     //     this.ctx.arc(point.x, point.y, 3, 0, 2 * Math.PI);\r\n            //     //     this.ctx.fillStyle = 'red';\r\n            //     //     this.ctx.fill();\r\n            //     // }\r\n        });\r\n    }\r\n    drawUgly() {\r\n        this.initPath();\r\n        this.createUglyPath();\r\n        this.ctx.stroke();\r\n    }\r\n    createUglyPath() {\r\n        if (!this.display)\r\n            return;\r\n        this.ctx.moveTo(this.path[0].x, this.path[0].y);\r\n        if (this.path.length > 2) {\r\n            this.path.forEach((point, i) => {\r\n                if (i < this.path.length - 1) {\r\n                    this.ctx.quadraticCurveTo(point.x, point.y, this.path[i + 1].x, this.path[i + 1].y);\r\n                }\r\n            });\r\n        }\r\n    }\r\n    addCoordinate(coordinate) {\r\n        this.path.push(new _Coordinate__WEBPACK_IMPORTED_MODULE_0__.default(coordinate));\r\n    }\r\n    addCircle() {\r\n        this.ctx.beginPath();\r\n        this.ctx.arc(this.path[0].x, this.path[0].y, 12, 0, 2 * Math.PI);\r\n        this.ctx.fillStyle = 'blue';\r\n        this.ctx.fill();\r\n    }\r\n    addUglyCoordinate(coordinate) {\r\n        this.uglyPath.push(new _Coordinate__WEBPACK_IMPORTED_MODULE_0__.default(coordinate));\r\n    }\r\n    removeUglyPath() {\r\n        this.uglyPath = [];\r\n    }\r\n    toggleDisplay() {\r\n        this.display = !this.display;\r\n        // this.draw();\r\n    }\r\n    initPath() {\r\n        this.ctx.beginPath();\r\n        this.ctx.lineCap = 'round';\r\n        this.ctx.lineJoin = 'round';\r\n        this.ctx.lineWidth = this.weight;\r\n    }\r\n    createPath() {\r\n        if (!this.display)\r\n            return;\r\n        this.ctx.moveTo(this.path[0].x, this.path[0].y);\r\n        if (this.path.length > 2) {\r\n            for (let i = 1; i < this.path.length - 2; i++) {\r\n                // if (i > this.path.length - 2) {\r\n                const p0 = this.path[i], p1 = this.path[i + 1], midx = (p0.x + p1.x) / 2, midy = (p0.y + p1.y) / 2;\r\n                this.ctx.quadraticCurveTo(p0.x, p0.y, midx, midy);\r\n                // }\r\n            }\r\n            ;\r\n            const p0 = this.path[this.path.length - 2], p1 = this.path[this.path.length - 1];\r\n            this.ctx.quadraticCurveTo(p0.x, p0.y, p1.x, p1.y);\r\n        }\r\n        if (this.uglyPath.length > 2) {\r\n            this.ctx.moveTo(this.path[this.path.length - 1].x, this.path[this.path.length - 1].y);\r\n            this.uglyPath.forEach((point, i) => {\r\n                if (i < this.uglyPath.length - 1) {\r\n                    this.ctx.quadraticCurveTo(point.x, point.y, this.uglyPath[i + 1].x, this.uglyPath[i + 1].y);\r\n                }\r\n            });\r\n        }\r\n    }\r\n}\r\n//# sourceMappingURL=Drawing.js.map\n\n//# sourceURL=webpack:///./dist/Drawing.js?");

/***/ }),

/***/ "./dist/ExpansionBtn.js":
/*!******************************!*\
  !*** ./dist/ExpansionBtn.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"ExpansionBtn\": () => (/* binding */ ExpansionBtn)\n/* harmony export */ });\n/* harmony import */ var _Utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Utils */ \"./dist/Utils.js\");\n\r\nclass ExpansionBtn {\r\n    constructor(target, customEventName = 'expand', expanded = false) {\r\n        this.expandClass = 'fa-angle-up';\r\n        this.reducedClass = 'fa-angle-down';\r\n        this.targetContainer = target;\r\n        this.customEvent = customEventName;\r\n        this.expanded = expanded;\r\n        this.init();\r\n        target.addEventListener('click', () => this.toggleExpansion());\r\n    }\r\n    toggleExpansion() {\r\n        this.expanded = !this.expanded;\r\n        _Utils__WEBPACK_IMPORTED_MODULE_0__.Utils.emit(this.customEvent, this.expanded);\r\n        //! instead of remove should handle a transiton on rotation 180°\r\n        this.removeTargetClass();\r\n        this.addTargetClass();\r\n    }\r\n    removeTargetClass() {\r\n        this.target.classList.remove(this.expanded ? this.reducedClass : this.expandClass);\r\n    }\r\n    addTargetClass() {\r\n        this.target.classList.add(this.expanded ? this.expandClass : this.reducedClass);\r\n        console.debug('classList => ', this.target.classList);\r\n    }\r\n    init() {\r\n        this.target = this.getTargetFromParentNode();\r\n        this.addTargetClass();\r\n    }\r\n    getTargetFromParentNode() {\r\n        for (const child of this.targetContainer.children) {\r\n            if (child.classList.contains('control-expansion-btn')) {\r\n                return this.target = child.children[0];\r\n            }\r\n        }\r\n    }\r\n}\r\n//# sourceMappingURL=ExpansionBtn.js.map\n\n//# sourceURL=webpack:///./dist/ExpansionBtn.js?");

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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Menu\": () => (/* binding */ Menu)\n/* harmony export */ });\n/* harmony import */ var _ExpansionBtn__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ExpansionBtn */ \"./dist/ExpansionBtn.js\");\n/* harmony import */ var _Utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Utils */ \"./dist/Utils.js\");\n\r\n\r\nclass Menu {\r\n    constructor() {\r\n        this.lineWeight = 4;\r\n        this.historyActionBtn = { undo: document.querySelector('#undo'), redo: document.querySelector('#redo') };\r\n        this.undoHistory = 0;\r\n        this.redoHistory = 0;\r\n        this.domSettings = document.querySelector('#settings');\r\n        this.additionalContent = document.querySelector('#additional-content');\r\n        this.allColorList = {\r\n            main: ['black', 'white', 'blue', 'red', 'green', 'yellow', 'orange'],\r\n            custom: [],\r\n            history: [undefined, undefined, undefined, undefined, undefined],\r\n            secondary: [],\r\n        };\r\n        this.allColorList.secondary = CSS_COLOR_NAMES;\r\n        this.setEventListeners();\r\n        this.displayColorsOptions('main');\r\n        this.displayColorsOptions('secondary');\r\n        this.displayColorsOptions('history');\r\n        this.setSelectedColor();\r\n        this.expansionBtn = new _ExpansionBtn__WEBPACK_IMPORTED_MODULE_0__.ExpansionBtn(document.querySelector('#menu-expansion-controller'));\r\n    }\r\n    setExpansion(expansion) {\r\n        if (expansion) {\r\n            this.additionalContent.classList.add('expanded');\r\n        }\r\n        else {\r\n            this.additionalContent.classList.remove('expanded');\r\n        }\r\n    }\r\n    addActionToHistory() {\r\n        this.undoHistory++;\r\n        this.redoHistory = 0;\r\n        this.setUndoRedoStyle();\r\n    }\r\n    removeActionHistory(action) {\r\n        this.redoHistory = action();\r\n    }\r\n    undo() {\r\n        if (!this.undoHistory)\r\n            return;\r\n        _Utils__WEBPACK_IMPORTED_MODULE_1__.Utils.emit('undo');\r\n        this.undoHistory--;\r\n        this.redoHistory++;\r\n        this.setUndoRedoStyle();\r\n    }\r\n    redo() {\r\n        if (!this.redoHistory)\r\n            return;\r\n        _Utils__WEBPACK_IMPORTED_MODULE_1__.Utils.emit('redo');\r\n        this.undoHistory++;\r\n        this.redoHistory--;\r\n        this.setUndoRedoStyle();\r\n    }\r\n    setSmoothing(val) {\r\n        console.log('smoothing => ', val);\r\n        _Utils__WEBPACK_IMPORTED_MODULE_1__.Utils.emit('smoothingChange', val);\r\n    }\r\n    mouseEnter() {\r\n        _Utils__WEBPACK_IMPORTED_MODULE_1__.Utils.emit('mouseEnterMenu');\r\n    }\r\n    mouseLeave() {\r\n        _Utils__WEBPACK_IMPORTED_MODULE_1__.Utils.emit('mouseLeaveMenu');\r\n    }\r\n    setUndoRedoStyle() {\r\n        for (const id in this.historyActionBtn) {\r\n            const node = this.historyActionBtn[id];\r\n            this.toggleHistoryActionBtnClass(node, !!this[id + 'History']);\r\n        }\r\n    }\r\n    toggleHistoryActionBtnClass(node, enabled) {\r\n        const classList = node.classList;\r\n        //? Big condition might be useless if I think more of what can happen when triggering on btn\r\n        if (enabled) {\r\n            if (classList.contains('disabled')) {\r\n                console.log('shouldBeEnabled');\r\n                classList.remove('disabled');\r\n                classList.add('enabled');\r\n            }\r\n        }\r\n        else {\r\n            if (classList.contains('enabled')) {\r\n                classList.remove('enabled');\r\n                classList.add('disabled');\r\n            }\r\n        }\r\n    }\r\n    displayColorsOptions(colorListName) {\r\n        const colorList = this.allColorList[colorListName];\r\n        const target = document.querySelector('#' + colorListName + '-color-container');\r\n        colorList.forEach(color => {\r\n            const DOMItem = document.createElement('div');\r\n            DOMItem.className = \"color\" + (colorListName === 'secondary' ? ' secondary-color' : '');\r\n            DOMItem.id = color;\r\n            DOMItem.dataset.color = color;\r\n            DOMItem.style.backgroundColor = color ? color : 'darkgrey';\r\n            DOMItem.addEventListener('click', (e) => {\r\n                const target = e.target;\r\n                this.setSelectedColor(target.id);\r\n            });\r\n            target.appendChild(DOMItem);\r\n        });\r\n    }\r\n    setSelectedColor(color = 'black') {\r\n        if (this.selectedColor !== color) {\r\n            this.selectedColor = color;\r\n            _Utils__WEBPACK_IMPORTED_MODULE_1__.Utils.emit('colorChange', this.selectedColor);\r\n            this.setSelectedColorDisplay();\r\n            this.editHistory();\r\n        }\r\n    }\r\n    editHistory() {\r\n        let history = this.allColorList.history;\r\n        const selectedColorindexInHistory = history.indexOf(this.selectedColor);\r\n        if (selectedColorindexInHistory === -1) {\r\n            history.splice(0, 0, this.selectedColor);\r\n            console.log('history I => ', history);\r\n            history.pop();\r\n        }\r\n        else {\r\n            history.splice(selectedColorindexInHistory, 1);\r\n            history.splice(0, 0, this.selectedColor);\r\n            console.log('history II => ', history);\r\n        }\r\n        this.editHistoryDisplay();\r\n    }\r\n    editHistoryDisplay() {\r\n        this.resetHistory();\r\n        this.displayColorsOptions('history');\r\n    }\r\n    resetHistory() {\r\n        const target = document.querySelector('#history-color-container');\r\n        while (target.firstChild)\r\n            target.removeChild(target.firstChild);\r\n    }\r\n    setSelectedColorDisplay() {\r\n        const domColors = document.getElementsByClassName('color');\r\n        for (const domColor of domColors) {\r\n            if (domColor.id === this.selectedColor) {\r\n                domColor.classList.add('selected');\r\n            }\r\n            else {\r\n                domColor.classList.remove('selected');\r\n            }\r\n        }\r\n    }\r\n    setLineWeight(value) {\r\n        console.log('COUOU');\r\n        this.lineWeight = value;\r\n        _Utils__WEBPACK_IMPORTED_MODULE_1__.Utils.emit('lineWeightChange', this.lineWeight);\r\n    }\r\n    setEventListeners() {\r\n        document.querySelector('#undo').addEventListener('click', () => this.undo());\r\n        document.querySelector('#redo').addEventListener('click', () => this.redo());\r\n        document.querySelector('#settings').addEventListener('mouseenter', () => this.mouseEnter());\r\n        document.querySelector('#settings').addEventListener('mouseleave', () => this.mouseLeave());\r\n        document.querySelector('#smoothingRange').addEventListener('input', (e) => this.setSmoothing(parseInt(e.srcElement.value, 10)));\r\n        document.querySelector('#lineWheight').addEventListener('input', (e) => this.setLineWeight(parseInt(e.srcElement.value, 10)));\r\n    }\r\n}\r\nconst CSS_COLOR_NAMES = [\r\n    \"AliceBlue\",\r\n    \"AntiqueWhite\",\r\n    \"Aqua\",\r\n    \"Aquamarine\",\r\n    \"Azure\",\r\n    \"Beige\",\r\n    \"Bisque\",\r\n    \"Black\",\r\n    \"BlanchedAlmond\",\r\n    \"Blue\",\r\n    \"BlueViolet\",\r\n    \"Brown\",\r\n    \"BurlyWood\",\r\n    \"CadetBlue\",\r\n    \"Chartreuse\",\r\n    \"Chocolate\",\r\n    \"Coral\",\r\n    \"CornflowerBlue\",\r\n    \"Cornsilk\",\r\n    \"Crimson\",\r\n    \"Cyan\",\r\n    \"DarkBlue\",\r\n    \"DarkCyan\",\r\n    \"DarkGoldenRod\",\r\n    \"DarkGray\",\r\n    \"DarkGrey\",\r\n    \"DarkGreen\",\r\n    \"DarkKhaki\",\r\n    \"DarkMagenta\",\r\n    \"DarkOliveGreen\",\r\n    \"DarkOrange\",\r\n    \"DarkOrchid\",\r\n    \"DarkRed\",\r\n    \"DarkSalmon\",\r\n    \"DarkSeaGreen\",\r\n    \"DarkSlateBlue\",\r\n    \"DarkSlateGray\",\r\n    \"DarkSlateGrey\",\r\n    \"DarkTurquoise\",\r\n    \"DarkViolet\",\r\n    \"DeepPink\",\r\n    \"DeepSkyBlue\",\r\n    \"DimGray\",\r\n    \"DimGrey\",\r\n    \"DodgerBlue\",\r\n    \"FireBrick\",\r\n    \"FloralWhite\",\r\n    \"ForestGreen\",\r\n    \"Fuchsia\",\r\n    \"Gainsboro\",\r\n    \"GhostWhite\",\r\n    \"Gold\",\r\n    \"GoldenRod\",\r\n    \"Gray\",\r\n    \"Grey\",\r\n    \"Green\",\r\n    \"GreenYellow\",\r\n    \"HoneyDew\",\r\n    \"HotPink\",\r\n    \"IndianRed\",\r\n    \"Indigo\",\r\n    \"Ivory\",\r\n    \"Khaki\",\r\n    \"Lavender\",\r\n    \"LavenderBlush\",\r\n    \"LawnGreen\",\r\n    \"LemonChiffon\",\r\n    \"LightBlue\",\r\n    \"LightCoral\",\r\n    \"LightCyan\",\r\n    \"LightGoldenRodYellow\",\r\n    \"LightGray\",\r\n    \"LightGrey\",\r\n    \"LightGreen\",\r\n    \"LightPink\",\r\n    \"LightSalmon\",\r\n    \"LightSeaGreen\",\r\n    \"LightSkyBlue\",\r\n    \"LightSlateGray\",\r\n    \"LightSlateGrey\",\r\n    \"LightSteelBlue\",\r\n    \"LightYellow\",\r\n    \"Lime\",\r\n    \"LimeGreen\",\r\n    \"Linen\",\r\n    \"Magenta\",\r\n    \"Maroon\",\r\n    \"MediumAquaMarine\",\r\n    \"MediumBlue\",\r\n    \"MediumOrchid\",\r\n    \"MediumPurple\",\r\n    \"MediumSeaGreen\",\r\n    \"MediumSlateBlue\",\r\n    \"MediumSpringGreen\",\r\n    \"MediumTurquoise\",\r\n    \"MediumVioletRed\",\r\n    \"MidnightBlue\",\r\n    \"MintCream\",\r\n    \"MistyRose\",\r\n    \"Moccasin\",\r\n    \"NavajoWhite\",\r\n    \"Navy\",\r\n    \"OldLace\",\r\n    \"Olive\",\r\n    \"OliveDrab\",\r\n    \"Orange\",\r\n    \"OrangeRed\",\r\n    \"Orchid\",\r\n    \"PaleGoldenRod\",\r\n    \"PaleGreen\",\r\n    \"PaleTurquoise\",\r\n    \"PaleVioletRed\",\r\n    \"PapayaWhip\",\r\n    \"PeachPuff\",\r\n    \"Peru\",\r\n    \"Pink\",\r\n    \"Plum\",\r\n    \"PowderBlue\",\r\n    \"Purple\",\r\n    \"RebeccaPurple\",\r\n    \"Red\",\r\n    \"RosyBrown\",\r\n    \"RoyalBlue\",\r\n    \"SaddleBrown\",\r\n    \"Salmon\",\r\n    \"SandyBrown\",\r\n    \"SeaGreen\",\r\n    \"SeaShell\",\r\n    \"Sienna\",\r\n    \"Silver\",\r\n    \"SkyBlue\",\r\n    \"SlateBlue\",\r\n    \"SlateGray\",\r\n    \"SlateGrey\",\r\n    \"Snow\",\r\n    \"SpringGreen\",\r\n    \"SteelBlue\",\r\n    \"Tan\",\r\n    \"Teal\",\r\n    \"Thistle\",\r\n    \"Tomato\",\r\n    \"Turquoise\",\r\n    \"Violet\",\r\n    \"Wheat\",\r\n    \"White\",\r\n    \"WhiteSmoke\",\r\n    \"Yellow\",\r\n    \"YellowGreen\",\r\n];\r\n//# sourceMappingURL=Menu.js.map\n\n//# sourceURL=webpack:///./dist/Menu.js?");

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

/***/ "./dist/Utils.js":
/*!***********************!*\
  !*** ./dist/Utils.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Utils\": () => (/* binding */ Utils)\n/* harmony export */ });\nclass Utils {\r\n    static emit(eventType, val = null) {\r\n        const customEvent = new CustomEvent(eventType, val ? { detail: val } : null);\r\n        window.dispatchEvent(customEvent);\r\n    }\r\n}\r\n//# sourceMappingURL=Utils.js.map\n\n//# sourceURL=webpack:///./dist/Utils.js?");

/***/ }),

/***/ "./dist/main.js":
/*!**********************!*\
  !*** ./dist/main.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Menu__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Menu */ \"./dist/Menu.js\");\n/* harmony import */ var _CanvasWindow__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CanvasWindow */ \"./dist/CanvasWindow.js\");\n\r\n\r\n// console.log('------COMPILED------', new Date().getMinutes() + ' : ' + new Date().getSeconds());\r\ndocument.addEventListener('DOMContentLoaded', () => init());\r\nfunction init() {\r\n    const canvas = new _CanvasWindow__WEBPACK_IMPORTED_MODULE_1__.default();\r\n    const menu = new _Menu__WEBPACK_IMPORTED_MODULE_0__.Menu();\r\n    window.addEventListener('undo', () => canvas.removePath());\r\n    window.addEventListener('redo', () => canvas.reAddPath());\r\n    window.addEventListener('mouseEnterMenu', () => canvas.toggleLockCanvas());\r\n    window.addEventListener('mouseLeaveMenu', () => canvas.toggleLockCanvas());\r\n    window.addEventListener('smoothingChange', (smoothingValue) => canvas.setSmoothing(smoothingValue.detail));\r\n    window.addEventListener('lineWeightChange', (lineWeight) => canvas.setLineWeight(lineWeight.detail));\r\n    window.addEventListener('colorChange', (e) => canvas.setColor(e.detail));\r\n    window.addEventListener('expand', (e) => menu.setExpansion(e.detail));\r\n    window.addEventListener('addPath', () => menu.addActionToHistory());\r\n}\r\n//# sourceMappingURL=main.js.map\n\n//# sourceURL=webpack:///./dist/main.js?");

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
/******/ 	__webpack_require__("./dist/ExpansionBtn.js");
/******/ 	__webpack_require__("./dist/FrameRate.js");
/******/ 	__webpack_require__("./dist/main.js");
/******/ 	__webpack_require__("./dist/Menu.js");
/******/ 	__webpack_require__("./dist/Segment.js");
/******/ 	__webpack_require__("./dist/UglyDrawing.js");
/******/ 	var __webpack_exports__ = __webpack_require__("./dist/Utils.js");
/******/ 	
/******/ })()
;