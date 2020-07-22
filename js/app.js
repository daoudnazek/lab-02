'use strict';

function switchPages(numberOfPage){
    $(`.page-${numberOfPage}`).on("click",function(){
        $('main').empty();
        $('select').empty();
        $.get(`data/page-${numberOfPage}.json`).then(data => {
            data.forEach(element => {
                let horns = new Horns(element.image_url, element.title, element.description, element.keyword, element.horns)
                horns.render();
                addOptions();
            });
        });
    })
}
switchPages(1);
switchPages(2);



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
    let mustachTemplate =$('#horns-template').html();
    let newItem = Mustache.render(mustachTemplate,this);
    $('main').append(newItem);
};

function addOptions (){
    hornsArr.forEach(element => {
        if (!optionsArr.includes(element.keyword)) {
          optionsArr.push(element.keyword);
          $('select').append(`<option value="${element.keyword}" >${element.keyword}</option>`)
        }
      });
}

function sortImagesByKeyword(){
    hornsArr.sort((a,b) => a.keyword.localCompare(b.keyword))
}

function sortImagesByNumberOfHorns(){
    hornsArr.sort((a,b) => a.horns - b.horns);
}




function showSelectedOption() {
  $('select').change(function () {
    let selected = $(this).val();
    $('section').hide();
    $(`.${selected}`).show();
  });
}

showSelectedOption();

