var script = document.createElement('script')
script.setAttribute('src', 'https://code.jquery.com/jquery-3.2.1.min.js')
document.head.appendChild(script)

var names = "Allie"; 
function servicesFilter() {
	$.when(
	  $.ajax({
	    url: "https://sheets.googleapis.com/v4/spreadsheets/1JGvXRqvu5A5IhaYfz40yTblNP7bZZL6GaPGaZl7knHM/values/References?key=AIzaSyCKBRLAEd_o7WAeBN5m0NZZ1Eusco7VtHw",
	    dataType: "json",
	    async: true,
	    success: function(data) {

	      var elementArray = data.values;

	      var filterList = {};
	      filterList['Allie'] = [];
	      filterList['BioHackathon'] = [];
	      filterList['Colil'] = [];
	      filterList['CRISPRdirect'] = [];
	      filterList['DBCLS SRA'] = [];
	      filterList['Gendoo'] = [];
	      filterList['GGGenome'] = [];
	      filterList['GGRNA'] = [];
	      filterList['RefEx'] = [];
	      filterList['TogoTable'] = [];
	      filterList['TogoTV'] = [];
	      filterList['TogoWS'] = [];
	      //4 Allie
	      //38 BioHackathon
	      // Colil
	      //120 CRISPRdirect
	      //7 DBCLS SRA
	      //17 Gendoo
	      //11 GGGenome
	      //9 GGRNA
	      //15 RefEx
	      //2 TogoTable
	      //5 TogoTV
	      //13 TogoWS

	      //filter
	      var LIST_GGGenome = elementArray.filter((AList) => {
	        return (AList[0] === "GGGenome");
	      })
	      var LIST_Allie = elementArray.filter((BList) => {
	        return (BList[0] === "Allie");
	      })
	      var LIST_BioHackathon = elementArray.filter((CList) => {
	        return (CList[0] === "BioHackathon");
	      })
	      var LIST_GGRNA = elementArray.filter((DList) => {
	        return (DList[0] === "GGRNA");
	      })
	      var LIST_RefEx = elementArray.filter((EList) => {
	        return (EList[0] === "RefEx");
	      })
	      //filterList.push
	      filterList.GGGenome.push(LIST_GGGenome);
	      filterList.Allie.push(LIST_Allie);
	      filterList.BioHackathon.push(LIST_BioHackathon);
	      filterList.GGRNA.push(LIST_GGRNA);
	      filterList.RefEx.push(LIST_RefEx);
	      console.log(filterList);

	      var element = "";
	      $('#papers_citing_dbcls_services').click(function() {
	        $(".section-wrapper__adelement").empty();

	        names = Object.keys(filterList);

	        element += '<table class="papers_citing_table"><tbody>';
	        for (i = 0; i < names.length; i++) {

	          var nameslength = names[i].length;

	          element +=
	            '<tr><td><div class="filName" data-category="' + names[i] + '">' + names[i] + '</div></td>' +
	            '<td>' + nameslength + '</td><tr>';

	        }
	        element += '</tbody></table>';
	        $(".list").append(element);

	        $(document).on('click', '.filName', function() {
	          names = $(this).html()
	          display(names)

	        })

	        function display(names) {

	          console.log(names)
	          //filterListをnamesのものだけにフィルタリングして新しい配列
	          var results = "";

	          results +=
	            '<div data-category="Allie">' + filterList.Allie + '</div>' +
	            '<div data-category="BioHackathon">' + filterList.BioHackathon + '</div>' +
	            '<div data-category="GGRNA">' + filterList.GGRNA + '</div>' +
	            '<div data-category="GGGenome">' + filterList.GGGenome + '</div>' +
	            '<div data-category="RefEx">' + filterList.RefEx + '</div>';
	          /*
	          (filterList.Allie ? '<div data-type="Allie">' + filterList.Allie + '</div>' : '') +
	          (filterList.BioHackathon ? '<div data-type="BioHackathon">' + filterList.Allie + '</div>' : '') +
	          (filterList.GGRNA ? '<div data-type="GGRNA">' + filterList.Allie + '</div>' : '') +
	          (filterList.GGGenome ? '<div data-type="GGGenome">' + filterList.Allie + '</div>' : '') +
	          (filterList.RefEx ? '<div data-type="RefEx">' + filterList.Allie + '</div>' : '') ;*/
	          $('.list').append(results);
	          //$('.list').show();
	        }
	      })
	    }
	  })//クリックしたら実行、HTMLに生成し、それから下記の処理を行う
  ).done(function() {
	  $(".list").each(function() {
	    //var category = document.getAttribute('data-category')
	    //$(this).data("category");
	    var is_exist = $.inArray('data-category', names);
	    console.log(names)
	    console.log(is_exist)
	    if (is_exist != -1) {
	      $(this).removeClass("hidden");
	    } else {
	      console.log("hello")
	      //$(this).addClass("hidden");
	    }
	  })
	})
}

servicesFilter();