import { Actor, Input, Vector, clamp } from "excalibur";
import { Resources } from './resources.js';
import { BaseObstacle } from './baseObstacle.js';
import { Shield } from './shield.js';
import { Crow } from "./crow.js";
import { Cloud } from "./cloud.js";
import { Broom } from "./broom.js";

export class Player extends Actor {
    constructor(ui) {
        super({ width: Resources.Player.width / 3, height: Resources.Player.height / 3 });
        this.hearts = 1;
        this.hasShield = false;
        this.ui = ui;
    }

    onInitialize(engine) {
        const sprite = Resources.Player.toSprite();
        this.hearts = 1;
        sprite.scale = new Vector(0.4, 0.4);
        this.graphics.use(sprite);
        this.pos = new Vector(300, 490);
        this.ui.updateHearts(this.hearts);

        this.on('collisionstart', (event) => this.hitSomething(event, engine));
    }

    hitSomething(event, engine) {
        if (this.hearts > 0) {
            if (event.other instanceof BaseObstacle) {
                this.hearts--;
                console.log("You hit something. Current hearts:", this.hearts);
                this.ui.updateHearts(this.hearts);
                if (this.hearts <= 0) {
                    if (event.other instanceof Crow || event.other instanceof Cloud) {
                        this.performFallingAnimation(engine);
                    } else if (event.other instanceof Broom) {
                        this.performBroomAnimation(engine);
                    } else {
                        this.actions.die();
                        this.kill();
                        console.log('You hit the thing!');
                        engine.resetGame();
                    }
                }
            }
        }
        if (this.hearts === 1) {
            const sprite = Resources.Player.toSprite();
            sprite.scale = new Vector(0.4, 0.4);
            this.graphics.use(sprite);
        }
        if (event.other instanceof Shield) {
            event.other.kill();
            this.addShield();
        }
    }

    performBroomAnimation(engine, callback) {
        console.log("Broom animation");

        const distanceToMove = -this.pos.x

        this.actions
            .moveBy(distanceToMove, 0, 5000)
            .callMethod(() => {
                this.kill();
                setTimeout(() => {
                    engine.resetGame();
                }, 1000);
                if (callback) {
                    callback();
                }
            });
    }

    performFallingAnimation(engine, callback) {
        console.log("falling animation");
        const fallDistance = engine.drawHeight - this.pos.y;

        this.actions
            .moveBy(0, fallDistance, 5000)
            .callMethod(() => {
                this.kill();
                setTimeout(() => {
                    engine.resetGame();
                }, 1000);
                if (callback) {
                    callback();
                }
            });
    }



    addShield() {
        this.hasShield = true;
        const sprite = Resources.GhostShield.toSprite();
        sprite.scale = new Vector(0.4, 0.4);
        this.graphics.use(sprite);
        let shield = new Shield();
        this.hearts = 3;
        this.addChild(shield);
        this.ui.updateHearts(this.hearts);
        console.log('Shield acquired! Hearts:', this.hearts);
    }

    onPreUpdate(engine) {
        let speedX = 0;
        let speedY = 0;

        if (engine.input.keyboard.isHeld(Input.Keys.Left) || engine.input.keyboard.isHeld(Input.Keys.A)) {
            speedX = -200;
        }
        if (engine.input.keyboard.isHeld(Input.Keys.Right) || engine.input.keyboard.isHeld(Input.Keys.D)) {
            speedX = 200;
        }
        if (engine.input.keyboard.isHeld(Input.Keys.Up) || engine.input.keyboard.isHeld(Input.Keys.W)) {
            speedY = -200;
        }
        if (engine.input.keyboard.isHeld(Input.Keys.Down) || engine.input.keyboard.isHeld(Input.Keys.S)) {
            speedY = 200;
        }

        this.vel.x = speedX;
        this.vel.y = speedY;

        this.pos.x = clamp(this.pos.x, 0, engine.drawWidth);
        this.pos.y = clamp(this.pos.y, 0, engine.drawHeight);
    }
}