(function(scope) {
    var alphunGlobal = function() {
        this.getLanguage = function() {
            var hash = window.location.hash;
            hash = hash.replace("#", "");
            return hash;
        };
        this.handleLanguageChange = function(e) {
            var language = $(e.target).val();
            window.location.hash = "#" + language;
            window.location.reload();
        };
        this.colors = [
            "#9400D3", "#4B0082", "#0000FF", "#00FF00", "#FFFF00", "#FF7F00", "#FF0000"
        ];
    }
    scope.alphun = new alphunGlobal();
}(window));
