import { vec } from 'excalibur';
import { BaseObstacle } from './baseObstacle.js';
import { Resources } from './resources.js';

export class Broom extends BaseObstacle {
    constructor(speed) {
        super(Resources.Broom.width * 1.5, Resources.Broom.height / 3);
        this.speed = speed;
    }

    onInitialize(engine) {
        super.onInitialize(engine);
        const sprite = Resources.Broom.toSprite();

        sprite.scale = vec(2, 2);
        this.graphics.use(sprite);

        //snelheid
        this.vel = vec(-this.speed, 0);
        this.pos.y = Math.random() * engine.drawHeight;
    }
}
