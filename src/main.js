import p5 from 'p5';
import * as Tone from 'tone';

import { generateLSystem } from './lsystem.js';
import { drawLSystem } from './turtle.js';

const sketch = (p) => {
    let lSystem;
    let currentIteration = 0;
    const maxIterations = 5;

    p.setup = () => {
        //Create canvas
        p.createCanvas(800, 600);
        p.background(0);
        p.frameRate(1);
    };

    p.draw = () => {
        //animation loop
        if (currentIteration < maxIterations) {
            p.background(0);
            lSystem = generateLSystem("X", { "X": "F[-X][+X]FX", "F": "FF" }, currentIteration);
            drawLSystem(p, lSystem, p.width/2, p.height, 25, 10);
            currentIteration++;
        };
    };
};

new p5(sketch);