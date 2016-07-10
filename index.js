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
                var regex = methods.settings.numberRegexp,
                    textError = methods.settings.numberTextError;

                methods.checkValid(this, regex, textError);
            });
        },

        email: function (self) {
            $(self).on('change', function () {
                var regex = methods.settings.emailRegexp,
                    textError = methods.settings.emailTextError;

                methods.checkValid(this, regex, textError);
            });
        },

        phone: function (self) {
            $(self).on('change', function () {
                var regex = methods.settings.phoneRegexp,
                    textError = methods.settings.phoneTextError;

                methods.checkValid(this, regex, textError);
            });
        },

        name: function (self) {
            $(self).on('change', function () {
                var regex = methods.settings.nameRegexp,
                    textError = methods.settings.nameTextError;

                methods.checkValid(this, regex, textError);
            });
        },

        password: function (self) {
            $(self).on('change', function () {
                var regex = methods.settings.passwordRegexp,
                    textError = methods.settings.passwordTextError;

                methods.checkValid(this, regex, textError);
            });
        },

        date: function (self) {
            $(self).on('change', function () {
                var regex = methods.settings.dateRegexp,
                    textError = methods.settings.dateTextError;

                methods.checkValid(this, regex, textError);
            });
        },

        creditCar: function (self) {
            $(self).on('change', function () {
                var regex = methods.settings.creditCarRegexp,
                    textError = methods.settings.creditCarTextError;

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
            $(self).removeClass('in-error').next('.is-error').remove();
        }
    };

    $.fn.validator = function (method) {

        methods.settings = $.extend({
            'numberRegexp': /^[1-9][0-9]*/,
            'emailRegexp': /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i,
            'phoneRegexp': /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/,
            'nameRegexp': /^[a-z0-9_-]{3,16}$/,
            'passwordRegexp': /^[a-z0-9_-]{6,18}$/,
            'dateRegexp': /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/,
            'creditCarRegexp': /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35d{3})d{11})$/,

            'numberTextError': 'invalid number',
            'emailTextError': 'invalid email',
            'phoneTextError': 'invalid phone',
            'nameTextError': 'invalid name',
            'passwordTextError': 'invalid password',
            'dateTextError': 'invalid date',
            'creditCarTextError': 'Invalid credit cart',

            'buttonSubmit': ':submit'
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