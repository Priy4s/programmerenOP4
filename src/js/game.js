import '../css/style.css';
import { Engine, Label } from "excalibur";
import { Resources, ResourceLoader } from './resources.js';
import { GameScene } from './gameScene.js';
import { GameOverScene } from './gameOverScene.js';
import { BaseObstacle } from './baseObstacle.js';
import { Shield } from './shield.js';

export class Game extends Engine {
    constructor() {
        super({ width: 1280, height: 720 });
        this.score = 0;
        this.start(ResourceLoader).then(() => this.startGame());
    }

    onInitialize() {
        console.log("start the game!");
        this.add('game', new GameScene());
        this.add('gameover', new GameOverScene(this));
    }

    resetGame() {
        this.currentScene.timers.forEach(timer => timer.cancel());

        this.currentScene.actors.forEach(actor => {
            if (actor instanceof BaseObstacle || actor instanceof Shield) {
                actor.kill();
            }
            if (actor instanceof Label && actor.text.startsWith('Score:')) {
                actor.kill();
            }
        });

        this.goToScene('gameover');
        console.log("in reset game");
    }

    startGame() {
        this.goToScene('game');
    }
}

new Game();