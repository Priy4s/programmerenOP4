import { Actor, ScreenElement, Vector, vec } from "excalibur";
import { Resources } from "./resources";

export class UI extends ScreenElement {
    constructor() {
        super();
        this.hearts = [];
        this.isVisible = false;
        this.z = 10
    }

    updateHearts(lives) {
        this.hearts.forEach(heart => {
            this.removeChild(heart);
        });

        for (let i = 0; i < lives; i++) {
            const heart = new Actor();
            heart.graphics.use(Resources.Heart.toSprite());
            heart.scale = vec(0.2, 0.2);
            heart.pos = new Vector(50 + (i * 80), 650);
            this.hearts.push(heart);
            this.addChild(heart);

        }
    }
}
