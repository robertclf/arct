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

// import { clamp } from "./util";

// export function rgb(r, g, b) {
function rgb(r, g, b) {
    return 'rgb('+r+','+g+','+b+')';
}

// export function grey(whiteAmt) {
function grey(whiteAmt) {
    whiteAmt = clamp(whiteAmt, 0, 1);
    const whiteRgb = Math.floor(255 * whiteAmt);
    return rgb(whiteRgb, whiteRgb, whiteRgb);
}

// export const palette = {
const palette = {
    black: '#333',
    blue: '#4657d7',
    cyan: '#57a7cc',
    pink: '#e91e63',
    orange: '#ed7656',
    white: '#fff',
}