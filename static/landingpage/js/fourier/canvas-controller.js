/*
MIT License

Copyright (c) 2018 Jez Swanson

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

// import { elementInView, getScrollPosition } from "./controller-util";
// import Controller from "./controller";

// export default class CanvasController extends Controller {
class CanvasController extends Controller {

    constructor(id, width=null, height=null) {
        super();
        this.id = id;
        this.canvas = document.getElementById(id);
        if (width == null) {
            width = this.canvas.width;
        }
        if (height == null) {
            height = this.canvas.height;
        }

        /** @type {CanvasRenderingContext2D} */
        this.context = this.canvas.getContext('2d');
        this.width = width;
        this.height = height;
    }

    isOnScreen() {
        return elementInView(this.canvas);
    }

    getScrollPosition() {
        return getScrollPosition(this.canvas)
    }

    clear() {
        // Clear the previous frame
        this.context.resetTransform();
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

}