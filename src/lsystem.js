//L-Systems (short for Lindenmayer Systems) are a mathematical, fractal way to describe the growth of plants

//We have created "branch" objects, rather than simple lines, to simulate organic matter, and offer us more control
import { Branch } from './branch.js'; 

export function generateLSystem(axiom, rules, iterations) {
    let current = axiom;

    //Repeat for N iterations
    for (let i = 0; i < iterations; i++) {
        //Create an empty string for the next generation
        let next = "";

        //Look at each character in the current string
        for (let char of current) {
            //Check if there's a rule for this character
            if (rules[char]) {
                //If yes, add the replacement to the next string
                next += rules[char];
            //If no rule exists, keep the character as is
            } else {
                next += char;
            }
        //Close the character loop
        }
        
        //Replace current with the next generation
        current = next;
    //Close the iteration loop
    }

    //Return the final generated string
    return current;
}

/*Test construct 1
const axiom = "F";
const rules = {
    'F': 'F+F'
};
const result = generateLSystem(axiom, rules, 3);
console.log(result);

Excpected result: F+F+F+F+F+F+F+F
*/

/*Test construct 2
const axiom = "X";
const rules = {
    'X': 'F+[[X]-X]-F[-FX]+X',
    'F': 'FF'
};
const result = generateLSystem(axiom, rules, 3);
console.log(result);

Expected result: FFFF+[[FF+[[F+[[X]-X]-F[-FX]+X]-F+[[X]-X]-F[-FX]+X]-FF[-FFF+[[X]-X]-F[-FX]+X]+F+[[X]-X]-F[-FX]+X]-FF+[[F+[[X]-X]-F[-FX]+X]-F+[[X]-X]-F[-FX]+X]-FF[-FFF+[[X]-X]-F[-FX]+X]+F+[[X]-X]-F[-FX]+X]-FFFF[-FFFFFF+[[F+[[X]-X]-F[-FX]+X]-F+[[X]-X]-F[-FX]+X]-FF[-FFF+[[X]-X]-F[-FX]+X]+F+[[X]-X]-F[-FX]+X]+FF+[[F+[[X]-X]-F[-FX]+X]-F+[[X]-X]-F[-FX]+X]-FF[-FFF+[[X]-X]-F[-FX]+X]+F+[[X]-X]-F[-FX]+X
*/

export function parseLSystemToBranches(lSystemString, startX, startY, angleIncrement, stepLength) {
    const branches = [];
    const stack = [];

    let x = startX;
    let y = startY;
    let currentAngle = -Math.PI / 2; //Start facing up in radians
    let generation = 0;
    let parent = null;

    for (let char of lSystemString) {
        if (char === 'F') {
            //Calculate endpoint
            const x2 = x + stepLength * Math.cos(currentAngle);
            const y2 = y + stepLength * Math.sin(currentAngle);

            //Create branch
            const branch = new Branch(x, y, x2, y2, currentAngle, stepLength, generation);
            
            //If there's a parent, add this as a child
            if (parent) {
                parent.addChild(branch);
            };

            branches.push(branch);

            //Move to new position
            x = x2;
            y = y2;
            parent = branch;
        
        } else if (char === '+') {
            //Turn right
            currentAngle += angleIncrement;
        
        } else if (char === '-') {
            //Turn left
            currentAngle -= angleIncrement;
        
        } else if (char == '[') {
            //save state
            stack.push({ x, y, angle: currentAngle, generation, parent });
            generation++;
        
        } else if (char === ']') {
            //restore state
            const state = stack.pop();
            x = state.x;
            y = state.y;
            currentAngle = state.angle;
            generation = state.generation;
            parent = state.parent;
        };
    };

    return branches;
};