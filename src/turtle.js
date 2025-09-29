//This is called "turtle" as a reference to the old LOGO programming language
//This is what actually draws our L-Systems to the screen

function drawLSystem(p, lSystemString, startX, startY, angle, stepLength) {
    //Initialize state
    let x = startX;
    let y = startY;
    let angle = -90; //Facing up

    //Create stack
    let stack = [];

    //Set up p5
    p.angleMode(p.DEGREES);
    p.stroke("#3BB143");

    //Loop through each character
    for (let char of lSystemString) {
        if (char === 'F') {
            //Move forward and draw
            let newX = x + stepLength * p.cos(angle);
            let newY = y + stepLength * p.sin(angle);
            p.line(x, y, newX, newY);
            x = newX;
            y = newY;
        } else if (char === '+') {
            //Turn right
            angle += turnAngle;
        } else if (char === '-') {
            //Turn left
            angle -= turnAngle;
        } else if (char === '[') {
            //Save current state
            stack.push({x: x, y: y, angle: angle});
        } else if (char === ']') {
            //Restore saved state
            let state = stack.pop();
            x = state.x;
            y = state.y;
            angle = state.angle;
        };
    };
};