'use strict';

var hornsArr = [];
var optionsArr = [];

function switchPages(numberOfPage) {
    hornsArr = [];
    $('main').empty();
    $.get(numberOfPage).then(data => {
        data.forEach(element => {
            let horns = new Horns(element.image_url, element.title, element.description, element.keyword, element.horns)
        });
        hornsArr.forEach(element => {
            element.render();
        });
        addOptions();
    });
};



$('.page-1').on('click', function () {
    switchPages('data/page-1.json');
    addOptions();
})

$('.page-2').on('click', function () {
    switchPages('data/page-2.json');
    addOptions();
})

switchPages('data/page-1.json');


function Horns(image_url, title, description, keyword, horns) {
    this.image_url = image_url;
    this.title = title;
    this.description = description;
    this.keyword = keyword;
    this.horns = horns;
    hornsArr.push(this);
};


Horns.prototype.render = function () {
    let mustachTemplate = $('#horns-template').html();
    let newItem = Mustache.render(mustachTemplate, this);
    $('main').append(newItem);
};


function addOptions() {
    optionsArr = [];
    $('#optionList').empty();
    hornsArr.forEach(element => {
        if (!optionsArr.includes(element.keyword)) {
            optionsArr.push(element.keyword);
            $('#optionList').append(`<option value="${element.keyword}" >${element.keyword}</option>`)
        }
    });
};


$('.by-keyword').click(sortImagesByKeyword);
$('.by-numberOfHotns').click(sortImagesByNumberOfHorns);

function sortImagesByKeyword() {
    $('main').empty();
    hornsArr.sort((a, b) => a.keyword.localeCompare(b.keyword))
    hornsArr.forEach(e => e.render());

}

function sortImagesByNumberOfHorns() {
    $('main').empty();
    hornsArr.sort((a, b) => a.horns - b.horns);
    hornsArr.forEach(e => e.render());
}




function showSelectedOption() {
    $('#optionList').change(function (event) {
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

function showSortedHorns() {
    $('#sort').change(function (event) {
        event.preventDefault();
        let selected = $(this).val();
        if (selected === 'default') {
            $('main').empty();
            hornsArr.forEach(e => e.render());
        } else if (selected === 'keyword') {
            sortImagesByKeyword();
        } else if (selected === 'horns') {
            sortImagesByNumberOfHorns();
        }
    });
}

showSelectedOption();
showSortedHorns();

