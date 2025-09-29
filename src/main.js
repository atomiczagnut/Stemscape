import p5 from 'p5';
import * as Tone from 'tone';

import { generateLSystem } from './lsystem.js';
import { drawLSystem } from './turtle.js';

const sketch = (p) => {
    let lSystem = generateLSystem("X", { "X": "F[-X][+X]FX", "F": "FF" }, 3);
    p.setup = () => {
        //Create canvas
        p.createCanvas(800, 600);
        p.background(0);
    };

    p.draw = () => {
        //animation loop
        drawLSystem(p, lSystem, p.width/2, p.height, 25, 10);
    };
};

new p5(sketch);