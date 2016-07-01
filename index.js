module.exports = function() {

    var methods = {

        init: function() {
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

        validNumber: function(self) {
            $(self).on('blur', function () {
                var regex =  /^[0-9]?\d+$/,
                    textError = methods.settings.numberTextError;

                methods.checkValid(this, regex, textError);
            });
        },

        validEmail: function(self) {
            $(self).on('blur', function () {
                var regex = /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i,
                    textError = methods.settings.emailTextError;

                methods.checkValid(this, regex, textError);
            });
        },

        validPhone: function(self) {
            $(self).on('blur', function () {
                var regex = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/,
                    textError = methods.settings.phoneTextError;

                methods.checkValid(this, regex, textError);
            });
        },

        checkValid: function(self, regex, textError) {
            var buttonSubmit = $(self).parents('form:first').find(methods.settings.buttonSubmit);

            if (!regex.test(self.value)) {
                methods.error(self, textError);
                buttonSubmit.prop('disabled', true).addClass('is-disabled');
            } else {
                methods.noError(self);
                buttonSubmit.prop('disabled', false).removeClass('is-disabled');
            }
        },

        error: function(self, textError) {
            $(self).after('<span style="color: red" class="is-error">' + textError + '</span>');
        },

        noError: function(self) {
            $(self).parent().find('.is-error').remove();
        }
    };

    $.fn.validator = function(method) {

        methods.settings = $.extend({
            'numberTextError': 'Invalid',
            'emailTextError': 'Invalid',
            'phoneTextError': 'Invalid',
            'buttonSubmit': ':submit'
        }, method);

        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('validator has no such method: ' + method);
        }
    };
};