(function ($) {

    var methods = {

        init: function () {

            var checkElement = $(this).find("[data-error]");
            checkElement.each(function (i, domEle) {
                var handlerName = $(domEle).data('error');
                methods[handlerName]($(domEle));
            });
        },

        number: function (self) {
            $(self).on('keyup', function () {
                var regex = /^[1-9][0-9]*/,
                    textError = methods.settings.numberTextError;

                methods.checkValid(this, regex, textError);
            });
        },

        email: function (self) {
            $(self).on('change', function () {
                var regex = /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i,
                    textError = methods.settings.emailTextError;

                methods.checkValid(this, regex, textError);
            });
        },

        phone: function (self) {
            $(self).on('change', function () {
                var regex = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/,
                    textError = methods.settings.phoneTextError;

                methods.checkValid(this, regex, textError);
            });
        },

        checkValid: function (self, regex, textError) {
            var buttonSubmit = $(self).parents('form:first').find(methods.settings.buttonSubmit);

            if (!regex.test(self.value) && !$(self).hasClass('in-error')) {
                methods.error(self, textError);
                buttonSubmit.prop('disabled', true).addClass('is-disabled');

            } else if (regex.test(self.value) && $(self).hasClass('in-error')) {
                methods.noError(self);
                buttonSubmit.prop('disabled', false).removeClass('is-disabled');
            }

            if (regex.test(self.value) && typeof methods.settings.callback == 'function') {
                methods.settings.callback(self);
            }
        },

        error: function (self, textError) {
            $(self).addClass('in-error').after('<span style="color: red" class="is-error">' + textError + '</span>');
        },

        noError: function (self) {
            $(self).removeClass('in-error').parent().find('.is-error').remove();
        }
    };

    $.fn.validator = function (method) {

        methods.settings = $.extend({
            'numberTextError': 'Invalid',
            'emailTextError': 'Invalid',
            'phoneTextError': 'Invalid',
            'buttonSubmit': ':submit',
            'callback': ''
        }, method);

        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('validator has no such method: ' + method);
        }

        return this;
    };

})(jQuery);