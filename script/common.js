
//Header-common gNav f-services
$(document).on("click",".gnav-services", function() {

   if($('.f-services__contents').length){
  	$(".f-services__contents").remove();
   }else {
	  $.ajax({
	    url: "https://sheets.googleapis.com/v4/spreadsheets/1bSnbUztPDl3nhjQFbScjtTXpQtXOkqZE83NMilziHQs/values/%E3%82%B5%E3%83%BC%E3%83%93%E3%82%B9%E4%B8%80%E8%A6%A7?key=AIzaSyAIstRfTWKWRqNKpkMk-uGYAQJw0myzMh4",
	    dataType: "json",
	    async: true,
	    success: function(data) {
	      var elementArray = data.values;
	      //column1に" "のあるrowをとってくる
	      var symbolList = elementArray.filter((List) => {
	        return (List[0] === "Y");
	      })
	      console.log(symbolList);
	      var element = "";
	      element += '<div class="f-services__contents">';
	      for (var i = 0; i < symbolList.length; i++) {
		      element +=
			      '<a href="' + symbolList[i][4] + '" class="page_btn access_btn">' +
		        '<img src="./img/service_assets/' + symbolList[i][23] + '.png" alt="' + symbolList[i][2] + '" class="object-fit-img img_services">' + 
		        '</a>'
		    }
		    element += '<a href="#" class="gnav-btn">more</a>' + '</div>';
		    $("#f-services").append(element);
	    }
	  });
	}
});

