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
    let itemCloned = $('.photo-template').clone();
    itemCloned.removeClass('photo-template');
    itemCloned.attr('class', this.keyword);
    itemCloned.find('img').attr("src", this.image_url);
    itemCloned.find('h2').text(this.title);
    itemCloned.find('p').text(this.description);
    $('main').append(itemCloned);
    
};


function addOptions() {
    hornsArr.forEach(element => {
        if (!optionsArr.includes(element.keyword)) {
            optionsArr.push(element.keyword);
            $('select').append(`<option value="${element.keyword}" >${element.keyword}</option>`)
        }
    });
}


function showSelectedOption() {
    $('select').change(function (event) {
        event.preventDefault();
        let selected = $(this).val();
        if (selected === 'default') {
            $('section').show();
        } else {
            $('section').hide();
            $(`.${selected}`).show();
        }
    });
}

showSelectedOption();
