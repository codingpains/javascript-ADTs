require('neon');
require('neon/stdlib');
require('neon/stdlib/widget');

Class('PushButton').inherits(Widget)({
    HTML : '<button type="button" class="btn btn-primary btn-lg btn-block"></button>',

    prototype : {
        init : function (config) {
            var btn = this;

            Widget.prototype.init.call(this, config);

            this.element.text(this.label);

            this.element.bind('click', function () {
                 btn.activate();
            });

            return this;
        }
    }
});