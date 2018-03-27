var script = document.createElement('script')
script.setAttribute('src', 'https://code.jquery.com/jquery-3.2.1.min.js')
document.head.appendChild(script)

var initialize = {
	'index': function () {},
	'about': function () {},
	'research': function () {},
	'services': function () {
		var repos_name = ''

		//レポジトリ一覧
		function displayReposList () {
			location.hash = 'services'
			$.get('https://api.github.com/users/dbcls/repos', function (data) {

				const repos_array = data.map(data => data.name);

	        })
		}
		displayReposList()

		$('#service-on').click(function() {
			$("#table").empty();
			//Servicesグーグルスプレッドシート
			//function servicesFrontDisplay() {
				$.ajax({
					url : "https://sheets.googleapis.com/v4/spreadsheets/1RxpHqr7s2eJsp5NjDiVMhPLshQIKuIma0_V0hNCCv94/values/Services?key=AIzaSyAIstRfTWKWRqNKpkMk-uGYAQJw0myzMh4",
					dataType : "json",
					async: true,
					success : function(data){

					  	var element = "";
					  	data.values.splice(0, 1)

					    for (i = 0; i < data.values.length; i++) {

							element += '<article class="article__section contener-type-box">' + 
							'<div id="repos_name' + i +'" class="repos_name">'+ 
				        	'<p class="name">' + data.values[i][0] + '</p>' + 
				        	'<div class="keyword">だれでも自由に閲覧・利用できるように、Web上にて無料で公開しているライフサイエンス分野の画像・イラスト集です。</div>' + 
				        	'<div class="btn-box">' + '<div class="page_btn more_btn">詳細</div>' + 
				        	'<a href="' + data.values[i][2] + '" class="page_btn access_btn">アクセス</a>' + 
				        	'</div></div>' + 
				        	'<div id="repos_image0" class="repos_image">' + 
				        	'<img src="./img/service_assets/' + data.values[i][1] + '" art="' + data.values[i][0] +'" class="object-fit-img img_services"></div>'

				        	element += '</article>'

				        }
			        	$("#service_list").append(element);    	
					}
				})
			//}
			//servicesFrontDisplay();
		})
		//$("#service_list").on('click', '#papers_citing_dbcls_services').css({'display':'none'});
		$('#papers_citing_dbcls_services').click(function() {
			$("#service_list").empty();

			/*$(function() {
				var h = $(window).height();
				$('#table').css('display','none');
			  	$('#loader-bg ,#loader').height(h).css('display','block');
			});
			$(window).load(function () { //全ての読み込みが完了したら実行
			  $('#loader-bg').delay(900).fadeOut(800);
			  $('#loader').delay(600).fadeOut(300);
			  $('#table').css('display', 'block');
			});
			$(function(){
			  setTimeout('stopload()',10000);
			});
			 
			function stopload(){
			  $('#table').css('display','block');
			  $('#loader-bg').delay(900).fadeOut(800);
			  $('#loader').delay(600).fadeOut(300);
			}*/
			$.ajax({
			  url : "https://sheets.googleapis.com/v4/spreadsheets/1JGvXRqvu5A5IhaYfz40yTblNP7bZZL6GaPGaZl7knHM/values/References?key=AIzaSyCKBRLAEd_o7WAeBN5m0NZZ1Eusco7VtHw",
			  dataType : "json",
			  async: true,
			  success : function(data){
			  	var rows = "";
			    for (i = 0; i < data.values.length; i++) {
			        rows += 

			        	//'<tr><td><a href="' + data.values[i][0] + '">' + data.values[i][0] + '</a></td>' +
			        	'<tr><td><p>' + data.values[i][0] + '</p></td>'+
			            '<td><p>' + data.values[i][1] + '</p></td>'+ 
			            '<td><p>' + data.values[i][2] + '</p></td>' +
			            '<td><a href="' + data.values[i][3] + '">' + data.values[i][3] + '</a></td>' +
			            '<td><p>' + data.values[i][4] + '<p></td>' +
			            '<td><p>' + data.values[i][5] + '</p></td>'+ 
			            '<td><p>' + data.values[i][6] + '</p></td>' +
			            '<td><p>' + data.values[i][7] + '</p></td>' +
			            '<td><p>' + data.values[i][8] + '</p></td>';
			      	rows += "</tr>";
			    }
			    $("#table").append(rows);
			  }
			})
		})
		
		//ハッシュ値が変わった時の画面遷移
		window.addEventListener('hashchange', function() {
			if(location.hash === '#services'){
				$('.service__wrapper').empty()
				displayReposList()
			}else if(location.hash === '#service'){
				displayRepos(repos_name, 'README.md')
			}
		}, false)

		//デフォルトは英語版README表示
		//.on('click', '.repos_name p, .access_btn', function ()
		$(document).on('click', '.more_btn', function () {
			repos_name = $(this).html()
			displayRepos (repos_name, 'README.md')
		})

		//リポジトリ個別ページ
		function displayRepos (repos_name, file_type) {
			location.hash = 'service'

			function plot (data) {
				var md_data = marked(data)
				$('.service__wrapper').empty()
				$('div.service__wrapper')
					.append($('<div/>')
						.attr({'class': 'tab_wrapper'})
						.append($('<ul/>')
							.append($('<li class="service_en">English</li>'))
							.append($('<li class="service_ja">日本語</li>'))
						)
					)
				var markdown_body = $('.service__wrapper').append($('<div/>').attr({'class': 'markdown-body'}).html(md_data))
			}
			$.get(
				'https://raw.githubusercontent.com/dbcls/' + repos_name + '/master/' + file_type
			).done(function (data) {
				plot(data)
			}).fail(function() {
				console.log('データ入手失敗！')
			})

			//README英語版読み込み
			$(document).on('click', 'li.service_en', function () {
				location.hash = 'service'
				$.get(
					'https://raw.githubusercontent.com/dbcls/' + repos_name + '/master/README.md'
				).done(function (data) {
						plot(data)
				}).fail(function () {
					console.log('データ入手失敗！')
				})
			})

			//REAFME日本語版読み込み
			$(document).on('click', 'li.service_ja', function () {
				location.hash = 'service'
				$.get(
					'https://raw.githubusercontent.com/dbcls/' + repos_name + '/master/READMEja.md'
				).done(function (data) {
						plot(data)
				}).fail(function () {
					console.log('データ入手失敗！')
				})
			})
		}
	},
	'events': function () {},
	'member': function () {

		function memberFrontDisplay() {
			location.hash = 'member'
			$.ajax({
				url : "https://sheets.googleapis.com/v4/spreadsheets/1RxpHqr7s2eJsp5NjDiVMhPLshQIKuIma0_V0hNCCv94/values/Member?key=AIzaSyAIstRfTWKWRqNKpkMk-uGYAQJw0myzMh4",
				dataType : "json",
				async: true,
				success : function(data){

				  	var element = "";
				  	data.values.splice(0, 1)

				    for (i = 0; i < data.values.length; i++) {
				    	
				    	var name = data.values[i][0]
				    	var name_en = data.values[i][1]
				    	var position = data.values[i][2]
				    	var position_en = data.values[i][3]
				    	var keyword = data.values[i][4]
				    	var keyword_en = data.values[i][5]
				    	var orcid = data.values[i][6]
				    	var mail = data.values[i][7]
				    	var image = data.values[i][8]
				    	console.log(image)

						element += '<article class="article__section contener-type-box contener-type-box__member">' + 
						'<div class="repos_image">' + '<img src="./img/member/' + image + '" alt="' + name + '" class="img_member"></div>' + 
						'<div id="repos_name" class="repos_name">' + 
						'<div class="name">' + name + '</div>' + 
						'<div class="name en">' + name_en + '</div>' + 
						'<div class="keyword">' + keyword + '</div>' + 
						'<div class="btn-box">' + '<a href="' + orcid + '" class="page_btn orcid_btn">ORCID</a>' + 
						'<a href="' + mail + '" class="page_btn mail_btn">mail</a></div>' 

			        	element += '</article>'

			        }
		        	$("#member-list").append(element); 
				}
			})
		}
		memberFrontDisplay();
	},
	'access': function () {},
	'achievement': function () {
		/*
		$(document).on('click', '#papers_citing_dbcls_services', function () {
			$("#service_list").addClass('display-none');
		location.hash = 'service'
			$.ajax({
			  url : "https://sheets.googleapis.com/v4/spreadsheets/1JGvXRqvu5A5IhaYfz40yTblNP7bZZL6GaPGaZl7knHM/values/References?key=AIzaSyCKBRLAEd_o7WAeBN5m0NZZ1Eusco7VtHw",
			  dataType : "json",
			  async: true,
			  success : function(data){
			  	var rows = "";
			    for (i = 0; i < data.values.length; i++) {
			        rows += 

			        	//'<tr><td><a href="' + data.values[i][0] + '">' + data.values[i][0] + '</a></td>' +
			        	'<tr><td><p>' + data.values[i][0] + '</p></td>'+
			            '<td><p>' + data.values[i][1] + '</p></td>'+ 
			            '<td><p>' + data.values[i][2] + '</p></td>' +
			            '<td><a href="' + data.values[i][3] + '">' + data.values[i][3] + '</a></td>' +
			            '<td><p>' + data.values[i][4] + '<p></td>' +
			            '<td><p>' + data.values[i][5] + '</p></td>'+ 
			            '<td><p>' + data.values[i][6] + '</p></td>' +
			            '<td><p>' + data.values[i][7] + '</p></td>' +
			            '<td><p>' + data.values[i][8] + '</p></td>';
			      	rows += "</tr>";
			    }
			    $("#table").append(rows);
			  }
			})
		})
		*/
	},
	'contact': function () {},
};

script.addEventListener('load', function() {
	$(function() {
		var pageType = document.getElementsByTagName('html')[0].dataset.pageType;
		console.log(pageType)
		initialize[pageType]()

		//header言語切り替え
		$('.lang-en span').on('click', function () {
			var link = pageType + '-en.html'
			window.location.href = link
		})
		$('.lang-ja span').on('click', function () {
			var link = pageType + '.html'
			window.location.href = link
		})
	})	
})
