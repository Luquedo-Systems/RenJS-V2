import RJSManagerInterface from './RJSManager';
import RJS from '../core/RJS';
import Transition from '../screen-effects/Transition';

export interface TextManagerInterface extends RJSManagerInterface {}

export default class TextManager implements TextManagerInterface {

    private game: RJS
    textLog: Array<any> = []

    constructor(game: RJS) {
        this.game = game
    }
    set(...args: any): void {
        //
    }

    show (text, title?, colour?,sfx?, dontHide?): Promise<any> {

        return new Promise(resolve=> {
            const t = this.game.managers.logic.parseVars(text.toString());
            if (this.game.storyConfig.logText){
                this.textLog.push({text:t,title:title,colour:colour});
            }
            this.game.gui.showText(t, title, colour,sfx, () => {
                this.game.waitForClick(() => {
                    if (!dontHide){
                        this.game.gui.hideText();
                    }
                    // this.game.resolveAction();
                    resolve(true);
                });
            });
        })
        
    };

    hide (): void {
        this.game.gui.hideText();
    }

    say (name, look, text, dontHide?): Promise<any> {
        const character = this.game.managers.character.characters[name];
        if (look){
            this.game.managers.character.show(name, this.game.storyConfig.transitions.say,{look});
        }
        return this.show(text,character.name,character.speechColour,character.voice,dontHide);
    }

}
