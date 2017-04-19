(function() {
    var height = window.innerHeight;
    if ($('#mainContainer').offset().top) {
        height = height - $('#mainContainer').offset().top - 10;
    } else {
        height = height - 100;
    }
    $('#mainContainer').height(height);
    var language = alphun.getLanguage();
    if (language === '') {
        language = 'en_u';
    }
    $('#language').val(language);
    var alphabetsUrl = "data/alphabets/" + language + ".json";
    $.getJSON(alphabetsUrl, function(data) {
            alphun.alphabets = data.alphabets;
            alphun.activeIndex = -1;
            handleRight();
        })
        .error(function() { $("#msg").html("error, not available for this language yet.."); });

    $('#language').on("change", function(e) {
        alphun.handleLanguageChange(e);
    });
    $(window).on('keydown', function(e) {
        if (e.keyCode === 37) {
            handleLeft();
        } else if (e.keyCode === 39) {
            handleRight();
        }
    });
    $("#mainContainer").on('click', function(e) {
        if (e.pageX < window.innerWidth / 2) {
            handleLeft();
        } else {
            handleRight();
        }
        return false;
    });
    var handleRight = function() {
        if (alphun.alphabets && alphun.alphabets.length === (alphun.activeIndex + 1)) {
            return;
        }
        alphun.activeIndex = alphun.activeIndex + 1;
        $('#alphabet').html(alphun.alphabets[alphun.activeIndex]);
        updateColor();
    }

    var handleLeft = function() {
        if (alphun.alphabets && alphun.activeIndex === 0) {
            return;
        }
        alphun.activeIndex = alphun.activeIndex - 1;
        $('#alphabet').html(alphun.alphabets[alphun.activeIndex]);
        updateColor();
    }

    var updateColor = function() {
        $("#mainContainer").css('color', alphun.colors[
            alphun.activeIndex % alphun.colors.length]);
    }
}());
