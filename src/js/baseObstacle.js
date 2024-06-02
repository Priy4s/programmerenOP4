import { Actor, Vector } from "excalibur";
import { Resources } from './resources.js';

export class BaseObstacle extends Actor {
    constructor(width, height) {
        super({ width: width - 20, height: height - 20 });
    }

    onInitialize(engine) {
        this.scale = new Vector(0.3, 0.3);
        this.pos.x = engine.drawWidth;

        const locationUp = Math.random() > 0.5;
        this.pos.y = locationUp ? 600 : 0;

        this.vel = new Vector(-100, 0);

        this.on('exitviewport', () => {
            this.kill();
        });
    }
}
