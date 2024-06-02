import { vec, Timer } from 'excalibur';
import { BaseObstacle } from './baseObstacle.js';
import { Resources } from './resources.js';

export class Crow extends BaseObstacle {
    constructor(speed) {
        super(Resources.CrowUp.width * 0.6, Resources.CrowUp.height * 0.6);
        this.speed = speed;
        this.isCrowUp = true;
    }

    onInitialize(engine) {
        super.onInitialize(engine);
        this.spriteUp = Resources.CrowUp.toSprite();
        this.spriteDown = Resources.CrowDown.toSprite();

        this.spriteUp.scale = vec(0.8, 0.8);
        this.spriteDown.scale = vec(0.8, 0.8);

        this.graphics.use(this.spriteUp);

        this.pos.y = Math.random() * engine.drawHeight;

        this.vel = vec(-this.speed, 0); // snelheid

        this.timer = new Timer({
            interval: 500,
            repeats: true,
            fcn: () => this.toggleSprite()
        });
        engine.add(this.timer);

        this.timer.start();
    }

    toggleSprite() {
        this.isCrowUp = !this.isCrowUp;
        if (this.isCrowUp) {
            this.graphics.use(Resources.CrowUp.toSprite());
        } else {
            this.graphics.use(Resources.CrowDown.toSprite());
        }
    }
}
