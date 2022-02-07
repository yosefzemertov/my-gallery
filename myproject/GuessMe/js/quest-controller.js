'use strict';

// NOTE: This is a global used only in the controller
var gLastRes = null;

$(init);
$('.btn-start').click(onStartGuessing);
$('.btn-yes').click({ ans: 'yes' }, onUserResponse);
$('.btn-no').click({ ans: 'no' }, onUserResponse);
$('.btn-add-guess').click(onAddGuess);

function init() {
  // console.plog('Started...');
  createQuestsTree();
}

function onStartGuessing() {
  $('.game-start').hide();
  // TODO: hide the game-start section
  renderQuest();
  var x = $('.quest').show();
  x.children('h2').text()
  // TODO: show the quest section
}

function renderQuest() {
  var currQuest = getCurrQuest()
  $('.quest').children('h2').text(currQuest.txt)
  // TODO: select the <h2> inside quest and update
  // its text by the currQuest text
}


function onUserResponse(ev) {
  var res = ev.data.ans;
  // console.log('res', res);
  // If this node has no children
  if (isChildless(getCurrQuest())) {
    if (res === 'yes') {
      alert('Yes, I knew it!');
      onRestartGame();
      $('.quest').hide();
      // TODO: improve UX
    } else {
      $('.quest').hide();
      $('.new-quest').show();
      // onRestartGame()
      // TODO: hide and show new-quest section
    }
  } else {
    // console.log('ggg')
    // TODO: update the lastRes global var
    gLastRes = res;
    moveToNextQuest(res);
    renderQuest();
  }
}

function onAddGuess(ev) {
  ev.preventDefault();
  var newGuess = $('#newGuess').val();
  var newQuest = $('#newQuest').val();
  // console.log('newGuess', newGuess);
  // console.log('newQuest', newQuest);
  addGuess(newQuest, newGuess, gLastRes);
  // TODO: Get the inputs' values
  // TODO: Call the service addGuess
  onRestartGame();
  $('#newGuess').val('');
  $('#newQuest').val('') ;
}

function onRestartGame() {
  resetGame();
  $('.new-quest').hide();
  $('.game-start').show();
  gLastRes = null;
}
