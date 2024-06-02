import { Scene, Label, Font, Color, Vector, Input } from 'excalibur';

export class GameOverScene extends Scene {
    constructor(engine) {
        super();
        this.engine = engine;
    }

    onInitialize(engine) {
        this.backgroundColor = new Color(140, 118, 190);
    }

    onActivate() {
        const engine = this.engine;

        this.clear();

        const centerX = engine.drawWidth / 2;

        const gameOverLabel = new Label({
            text: 'Game Over!',
            pos: new Vector(centerX, engine.drawHeight / 2 - 100),
            font: new Font({ size: 80 }),
            color: Color.White
        });
        gameOverLabel.anchor.setTo(0.5, 0);
        this.add(gameOverLabel);

        console.log("the score is", engine.score);
        const score = engine.score;
        const scoreLabel = new Label({
            text: `Score: ${score}`,
            pos: new Vector(centerX, engine.drawHeight / 2 + 30),
            font: new Font({ size: 50 }),
            color: Color.LightGray
        });
        scoreLabel.anchor.setTo(0.5, 0);
        this.add(scoreLabel);

        const restartLabel = new Label({
            text: 'Press R to Restart',
            pos: new Vector(centerX, engine.drawHeight / 2 + 100),
            font: new Font({ size: 20 }),
            color: Color.Green
        });
        restartLabel.anchor.setTo(0.5, 0);
        this.add(restartLabel);

        this.on('preupdate', () => {
            if (engine.input.keyboard.wasPressed(Input.Keys.R)) {
                engine.score = 0;
                engine.startGame();
            }
        });
    }
}
