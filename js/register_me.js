$(function() {

    $('.registration-form').find("input,textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function($form, event, errors) {
            // additional error messages or events
        },
        submitSuccess: function($form, event) {
            event.preventDefault(); // prevent default submit behaviour
            // get values from FORM
            var name = $("input#reg-name").val();
            var email = $("input#reg-email").val();
            var url = $("input#reg-url").val();
            var firstName = name; // For Success/Failure Message
            // Check for white space in name for Success/Fail message
            if (firstName.indexOf(' ') >= 0) {
                firstName = name.split(' ').slice(0, -1).join(' ');
            }
            $.ajax({
                url: "https://docs.google.com/forms/d/1URNV6647mn4yDhsgAm3Yvg3mG4FE8Oxgrt2emS_prZA/formResponse",
                method: "POST",
                data: {
                    "entry.1239589934": name,
                    "entry.1275507538": email,
                    "entry.926689343": url
                },
                dataType: "xml",
                //success: function() {
                statusCode: {
                    0: function() {
                        // Success message
                        $('#register-success').html("<div class='alert alert-success'>");
                        $('#register-success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                            .append("</button>");
                        $('#register-success > .alert-success')
                            .append("<strong>Your registration has been received. Thank you!</strong>");
                        $('#register-success > .alert-success')
                            .append('</div>');

                        //clear all fields
                        $('#registerForm').trigger("reset");
                    },
                    200: function() {
                        // Success message
                        $('#register-success').html("<div class='alert alert-success'>");
                        $('#register-success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                            .append("</button>");
                        $('#register-success > .alert-success')
                            .append("<strong>Your registration has been received. Thank you!</strong>");
                        $('#register-success > .alert-success')
                            .append('</div>');

                        //clear all fields
                        $('#registerForm').trigger("reset");
                    }
                },
                error: function() {
                    // Fail message
                    $('#register-success').html("<div class='alert alert-danger'>");
                    $('#register-success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#register-success > .alert-danger').append("<strong>Sorry, " + firstName + ". It seems that something's not working properly. Please try again later.");
                    $('#register-success > .alert-danger').append('</div>');
                    //clear all fields
                    $('#registerForm').trigger("reset");
                },
            })
        },
        filter: function() {
            return $(this).is(":visible");
        },
    });

    $("a[data-toggle=\"tab\"]").click(function(e) {
        e.preventDefault();
        $(this).tab("show");
    });
});


/*When clicking on Full hide fail/success boxes */
$('#reg-name').focus(function() {
    $('#register-success').html('');
});
