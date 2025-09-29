import p5 from 'p5';
import * as Tone from 'tone';

const sketch = (p) => {
    p.setup = () => {
        //Create canvas
        p.createCanvas(800, 600);
        p.background(0);
    };

    p.draw = () => {
        //animation loop
    };
};

new p5(sketch)