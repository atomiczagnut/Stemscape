import p5 from 'p5';
import * as Tone from 'tone';
import { playBranchSound } from './audio.js';

import { generateLSystem } from './lsystem.js';
import { parseLSystemToBranches } from './lsystem.js';

const sketch = (p) => {
    let branches = [];
    let selectedBranch = null;
    let lastMouseAngle = 0;

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

    //Mouse event handlers
    p.mousePressed = () => {
        console.log("Mouse clicked at", p.mouseX, p.mouseY);
        console.log("Total branches:", branches.length);
       
        //Check which branch was clicked
        for (let branch of branches) {
            const isNear = branch.containsPoint(p.mouseX, p.mouseY, 10);
            
            //if (branch.containsPoint(p.mouseX, p.mouseY)) {
            if (isNear) {
                if (p.mouseButton === p.RIGHT) {
                    //Right click: Prune branch
                    branch.removeSelfAndChildren();
                }

                // Remove from main branches array if it is a root branch
                const index = branches.indexOf(branch);
                if (index > -1) {
                    branches.splice(index, 1);
                }

                playPruneSound();
                console.log("🪚 Pruned branch!");

            } else {

                selectedBranch = branch;
                //Calculate initial angle from branch start to mouse
                lastMouseAngle = Math.atan2(p.mouseY - branch.y1, p.mouseX - branch.x1);
                
                //Play sound for this branch!
                playBranchSound(branch);
                
                console.log("Selected branch and played sound!", selectedBranch);
                
            }
            break; //Stop after finding first
        }

        if (!selectedBranch) {
            console.log("No branch found near click!");
        }
    };

    p.mouseDragged = () => {
        if (selectedBranch) {
            //Calculate new angle from branch start to mouse
            const newMouseAngle = Math.atan2(p.mouseY - selectedBranch.y1, p.mouseX - selectedBranch.x1);

            //Calculate change in angle
            const deltaAngle = newMouseAngle - lastMouseAngle;

            //Rotate the branch
            selectedBranch.rotate(deltaAngle);

            //Update for next frame
            lastMouseAngle = newMouseAngle;
        };
    };

    p.mouseReleased = () => {
        selectedBranch = null;
    }
};

new p5(sketch, 'p5-canvas-container');