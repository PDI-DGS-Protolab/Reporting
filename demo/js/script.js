//$(function() {
    var hidden = 'hidden';

    var panels = $('.panel');

    var sheet  = $('.sheet');
    var sheet2 = $('.sheet2');
    var stats  = $('.stats');


    var showStats = function () {
        panels.addClass(hidden);
        panels.filter('.gecko').removeClass(hidden);
    };

    var showDashboard = function () {
        panels.addClass(hidden);
        panels.filter('.dashboard').removeClass(hidden);
    };

    var showTable = function () {
        panels.addClass(hidden);
        panels.filter('.table').removeClass(hidden);
    };


    // Main
    (function () {

        sheet.on('click', showTable);
        sheet2.on('click', showDashboard);
        stats.on('click', showStats);
        panels.addClass(hidden).filter('.gecko').removeClass(hidden);

    })();

//});
