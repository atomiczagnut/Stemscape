//L-Systems (short for Lindenmayer Systems) are a mathematical, fractal way to describe the growth of plants

function generateLSystem(axiom, rules, iterations) {
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