
'use strict'

function Horn(hornObject) {
  this.image_url = hornObject.image_url;
  this.title = hornObject.title;
  this.description = hornObject.description;
  this.keyword = hornObject.keyword;
  this.horns = hornObject.horns;
}
Horn.allHorns = [];

Horn.prototype.render = function () {
  $('main').append('<div class="clone"></div>');
  const $hornClone = $('div[class="clone"]');

  const $hornHtml = $('#photo-template').html();

  $hornClone.html($hornHtml);

  $hornClone.find('h2').text(this.title);
  $hornClone.find('img').attr('src', this.image_url);
  $hornClone.find('p').text(this.description);
  $hornClone.removeClass('clone');
  $hornClone.addClass(this.keyword);
}

Horn.readJson = () => {
  $.get('data/page-1.json', 'json')
    .then(data => {
      data.forEach(instance => {
        Horn.allHorns.push(new Horn(instance));
      })
    })
    .then(Horn.loadHorn)
    .then(readKeyword)
    .then(setSelector)
}

Horn.loadHorn = () => {
  Horn.allHorns.forEach(instance => instance.render());
}

$(() => Horn.readJson());

// Somehwhere in this area we will place our keyword selector for the filter dropdown //
const uniqueKeywords = [];

const readKeyword = function () {
  let allKeywords = [];
  for (let i = 0; i < Horn.allHorns.length; i++) {
    allKeywords.push(Horn.allHorns[i].keyword);
  }
  $.each(allKeywords, function(i, el) {
    if($.inArray(el, uniqueKeywords) === -1) uniqueKeywords.push(el);
  })
}

// append each keyword to <select> as an <option> //
const setSelector = () => {
  uniqueKeywords.forEach(instance => {
    $('select').append(`<option value=${instance}>${instance}</option>`);
  })
}

// show and tell //
// $('select').on('change', function() {
//   $('#photo-template')
//     .siblings()
//     .remove();

// })
