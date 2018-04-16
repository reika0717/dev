var listManager;

function ListManager() {
	this.$tag_panel_category = $('#tag_panel_category').find('.tag_element');
	this.$tag_panel_others = $('#tag_panel_type').find('.tag_element');
	this.$listContainer = $('#services_list');
	this.metaData = [];
	this.filter = '';
	this.serviceItems = [];
	this.addEvents();
	this.processData = [];
}
//function servicesFrontDisplay() {
ListManager.prototype.getData = function() {
	$.ajax({
		url : "https://sheets.googleapis.com/v4/spreadsheets/1bSnbUztPDl3nhjQFbScjtTXpQtXOkqZE83NMilziHQs/values/%E3%82%B5%E3%83%BC%E3%83%93%E3%82%B9%E4%B8%80%E8%A6%A7?key=AIzaSyAIstRfTWKWRqNKpkMk-uGYAQJw0myzMh4",
		//url : "https://sheets.googleapis.com/v4/spreadsheets/1RxpHqr7s2eJsp5NjDiVMhPLshQIKuIma0_V0hNCCv94/values/Services?key=AIzaSyAIstRfTWKWRqNKpkMk-uGYAQJw0myzMh4",
		dataType : "json",
		async: true,
		success : function(datam){
			console.log(datam);
			var data = [];
			data = datam.values;
			/*this.metaData = processData(data);
			if(this.metaData) {
				this.reloadData();
			}*/
		}
	})
}

function ServiceMeataData(param) {
	//servicesに表示させる項目
	//column1に"Y"のあるrowをとってくる
	var symbolYList = elementArray.filter((YList) => {
		return (YList[0] === "Y");
	})

	//各カテゴリー"Y"のあるrowを格納
	var category_1 = symbolYList.filter((YList) => {
		return (YList[10] === "Y");
	})
	var category_2 = symbolYList.filter((YList) => {
		return (YList[11] === "Y");
	})
	var category_3 = symbolYList.filter((YList) => {
		return (YList[12] === "Y");
	})
	var category_4 = symbolYList.filter((YList) => {
		return (YList[13] === "Y");
	})
	//各ユーザ"Y"のあるrowを格納
	var user_1 = symbolYList.filter((YList) => {
		return (YList[14] === "Y");
	})
	var user_2 = symbolYList.filter((YList) => {
		return (YList[15] === "Y");
	})
	var user_3 = symbolYList.filter((YList) => {
		return (YList[16] === "Y");
	})
	var user_4 = symbolYList.filter((YList) => {
		return (YList[17] === "Y");
	})
/*
	//各タイプ"Y"のあるrowを格納//身内での管理項目となりサイトでは不使用となった
	/*
	var type_1 = symbolYList.filter((YList) => {
		return (YList[12] === "Y");
	})
	var type_2 = symbolYList.filter((YList) => {
		return (YList[13] === "Y");
	})
	var type_3 = symbolYList.filter((YList) => {
		return (YList[14] === "Y");
	})
	var type_4 = symbolYList.filter((YList) => {
		return (YList[15] === "Y");
	})*/

	//explanation_ja,explanation_en
	var explanation = [];
	var explanation_ja = [];
	var explanation_en = [];
	for (var i = 0; i < symbolYList.length; i++) {
		var explanationList = {
			ja : symbolYList[i][5],
			en : symbolYList[i][6]
		};
		explanation.push(explanationList);
	}
}
var processData = function(data) {

	//servicesに表示させる項目
	//column1に"Y"のあるrowをとってくる
	var symbolYList = data.filter((YList) => {
		return (YList[0] === "Y");
	})

	//各カテゴリー"Y"のあるrowを格納
	var category_1 = data.filter((YList) => {
		return (YList[8] === "Y");
	})
	var category_2 = data.filter((YList) => {
		return (YList[9] === "Y");
	})
	var category_3 = data.filter((YList) => {
		return (YList[10] === "Y");
	})
	var category_4 = data.filter((YList) => {
		return (YList[11] === "Y");
	})
	//各ユーザ"Y"のあるrowを格納
	var user_1 = data.filter((YList) => {
		return (YList[12] === "Y");
	})
	var user_2 = data.filter((YList) => {
		return (YList[13] === "Y");
	})
	var user_3 = data.filter((YList) => {
		return (YList[14] === "Y");
	})
	var user_4 = data.filter((YList) => {
		return (YList[15] === "Y");
	})

	var lines = [];
	var list = ({
		Category_1: category_1,
		Category_2: category_2,
		Category_3: category_3,
		Category_4: category_4,
		User_1: user_1,
		User_2: user_2,
		User_3: user_3,
		User_4: user_4,
		/*Type_1: type_1,
		Type_2: type_2,
		Type_3: type_3,
		Type_4: type_4,*/
		Explanation: explanation
	})
	lines.push(list);
	console.log(lines);
}

ListManager.prototype.addEvents = function() {
	var manager = this,
			self = this;
	// タグコンソールのタグをクリックすると、フィルタリング
	$('.tag_panel .tag_element').each(function() {
		var $self = $(this)
		$self.on('click',function() {
			var dataKey = $self.attr('data-tagkey'),
					parentKinds = $self.parent().attr('id').replace('tag_panel_', '');
			if (dataKey === parentKinds + '_all') {
				// All がクリックされたら、all が on になり、それ以外は off になる
				$self.removeClass('off');
				$self.siblings().addClass('off');
			} else {
				// All 以外がクリックされたら
				$self.toggleClass("off");
				var $all = $self.siblings('.all'),
						$tags = $self.parent().children('.tag_element:not(.all)'),
						$offs = $tags.filter('.off');
				if ($offs.length === $tags.length) {
					// All 以外の全てが off であれば、All も off にする
					$all.removeClass('off');
				//offが0 == 全て選択された場合
				} else if ($offs.length === 0) {
					// 全てが on の場合、All が on になり、他は全て off にする
					$all.removeClass('off');
					$tags.addClass('off');
				} else {
					// それ以外であれば、All を off にする
					$all.addClass('off');
				}
			}
			manager.reloadData();
		});
	});
}

ListManager.prototype.reloadData = function() {
	var tagBool = {},
	self = this;

	// 各タグが on であるかを取得
	$('.tag_panel .tag_element').each(function() {
		var tmpKey = $(this).attr('data-tagkey');
		tagBool[tmpKey] = !this.classList.contains('off');
		console.log(tagBool[tmpKey]);
	})

	// フィルター
	var isCategory = function(mdata){
		var exist = false;
		if (tagBool.category_all) {
			exist = true;
		} else {
			if (mdata.featured[LANGUAGE] && tagBool.category_dna) exist = true;
			if (mdata.category1 && tagBool.category_dna) exist = true;
			if (mdata.category2 && tagBool.category_structures) exist = true;
			if (mdata.category3 && tagBool.category_textmining) exist = true;
			if (mdata.category4 && tagBool.category_dbintegration) exist = true;
		}
		return exist;
	};
	var isUser = function(mdata){	
		var exist = false;
		if (tagBool.user_all) {
			exist = true;
		} else {
			if (mdata.user1 && tagBool.user_database) exist = true;
			if (mdata.user2 && tagBool.user_tool) exist = true;
			if (mdata.user3 && tagBool.user_download) exist = true;
			if (mdata.user4 && tagBool.user_submission) exist = true;
		}
		return exist;
	};
	/*
	var isType = function(mdata){	
		var exist = false;
		if (tagBool.type_all) {
			exist = true;
		} else {
			if (mdata.type1 && tagBool.type_database) exist = true;
			if (mdata.type2 && tagBool.type_tool) exist = true;
			if (mdata.type3 && tagBool.type_download) exist = true;
			if (mdata.type4 && tagBool.type_submission) exist = true;
		}
		return exist;
	};
	*/
	// データをフィルタリングアンダースコアJSを使用
	var filteredData = _.select(this.metaData, function(mdata) {
		return ( isCategory(mdata) && isUser(mdata) );
	});
	// カテゴリーごと
	var categorizedData = _.select(filteredData, function(mdata){
		return mdata.category1;
	});
	filteredData = _.difference(filteredData, categorizedData);
	var categorizedData = _.select(filteredData, function(mdata){
		return mdata.category2;
	});
	filteredData = _.difference(filteredData, categorizedData);
	var categorizedData = _.select(filteredData, function(mdata){
		return mdata.category3;
	});
	filteredData = _.difference(filteredData, categorizedData);
	var categorizedData = _.select(filteredData, function(mdata){
		return mdata.categor4;
	});
	filteredData = _.difference(filteredData, categorizedData);
	console.log(filteredData);
	console.log(categorizedData);
	//this.displayData(sortedData);
}
/* 
 * @param targetData:Array 表示させるサービスを格納した配列
 */
ListManager.prototype.displayData = function(targetData) {
	// 一覧をからに
	//this.$listContainer.empty();
	this.serviceItems
	for (var i = 0; i < this.serviceItems.length; i++) {
		this.serviceItems[i].destroy();
	}
	this.serviceItems = [];
	// サービス各項の生成
	for (var i = 0; i < targetData.length; i++) {
		this.serviceItems.push(new ServiceItem(targetData[i]));
	}
};

function ServiceItem(data) {
	var self = this;
	ServiceItem.idCounter++;
  	var element = "";
  	//data.values.splice(0, 1)
    for (i = 0; i < symbolYList.length; i++) {

    	repos_name = symbolYList[i][2];
    	var homeUrl = symbolYList[i][3];

		element += '<article class="article__section contener-type-box">' + 
		'<div id="repos_name' + i +'" class="repos_name">'+ 
    	'<p class="name">' + repos_name + '</p>' + 
    	'<div class="keyword" lang="ja">' + lines.explanation_ja + '</div>' + 
    	'<div class="keyword" lang="en">' + lines.explanation_en + '</div>' +

    	(lines.category1 ? '<div class="service_category dna">DNA & RNA</div>' : '') +
			(lines.category2 ? '<div class="service_category structures">Structures & Proteins</div>' : '') +
			(lines.category3 ? '<div class="service_category textmining">Text-mining & Contents</div>' : '') +
			(lines.category4 ? '<div class="service_category dbintegration">DB integration</div>' : '') +
			(lines.type1 ? '<div class="service_type database">Database</div>' : '') +
			(lines.type2 ? '<div class="service_type tool">Tool</div>' : '') +
			(lines.type3 ? '<div class="service_type download">Download</div>' : '') +
			(lines.type4 ? '<div class="service_type submit">Submission</div>' : '') +
    	//'<div class="service_category dna">DNA &amp; RNA</div>' + 
    	//'<div class="service_type tool">Tool</div>' + 

    	'<div class="btn-box">' + 
    	'<div class="page_btn more_btn">' + repos_name + '</div>' + 
    	'<a href="' + homeUrl + '" class="page_btn access_btn">アクセス</a>' + 
    	'</div></div>' + 
    	'<div id="repos_image0" class="repos_image">' + 
    	'<img src="./img/service_assets/' + repos_name + '.png' + '" art="' + repos_name +'" class="object-fit-img img_services"></div>'

    	element += '</article>'

    }
	$("#service_list").append(element);
}


$(function(){
	listManager = new ListManager();
	listManager.getData();

});

/*
 *README
 */
$(document).on('click', '.more_btn', function () {
	repos_name = $(this).html()
	displayRepos (repos_name)
})

//リポジトリ個別ページ
function displayRepos (repos_name) {
	console.log(document.documentElement.lang);
	console.log(document)
	location.hash = 'service'
	$("#service_list").empty();

	function plot(data){

		var md_data = marked(data);
		var markdown_body = $('.service__wrapper')
								.append($('<div/>')
								.attr({'class': 'markdown-body'})
								.html(md_data))
	}
	if (document.documentElement.lang === "en") {
		$.get(
			'./md/' + repos_name + '-README.md'
			//'https://raw.githubusercontent.com/dbcls/' + repos_name + '/master/README.md'
		).done(function (data) {
			plot(data)
		}).fail(function () {
			console.log('データ入手失敗！')
		})
	} else if (document.documentElement.lang === "ja") {
		$.get(
			'./md_ja/' + repos_name + '-READMEja.md'
			//'https://raw.githubusercontent.com/dbcls/' + repos_name + '/master/READMEja.md'
		).done(function (data) {
			plot(data)
		}).fail(function () {
			console.log('データ入手失敗！')
		})
	}
}

/*
 *ハッシュ値が変わった時の画面遷移
 */
window.addEventListener('hashchange', function() {
	if(location.hash === '#services'){
		$('service_list').empty()
		displayReposList()
	}else if(location.hash === '#service'){
		displayRepos(repos_name)
	}
}, false)