import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import 'phaser'
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {Showcase} from './showcase';
import {CommonModule} from '@angular/common';
import {ButtonStory} from './button.story';
import {BaseStory} from './base.story';
import {TextButtonStory} from './text-button.story';

@Component({
  selector: 'app-root',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {

  form!: FormGroup;
  story!: BaseStory;
  showcase!: Showcase;
  stories = {
    button: ButtonStory,
    textButton: TextButtonStory,
  }

  constructor(private readonly fb: FormBuilder) {}

  ngOnInit(): void {
    this.changeStory(ButtonStory);
  }

  changeStory(story: any) {
    this.story = new story();
    this.form = this.fb.group(this.story.params());
    this.showcase?.destroy();
    this.showcase = new Showcase(this.form, this.story);
  }
}
