"use strict";

// все будет выполняться только тогда, когда страница полностью построилась
$(document).ready(function() {

  // функция, возвращающая текущую дату
  var getDate = function() {
    var d = new Date(),
        day = d.getDate(),
        hrs = d.getHours(),
        min = d.getMinutes(),
        sec = d.getSeconds(),
        month = d.getMonth(),
        year = d.getFullYear();

    var monthArray = new Array("января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря");

    if (hrs <= 9) hrs = "0" + hrs;
    if (min <= 9) min = "0" + min;
    if (sec <= 9) sec = "0" + sec;

    //var actualDate = day + " " + monthArray[month] + " " + year + " г." + " " + hrs + ":" + min + ":" + sec;
    var actualDate = `${day} ${monthArray[month]} ${year} г. ${hrs}:${min}:${sec}`; // ES6 позволяет такой формат вывода
    return actualDate;
  }


 // функция - счетчик твитов
  var countTweets = function() {
    var tweetCounter = $(".tweet-card").length;
    $("#tweetsCounter").text(tweetCounter);
  }


  // https://gist.github.com/ryansmith94/0fb9f6042c1e0af0d74f
  // обработчик ссылок
  //втрой параметр - в каком окне открывать
  var wrapURLs = function (text, new_window) {
    var url_pattern = /(?:(?:https?|ftp):\/\/)?(?:\S+(?::\S*)?@)?(?:(?!10(?:\.\d{1,3}){3})(?!127(?:\.\d{1,3}){3})(?!169\.254(?:\.\d{1,3}){2})(?!192\.168(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\x{00a1}\-\x{ffff}0-9]+-?)*[a-z\x{00a1}\-\x{ffff}0-9]+)(?:\.(?:[a-z\x{00a1}\-\x{ffff}0-9]+-?)*[a-z\x{00a1}\-\x{ffff}0-9]+)*(?:\.(?:[a-z\x{00a1}\-\x{ffff}]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?/ig;
    var target = (new_window === true || new_window == null) ? '_blank' : '';

    return text.replace(url_pattern, function (url) {
      var protocol_pattern = /^(?:(?:https?|ftp):\/\/)/i;
      var href = protocol_pattern.test(url) ? url : 'http://' + url;
      return '<a href="' + href + '" target="' + target + '">' + url + '</a>';
    });
  };


  // функция, создающая твит и публикующая его на страницу
  var createTweet = function(date, text) {
    // хороший тон - называть переменну с $, если в ней находится jquery-объект
    var $tweetBox = $('<div class="card tweet-card">'); // создаем обертку для твита
    var $tweetDate = $('<div class="tweet-date">').text( date ); // создаем дату
    var $tweetText = $('<div class="tweet-text">').html( wrapURLs( text ) ); // создаем контент с твитом
    $tweetText.wrapInner('<p></p>'); // оборачиваем твит в тег p

    var additionalClassName = "";
    if ( text.length < 100) {
      additionalClassName = "font-size-large";
    }
    else if ( text.length > 150 ) {
      additionalClassName = "font-size-small";
    }
    else {
      additionalClassName = "font-size-normal";
    }

    $tweetText.addClass(additionalClassName);

    // prepend - в начало,  append - в конец
    $tweetBox.append($tweetDate).append($tweetText); // получаем разметку твита с датой и текстом твита

    $("#tweetsList").prepend($tweetBox); // выводим текст твита

    countTweets();
  }


  var tweetsBase = [
    {
      date: '6 июля 2018 г. 19:00:00',
      text: 'Ура, интенсивчик!'
    },
    {
      date: '7 июля 2018 г. 01:12:35',
      text: 'Нужно срочно изучать, штудировать и применять на практике "Cracking the coding interview", пока никто не написал "Cracking the cracking the coding interview".'
    },
    {
      date: '8 июля 2018 г. 13:48:03',
      text: 'Шёл я лесом, вижу мост, под мостом ворона мокнет. Взял её за хвост, положил на мост, пускай ворона сохнет. Шёл я лесом, вижу мост, на мосту ворона сохнет. Взял её за хвост, положил под мост, пускай ворона мокнет. Шёл я лесом, вижу мост, под мостом ворона мокнет. Взял её за хвост, положил на мост, пускай ворона сохнет. Шёл я лесом, вижу мост, на мосту ворона сохнет. Взял её за хвост, положил под мост, пускай ворона мокнет. Шёл я лесом, вижу мост...'
    },
    {
      date: '9 июля 2018 г. 23:23:23',
      text: 'Наедине с собой этот человек всегда спит. Подробнее на https://www.livelib.ru/author/108/quotes-zhanpol-sartr'
    }
  ];

  tweetsBase.forEach(function(tweet) {
    createTweet(tweet.date, tweet.text);
  });


  // форма отправки твита
  $("#postNewTweet").on("submit", function(evt) { // поиск по селектору jquery
    evt.preventDefault(); // метод отменяет стандартное поведение (отправку формы)
    var tweetText = $("#tweetText").val(); // получаем текст твита
    createTweet(getDate(), tweetText);
    $("#tweetText").val(""); // после отправки твита поле очищается
  });


});
