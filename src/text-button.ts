import {Button} from "./button";

export class TextButton<T> extends Button<T> {

    protected text!: Phaser.GameObjects.Text;

    constructor(
        public override readonly scene: Phaser.Scene,
        protected override readonly config: {
            x: number,
            y: number,
            texture: string
            frame?: string | number,
            clickCallback?: (value?: T) => void,
            disabledFrame?: string | number,
            textContent: string,
        },
    ) {
        super(scene, config);
        this.initContent(config.textContent);
    }

    private initContent(textContent: string): void {
        this.text = this.scene.add.text(0, 5, textContent);
        //TextService.styleWhiteButtonText(this.text, this.background.width);
        this.text.setOrigin(0.5);
        this.add(this.text);
    }

}