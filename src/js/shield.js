import { Actor, CollisionType, Vector, vec } from "excalibur";
import { Resources } from './resources.js';
import { Player } from "./player.js";

export class Shield extends Actor {
    constructor() {
        super({
            width: Resources.Heart.width / 20,
            height: Resources.Heart.height / 20,
        });
    }

    onInitialize(engine) {
        super.onInitialize(engine);
        const sprite = Resources.Heart.toSprite();

        sprite.scale = vec(0.05, 0.05);
        this.graphics.use(sprite);

        this.pos.x = engine.drawWidth;
        this.pos.y = Math.random() * engine.drawHeight;

        this.vel = new Vector(-100, 0);

        this.on('collisionstart', (event) => this.playerGot(event, engine));

        this.on('exitviewport', () => {
            this.kill();
        });
    }

    playerGot(event, engine) {
        if (event.other instanceof Player) {
            const gameScene = engine.currentScene;
            gameScene.addPoint();
        }
        this.kill();
    }
}
