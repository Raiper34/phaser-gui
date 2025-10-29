import Phaser from "phaser";

const CLICK_EFFECT_IN = {duration: 70, ease: Phaser.Math.Easing.Bounce.InOut};
const CLICK_EFFECT_OUT = {duration: 70, ease: Phaser.Math.Easing.Bounce.InOut};
const CLICK_SCALE_INCREASE = 0.2;

export class Button<T> extends Phaser.GameObjects.Container {

    protected background!: Phaser.GameObjects.Sprite;
    protected isDisabled = false;
    protected tween!: Phaser.Tweens.Tween;
    protected initialScaleX = 1;
    protected initialScaleY = 1;
    protected value!: T;

    constructor(
        public override readonly scene: Phaser.Scene,
        protected readonly config: {
            x: number,
            y: number,
            texture: string
            frame?: string | number,
            clickCallback?: (value?: T) => void,
            disabledFrame?: string | number,
        },
    ) {
        super(scene, config.x, config.y);
        this.initBackground();
        this.addClickMethod();
        this.setScrollFactor(0);
        scene.add.existing(this);
    }

    protected initBackground(): void {
        this.background = this.scene.add.sprite(0, 0, this.config.texture, this.config.frame);
        this.add(this.background);
        this.setSize(this.background.width, this.background.height);
    }

    protected addClickMethod(): void {
        this.setInteractive().on(Phaser.Input.Events.POINTER_DOWN, (_p: any, _x: number, _y: number, event: Event) => this.clickMethod(event));
    }

    protected changeValueBeforeClick(value: T): void {
        this.value = value;
    }

    protected clickMethod(event?: Event): void {
        if (!this.isDisabled) {
            this.clickEffect();
            this.changeValueBeforeClick(this.value);
            this.config.clickCallback && this.config.clickCallback(this.value);
        }
        event?.stopPropagation();
    }

    protected clickEffect(): void {
        this.tween?.destroy();
        this.tween = this.scene.tweens.add({targets: this, scale: this.initialScaleX + CLICK_SCALE_INCREASE, ...CLICK_EFFECT_IN});
        this.tween.once(Phaser.Tweens.Events.TWEEN_COMPLETE, () => {
            this.tween = this.scene.tweens.add({targets: this, scale: this.initialScaleX, ...CLICK_EFFECT_OUT});
        });
    }

    setDisableState(isDisabled: boolean): void {
        this.isDisabled = isDisabled;
        this.background.setFrame(this.isDisabled && this.config.disabledFrame ? this.config.disabledFrame : this.config.frame!); // todo !
    }

    override setScale(x: number, y?: number): this {
        this.initialScaleX = x;
        this.initialScaleY = y ?? x;
        super.setScale(x, y);
        return this;
    }

}