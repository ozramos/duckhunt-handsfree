import Game from './src/modules/Game';
import Handsfree from 'handsfree'
handsfree = new Handsfree({debug: true})
handsfree.start()

document.addEventListener('DOMContentLoaded', function() {

  let game = new Game({
    spritesheet: 'sprites.json'
  }).load();

}, false);