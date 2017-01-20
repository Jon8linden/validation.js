# validation.js
Simple jquery dependent validation js function.

## Instructions
Make sure you have jquery installed.

Call form_validate.validation();

* You can pass in a string for the container EX: #container will validate everything in container. This is optional and will then default to the entire page.

Response is an array.

* response[0] = true/false for pass fail
* response[1] = message for what specifcially failed.
* This will also add a class to the elements that failed. At the top of this file you can update it but it currently is "failed"
