import {FormGroup} from '@angular/forms';
import Phaser from 'phaser';
import {startWith} from 'rxjs';

export interface StoryParams {
  [key: string]: string | number | boolean;
}
const STORY_PARAMS = {x: 250, y: 250, texture: 'red'};

export abstract class BaseStory {

  protected componentRef!: Phaser.GameObjects.Container;

  protected constructor(
    protected readonly componentType: any,
  ) {
  }

  render(scene: Phaser.Scene, form: FormGroup): void {
    form.valueChanges.pipe(startWith(form.value)).subscribe((values: StoryParams) => {
      console.log('UPDATING');
      this.componentRef?.destroy();
      this.componentRef = new this.componentType(scene, values)
    });
  }

  params(): StoryParams {
    return STORY_PARAMS;
  }
}
