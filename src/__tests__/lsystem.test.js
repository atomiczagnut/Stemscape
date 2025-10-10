const { generateLSystem } = require ('../lsystem.js');

describe("L-System Generation", () => {
    test("should expand F->F+F correctly over 3 iterations", () => {
        const axiom = "F";
        const rules = {
            'F': 'F+F'
        };
        const result = generateLSystem(axiom, rules, 3);
        expect(result).toBe("F+F+F+F+F+F+F+F");
    });
});