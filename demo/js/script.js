$(function() {

    var hidden = 'hidden';
    var panels = $('.panel');

    var displayPanel = function (panel) {
        panels.addClass(hidden);
        panels.filter(panel).removeClass(hidden);
    };


    // Main
    (function () {

        [ '.table', '.report', '.dashboard', '.gecko' ].forEach(function(elem) {
            $(elem).on('click', function() {
                displayPanel(elem);
            });
        });

        // Gecko panel will be shown first
        panels.addClass(hidden).filter('.gecko').removeClass(hidden);

    })();

});
