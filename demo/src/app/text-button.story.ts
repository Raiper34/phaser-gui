import {BaseStory, StoryParams} from './base.story';
import {TextButton} from '@lib/text-button';

const STORY_PARAMS = {texture: 'red', textContent: 'Button'};

export class TextButtonStory extends BaseStory {

  constructor() {
    super(TextButton);
  }

  override params(): StoryParams {
    return {...super.params(), ...STORY_PARAMS};
  }
}
