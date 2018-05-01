'use strict';

var script = document.createElement('script');
var script_sticky = document.createElement('script');
var tags = {
  'publishment': '広報',
  'service': 'サービス',
  'event': 'イベント',
  'invite': '募集',
  'other': 'その他'
};

script.setAttribute('src', 'https://code.jquery.com/jquery-3.2.1.min.js');
script_sticky.setAttribute('src', '/dbcls-test/script/stickyfill.min.js');
document.head.appendChild(script);
document.head.appendChild(script_sticky);
var initialize = {
  'index': function index() {
    $('.news__individual-wrapper').css('display', 'block');
    var url = window.location;
    var path = url.href.split('/');
    var file_name = path.pop();
    var tags_key = Object.keys(tags);
    tags_key.map(function (data) {
      $('a[tag="' + data + '"]').before('<img src="/dbcls-test/img/icon_tag_' + data + '.svg" class="news__tag-icon" alt="" >');
    });
    //タグ名を日本語に変換
    if (file_name === 'index.html') {
      $('.tag_name').each(function () {
        var tag_en = $(this).text();
        tag_en = $.trim(tag_en);
        var tag_ja = tags[tag_en];
        $(this).text(tag_ja);
      });
    }

    function slideSwitch() {
      var $active = $('.main-image__contents DIV.active');

      if ($active.length == 0) $active = $('.main-image__contents DIV:last');

      // use this to pull the divs in the order they appear in the markup
      var $next = $active.next().length ? $active.next() : $('.main-image__contents DIV:first');

      // uncomment below to pull the divs randomly
      // var $sibs  = $active.siblings();
      // var rndNum = Math.floor(Math.random() * $sibs.length );
      // var $next  = $( $sibs[ rndNum ] );


      $active.addClass('last-active');

      $next.css({
        opacity: 0.0
      }).addClass('active').animate({
        opacity: 1.0
      }, 1000, function () {
        $active.removeClass('active last-active');
      });
    }

    $(function () {
      setInterval("slideSwitch()", 5000);
    });
  },
  'news': function news() {
    var prepage = '';
    console.log(document.referrer);
    prepage = document.referrer;
    prepage = prepage.slice(-11);
    if (prepage === 'events.html' || prepage === 'nts-en.html') {
      setTimeout(function () {
        $('.tag-event').trigger('click');
      }, 0);
      setTimeout(function () {
        $('.news__individual-wrapper').css('display', 'block');
      }, 500);
    } else {
      $('.news__individual-wrapper').css('display', 'block');
    }
    var url = window.location;
    var path = url.href.split('/');
    var file_name = path.pop();
    var tags_key = Object.keys(tags);
    tags_key.map(function (data) {
      $('a[tag="' + data + '"]').before('<img src="/dbcls-test/img/icon_tag_' + data + '.svg" class="news__tag-icon" alt="" >');
    });
    //タグ名を日本語に変換
    if (file_name === 'news.html') {
      $('.tag_name').each(function () {
        var tag_en = $(this).text();
        tag_en = $.trim(tag_en);
        var tag_ja = tags[tag_en];
        $(this).text(tag_ja);
      });
    }

    $('.post__individual').each(function () {
      var tag_className = $(this).attr('class');
      tag_className = tag_className.match(/\[\"(.+?)\"\]/g);
      tag_className = tag_className[0].match(/\"(.+?)\"/g);
      tag_className = tag_className.join(' ');
      tag_className = tag_className.replace(/"/g, '');
      $(this).addClass(tag_className);
    });

    // var result  = tag_className.replace(/\[\"(.+?)\"\]/, '/1')
    // console.log(result)

    // tag_className.replace(/["(/w)"]/, '/1')

    // var mixer = mixitup(containerEl, {
    //   multifilter: {
    //     enable: true // enable the multifilter extension for the mixer
    //   }
    // });
  },
  'post': function post() {
    var url = window.location;
    var path = url.href.split('/');
    var file_name = path.pop();
    var tags_key = Object.keys(tags);
    tags_key.map(function (data) {
      $('a[tag="' + data + '"]').before('<img src="/dbcls-test/img/icon_tag_' + data + '.svg" class="news__tag-icon" alt="" >');
    });

    //タグ名を日本語に変換
    if (path.indexOf("ja") >= 0) {
      $('.tag_name').each(function () {
        var tag_en = $(this).text();
        tag_en = $.trim(tag_en);
        var tag_ja = tags[tag_en];
        $(this).text(tag_ja);
      });
    }
  },
  'about': function about() {
    $('.lazy-mail').each(function () {
      var self = this;
      setTimeout(function () {
        var $target = jQuery(self);
        var address = $target.data("address").split("_at_").join("@").split("_dot_").join(".");
        $target.attr("href", "mailto:" + address).text(address);
      }, 1000);
    });
  },
  'research': function research() {},
  'achievement': function achievement() {},
  'logotype': function logotype() {},
  'funding': function funding() {},
  'references': function references() {
    $.ajax({
      url: "https://sheets.googleapis.com/v4/spreadsheets/1JGvXRqvu5A5IhaYfz40yTblNP7bZZL6GaPGaZl7knHM/values/References?key=AIzaSyCKBRLAEd_o7WAeBN5m0NZZ1Eusco7VtHw",
      dataType: "json",
      async: true,
      success: function success(data) {

        var elementArray = data.values;
        var elementArray_service = [];
        for (var i = 0; i < elementArray.length; i++) {
          elementArray_service.push(elementArray[i][0]);
        }
        elementArray_service = _.rest(elementArray_service, 2);
        elementArray_service = _.uniq(elementArray_service);

        var filterList = {};
        for (var i = 0; i < elementArray_service.length; i++) {
          var service_name = elementArray_service[i];
          filterList[service_name] = elementArray.filter(function (list) {
            return list[0] === service_name;
          });
        }

        var element = "";

        var names = Object.keys(filterList);

        element += '<table class="papers_citing_table"><tbody>';
        for (i = 0; i < names.length; i++) {

          var nameslength = names[i].length;

          element += '<tr><td><div class="filName" data-category="' + names[i] + '">' + names[i] + '</div></td>' + '<td class="quote_num">' + nameslength + '</td></tr>';
        }
        element += '</tbody></table>';

        function displayList() {
          if (document.documentElement.lang === "en") {
            $('.main__content-title').text('Achivement');
            $(".achievement__wrapper").append(element);
          } else if (document.documentElement.lang === "ja") {
            $('.main__content-title').text('引用文献一覧');
            $(".achievement__wrapper").append(element);
          }
        }
        displayList();

        $(document).on('click', '.filName', function () {
          names = $(this).html();
          displayIndividual(names);
        });

        function displayIndividual(names) {
          location.hash = names;
          var arranged_name = names.replace('%20', ' ');
          $('.main__content-title').text(arranged_name);
          //filterListをarranged_nameのものだけにフィルタリングして新しい配列
          $('.achievement__wrapper').empty();
          var service_array = [];
          service_array = filterList[arranged_name];
          var results = "";

          for (var i = 0; i < service_array.length; i++) {
            results += '<div class="achievement__column__wrapper">' + '<h4 class="achievement__column__title">' + service_array[i][4] + '</h4>' + '<p class="achievement__column__pubmed"><span class="achievement__column__title-small">Pubmed: </span><a href="https://www.ncbi.nlm.nih.gov/pubmed/?term=' + service_array[i][2] + '">https://www.ncbi.nlm.nih.gov/pubmed/?term=' + service_array[i][2] + '</a></p>' + '<p class="achievement__column__DOI"><span class="achievement__column__title-small">DOI: </span><a href="' + service_array[i][3] + '">' + service_array[i][3] + '</a></p>' + '<div class="achievement__column__wrapper-small">' + '<i class="fa fa-user" aria-hidden="true"></i>' + '<p>' + service_array[i][5] + '</p>' + '<i class="fa fa-clock-o" aria-hidden="true"></i>' + '<p>' + service_array[i][7] + '</p>' + '<i class="fa fa-book" aria-hidden="true"></i>' + '<p>' + service_array[i][6] + '</p>' + '<i class="fa fa-quote-right" aria-hidden="true"></i>' + '<p>' + service_array[i][1] + '</p>' + '</div>' + '</div>';
          }
          $('.achievement__wrapper').append(results);
        }

        //ハッシュ値が変わった時の画面遷移
        window.addEventListener('hashchange', function () {
          if (location.hash === '') {
            $('.achievement__wrapper').empty();
            displayList();
          } else {
            var service__title = location.hash.slice(1);
            displayIndividual(service__title);
          }
        }, false);

        if (location.hash === '') {} else {
          var service__title = location.hash.slice(1);
          displayIndividual(service__title);
        }
      }
    });
  },
  'services': function services() {
    var repos_name = '';
    // var repos_array = [];
    var tags_array;
    if (location.hash === '') {} else {
      var service_title = location.hash.slice(1);
      displayRepos(service__title);
    }

    function servicesFrontDisplay() {
      $.ajax({
        url: "https://sheets.googleapis.com/v4/spreadsheets/1bSnbUztPDl3nhjQFbScjtTXpQtXOkqZE83NMilziHQs/values/%E3%82%B5%E3%83%BC%E3%83%93%E3%82%B9%E4%B8%80%E8%A6%A7?key=AIzaSyAIstRfTWKWRqNKpkMk-uGYAQJw0myzMh4",
        dataType: "json",
        async: true,
        success: function success(data) {

          var elementArray = data.values;
          //column1に"Y"のあるrowをとってくる
          var symbolYList = elementArray.filter(function (YList) {
            return YList[0] === "Y";
          });
          var element = "";

          function getClassName(num) {
            var tagName = [];
            if (symbolYList[num][10] === 'Y') {
              tagName.push('omics');
            }
            if (symbolYList[num][11] === 'Y') {
              tagName.push('text-mining');
            }
            if (symbolYList[num][12] === 'Y') {
              tagName.push('contents');
            }
            if (symbolYList[num][13] === 'Y') {
              tagName.push('semantic');
            }
            if (symbolYList[num][14] === 'Y') {
              tagName.push('biologist');
            }
            if (symbolYList[num][15] === 'Y') {
              tagName.push('application');
            }
            if (symbolYList[num][16] === 'Y') {
              tagName.push('data-scientist');
            }
            if (symbolYList[num][17] === 'Y') {
              tagName.push('provider');
            }
            return tagName;
          }

          var tagMapping = {
            'omics': {
              'ja': 'データ解析ツール',
              'en': 'Omics tools'
            },
            'contents': {
              'ja': 'コンテンツ',
              'en': 'contents'
            },
            'text-mining': {
              'ja': '文献知識抽出',
              'en': 'Textmining'
            },
            'semantic': {
              'ja': 'セマンティックウェブ',
              'en': 'Semantic web'
            },
            'biologist': {
              'ja': '実験系研究者',
              'en': 'Wet biologist, Clinician'
            },
            'application': {
              'ja': 'アプリケーション開発者',
              'en': 'Database Application Developer'
            },
            'data-scientist': {
              'ja': 'データサイエンティスト',
              'en': 'Data Scientist'
            },
            'provider': {
              'ja': 'データ提供者',
              'en': 'Data Provider'
            }

            //file名の取得
          };var url = window.location;
          var path = url.href.split('/');
          var file_name = path.pop();
          for (var i = 0; i < symbolYList.length; i++) {
            var addTagLine = function addTagLine(array, lang) {
              var categoryTag = '';
              if (lang === 'ja') {
                for (var j = 0; j < array.length; j++) {
                  var category_name = array[j];
                  categoryTag += '<div class="service_category tag_element ' + array[j] + '">' + tagMapping[category_name].ja + '</div>';
                }
              } else if (lang === 'en') {
                for (var j = 0; j < array.length; j++) {
                  var category_name = array[j];
                  categoryTag += '<div class="service_category tag_element ' + array[j] + '">' + tagMapping[category_name].en + '</div>';
                }
              }
              return categoryTag;
            };

            var tagArray = getClassName(i);
            var tagName = tagArray.join(' ');

            if (file_name === 'services.html') {
              element += '<article class="article__section contener-type-box mix ' + tagName + '">' + '<div id="repos_name' + i + '" class="repos_name">' + '<p class="name">' + symbolYList[i][3] + '</p>' + '<div class="keyword">' + symbolYList[i][5] + '</div>' + addTagLine(tagArray, 'ja') + '<div class="btn-box">' + '<a class="page_btn more_btn">' + '詳細' + '</a>' + '<a href="' + symbolYList[i][4] + '" class="page_btn access_btn">アクセス</a>' + '</div></div>' + '<div id="repos_image0" class="repos_image">' + '<img src="./img/service_assets/' + symbolYList[i][23] + '.png" alt="' + symbolYList[i][2] + '" class="object-fit-img img_services"></div>';
            } else if (file_name === 'services-en.html') {
              element += '<article class="article__section contener-type-box mix ' + tagName + '">' + '<div id="repos_name' + i + '" class="repos_name">' + '<p class="name">' + symbolYList[i][3] + '</p>' + '<div class="keyword">' + symbolYList[i][6] + '</div>' + addTagLine(tagArray, 'en') + '<div class="btn-box">' + '<a class="page_btn more_btn">' + 'more' + '</a>' + '<a href="' + symbolYList[i][4] + '" class="page_btn access_btn">Access</a>' + '</div></div>' + '<div id="repos_image0" class="repos_image">' + '<img src="./img/service_assets/' + symbolYList[i][3] + '.png" alt="' + symbolYList[i][2] + '" class="object-fit-img img_services"></div>';
            }

            element += '</article>';
          }
          $("#service_list").append(element);
          var containerEl = document.querySelector('.service__wrapper');
          var mixer = mixitup(containerEl, {
            controls: {
              toggleLogic: 'and'
            }
          });
        }
      });
    }
    servicesFrontDisplay();

    //ハッシュ値が変わった時の画面遷移
    window.addEventListener('hashchange', function () {
      if (location.hash === '') {
        $('.service__wrapper').empty();
        servicesFrontDisplay();
      } else {
        var service__title = location.hash.slice(1);
        displayRepos(service__title);
      }
    }, false);

    //デフォルトは英語版README表示
    $(document).on('click', '.more_btn', function () {
      var service_name = $(this).parent().siblings('.name').html();
      displayRepos(service_name);
    });

    //リポジトリ個別ページ
    function displayRepos(repos_name) {
      location.hash = repos_name;
      var md_data = '';

      function getData() {
        return $.ajax({
          type: 'GET',
          url: './md/' + repos_name + '-README.md'
        });
      }
      var arranged_data = '';
      getData().done(function (result) {
        arranged_data = marked(result);
        $('.service__wrapper').empty();
        var markdown_body = $('.service__wrapper').append($('<div/>').attr({
          'class': 'markdown-body'
        }).html(arranged_data));
      }).fail(function (result) {
        $('.service__wrapper').empty();
        var markdown_body = $('.service__wrapper').append($('<div/>').attr({
          'class': 'markdown-body'
        }).html('<p>データを取得できませんでした</p>'));
      });
    }
  },
  'events': function events() {
    $('.news__individual-wrapper').css('display', 'block');
    var url = window.location;
    var path = url.href.split('/');
    var file_name = path.pop();
    var tags_key = Object.keys(tags);
    tags_key.map(function (data) {
      $('a[tag="' + data + '"]').before('<img src="/dbcls-test/img/icon_tag_' + data + '.svg" class="news__tag-icon" alt="" >');
    });
    //タグ名を日本語に変換
    if (file_name === 'events.html') {
      $('.tag_name').each(function () {
        var tag_en = $(this).text();
        tag_en = $.trim(tag_en);
        var tag_ja = tags[tag_en];
        $(this).text(tag_ja);
      });
    }

    $.ajax({
      url: "https://sheets.googleapis.com/v4/spreadsheets/1bSnbUztPDl3nhjQFbScjtTXpQtXOkqZE83NMilziHQs/values/%E3%82%B5%E3%83%BC%E3%83%93%E3%82%B9%E4%B8%80%E8%A6%A7?key=AIzaSyAIstRfTWKWRqNKpkMk-uGYAQJw0myzMh4",
      dataType: "json",
      async: true,
      success: function success(data) {
        var events_array = data.values;

        function getOrder(target) {
          var order = 0;
          for (var i = 0; i < events_array.length; i++) {
            if (events_array[0][i] === target) {
              order = i;
            }
          }
          return order;
        }
        var event_active_order = getOrder('Event掲載');
        var service_name_order = getOrder('サービス名称');
        var explanation_ja_order = getOrder('explanation_ja');
        var explanation_en_order = getOrder('explanation_en');
        var event_img_order = getOrder('画像');
        var explanation_order = 0;
        var url_order = getOrder('URL');
        var url = window.location;
        var path = url.href.split('/');
        var file_name = path.pop();
        var events_array = events_array.filter(function (data) {
          return data[event_active_order] === 'Y';
        });
        if (file_name === 'events.html') {
          explanation_order = explanation_ja_order;
        } else if (file_name === 'events-en.html') {
          explanation_order = explanation_en_order;
        }

        var elements = '';
        for (var i = 0; i < events_array.length; i++) {
          console.log(events_array[i][event_img_order]);
          elements += '<article class="article__section event__section-ja">' + '<img src="/dbcls-test/img/event_assets/' + events_array[i][event_img_order] + '">' + '<div class="article__section__inner">' + '<h4>' + events_array[i][service_name_order] + '</h4>' + '<p>' + events_array[i][explanation_order] + '</p>' + '<a href = "' + events_array[i][url_order] + '" class = "page_btn more_btn" > more </a>' + '</div>' + '</article>';
        }
        $('.section-wrapper').append(elements);
      }
    });

    /***左サイドバーの動作ここから***/
    //変動要素: main__contents-"event"
    //mein一つ目セクションの高さの取得
    var client_h = document.getElementById('main__contents-event').clientHeight;

    //クリックでactiveが切り替わる
    $('ul.sub__navigation-wrapper li').on('click', function () {
      $('ul.sub__navigation-wrapper li').removeClass('active');
      $(this).addClass('active');
    });
    //取得したある高さまで、移動
    $(".sub_2").on('click', function () {
      window.scrollTo(0, client_h);
      //$(".sub_2").addClass("active");
    });
    $(".sub_1").on('click', function () {
      window.scrollTo(0, 0);
    });
    //==>スクロールでactiveが切り替わる
    $(window).scroll(function () {
      if ($(this).scrollTop() > client_h) {
        $('ul.sub__navigation-wrapper li.sub_1').removeClass('active');
        $('ul.sub__navigation-wrapper li.sub_2').addClass('active');
      } else if ($(this).scrollTop() < client_h) {
        $('ul.sub__navigation-wrapper li.sub_2').removeClass('active');
        $('ul.sub__navigation-wrapper li.sub_1').addClass('active');
      }
    });
    /***左サイドバーの動作ここまで***/
  },
  'member': function member() {
    $.when($.getJSON('https://sheets.googleapis.com/v4/spreadsheets/1bSnbUztPDl3nhjQFbScjtTXpQtXOkqZE83NMilziHQs/values/%E7%A0%94%E7%A9%B6%E8%80%85ID?key=AIzaSyAIstRfTWKWRqNKpkMk-uGYAQJw0myzMh4'), $.getJSON('https://sheets.googleapis.com/v4/spreadsheets/1bSnbUztPDl3nhjQFbScjtTXpQtXOkqZE83NMilziHQs/values/%E3%82%B5%E3%83%BC%E3%83%93%E3%82%B9%E4%B8%80%E8%A6%A7?key=AIzaSyAIstRfTWKWRqNKpkMk-uGYAQJw0myzMh4')).done(function (data, data_services) {
      console.log(data);
      var element = "";
      var element_collaborators = "";
      var listSubNav = "";
      var listSubNav_en = "";
      var listSubNav_collaborators = "";
      var listSubNav_collaborators_en = "";
      data = data[0];
      //file名の取得
      var url = window.location;
      var path = url.href.split('/');
      var file_name = path.pop();
      var name_ja_order = getOrder('name ja');
      var name_en_order = getOrder('name en');
      var image_order = getOrder('画像');
      var position_order = getOrder('position');
      var keyword_order = getOrder('keyword');
      var keyword_en_order = getOrder('keyword-en');
      var orcid_order = getOrder('ORCID');
      var googleScholar_order = getOrder('Google Scholar');
      var github_order = getOrder('github');
      var mail_order = getOrder('mail');
      var non_publish_order = getOrder('いずれのIDも掲載しない');

      for (var j = 1; j < data.values.length; j++) {
        console.log(data.values[j][position_order]);
        if (data.values[j][position_order] === '客員教授' || data.values[j][position_order] === '客員准教授') {
          listSubNav_collaborators += '<li><a href="#' + data.values[j][name_ja_order] + '">' + data.values[j][name_ja_order] + '</a></li>';
        } else {
          listSubNav += '<li><a href="#' + data.values[j][name_ja_order] + '">' + data.values[j][name_ja_order] + '</a></li>';
        }
      }
      for (var j = 1; j < data.values.length; j++) {
        if (data.values[j][position_order] === '客員教授' || data.values[j][position_order] === '客員准教授') {
          listSubNav_collaborators_en += '<li><a href="#' + data.values[j][name_en_order] + '">' + data.values[j][name_en_order] + '</a></li>';
        } else {
          listSubNav_en += '<li><a href="#' + data.values[j][name_en_order] + '">' + data.values[j][name_en_order] + '</a></li>';
        }
      }

      function judgeExist(data, className, linkName) {
        var elements = '';
        if (data) {
          elements = '<a href="' + data + '" class="' + className + '">' + linkName + '</a>';
        } else {
          elements = '';
        }
        return elements;
      }

      function getOrder(target) {
        var order = 0;
        for (var i = 1; i < data.values.length; i++) {
          if (data.values[0][i] === target) {
            order = i;
          }
        }
        return order;
      }

      if (file_name === 'member.html') {
        $("#memberList").append(listSubNav);
        $("#memberList-collaborators").append(listSubNav_collaborators);

        for (var i = 1; i < data.values.length; i++) {
          var name_ja = data.values[i][name_ja_order];
          var name_en = data.values[i][name_en_order];
          var image = data.values[i][image_order];
          var position = data.values[i][position_order];
          //var position_en = data.values[i][]
          var keyword = data.values[i][keyword_order];
          //var keyword_en = data.values[i][]
          var orcid = data.values[i][orcid_order];
          var googleScholar = data.values[i][googleScholar_order];
          var github = data.values[i][github_order];
          var mail = data.values[i][mail_order];
          var non_publish = data.values[i][non_publish_order];
          var link_section = judgeExist(mail, 'btn-mail', 'Mail') + judgeExist(github, 'btn-github', 'GitHub') + judgeExist(orcid, 'btn-orcid', 'ORCID') + judgeExist(googleScholar, 'btn-gs', 'Google Scholar');
          if (non_publish === 'Yes') {
            link_section = judgeExist(mail, 'btn-mail', 'Mail');
          }
          if (position === '客員教授' || position === '客員准教授') {
            element_collaborators += '<div class="content__member" id="' + name_ja + '">' + '<div class="repos_image">' + '<img src="./img/member/' + image + '" alt="' + name_ja + '" class="img_member"></div>' + '<ul><li class="position">' + position + '</li>' + '<li class="repos_name"><span class="name_ja">' + name_ja + '</span><span class="name_en">' + name_en + '</span></li>' + '<li class="keyword">' + keyword + '</li>' + '<li class="PIC">担当サービス：<div class="member-list__services"></div></li>' + '<li class="links"><div class="btn-box">' + link_section + '</div></li></ul></div>';
          } else {
            element += '<div class="content__member" id="' + name_ja + '">' + '<div class="repos_image">' + '<img src="./img/member/' + image + '" alt="' + name_ja + '" class="img_member"></div>' + '<ul><li class="position">' + position + '</li>' + '<li class="repos_name"><span class="name_ja">' + name_ja + '</span><span class="name_en">' + name_en + '</span></li>' + '<li class="keyword">' + keyword + '</li>' + '<li class="PIC">担当サービス：<div class="member-list__services"></div></li>' + '<li class="links"><div class="btn-box">' + link_section + '</div></li></ul></div>';
          }
        }
      } else if (file_name === 'member-en.html') {
        $("#memberList").append(listSubNav_en);
        $("#memberList-collaborators").append(listSubNav_collaborators_en);

        for (var i = 1; i < data.values.length; i++) {
          var name_ja = data.values[i][name_ja_order];
          var name_en = data.values[i][name_en_order];
          var image = data.values[i][image_order];
          var position = data.values[i][position_order];
          //var position_en = data.values[i][]
          var keyword = data.values[i][keyword_order];
          var keyword_en = data.values[i][keyword_en_order];
          var orcid = data.values[i][orcid_order];
          var googleScholar = data.values[i][googleScholar_order];
          var github = data.values[i][github_order];
          var mail = data.values[i][mail_order];
          var non_publish = data.values[i][non_publish_order];
          var link_section = '';
          link_section = judgeExist(mail, 'btn-mail', 'Mail') + judgeExist(github, 'btn-github', 'GitHub') + judgeExist(orcid, 'btn-orcid', 'ORCID') + judgeExist(googleScholar, 'btn-gs', 'Google Scholar');
          if (non_publish === 'Yes') {
            link_section = judgeExist(mail, 'btn-mail', 'Mail');
          }
          if (position === '客員教授' || position === '客員准教授') {
            element_collaborators += '<div class="content__member" id="' + name_en + '">' + '<div class="repos_image">' + '<img src="./img/member/' + image + '" alt="' + name_en + '" class="img_member"></div>' + '<ul><li class="position">' + position + '</li>' + '<li class="repos_name"><span class="name_ja">' + name_ja + '</span><span class="name_en">' + name_en + '</span></li>' + '<li class="keyword">' + keyword_en + '</li>' + '<li class="PIC">Charge：<div class="member-list__services"></div></li>' + '<li class="links"><div class="btn-box">' + link_section + '</div></li></ul></div>';
          } else {
            element += '<div class="content__member" id="' + name_en + '">' + '<div class="repos_image">' + '<img src="./img/member/' + image + '" alt="' + name_en + '" class="img_member"></div>' + '<ul><li class="position">' + position + '</li>' + '<li class="repos_name"><span class="name_ja">' + name_ja + '</span><span class="name_en">' + name_en + '</span></li>' + '<li class="keyword">' + keyword_en + '</li>' + '<li class="PIC">Charge：<div class="member-list__services"></div></li>' + '<li class="links"><div class="btn-box">' + link_section + '</div></li></ul></div>';
          }
        }
      }
      $("#member-list").append(element);
      $("#member-list-collaborators").append(element_collaborators);

      //担当サービスの実装
      data_services = data_services[0].values;
      var member = [];
      for (var i = 2; i < data_services.length; i++) {
        member.push(data_services[i][7]);
      }
      member = _.rest(member, 2);
      member = _.uniq(member);
      member = _.compact(member);
      var charge = {};
      // for(key in member){
      //   charge[key] = member[key]
      // }
      member.map(function (data) {
        for (var i = 2; i < data_services.length; i++) {
          if (data === data_services[i][7]) {
            charge[data] += data_services[i][3] + ',';
          }
        }
      });
      $('.name_ja').each(function () {
        var name = $(this).text();
        name = name.split(' ');
        if (charge[name[0]]) {
          var services = charge[name[0]];
          services = services + '';
          services = services.replace('undefined', '');
          services = services.slice(0, -1);
          services = services.replace(/,/g, ', ');
          var charge_tag = $(this).parent().siblings('.PIC').find('.member-list__services');
          $(charge_tag).text(services);
        } else {
          var charge_tag = $(this).parent().siblings('.PIC');
          $(charge_tag).remove();
        }
      });
    });
  },
  'access': function access() {

    /***左サイドバーの動作ここから***/
    //変動要素: main__contents-"event"
    //ある高さの取得
    var client_h = document.getElementById('main__contents-kashiwa').clientHeight;

    //クリックでactiveが切り替わる
    $('ul.sub__navigation-wrapper li').on('click', function () {
      $('ul.sub__navigation-wrapper li').removeClass('active');
      $(this).addClass('active');
    });
    //取得したある高さまで、移動
    $(".sub_2").on('click', function () {
      window.scrollTo(0, client_h);
      //$(".sub_2").addClass("active");
    });
    $(".sub_1").on('click', function () {
      window.scrollTo(0, 0);
    });
    //スクロールでactiveが切り替わる
    $(window).scroll(function () {
      if ($(this).scrollTop() > client_h) {
        $('ul.sub__navigation-wrapper li.sub_1').removeClass('active');
        $('ul.sub__navigation-wrapper li.sub_2').addClass('active');
      } else if ($(this).scrollTop() < client_h) {
        $('ul.sub__navigation-wrapper li.sub_2').removeClass('active');
        $('ul.sub__navigation-wrapper li.sub_1').addClass('active');
      }
    });
    /***左サイドバーの動作ここまで***/
  },
  'contact': function contact() {}
};

script.addEventListener('load', function () {
  $(function () {
    var pageType = document.getElementsByTagName('html')[0].dataset.pageType;
    console.log(pageType);
    initialize[pageType]();

    var current_class_name = '.' + pageType;
    $('.header__nav__contents' + current_class_name).find('a').css('border-bottom', '2px solid white');

    //sticky IE対応
    var elements = document.querySelectorAll('.sticky');
    Stickyfill.add(elements);

    //header言語切り替え
    var url = window.location;
    var path = url.href;

    $('.lang-en span').on('click', function () {
      if (path.match(/\/ja\/\d+\/\d+\/\d+\//)) {
        window.location.href = path.replace('/ja/', '/en/');
      } else {
        var link = pageType + '-en.html';
        window.location.href = link;
      }
    });

    $('.lang-ja span').on('click', function () {
      if (path.match(/\/en\/\d+\/\d+\/\d+\//)) {
        window.location.href = path.replace('/en/', '/ja/');
      } else {
        var link = pageType + '.html';
        window.location.href = link;
      }
    });
  });
});
