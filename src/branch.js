class Branch {
    constructor(x1, y1, x2, y2, angle, length, generation, parent = null) {
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
        this.angle = angle;
        this.length = length;
        this.generation = generation;
        this.parent = parent;
        this.children = []; //Empty array for child branches
    };

    //Draw the branch
    draw(p) {
        p.stroke(this.getColor()); //Colors fade as branches get older
        const weight = Math.max(1, 8 - this.generation); //Thin branches as they get older
        p.strokeWeight(weight);
        p.line(this.x1, this.y1, this.x2, this.y2);
    };

    addChild(branch) {
        this.children.push(branch);
        branch.parent = this;
    };

    getColor() {
        //Cycle through the Hue in HSB color mode to create psychedelic trees!

        //Fade from green to brown with age
        const green = Math.max(50, 200 - (this.generation * 20));
        const red = this.generation * 15; //Adds brown tint
        return [red, green, 0];
    };

    containsPoint(x, y, threshold) {
        //Vector from start to end of line segment
        const dx = this.x2 - this.x1;
        const dy = this.y2 - this.y1;

        //Length squared of the line segment
        const lengthSquared = dx * dx + dy * dy;

        //Handle zero-length segment
        if (lengthSquared === 0) {
            //Just check distance to that point
            const dist = Math.sqrt((x - this.x1) ** 2 + (y - this.y1) **2);
            return dist < threshold;
        };

        //Project point onto line to find t parameter
        //t=0 means closest point is at start, t = 1 means at the end
        let t = ((x - this.x1) * dx + (y - this.y1) * dy) / lengthSquared;

        //Clamp t between 0 and 1 to stay on segment
        t = Math.max(0, Math.min(1, t));

        //Find the closest point on the segment
        const closestX = this.x1 + t * dx;
        const closestY = this.y1 + t * dy;

        //Calculate distance from point to closest point
        const distance = Math.sqrt((x - closestX) ** 2 + (y - closestY) ** 2);

        //Check if distance is within threshold
        return distance < threshold;
    };
};