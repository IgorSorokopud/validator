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
    'callback': 'handler'  /* if validation, run function pass arguments first argument current element second argument type validation */
});

function handler(self, type) {
        self /* <input type="number" data-error="number"> */
        type /* number */
}
````

HTML
=========

<form>
    <input type="number" data-error="number">
    <input type="text" data-error="email">
    <input type="number" data-error="phone">
</form>