import './style.css'

import clothes_bow from './img/clothes_bow.png'
import clothes_glasses from './img/clothes_glasses.png'
import clothes_hat from './img/clothes_hat.png'
import clothes_none from './img/clothes_none.png'
import clothes_scarf from './img/clothes_scarf.png'
import effects_bath from './img/effects_bath.png'
import effects_feed from './img/effects_feed.png'
import effects_pet from './img/effects_pet.png'
import effects_sleep from './img/effects_sleep.png'
import friend_body from './img/friend_body.png'
import friend_face from './img/friend_face.png'
import friend_face_angry from './img/friend_face_angry.png'
import friend_face_dead from './img/friend_face_dead.png'
import friend_face_eh from './img/friend_face_eh.png'
import friend_face_sleep from './img/friend_face_sleep.png'
import friend_head from './img/friend_head.png'
import icon_bored from './img/icon_bored.png'
import icon_dirty from './img/icon_dirty.png'
import icon_hungry from './img/icon_hungry.png'
import icon_tired from './img/icon_tired.png'

import { useState } from 'react'


function Info() {
  return (
    <div className="info">
            <h1 id="state-info">
                Take care of your friend! or else
            </h1>
            <h2 id="ending">
                
            </h2>
        </div>
  )
}

function Game() {
  let outfit
  return (
    <div className="game">
            <div className="needs">
                <div className="hungry">
                    <img className="icon" src={icon_hungry} alt="hungry"/>
                    <div id="hungry-bar"></div>
                </div>
                <div className="tired">
                    <img className="icon" src={icon_tired} alt="tired"/>
                    <div id="tired-bar"></div>
                </div>
                <div className="dirty">
                    <img className="icon" src={icon_dirty} alt="dirty"/>
                    <div id="dirty-bar"></div>
                </div>
                <div className="bored">
                    <img className="icon" src={icon_bored} alt="bored"/>
                    <div id="bored-bar"></div>
                </div>
            </div>
            <div className="friend">                
                <div className="friend-body">
                    <img src={friend_body} alt="body"/>
                </div>
                <div className="friend-head">
                    <img src={friend_head} alt="head"/>
                </div>
                <div className="friend-head">
                    <img id="friend-face" src={friend_face} alt="face"/>
                </div>
                <div className="friend-head">
                    <img id="friend-outfit" src={outfit}/>
                </div>
                <img id="special-effects" src=""/>
            </div>
            <div className="interact">
                <button  className="feed" onClick={feedInteraction}>feed</button>
                <button className="put-to-bed" onClick={putToBedInteraction}>put to bed</button>
                <button className="give-bath" onClick={giveBathInteraction}>give bath</button>
                <button className="pet" onClick={petInteraction}>pet</button>
            </div>
        </div>
  )
}

function Clothes() {
  const [outfit, setOutfit] = useState(0);
  return (
    <div className="clothes">
            <button className="none" onClick={()=>{document.getElementById('friend-outfit').src = clothes_none; 
                                                  document.getElementById('friend-outfit').style.marginBottom = '0px'}}>
            </button>
            <button className="hat" onClick={()=>{document.getElementById('friend-outfit').src = clothes_hat; 
                                                  document.getElementById('friend-outfit').style.marginBottom = '130px'}}>
                <img src={clothes_hat} alt="hat"/>
            </button>
            <button className="bow" onClick={()=>{document.getElementById('friend-outfit').src = clothes_bow; 
                                                  document.getElementById('friend-outfit').style.marginBottom = '130px'}}>
                <img src={clothes_bow} alt="bow"/>
            </button>
            <button className="scarf" onClick={()=>{document.getElementById('friend-outfit').src = clothes_scarf; 
                                                  document.getElementById('friend-outfit').style.marginBottom = '-100px'}}>
                 <img src={clothes_scarf} alt="scarf"/>
            </button>
            <button className="glasses" onClick={()=>{document.getElementById('friend-outfit').src = clothes_glasses; 
                                                  document.getElementById('friend-outfit').style.marginBottom = '-10px'}}>
                <img src={clothes_glasses} alt="glasses"/>
            </button>
        </div>
  )
}
/*#######################################################################################################################*/
/*#######################################################################################################################*/
/*#######################################################################################################################*/

let needs = [100, 100, 100, 100]
let isAlive = true
let isSleeping = false
let isExhausted = false

function needsDecay() {
  if (needs[0] <= 0) {
      isAlive = false;
      gameOver('Friend starved to death!', friend_face_dead);
  }
  else if (needs[2] <= 0) {
      isAlive = false;
      gameOver('Friend got sick and died.', friend_face_dead);
  }
  else if (needs[3] <= 0) {
      isAlive = false;
      gameOver('Friend doesn\'t talk to you anymore >:(', friend_face_angry);
  }
  else {
      if (needs[1] <= 0) {
          fallAsleep()
          isExhausted = true
      }
      needs[0] -= 3;
      needs[1] -= 2;
      needs[2] -= 2;
      needs[3] -= 5;
      sleepCheck();
      updateNeeds();
  }
}

function updateNeeds() {
  document.getElementById("hungry-bar").style.width = (needs[0]).toString()+'%';
  document.getElementById("tired-bar").style.width = (needs[1]).toString()+'%';
  document.getElementById("dirty-bar").style.width = (needs[2]).toString()+'%';
  document.getElementById("bored-bar").style.width = (needs[3]).toString()+'%';
}

function changeFace(face, effect) {
  document.getElementById('friend-face').src = face
  switch(effect){
      case 'feed':
          document.getElementById('special-effects').src = effects_feed;
          document.getElementById('special-effects').style.marginLeft = '200px'
          document.getElementById('special-effects').style.marginTop = '20px'
          document.getElementById('special-effects').style.marginBottom = '0px'
          break;
      case 'sleep':
          document.getElementById('special-effects').src = effects_sleep;
          document.getElementById('special-effects').style.marginBottom = '300px'
          document.getElementById('special-effects').style.marginLeft = '300px'
          break;
      case 'bath':
          document.getElementById('special-effects').src = effects_bath;
          document.getElementById('special-effects').style.marginLeft = '0px'
          document.getElementById('special-effects').style.marginTop = '0px'
          document.getElementById('special-effects').style.marginBottom = '0px'
          break;
      case 'pet':
          document.getElementById('special-effects').src = effects_pet;
          document.getElementById('special-effects').style.marginLeft = '40px'
          document.getElementById('special-effects').style.marginTop = '0px'
          document.getElementById('special-effects').style.marginBottom = '150px'
          break;
      case '':
          document.getElementById('special-effects').src = clothes_none;
          break;
  }
}


function feedInteraction() {
  changeFace(friend_face_eh, 'feed');
  needs[0] += 10;
  if (needs[0] > 100) {needs[0] = 100}
  updateNeeds();
  setTimeout(changeFace, 500, friend_face, '');
}

function giveBathInteraction() {
  changeFace(friend_face_eh, 'bath');
  needs[2] += 30;
  if (needs[2] > 100) {needs[2] = 100}
  updateNeeds();
  setTimeout(changeFace, 500, friend_face, '');
}

function petInteraction() {
  changeFace(friend_face_eh, 'pet');
  needs[3] += 10;
  if (needs[3] > 100) {needs[3] = 100}
  updateNeeds();
  setTimeout(changeFace, 500, friend_face, '');
}

function putToBedInteraction() {
  if (isSleeping) {wakeUp()}
  else (fallAsleep())
  
}

function fallAsleep() {
  console.log
  isSleeping = true
  changeFace(friend_face_sleep, 'sleep')
  document.querySelector('.put-to-bed').textContent = 'wake up';
  document.querySelector('.feed').disabled = true
  document.querySelector('.give-bath').disabled = true
  document.querySelector('.pet').disabled = true
}

function wakeUp() {
  isSleeping = false
  changeFace(friend_face, '')
  document.querySelector('.put-to-bed').textContent = 'put to bed';
  document.querySelector('.put-to-bed').disabled = false;
  document.querySelector('.feed').disabled = false
  document.querySelector('.give-bath').disabled = false
  document.querySelector('.pet').disabled = false
}

function sleepCheck() {
  if (isSleeping) {
      needs[1] += 4;
      needs[3] += 5;
      if (needs[1] > 100) {
          needs[1] = 100;
          isSleeping = false
          wakeUp()
      }
  }

  if (isExhausted) {
      document.getElementById('ending').textContent = 'Friend is too exhausted to stay awake!'
      document.querySelector('.put-to-bed').disabled = true;
      if (needs[1] >= 50) {
          document.querySelector('.put-to-bed').disabled = false;
          document.getElementById('ending').textContent = ''
          isExhausted = false
      }
      }
}

function aliveCheck() {
  if (isAlive) {
      needsDecay();
  } 
}

function gameOver(ending, face){
  document.getElementById('state-info').textContent = 'YOU ARE A TERRIBLE FRIEND'
  changeFace(face)
  document.getElementById('special-effects').src = ''
  document.getElementById('ending').textContent = ending
  document.querySelector('.feed').disabled = true
  document.querySelector('.put-to-bed').disabled = true
  document.querySelector('.give-bath').disabled = true
  document.querySelector('.pet').disabled = true
}

function putOnClothes(item) {
  console.log(item)
  switch (item) {
      case 'hat':
          document.getElementById('friend-outfit').src = clothes_hat
          document.getElementById('friend-outfit').style.marginBottom = '130px';
          break;
      case 'bow':
          document.getElementById('friend-outfit').style.marginBottom = '130px';
          break;
      case 'scarf':
          document.getElementById('friend-outfit').style.marginBottom = '-100px';
          break;
      case 'glasses':
          document.getElementById('friend-outfit').style.marginBottom = '-10px';
          break;
  }
}

setInterval(aliveCheck, 1000);






function App() {
  return (
    <div className="App">
      <Info />
      <Game />
      <Clothes />
      <footer>
            <p>Created by Rigel Miakovskykh</p>
        </footer>
    </div>
  )
}

export default App
