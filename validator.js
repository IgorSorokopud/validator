;(function ($) {

    var methods = {

        init: function (options) {
            var selectNumber = $(this).find("[data-error='number']"),
                selectEmail = $(this).find("[data-error='email']"),
                selectPhone = $(this).find("[data-error='phone']");

            if (selectNumber) {
                methods.validNumber(selectNumber);
            }

            if (selectEmail) {
                methods.validEmail(selectEmail);
            }

            if (selectPhone) {
                methods.validPhone(selectPhone);
            }
        },

        validNumber: function (self) {
            $(self).on('blur', function () {
                var regex = /^[0-9]*(?:\.\d{1,2})?$/,
                    textError = methods.settings.numberTextError;

                methods.checkValid(this, regex, textError);
            });
        },

        validEmail: function (self) {
            $(self).on('blur', function () {
                var regex = /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i,
                    textError = methods.settings.emailTextError;

                methods.checkValid(this, regex, textError);
            });
        },

        validPhone: function (self) {
            $(self).on('blur', function () {
                var regex = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/,
                    textError = methods.settings.phoneTextError;

                methods.checkValid(this, regex, textError);
            });
        },

        checkValid: function (self, regex, textError) {
            if (!regex.test(self.value)) {
                methods.error(self, textError);
            } else {
                methods.noError(self);
            }
        },

        error: function (self, textError) {
            $(self).after('<span style="color: red" class="is-error">' + textError + '</span>');
        },

        noError: function (self) {
            $(self).parent().find('.is-error').remove();
        }
    };

    $.fn.validator = function (method) {

        methods.settings = $.extend({
            'numberTextError': 'Invalid',
            'emailTextError': 'Invalid',
            'phoneTextError': 'Invalid'
        }, method);

        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Метод с именем ' + method + ' не существует для jQuery.valid');
        }
    };

    $('.form').validator({'numberTextError': 'error', 'emailTextError': 'test'});

})(jQuery);