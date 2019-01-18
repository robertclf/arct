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

// // import matrixMultiplication from 'matrix-multiplication';
// import matrixMultiplication from "./matrix-multiplication";

// export function easeInOut(t, amt=2) {
function easeInOut(t, amt=2) {
    let tPow = Math.pow(t, amt);
    return tPow / (tPow + Math.pow(1 - t, amt));
}

// export function sinEaseInOut(t) {
function sinEaseInOut(t) {
    return 0.5 - 0.5 * Math.cos(Math.PI * t);
}

// export function smallEaseInOut(t, a, b) {
function smallEaseInOut(t, a, b) {
    // maximum slope, during the constant part
    let m = 1 / (1 - a - b);
    
    // f0
    if (t < a) {
        return 0;
    }

    // f1
    if (t < b) {
        return ((m / 2) / (b - a)) * (t - a) * (t - a);
    }
    
    // f2
    if (t < 1 - b) {
        return m * (t - b) + // constant line part
        (m / 2) * (b - a); // maximum value of f1
    }
    
    // use symmetry powers
    return 1 - smallEaseInOut(1 - t, a, b)
}

// export function slurp(val1, val2, amt) {
function slurp(val1, val2, amt) {
    return (val2 - val1) * amt + val1;
}

// export function experp(val1, val2, amt) {
function experp(val1, val2, amt) {
    return Math.exp(
        slurp(
            Math.log(val1),
            Math.log(val2),
            amt
        )
    )
}

// export function clampedSlurp(val1, val2, amt) {
function clampedSlurp(val1, val2, amt) {
    if (amt < 0) {
        return val1;
    }
    if (amt > 1) {
        return val2;
    }
    return slurp(val1, val2, amt);
}

// export function clamp(amt, val1, val2) {
function clamp(amt, val1, val2) {
    if (amt < val1) {
        return val1;
    }
    if (amt > val2) {
        return val2;
    }
    return amt;
}

/**
 * Extracts a 0-1 interval from a section of a 0-1 interval
 *
 * For example, if min == 0.3 and max == 0.7, you get:
 *
 *           0.3  0.7
 *     t: 0 --+----+-- 1
 *           /      \
 *          /        \
 *         /          \
 *     -> 0 ---------- 1
 *
 * Useful for making sub animations.
 *
 * Doesn't do any clamping, so you might want to clamp yourself.
 */
// export function divideInterval(t, min, max) {
function divideInterval(t, min, max) {
    return (t - min) / (max - min);
}

/**
 * Does a positive modulo
 * @param {number} a The thing being modulo'd
 * @param {number} b The divider thing
 * @returns {number} a % b
 */
// export function posMod(a, b) {
function posMod(a, b) {
    let out = a % b;
    if (out < 0) {
        out += b;
    }
    return out;
}

// TODO? Redesign so this generates a function?
// export function to2dIsometric(x, y, z, xzAngle=0, yAngle=0) {
function to2dIsometric(x, y, z, xzAngle=0, yAngle=0) {
    const mul = matrixMultiplication()(3);
    // s/o to wikipedia for these rotation matrices
    const xzRotateMatrix = [
        Math.cos(xzAngle), 0, -Math.sin(xzAngle),
        0, 1, 0,
        Math.sin(xzAngle), 0, Math.cos(xzAngle)
    ];
    const yRotateMatrix = [
        1, 0, 0,
        0, Math.cos(yAngle), Math.sin(yAngle),
        0, -Math.sin(yAngle), Math.cos(yAngle)
    ];
    const transformMatrix = mul(yRotateMatrix, xzRotateMatrix);

    const transformed = mul(transformMatrix, [x, y, z]);
    // Just return the x and y
    return {x: transformed[0], y: transformed[1]};
}