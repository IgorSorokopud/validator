# validator for form

Use
===
````
$('element').validator(); /* default */

$('element').validator({
    'numberTextError': 'Invalid',
    'emailTextError': 'Invalid',  /* text error */
    'phoneTextError': 'Invalid',
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