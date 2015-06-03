window.$ = require('jquery');
require('./ui/push_button');

var deactivateOtherButtons = function () {
    var btn = this;
    Object.keys(UI.buttons).forEach(function (btnName) {
        if (btn.name !== btnName) {
            UI.buttons[btnName].deactivate();
        }
    });
};

var addListeners = function () {
    UI.buttons.booleanSemaphoreBtn
        .bind('activate', deactivateOtherButtons.bind(UI.buttons.booleanSemaphoreBtn))
        .bind('activate', function() {
            Crafty.trigger('semaphore-change', {type : 'bool'});
        });

    UI.buttons.countingSemaphoreBtn
        .bind('activate', deactivateOtherButtons.bind(UI.buttons.countingSemaphoreBtn))
        .bind('activate', function() {
            Crafty.trigger('semaphore-change', {type : 'count'});
        });

    UI.buttons.arraySemaphoreBtn
        .bind('activate', deactivateOtherButtons.bind(UI.buttons.arraySemaphoreBtn))
        .bind('activate', function() {
            Crafty.trigger('semaphore-change', {type : 'arr'});
        });

    Crafty.bind('semaphore-state', function (message) {
        $('#semaphores_selection .internal-state').text('> ' + message);
    });
};

window.UI = {
    render : function () {
        var buttonsPanel = $('#semaphores_selection .buttons-container'),
            booleanAttrs = {
                name  : 'booleanSemaphoreBtn',
                label : 'Boolean Semaphore'
            },
            countingAttrs = {
                name  : 'countingSemaphoreBtn',
                label : 'Counting Semaphore'
            },
            arrayAttrs = {
                name  : 'arraySemaphoreBtn',
                label : 'Array Semaphore'
            };

        UI.buttons = {};
        UI.buttons.booleanSemaphoreBtn  = new PushButton(booleanAttrs).render(buttonsPanel);
        UI.buttons.countingSemaphoreBtn = new PushButton(countingAttrs).render(buttonsPanel);
        UI.buttons.arraySemaphoreBtn    = new PushButton(arrayAttrs).render(buttonsPanel);

        addListeners();

        UI.buttons.booleanSemaphoreBtn.activate();
    }
};