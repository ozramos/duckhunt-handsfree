/**
 * Duck Hunt
 */
import Game from './src/modules/Game';
import Handsfree from 'handsfree'

document.addEventListener('DOMContentLoaded', function() {
  window.handsfree = new Handsfree({debug: true})
  let game = new Game({
    spritesheet: 'sprites.json'
  });
  console.log(game);
  game.load()

  // Add styles
  const $style = document.createElement('style')
  $style.type = 'text/css'
  $style.rel = 'stylesheet'
  document.head.appendChild($style)
  $style.innerHTML = require('./src/handsfree.css')

  // Add button
  let $btn = document.createElement('button')
  $btn.innerHTML = 'Start Camera'
  $btn.setAttribute('onclick', 'handsfree.start()')
  $btn.classList.add('handsfree-show-when-stopped')
  document.body.appendChild($btn)

  $btn = document.createElement('button')
  $btn.innerHTML = 'Stop Camera'
  $btn.classList.add('handsfree-show-when-started')
  $btn.setAttribute('onclick', 'handsfree.stop()')
  document.body.appendChild($btn)

  /**
   * Plugin for clicking
   */
   handsfree.use({
     // The unique name of the plugin
     name: 'pewpewpew',

     // This is called on every frame, with an array of face objects
     onFrame: faces => {
       // Lets loop through each detected face
       faces.forEach(face => {
         // Let's detect the mousedown state
         if (face.cursor.state.mouseDown) {
           // Dispatch a mousedown at the point of click, bubbling in case we click a span element inside a button for example
           game.handleClick({
             data: {
               global: {
                 x: face.cursor.x,
                 y: face.cursor.y
               }
             }
           })
         }
       })
     }
   })
}, false)
