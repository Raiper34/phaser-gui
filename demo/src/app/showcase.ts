import {FormGroup} from '@angular/forms';
import {BaseStory} from './base.story';

const DEFAULT_WIDTH = 500;
const DEFAULT_HEIGHT = 500;
const BASE_CONFIG = {
  type: Phaser.AUTO,
  parent: 'phaser',
  scale: {
    parent: 'phaser',
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT
  }
};

export class Showcase {

  game: Phaser.Game;

  constructor(private readonly form: FormGroup, component: BaseStory) {
    const config = {
      ...BASE_CONFIG,
      scene: {
        preload: function (this: Phaser.Scene) {
          this.load.setBaseURL('https://labs.phaser.io');
          this.load.image('red', 'assets/particles/red.png');
        },
        create: function (this: Phaser.Scene) {
          component.render(this, form);
        }
      },
    };
    this.game = new Phaser.Game(config as unknown as Phaser.Types.Core.GameConfig);
    (this.game as any).form = this.form;
  }

  destroy(): void {
    this.game.destroy(true);
  }
}

