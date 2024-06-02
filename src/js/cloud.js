import { vec } from 'excalibur';
import { BaseObstacle } from './baseObstacle.js';
import { Resources } from './resources.js';

export class Cloud extends BaseObstacle {
    constructor(speed) {
        super(Resources.Cloud.width * 5, Resources.Cloud.height * 5);
        this.speed = speed;
    }

    onInitialize(engine) {
        super.onInitialize(engine);
        const sprite = Resources.Cloud.toSprite();

        sprite.scale = vec(7, 7);
        this.graphics.use(sprite);

        // Snelheid
        this.vel = vec(-this.speed, 0);
    }
}
