import { Component } from '@angular/core';
import 'phaser'
import {Button} from '@lib/button';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';

const DEFAULT_WIDTH = 1000;
const DEFAULT_HEIGHT = 500;

@Component({
  selector: 'app-root',
  imports: [ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  form: FormGroup;

  constructor(private readonly fb: FormBuilder) {
    this.form = this.fb.group({
      x: 0,
      y: 0,
    });
  }

  ngOnInit(): void {
    const config = {
      type: Phaser.AUTO,
      parent: 'phaser',
      scale: {
        parent: 'phaser',
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: DEFAULT_WIDTH,
        height: DEFAULT_HEIGHT
      },
      scene: Example,
    };
    const game = new Phaser.Game(config as unknown as Phaser.Types.Core.GameConfig);
    (game as any).form = this.form;
  }
}

class Example extends Phaser.Scene
{

  preload ()
  {
    this.load.setBaseURL('https://labs.phaser.io');

    this.load.image('sky', 'assets/skies/space3.png');
    this.load.image('logo', 'assets/sprites/phaser3-logo.png');
    this.load.image('red', 'assets/particles/red.png');
  }

  create ()
  {
    let btn = new Button(this, DEFAULT_WIDTH/2, DEFAULT_HEIGHT/2, 'red', 'red', () => {});
    (this.game as any).form.valueChanges.subscribe(({x, y}: {x: number, y: number}) => {
      btn.destroy();
      btn = new Button(this, x, y, 'red', 'red', () => {console.log('Clicked');})
    });
  }
}
