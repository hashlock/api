$.expr[":"].contains = $.expr.createPseudo(function(arg) {
    return function( elem ) {
        return $(elem).text().toUpperCase().indexOf(arg.toUpperCase()) >= 0;
    };
});

$(document).ready(function() {

	// check for cookie to remove signup section on sidebar
	if (document.cookie.indexOf("teUid") >= 0 || document.cookie.indexOf("teDevUid") >= 0) {
		$("#sidebar .signup").hide();
	}

    var pathFirstArg = window.location.pathname.split('/')[1];
    var verRegex = /^v[0-9]+$/;
    matchResult = pathFirstArg.match(verRegex);
    if (matchResult == null) {
        verPath = '';
    } else {
        verPath = '/' + matchResult[0];
    }

    $('#filter').lunrSearch({
        indexUrl: verPath + '/search.json',             // URL of the `search.json` index data for your site
		results:  '#search-results',          // jQuery selector for the search results container
		entries:  '.entries',                 // jQuery selector for the element to contain the results list, must be a child of the results element above.
		template: '#search-results-template'  // jQuery selector for the Mustache.js template
    });

    $("#clear-search").on('click', function () {
    	$("#filter").val("");
    	$("#search-results").hide();
    });

	// Collapsible articles
	$('article').each(function () {
	    var that = $(this);
	    var header = that.children('a');
	    var body = that.children('.body');
	    body.hide();

	    header.click(function() {
	        if (that.hasClass('active')) {
                body.slideUp('fast');
                that.removeClass('active');
                that.find(".state-icon").removeClass("expanded").addClass("collapsed");
	        } else {
                body.slideDown('fast');
                that.addClass('active');
                that.find(".state-icon").removeClass("collapsed").addClass("expanded");
	        }
	    });

	    if (expandOnInit) {
	    	header.trigger('click');
	    }
	});

	// Expanding the article on link click and scrolling down to it
	$('#sidebar a.section-title').each(function () {
	    var that = $(this);
	    var id = that.attr('href').substring(1);

	    var prevent = false;
	    if (that.attr("href").substring(0,1) == "#") {
	    	prevent = true;
	    }

	    that.on('click', function (e) {
	    	if (prevent) {
				e.preventDefault();

		        var header = $('article a[name="'+ id +'"]');
		        scrollSectionToTop(id);
		    }
	    });
	});

	var currHeight = $(window).height();
	$('#sidebar').css('height', currHeight-26);
	$("#content").css('min-height', currHeight-26);

	$(window).resize(function() {
		var currHeight = $(window).height();
		$('#sidebar').css('height', currHeight-26);
		$("#content").css('min-height', currHeight-26);
	});


	// Hide all/Show all links
    var print = $('<a class=\'control\'>Print</a>');
    print.click(function () {
        styleToPrint()
        window.print();
    });

	var show = $('<a class=\'control show\'>Show all</a>');
	show.click(function () {
	  $('#content article:not(".active") > a').trigger('click');
	});

	var hide = $('<a class=\'control hide\'>Hide all</a>');
	hide.click(function () {
	  $('#content article.active > a').trigger('click');
	});

	var ctrlButtons = $("<div class=\'control-container\'></div>");
	ctrlButtons.append(print).append(show).append(hide);
	$('#content').not(".no-controls").prepend(ctrlButtons);

    // Intercept Chrome/IE print event
    window.onbeforeprint = function() {
        styleToPrint();
    };
    // Intercept Firefox print event
    window.matchMedia("print").addListener(function() {
        styleToPrint();
    });

});

function styleToPrint() {
    $('article').each(function () {
        $(this).children('.body').show();
        $(this).addClass('active');
        $(this).find(".state-icon").removeClass("collapsed").addClass("expanded");
    });
}

function scrollSectionToTop(name) {
	var header = $("article a[name='"+ name +"']");
	var stop = header.offset().top - 20;
	var delay = 500;

	if (!header.parent().hasClass('active')) {
		header.trigger("click");
	}

	$("body, html").animate({ scrollTop: stop + "px" }, delay);

	return false;
}

function load() {
	var urlLocation = location.href;
	if (urlLocation.indexOf("#") > -1) {
		var fromIndex = urlLocation.indexOf("#") + 1;
		var name = urlLocation.substring(fromIndex, urlLocation.length);
		scrollSectionToTop(name);
	}
}
