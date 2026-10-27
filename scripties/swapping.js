'use strict';

var tinderContainer = document.querySelector('.tinder');
generatecards("tinder--cards", 10, '', "full")
var allCards = document.querySelectorAll('app-card');
var nope = document.getElementById('nope');
var love = document.getElementById('love');
colorrandomizer();
var cardOffsets = new WeakMap();
var cardStack = document.getElementById('tinder--cards');

function updateCardScale() {
  var card = cardStack.querySelector('app-card');
  if (!card || !cardStack.clientWidth || !cardStack.clientHeight) return;

  var stackStyle = getComputedStyle(cardStack);
  var horizontalPadding = parseFloat(stackStyle.paddingLeft) + parseFloat(stackStyle.paddingRight);
  var availableWidth = cardStack.clientWidth - horizontalPadding;
  var widthScale = availableWidth * 0.9 / card.offsetWidth;
  var heightScale = cardStack.clientHeight * 0.8 / card.offsetHeight;
  var scale = Math.max(0.5, Math.min(widthScale, heightScale));
  cardStack.style.setProperty('--swipe-card-scale', scale);
}

function getStackTransform(card, index) {
  var offset = cardOffsets.get(card);

  if (!offset) {
    var direction = Math.round(Math.random()) ? 1 : -1;
    offset = {
      x: Math.random() * 20 * direction,
      y: Math.random() * 20 * direction,
      rotation: Math.random() * 6 - 3
    };
    cardOffsets.set(card, offset);
  }

  var rotation = index === 0 ? 0 : offset.rotation;
  return 'scale(' + (20 - index) / 20 + ') translateY(' + offset.y + 'px) translateX(' + offset.x + 'px) rotate(' + rotation + 'deg)';
}

function getActiveCardIndex(card) {
  return Array.from(document.querySelectorAll('app-card:not(.removed)')).indexOf(card);
}

updateCardScale();
window.addEventListener('resize', updateCardScale);

function initCards(card, index) {
  var newCards = document.querySelectorAll('app-card:not(.removed)');

  newCards.forEach(function (card, index) {
    card.style.zIndex = allCards.length - index;
    card.style.transform = getStackTransform(card, index);
    card.style.opacity = (10 - index) / 10;
  });
  
  tinderContainer.classList.add('loaded');
}

initCards();

allCards.forEach(function (el) {
  var hammertime = new Hammer(el);

  hammertime.on('pan', function (event) {
    el.classList.add('moving');
  });

  hammertime.on('pan', function (event) {
    if (event.deltaX === 0) return;
    if (event.center.x === 0 && event.center.y === 0) return;

    tinderContainer.classList.toggle('tinder_love', event.deltaX > 0);
    tinderContainer.classList.toggle('tinder_nope', event.deltaX < 0);

    var xMulti = event.deltaX * 0.03;
    var yMulti = event.deltaY / 80;
    var rotate = xMulti * yMulti;
    var stackTransform = getStackTransform(el, getActiveCardIndex(el));

    el.style.transform = 'translate(' + event.deltaX + 'px, ' + event.deltaY + 'px) rotate(' + rotate + 'deg) ' + stackTransform;
  });

  hammertime.on('panend', function (event) {
    el.classList.remove('moving');
    tinderContainer.classList.remove('tinder_love');
    tinderContainer.classList.remove('tinder_nope');

    var moveOutWidth = document.body.clientWidth;
    var keep = Math.abs(event.deltaX) < 80 || Math.abs(event.velocityX) < 0.5;
    var stackTransform = getStackTransform(el, getActiveCardIndex(el));

    el.classList.toggle('removed', !keep);

    if (keep) {
      el.style.transform = stackTransform;
    } else {
      var endX = Math.max(Math.abs(event.velocityX) * moveOutWidth, moveOutWidth);
      var toX = event.deltaX > 0 ? endX : -endX;
      var endY = Math.abs(event.velocityY) * moveOutWidth;
      var toY = event.deltaY > 0 ? endY : -endY;
      var xMulti = event.deltaX * 0.03;
      var yMulti = event.deltaY / 80;
      var rotate = xMulti * yMulti;

      el.style.transform = 'translate(' + toX + 'px, ' + (toY + event.deltaY) + 'px) rotate(' + rotate + 'deg) ' + stackTransform;
      initCards();
    }
  });
});

function createButtonListener(love) {
  return function (event) {
    var cards = document.querySelectorAll('app-card:not(.removed)');
    var moveOutWidth = document.body.clientWidth * 1.5;

    if (!cards.length) return false;

    var card = cards[0];
    var stackTransform = getStackTransform(card, 0);

    card.classList.add('removed');

    if (love) {
      card.style.transform = 'translate(' + moveOutWidth + 'px, -100px) rotate(-30deg) ' + stackTransform;
    } else {
      card.style.transform = 'translate(-' + moveOutWidth + 'px, -100px) rotate(30deg) ' + stackTransform;
    }

    initCards();

    event.preventDefault();
  };
}

var nopeListener = createButtonListener(false);
var loveListener = createButtonListener(true);

nope.addEventListener('click', nopeListener);
love.addEventListener('click', loveListener);
