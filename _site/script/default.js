$(function() {

	$.get('https://raw.githubusercontent.com/reika0717/project-page1/master/README.md', function (data) {
		$('body').html(data)
	})
})