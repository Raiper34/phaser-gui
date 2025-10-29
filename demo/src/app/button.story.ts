import {Button} from '@lib/button';
import {BaseStory, StoryParams} from './base.story';

const STORY_PARAMS = {texture: 'red'};

export class ButtonStory extends BaseStory {

  constructor() {
    super(Button);
  }

  override params(): StoryParams {
    return {...super.params(), ...STORY_PARAMS};
  }
}
