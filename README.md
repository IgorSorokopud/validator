# validator for form

Use
===
````
$('element').validator(); /* default */

$('element').validator({
    'numberRegexp': /^[1-9][0-9]*/  /* add regexp */
    'emailRegexp':
    'phoneRegexp':
    'nameRegexp':
    'passwordRegexp':
    'dateRegexp':
    'creditCarRegexp':

    'numberTextError': 'invalid number',
    'emailTextError': 'invalid email',
    'phoneTextError': 'invalid phone',
    'nameTextError': 'invalid name',          /* add text error */
    'passwordTextError': 'invalid password',
    'dateTextError': 'invalid date',
    'creditCarTextError': 'Invalid credit cart',

    'buttonSubmit': '.classButton', /* class button which disabled if error */
    'callback': 'handler'  /* if validation true, run function and return 'this', 'type' */
});

function handler(self, type) {
  self /* <input type="number" data-error="number"> */
  type /* "number" */
}
````

HTML
=========
````

<form>
    <input type="number" data-error="number">
    <input type="text" data-error="email">
    <input type="number" data-error="phone">
    <input type="text" data-error="name">
    <input type="number" data-error="password">
    <input type="number" data-error="date">
    <input type="number" data-error="creditCar">
</form>

````