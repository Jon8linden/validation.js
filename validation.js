var form_validate = { 

    validation : function (container)
    {

        // If we do not have a set container then lets check the whole page.
        if (typeof(container) == "undefined" || 
            container == null) {
            var container = 'body';
        }

        /* 
         * var response = ["type", true or false];
         */
        var response = [],
            failed = false, // assume they did it right
            failed_class = "failed"; // D.R.Y.

        /* elements we'll reuse throughout */
        var $el,
            val;


        /* let's check all inputs */
        $(container + ' [required]').each(function(index) {
            $el = $(this);
            val = $el.val();
            if ($el.is('[disabled=disabled]')) {
                return 'continue';
            }
            if ($el.is("textarea")) {
                val = val.replace(/&nbsp;/gm, " ").trim();
                $el.val(val);
            }
            if ($el.is("input") && !$el.is("[type='radio'],[type='checkbox']")) {
                $el.val(val);
            }

            if (val == "") {
                if ($el.attr("dates") !== undefined) {
                    $el.closest(".multi-date").addClass(failed_class);
                } else {
                   $el.addClass(failed_class);
                }
                response = ['Please fill in required fields.', false];
                failed = true;

            } else {
                if ($el.attr("dates") !== undefined) {
                    $el.closest(".multi-date").removeClass(failed_class);
                } else {
                   $el.removeClass(failed_class);
                }
            }
        });
        if (failed) {
            return response;   
        }


        /* let's check our emails for valid values */
        $(container + ' .email, '+ container + ' input[type="email"]').each(function(index){
            $el = $(this);
            val = $el.val().trim();
            $el.val(val);

            // email might not be required
            if (val != "") {
                var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;

                if (!regex.test(val)) {
                    $el.addClass(failed_class);
                    response = ['Please put in a valid email.', false];
                    failed = true;

                } else {
                    $el.removeClass(failed_class);
                }
            }
            else
            {
                $el.removeClass(failed_class);
            }
        });
        if (failed) {
            return response;   
        }


        /* let's check for valid phone numbers ... */
        $(container + ' .phone').each(function(index){
            $el = $(this);
            val = $el.val().trim();
            $el.val(val);

            // number might not be required
            if (val != "") {
                var filter = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
                if (!filter.test(val)) {
                    $el.addClass(failed_class);
                    response = ['Please put in a valid phone number. Numbers only are allowed.', false];
                    failed = true;
                } else {
                    $el.removeClass(failed_class);
                }
            } else {
                $el.removeClass(failed_class);
            }

        });
        if (failed) {
            return response;   
        }

        $(container + ' .number').each(function(index){
            $el = $(this);
            val = $el.val().trim();
            $el.val(val);
            if (val != "") {
                if (isNaN(val)) {
                    $el.addClass(failed_class);
                    response = ['Only numbers are allowed', false];
                    failed = true;
                } else {
                    $el.removeClass(failed_class);
                }
            }
        });

        if (failed) {
            return response;   
        }

        $(container + ' .dollar').each(function(index){
            $el = $(this);
            val = $el.val().trim();
            $el.val(val);

            if (val != "") {
                var filter  = /^\d+(?:\.\d{0,2})$/;
                if (!filter.test(val)) {
                    $el.addClass(failed_class);
                    response = ['Please put in a valid dollar amount. Example: 10.00', false];
                    failed = true;
                } else {
                    $el.removeClass(failed_class);
                }
            }
        });

        if (failed) {
            return response;   
        }

        $(container + ' .zip').each(function(index){
            $el = $(this);
            val = $el.val().trim();
            $el.val(val);

            // number might not be required
            if (val != "") {
                var filter = /^\d{5}(?:-\d{4})?$/;
                if (!filter.test(val)) {
                    $el.addClass(failed_class);
                    response = ['Zip is invalid', false];
                    failed = true;
                } else {
                    $el.removeClass(failed_class);
                }
            } else {
                $el.removeClass(failed_class);
            }

        });
        if (failed) {
            return response;   
        }


        // all we're doing here is cleaning the content of the textarea
        $(container + ' textarea:not("[required]")').each(function() {
            $el = $(this);
            val = $el.val().replace(/&nbsp;/gm, " ").trim();
            $el.val(val);
        });


        // passed all validation
        response = ['Success', true];
        return response;
    }, 

}
