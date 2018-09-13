
'use strict'

function Horn(hornObject) {
  this.image_url = hornObject.image_url;
  this.title = hornObject.title;
  this.description = hornObject.description;
  this.keyword = hornObject.keyword;
  this.horns = hornObject.horns;
}
Horn.allHorns = [];
Horn.filterHorns = [];

Horn.prototype.render = function () {
  // 1. get html from template
  const $source = $('#horn-template').html();

  // 2. compile the source with h-bars
  const compiledSource = Handlebars.compile( $source );

  // 3. return the html from the compile method
  return compiledSource(this);
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
  Horn.allHorns.forEach(instance => $('#horn-main').append(instance.render() ));
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
$('select').on('change', function () {
  if (event.target.value !== 'default') {
    Horn.allHorns.forEach (instance => {
      $(`div.${instance.keyword}`).hide();
      if (instance.keyword === event.target.value) {
        $(`div.${instance.keyword}`).show();
      }
    })
  } else {
    Horn.allHorns.forEach (instance => {
      $(`div.${instance.keyword}`).show();
    })
  }
})
