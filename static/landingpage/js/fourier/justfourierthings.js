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

// // import FFT from 'fft.js';
// import FFT from "./fft.js";
// import { slurp } from "./util";

/**
 * Do the fourier thing using a bunch of complex points
 * 
 * @param {Array<Number>} points Array of points, alternative with re, im pairs. Length must be a power of 2 
 */
// export function getFourierData(points) {
function getFourierData(points) {
    if (points.length == 0) {
        return [];
    }
    const numPoints = points.length / 2;
    const fft = new FFT(numPoints);
    
    const out = fft.createComplexArray();
    fft.transform(out, points);
    
    // Transform into an API of points I find friendlier.
    const fftData = [];
    for (let i = 0; i < numPoints; i ++) {
        // to reorder the frequencies a little nicer, we pick from the front and back altermatively
        const j = i % 2 == 0 ? i / 2 : numPoints - ((i+1) / 2);
        const x = out[2 * j];
        const y = out[2 * j + 1];
        const freq = ((j + numPoints / 2) % numPoints) - numPoints / 2;
        fftData.push({
            freq: freq,
            // a little expensive
            amplitude: Math.sqrt(x * x + y * y) / numPoints,
            // a lottle expensive :(
            phase: Math.atan2(y, x),
        });
    }
    // fftData.sort((a, b) => b.amplitude - a.amplitude);
    return fftData;
}

/**
 * 
 * @param {Array<Number>} points Array of values of some wave. Must be a power of 2.
 */
// export function getRealFourierData(points) {
function getRealFourierData(points) {
    if (points.length == 0) {
        return [];
    }
    const numPoints = points.length;
    const fft = new FFT(numPoints);

    const formatedPoints = fft.createComplexArray();
    fft.toComplexArray(points, formatedPoints);
    
    const out = fft.createComplexArray();
    fft.transform(out, formatedPoints);

    // Transform into an API of points I find friendlier.
    const fftData = [];
    // We only have to read the first half of this because of symmetry things.
    for (let i = 0; i < numPoints / 2; i ++) {
        const x = out[2 * i];
        const y = out[2 * i + 1];
        const freq = i;
        fftData.push({
            freq: freq,
            // a little expensive
            // Also we gotta multiply this by 2 to account for the other side that
            amplitude: 2 * Math.sqrt(x * x + y * y) / numPoints,
            // a lottle expensive :(
            phase: Math.atan2(y, x),
        });
    }
    // fftData.sort((a, b) => b.amplitude - a.amplitude);
    return fftData;
}

/**
 * Transforms a list of x, y points into input appropriate for a fourier transform.
 */
// export function resample2dData(points, numSamples) {
function resample2dData(points, numSamples) {
    if (points.length == 0) {
        // Can't resample if we don't have ANY points
        return [];
    }
    let newPoints = [];
    for (let i = 0; i < numSamples; i ++) {
        let position = points.length * (i / numSamples);
        let index = Math.floor(position);
        let nextIndex = (index + 1) % points.length;
        let amt = position - index;
        newPoints.push(
            /* x */ slurp(points[index].x, points[nextIndex].x, amt),
            /* y */ slurp(points[index].y, points[nextIndex].y, amt),
        )
    }
    return newPoints;
}