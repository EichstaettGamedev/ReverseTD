import options from '../../options';
import { GameObjects, Scene } from 'phaser';

import '../../types';
import { UIScene } from '../ui/uiScene';

const animation_frames = (frame: string, frames: number | number[]) => {
    const ret = [];
    if (Array.isArray(frames)) {
        for (let i = 0; i < frames.length; i++) {
            ret.push({ key: 'packed', frame: `${frame}_${frames[i]}` });
        }
    } else {
        for (let i = 0; i < frames; i++) {
            ret.push({ key: 'packed', frame: `${frame}_${i}` });
        }
    }
    return ret;
};

export type KeyMap = {
    Up: Phaser.Input.Keyboard.Key;
    Left: Phaser.Input.Keyboard.Key;
    Right: Phaser.Input.Keyboard.Key;
    Down: Phaser.Input.Keyboard.Key;
    Z: Phaser.Input.Keyboard.Key;
    X: Phaser.Input.Keyboard.Key;
    Y: Phaser.Input.Keyboard.Key;
    Shift: Phaser.Input.Keyboard.Key;
};

export class GameScene extends Scene {
    keymap?: KeyMap;
    gameOverActive: boolean;

    gameTicks = 0;
    score = 0;

    bg: Phaser.GameObjects.Image;

    constructor(config: Phaser.Types.Scenes.SettingsConfig) {
        if (!config) {
            config = {};
        }
        config.key = 'GameScene';
        super(config);
        this.gameOverActive = false;
    }

    create() {
        const that = this;
        this.score = 0;
        this.sound.pauseOnBlur = false;

        this.bg = this.add.image(1280/2, 720/2, 'bg');

        const ui = this.scene.get('UIScene') as UIScene;
        ui.events.emit('reset');

        this.physics.world.setBounds(0, 0, 1280, 720);
        this.keymap = this.input.keyboard?.addKeys(
            'Up,Left,Right,Down,X,Z,Shift,Y'
        ) as KeyMap;
        this.gameOverActive = false;
        this.gameTicks = 0;

        this.cameras.main.setBounds(0, 0, 1280, 720);

    }

    update(time: number, delta: number) {
        this.gameTicks += delta;
    }
}
