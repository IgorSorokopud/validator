# validator for form

Use
===
````
$('element').validator(); /* default */

$('element').validator({
    'numberRegexp': /^[1-9][0-9]*/  /* add regexp */
    'emailRegexp':
    'phoneRegexp':
    'numberTextError': 'invalid',
    'emailTextError': 'invalid',  /* add text error */
    'phoneTextError': 'invalid',
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
</form>

````