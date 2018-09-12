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
}

Horn.loadHorn = () => {
  Horn.allHorns.forEach(instance => instance.render());
}

$(() => Horn.readJson());

// Somehwhere in this area we will plce our keyword selector for the filter dropdown //
