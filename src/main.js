import p5 from 'p5';
import * as Tone from 'tone';

import { generateLSystem } from './lsystem.js';
import { parseLSystemToBranches } from './lsystem.js';

const sketch = (p) => {
    let branches = [];

    //L-System parameters
    const axiom = "X";
    const rules = { "X": "F[-X][+X]FX", "F": "FF" };
    const maxIterations = 5;
    const angle = 30; //degrees
    const stepLength = 8;

    p.setup = () => {
        //Create canvas
        p.createCanvas(800, 600);
        p.background(0);
        
        //Generate and parse L-System
        const lSystemString = generateLSystem(axiom, rules, maxIterations);
        branches = parseLSystemToBranches(lSystemString, p.width/2, p.height, angle * Math.PI/180, stepLength);
    };

    p.draw = () => {
        //animation loop
        p.background(0);

        //Draw all branches
        for (let branch of branches) {
            branch.draw(p);
        }
    };
};

new p5(sketch);