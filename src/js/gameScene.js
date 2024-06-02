import { Scene, Timer, Label, Font, Color, Vector } from "excalibur";
import { Player } from './player.js';
import { Cloud } from './cloud.js';
import { Crow } from './crow.js';
import { Background } from './background.js';
import { Broom } from './broom.js';
import { Shield } from './shield.js';
import { UI } from './ui.js';

export class GameScene extends Scene {
    constructor(engine) {
        super();
        this.engine = engine;
    }

    onInitialize(engine) {
        this.engine = engine;
    }

    onActivate() {
        this.engine.score = 0;

        const background = new Background();
        this.add(background);

        this.scoreLabel = new Label({
            text: 'Score: 0',
            pos: new Vector(this.engine.drawWidth / 2, 25),
            font: new Font({ size: 35 }),
            color: Color.Black
        });
        this.scoreLabel.z = 100;
        this.add(this.scoreLabel);

        const ui = new UI();
        this.add(ui);
        const player = new Player(ui);
        this.add(player);

        const cloudInterval = 9000;
        const crowInterval = 5000;
        const broomInterval = 3000;
        const shieldInterval = 10000;

        const obstacleSpawnCloud = new Timer({
            fcn: () => this.spawnObstacle("Cloud"),
            interval: cloudInterval - 100,
            repeats: true
        });
        this.add(obstacleSpawnCloud);
        obstacleSpawnCloud.start();

        const obstacleSpawnCrow = new Timer({
            fcn: () => this.spawnObstacle("Crow"),
            interval: crowInterval - 300,
            repeats: true
        });
        this.add(obstacleSpawnCrow);
        obstacleSpawnCrow.start();

        const obstacleSpawnBroom = new Timer({
            fcn: () => this.spawnObstacle("Broom"),
            interval: broomInterval - 100,
            repeats: true
        });
        this.add(obstacleSpawnBroom);
        obstacleSpawnBroom.start();

        const shieldSpawnTimer = new Timer({
            fcn: () => this.spawnShield(),
            interval: shieldInterval - 100,
            repeats: true
        });
        this.add(shieldSpawnTimer);
        shieldSpawnTimer.start();

        const gameScore = new Timer({
            fcn: () => this.addPoint(true),
            interval: 500,
            repeats: true
        });
        this.add(gameScore);
        gameScore.start();
    }

    spawnObstacle(type) {
        let obstacle;
        let velocity;

        if (type === "Cloud") {
            obstacle = new Cloud(50);
        } else if (type === "Crow") {
            velocity = this.getRandomVelocity(80, 120);
            obstacle = new Crow(velocity);
        } else if (type === "Broom") {
            velocity = this.getRandomVelocity(350, 450);
            obstacle = new Broom(velocity);
        } else {
            return;
        }

        this.add(obstacle);

    }

    getRandomVelocity(min, max) {
        return Math.random() * (max - min) + min;
    }

    spawnShield() {
        const shield = new Shield();
        this.add(shield);
    }

    addPoint(timeScore) {
        if (timeScore) {
            this.engine.score++;
        } else {
            this.engine.score += 50;
        }
        if (this.scoreLabel) {
            this.scoreLabel.text = `Score: ${this.engine.score}`;
        }
    }
}
