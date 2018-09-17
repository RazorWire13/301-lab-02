
'use strict'

function Horn(hornObject) {
  this.image_url = hornObject.image_url;
  this.title = hornObject.title;
  this.description = hornObject.description;
  this.keyword = hornObject.keyword;
  this.horns = hornObject.horns;
}
const page = $('h6').attr('id');
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
  $.get(`data/page-${page}.json`, 'json')
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

//Sorting functions
$('button').on('click', function () {
  console.log('clicked!');
  let hornOrder = [];
  let i = 101;
  if (event.target.id === 'hornnumber') {
    Horn.allHorns.forEach (instance => {
      while (i>0) {
        if (instance.horns === i) {
          hornOrder.push(instance)
          i++;
        } else {
          i--;
        }
      }
      while ($.get('#horn-template').firstChild) {
        $.get('#horn-template').removeChild($.get('#horn-template').firstChild);
        (event.target.id === 'hornnumber')
      }
      Horn.allHorns = hornOrder;
      console.log(hornOrder);
      $(() => Horn.readJson());
    })
  } else if (event.target.id === 'alphabet') {
    let hornAlpha = [];
    Horn.allHorns.forEach (instance => {
      hornAlpha.push(instance.title);
    })
    let sortedHorns = s ort.hornAlpha();
    sortedHorns.forEach (instance => {
      Horn.allHorns.forEach (horn => {
        if (horn.title === instance) {
          hornOrder.push(instance);
        }
      })
    })
    while ($.get('#horn-template').firstChild) {
      $.get('#horn-template').removeChild($.get('#horn-template').firstChild);
      (event.target.id === 'alphabet')
    }
    Horn.allHorns = hornOrder;
    console.log(hornOrder);
    $(() => Horn.readJson());
  }
});
