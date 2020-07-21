'use strict';

$.get('data/page-1.json').then(data => {
    data.forEach(element => {
        let horns = new Horns(element.image_url, element.title, element.description, element.keyword, element.horns)
        horns.render();
        horns.addOptions();
    });
});

function Horns(image_url, title, description, keyword, horns) {
    this.image_url = image_url;
    this.title = title;
    this.description = description;
    this.keyword = keyword;
    this.horns = horns;
};

Horns.prototype.render = function () {
    let itemClone = $('.photo-template').clone();
    itemClone.removeClass('photo-template');
    $('.photo-template img').attr("src", this.image_url);
    $('.photo-template h2').text(this.title);
    $('.photo-template p').text(this.description);
    $('main').append(itemClone);
};


Horns.prototype.addOptions = function(){
    let itemClone = $('.optionList').clone();
    itemClone.removeClass('optionList');
    itemClone.text(this.keyword);
    $('select').append(itemClone);
}

var uniqueNames = [];
$.each(names, function(i, el){
    if($.inArray(el, uniqueNames) === -1) uniqueNames.push(el);
});