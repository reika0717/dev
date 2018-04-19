var script = document.createElement('script')
var tags = [
  'publishment',
  'service',
  'event',
  'invite',
  'other'
]
var services_array = [
  'togoWS',
  'togoTABLE',
  'togoGENOME',
  'togoDB',
  'togo_picture_gallery',
  'refEx',
  'pub_case_finder',
  'pub_annotation',
  'orefil',
  'life_science_QA',
  'inmexes',
  'ggrna',
  'dbcls_sra',
  'd2rq_mapper',
  'crispr_direct',
  'colil',
  'chip_atlas',
  'body_parts_3D',
  'aoe',
  'allie',
  'togoWS',
  'togoTABLE',
  'togoGENOME',
  'togoDB',
  'togo_picture_gallery',
  'refEx',
  'pub_case_finder',
  'pub_annotation',
  'orefil',
  'life_science_QA',
  'inmexes',
  'ggrna',
  'dbcls_sra',
  'd2rq_mapper',
  'crispr_direct',
  'colil',
  'chip_atlas',
  'body_parts_3D',
  'aoe',
  'allie'
]

script.setAttribute('src', 'https://code.jquery.com/jquery-3.2.1.min.js')
document.head.appendChild(script)


var initialize = {
  'index': function() {
    tags.map(function(data) {
      $('a[tag="' + data + '"]').before('<img src="img/icon_tag_' + data + '.svg" class="news__tag-icon" alt="" >')
    })
    const ROTATE_SPEED = 40000;
    const NUMBER_OF_PANEL = 20; //パネル数
    const APPEAR_PITCH = ROTATE_SPEED / NUMBER_OF_PANEL; //パネルが出現する間隔
    const currentTime = 0;
    const FPS = 50; //１秒間のコマ数
    const RADIAN_UNIT = ((Math.PI) * .1) / 1000 * FPS; //1コマの移動距離＝速さ
    const Y_UNIT = 0.00001; //y軸の速度
    const UNIT = (Math.PI * 2) / NUMBER_OF_PANEL; // 弧度
    const RADIUS = 480; //半径

    class Panel {
      constructor() {
        var url = ''
        $('.main-image__contents').append('<div class="panel">')
        for (let i = 0; i < services_array.length; i++) {
          url = 'img/top_assets/' + services_array[i] + '_f.png'
          var panel_style = {
            'background-image': 'url(' + url + ')',

          }
          $('.panel:nth-of-type(' + i + ')').css(panel_style)
        }
        this.$ = $('.panel:last-child');
        this.reset()
        $('.panel').hover(function() {
          stopTimer()
          // $('.main-image__veil, .main__forcused-page__description').css('display', 'block')
          // var resized_image = $(this).css('background-image').toString()
          // var forcused_style = {
          //    'width': '340px',
          //    'height': '400px',
          //    'position': 'absolute',
          //    'top': '80px',
          //    'left': '50%',
          //    'pointer-events': 'none',
          //    'z-index': '9999',
          //    'transform': 'rotateY(0) translateX(-50%)',
          //    'background-image': resized_image
          // }

          // var forcused_image = $(this).clone(true).removeClass('panel').addClass('forcused_panel').css(forcused_style)
          // $('body').append(forcused_image)

        })

        $('.panel').mouseout(function() {
          startTimer()
          $('.forcused_panel').remove()
          $('.main-image__veil, .main__forcused-page__description').css('display', 'none')
        })

      }

      step() {
        function radian2degree(radian) {
          return 180 * radian / Math.PI;
        }
        const currentRadius = RADIAN_UNIT * this.counter / 2 + UNIT
        this.$.css({
          top: (300 - (this.counter++) / 1.2) + 'px',
          left: -Math.cos(currentRadius) * RADIUS + 430 + 'px',
          transform: 'translateY(' + Y_UNIT * this.counter + 'px) translateZ(' + (Math.sin(currentRadius) * RADIUS) / 2 + 'px) rotateY(' + (radian2degree(currentRadius) + 270) + 'deg)'
        });
        if (this.counter / 10 > 100) {
          stage.shift();
          backStage.push(this);
        }
        let z_position = Math.sin(currentRadius) * RADIUS
        if (z_position < 0) {
          var opacity = z_position * (-1)
          opacity = ((500 - opacity) / 500) * 100
          opacity = Math.round(opacity) / 100 + 0.2
          this.$.css({ 'opacity': opacity, 'z-index': '-100' })
        } else if (z_position >= 0) {
          this.$.css({ 'opacity': 1, 'z-index': '100' })
        }
      }

      reset() {
        this.counter = 0;
        this.$.css({
          top: '100vh',
          left: '50vw'
        })
      }
    }

    var stage = [],
      backStage = [];
    var timer;

    setInterval(function() {
      if (backStage.length === 0) {
        stage.push(new Panel());
      } else {
        var panel = backStage[0];
        backStage.shift();
        stage.push(panel);
        panel.reset();
      }
    }, APPEAR_PITCH);


    function animation() {
      for (var i = 0; i < stage.length; i++) {
        stage[i].step();
      }
    };

    function startTimer() {
      timer = setInterval(function() {
        animation()
      }, FPS)
    }

    function stopTimer() {
      clearInterval(timer)
    }

    startTimer()
  },
  'news': function() {
    tags.map(function(data) {
      $('a[tag="' + data + '"]').before('<img src="/dbcls-test/img/icon_tag_' + data + '.svg" class="news__tag-icon" alt="" >')
    })
    $('.post__individual').each(function() {
      tag_className = $(this).attr('class')
      tag_className = tag_className.match(/\[\"(.+?)\"\]/g)
      tag_className = tag_className[0].match(/\"(.+?)\"/g)
      tag_className = tag_className.join(' ')
      tag_className = tag_className.replace(/"/g, '')
      $(this).addClass(tag_className)
    })

    // var result  = tag_className.replace(/\[\"(.+?)\"\]/, '/1')
    // console.log(result)

    // tag_className.replace(/["(/w)"]/, '/1')

    // var mixer = mixitup(containerEl, {
    //   multifilter: {
    //     enable: true // enable the multifilter extension for the mixer
    //   }
    // });
  },
  'post': function() {
    tags.map(function(data) {
      $('a[tag="' + data + '"]').before('<img src="/dbcls-test/img/icon_tag_' + data + '.svg" class="news__tag-icon" alt="" >')
    })
  },
  'about': function() {
    $('.lazy-mail').each(function() {
      var self = this;
      setTimeout(function() {
        var $target = jQuery(self);
        var address = $target.data("address").split("_at_").join("@").split("_dot_").join(".");
        $target
          .attr("href", "mailto:" + address)
          .text(address);
      }, 1000);
    });
  },
  'research': function() {},
  'achievement': function() {
    $.ajax({
      url: "https://sheets.googleapis.com/v4/spreadsheets/1JGvXRqvu5A5IhaYfz40yTblNP7bZZL6GaPGaZl7knHM/values/References?key=AIzaSyCKBRLAEd_o7WAeBN5m0NZZ1Eusco7VtHw",
      dataType: "json",
      async: true,
      success: function(data) {

        var elementArray = data.values;
        var elementArray_service = []
        for (var i = 0; i < elementArray.length; i++) {
          elementArray_service.push(elementArray[i][0])
        }
        elementArray_service = _.rest(elementArray_service, 2)
        elementArray_service = _.uniq(elementArray_service)

        var filterList = {}
        for (var i = 0; i < elementArray_service.length; i++) {
          var service_name = elementArray_service[i]
          filterList[service_name] = elementArray.filter((list) => {
            return list[0] === service_name
          })
        }

        var element = "";

        var names = Object.keys(filterList);

        element += '<table class="papers_citing_table"><tbody>';
        for (i = 0; i < names.length; i++) {

          var nameslength = names[i].length;

          element +=
            '<tr><td><div class="filName" data-category="' + names[i] + '">' + names[i] + '</div></td>' +
            '<td class="quote_num">' + nameslength + '</td></tr>';
        }
        element += '</tbody></table>';

        function displayList() {
          $('.main__content-title').text('研究業績')
          $(".achievement__wrapper").append(element);
        }
        displayList()

        $(document).on('click', '.filName', function() {
          names = $(this).html()
          displayIndividual(names)
        })

        function displayIndividual(names) {
          location.hash = names
          arranged_name = names.replace('%20', ' ')
          $('.main__content-title').text(arranged_name)
          //filterListをarranged_nameのものだけにフィルタリングして新しい配列
          $('.achievement__wrapper').empty()
          var service_array = []
          service_array = filterList[arranged_name]
          var results = "";

          for (var i = 0; i < service_array.length; i++) {
            results +=
              '<div class="achievement__column__wrapper">' +
              '<h4 class="achievement__column__title">' + service_array[i][4] + '</h4>' +
              '<p class="achievement__column__pubmed"><span class="achievement__column__title-small">Pubmed: </span>https://www.ncbi.nlm.nih.gov/pubmed/?term=' + service_array[i][2] + '</p>' +
              '<p class="achievement__column__DOI"><span class="achievement__column__title-small">DOI: </span>' + service_array[i][3] + '</p>' +
              '<div class="achievement__column__wrapper-small">' +
              '<i class="fa fa-user" aria-hidden="true"></i>' +
              '<p>' + service_array[i][5] + '</p>' +
              '<i class="fa fa-clock-o" aria-hidden="true"></i>' +
              '<p>' + service_array[i][7] + '</p>' +
              '<i class="fa fa-book" aria-hidden="true"></i>' +
              '<p>' + service_array[i][6] + '</p>' +
              '<i class="fa fa-quote-right" aria-hidden="true"></i>' +
              '<p>' + service_array[i][1] + '</p>' +
              '</div>' +
              '</div>'
          }
          $('.achievement__wrapper').append(results);
        }

        //ハッシュ値が変わった時の画面遷移
        window.addEventListener('hashchange', function() {
          if (location.hash === '') {
            $('.achievement__wrapper').empty()
            displayList()
          } else {
            var service__title = location.hash.slice(1)
            displayIndividual(service__title)
          }
        }, false)

        if (location.hash === '') {} else {
          var service__title = location.hash.slice(1)
          displayIndividual(service__title)
        }
      }
    })
  },
  'services': function() {
    var repos_name = '';
    // var repos_array = [];
    var tags_array
    if (location.hash === '') {} else {
      var service__title = location.hash.slice(1)
      displayRepos(service__title)
    }

    //担当者サービスの連想配列つくる（まだやってない
    var servicePerson = {};

    function servicesFrontDisplay() {
      $.ajax({
        url: "https://sheets.googleapis.com/v4/spreadsheets/1bSnbUztPDl3nhjQFbScjtTXpQtXOkqZE83NMilziHQs/values/%E3%82%B5%E3%83%BC%E3%83%93%E3%82%B9%E4%B8%80%E8%A6%A7?key=AIzaSyAIstRfTWKWRqNKpkMk-uGYAQJw0myzMh4",
        dataType: "json",
        async: true,
        success: function(data) {

          var elementArray = data.values;
          //column1に"Y"のあるrowをとってくる
          var symbolYList = elementArray.filter((YList) => {
            return (YList[0] === "Y");
          })
          var element = "";

          function getClassName(num) {
            var tagName = []
            if (symbolYList[num][10] === 'Y') {
              tagName.push('omics')
            }
            if (symbolYList[num][11] === 'Y') {
              tagName.push('text-mining')
            }
            if (symbolYList[num][12] === 'Y') {
              tagName.push('contents')
            }
            if (symbolYList[num][13] === 'Y') {
              tagName.push('semantic')
            }
            if (symbolYList[num][14] === 'Y') {
              tagName.push('biologist')
            }
            if (symbolYList[num][15] === 'Y') {
              tagName.push('application')
            }
            if (symbolYList[num][16] === 'Y') {
              tagName.push('data-scientist')
            }
            if (symbolYList[num][17] === 'Y') {
              tagName.push('provider')
            }
            return tagName
          }

          // function getData(filepath) {
          //   return $.ajax({
          //     type: 'GET',
          //     url: filepath
          //   })
          // }

          // function fileCheck(filepath) {
          //   getData().done(function(result){
          //     return filepath
          //   }).fail(function(result){
          //     return './img/service_assets/no-image.png'
          //   })
          // }
          //data.values.splice(0, 1)
          var tagMapping = {
            'omics': 'データ解析ツール',
            'contents': 'コンテンツ',
            'text-mining': '文献知識抽出',
            'semantic': 'セマンティックウェブ',
            'biologist': '実験系研究者',
            'application': 'アプリケーション開発者',
            'data-scientist': 'データサイエンティスト',
            'provider': 'データ提供者'
          }
          for (var i = 0; i < symbolYList.length; i++) {
            var tagArray = getClassName(i)
            var tagName = tagArray.join(' ')

            function addTagLine(array) {
              var categoryTag = ''
              for (var j = 0; j < array.length; j++) {
                categoryTag += '<div class="service_category tag_element ' + array[j] + '">' + tagMapping[array[j]] + '</div>'
              }
              return categoryTag
            }
            element += '<article class="article__section contener-type-box mix ' + tagName + '">' +
              '<div id="repos_name' + i + '" class="repos_name">' +
              '<p class="name">' + symbolYList[i][3] + '</p>' +
              '<div class="keyword">だれでも自由に閲覧・利用できるように、Web上にて無料で公開しているライフサイエンス分野の画像・イラスト集です。</div>' +
              addTagLine(tagArray) +
              '<div class="btn-box">' +
              '<a class="page_btn more_btn">' + '詳細' + '</a>' +
              '<a href="' + symbolYList[i][4] + '" class="page_btn access_btn">アクセス</a>' +
              '</div></div>' +
              '<div id="repos_image0" class="repos_image">' +
              '<img src="./img/service_assets/' + symbolYList[i][3] + '.png" alt="' + symbolYList[i][2] + '" class="object-fit-img img_services"></div>'

            element += '</article>'

          }
          $("#service_list").append(element);
          var containerEl = document.querySelector('.service__wrapper');
          var mixer = mixitup(containerEl, {
            controls: {
              toggleLogic: 'and'
            }
          });
        }
      })
    }
    servicesFrontDisplay();

    //ハッシュ値が変わった時の画面遷移
    window.addEventListener('hashchange', function() {
      if (location.hash === '') {
        $('.service__wrapper').empty()
        servicesFrontDisplay()
      } else {
        var service__title = location.hash.slice(1)
        displayRepos(service__title)
      }
    }, false)

    //デフォルトは英語版README表示
    $(document).on('click', '.more_btn', function() {
      var service_name = $(this).parent().siblings('.name').html()
      displayRepos(service_name)
    })

    //リポジトリ個別ページ
    function displayRepos(repos_name) {
      location.hash = repos_name
      var md_data = ''

      function getData() {
        return $.ajax({
          type: 'GET',
          url: './md/' + repos_name + '-README.md'
        })
      }
      var arranged_data = ''
      getData().done(function(result) {
        arranged_data = marked(result)
        $('.service__wrapper').empty()
        var markdown_body = $('.service__wrapper').append($('<div/>').attr({ 'class': 'markdown-body' }).html(arranged_data))
      }).fail(function(result) {
        $('.service__wrapper').empty()
        var markdown_body = $('.service__wrapper').append($('<div/>').attr({ 'class': 'markdown-body' }).html('<p>データを取得できませんでした</p>'))
      })
    }
  },
  'events': function() {
    tags.map(function(data) {
      $('a[tag="' + data + '"]').before('<img src="/dbcls-test/img/icon_tag_' + data + '.svg" class="news__tag-icon" alt="" >')
    })
  },
  'member': function() {
    location.hash = 'member'

    function memberFrontDisplay() {
      $.ajax({
        url: "https://sheets.googleapis.com/v4/spreadsheets/1bSnbUztPDl3nhjQFbScjtTXpQtXOkqZE83NMilziHQs/values/%E7%A0%94%E7%A9%B6%E8%80%85ID?key=AIzaSyAIstRfTWKWRqNKpkMk-uGYAQJw0myzMh4",
        dataType: "json",
        async: true,
        success: function(data) {

          var element = "";
          var listSubNav = "";
          data.values.splice(0, 1);

          for (var j = 0; j < data.values.length; j++) {
            console.log(memberList);

            listSubNav += '<li>' + data.values[j][0] + '</li>';

          }
          $("#memberList").append(listSubNav);

          for (var i = 0; i < data.values.length; i++) {

            var name_ja = data.values[i][0]
            var name_en = data.values[i][1]
            var image = data.values[i][2]
            var position = data.values[i][3]
            //var position_en = data.values[i][]
            var keyword = data.values[i][5]
            //var keyword_en = data.values[i][]
            var orcid = data.values[i][8]
            var googleScholar = data.values[i][10]
            var github = data.values[i][11]
            var mail = data.values[i][6]

            element += '<div class="content__member">' +
              '<div class="repos_image">' + '<img src="./img/member/' + image + '" alt="' + name_ja + '" class="img_member"></div>' +
              '<ul><li class="position">' + position + '</li>' +
              '<li class="repos_name">' + name_ja + '<span>' + name_en + '</span></li>' +
              '<li class="keyword">' + keyword + '</li>' +
              '<li class="PIC">担当サービス：<div class="member-list__services">' + "TogoAnnotator,TogoDoc" + '</div></li>' +
              '<li class="links"><div class="btn-box">' +
              '<a href="' + mail + '" class="btn-mail">Mail</a>' +
              '<a href="https://github.com/' + github + '" class="btn-github">GitHub</a>' +
              '<a href="https://orcid.org/' + orcid + '" class="btn-orcid">ORCID</a>' +
              '<a href="' + googleScholar + '" class="btn-gs">Google Scholar</a></div></li></ul></div>';
          }
          $("#member-list").append(element);
        }
      })
    }
    memberFrontDisplay();
  },
  'access': function() {
    location.hash = 'access'
  },
  'contact': function() {
    location.hash = 'contact'
  }
};

script.addEventListener('load', function() {
  $(function() {
    var pageType = document.getElementsByTagName('html')[0].dataset.pageType;
    console.log(pageType)
    initialize[pageType]()

    // position: stickyがブラウザで使えるかチェックするための関数
    function detectSticky() {
      const div = document.createElement('div');
      div.style.position = 'sticky';
      // position: stickyがブラウザで使えればtrue、使えなければfalseを返す
      return div.style.position.indexOf('sticky') !== -1;
    }

    // .stickyが指定されている要素に対してposition: stickyを適用させる関数
    function callStickyState() {
      // position: stickyを適用させたい要素を引数に指定し、
      // StickyStateをnewしてインスタンスを返す
      return new StickyState(document.querySelectorAll('.sticky'));
    }

    // もしブラウザでposition: stickyが使えなければ、
    // callStickyState関数を呼び出す
    if (!detectSticky()) {
      callStickyState();
    }

    //header言語切り替え
    $('.lang-en span').on('click', function() {
      var link = pageType + '-en.html'
      window.location.href = link
    })
    $('.lang-ja span').on('click', function() {
      var link = pageType + '.html'
      window.location.href = link
    })
  })
})