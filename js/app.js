'use strict';

$.get('data/page-1.json').then(data => {
    data.forEach(element => {
        let horns = new Horns(element.image_url, element.title, element.description, element.keyword, element.horns)
        horns.render();
        addOptions();
    });
});

var hornsArr = [];
var optionsArr = [];

function Horns(image_url, title, description, keyword, horns) {
    this.image_url = image_url;
    this.title = title;
    this.description = description;
    this.keyword = keyword;
    this.horns = horns;
    hornsArr.push(this);
};

Horns.prototype.render = function () {
    let itemClone = $('.photo-template').clone();
    itemClone.removeClass('photo-template');
    itemClone.attr('class',this.keyword);
    itemClone.find('img').attr("src", this.image_url);
    itemClone.find('h2').text(this.title);
    itemClone.find('p').text(this.description);
    $('main').append(itemClone);
};

function addOptions (){
    hornsArr.forEach(element => {
        if (!optionsArr.includes(element.keyword)) {
          optionsArr.push(element.keyword);
          $('select').append(`<option value="${element.keyword}" >${element.keyword}</option>`)
        }
      });
}


function showSelectedOption() {
  $('select').change(function () {
    let selected = $(this).val();
    $('section').hide();
    $(`.${selected}`).show();
  });
}

showSelectedOption();
