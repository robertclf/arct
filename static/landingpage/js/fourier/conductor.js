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

// export default class Conductor {
class Conductor {

    constructor(controllers) {
        this.lastTime = Date.now();
        this.mousePosition = null;
        this.controllers = controllers.slice();
        this.updatingControllers = [];

        // We can handle these all the same really.
        /*
        document.addEventListener('mousemove', (evt) => this.updateMousePosition(evt));
        document.addEventListener('mousedown', (evt) => this.updateMousePosition(evt));
        document.addEventListener('mouseup',   (evt) => this.updateMousePosition(evt));

        document.addEventListener('touchmove',  (evt) => this.updateTouchPosition(evt));
        document.addEventListener('touchstart', (evt) => this.updateTouchPosition(evt));
        document.addEventListener('touchend',   (evt) => this.updateTouchPosition(evt));
        */
        
        window.addEventListener('resize', (evt) => this.onResize(evt));
    }

    start() {
        // Kick off the update loop
        window.requestAnimationFrame(() => this.everyFrame());
    }

    onResize(evt) {
        this.controllers.forEach(controller => {
            if (typeof controller.onResize === 'function') {
                controller.onResize();
            }
        })
    }

    everyFrame() {
        this.update();
        this.render();
        requestAnimationFrame(() => this.everyFrame());
    }

    update() {
        let curTime = Date.now();
        let dt = (curTime - this.lastTime) / 1000;

        this.updatingControllers = [];

        this.controllers.forEach(controller => {
            if (controller.isOnScreen()) {
                controller.update(dt, this.mousePosition);
                this.updatingControllers.push(controller);
            }
        });

        this.lastTime = curTime;

        const debug = document.getElementById('debug-content');
        if (debug) {
            debug.innerHTML = this.updatingControllers.map(c => c.id).join('<br>') + '<br>';
        }
    }

    render() {
        this.controllers.forEach(controller => {
            if (controller.isOnScreen()) {
                controller.render();
            }
        });
    }

    updateMousePosition(evt) {
        this.mousePosition = { x: evt.clientX, y: evt.clientY };
    }

    updateTouchPosition(evt) {
        if (evt.touches.length > 0) {
            this.mousePosition = { x: evt.touches[0].clientX, y: evt.touches[0].clientY };
        }
    }

}