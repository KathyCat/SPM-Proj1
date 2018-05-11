$(document).ready(function () {
    // in login.pug
    $("#register").click(function () {
        self.location = '/register';
    });

    // in userProfile.pug
    $("#addContact").click(function () {
        $("#contactList").append("<label>Contact</label>");
        $("#contactList").append("<input class='form-control contact' type='text', name = 'contact'/>");
    });

    $('#submitAccount').click(function () {
        $.post('/users/updateProfile', $('form#accountForm').serialize(), function (data) {
                alert("Update account success");
            },
            'json' // I expect a JSON response
        );
    });

    $('#addDog').click(function () {
        $("#addDogButton").hide();
        $("#addDogForm").show();
    })


    $('#goToAppointOptions').click(function () {
        self.location = '/appoints/options';
    });

    $(document).ajaxError(function (e, xhr, opt) {
        alert("Error requesting " + opt.url + ": " + xhr.status + " " + xhr.statusText);
    });

    $('#chooseTS').click(function () {
        var date = $("#date").val();

        $.get("/admin/timeslot", {date: date}, function (data) {

            var ts = ['9:00 - 10:30', '10:30 - 12:00', '12:00 - 13:30', '13:30 - 15:00',
                '15:00 - 16:30', '16:30 - 18:00'];
            var tsEnable = [true, true, true, true, true, true];
            var content = "";
            for (j = 0; j < data.length; j++) {
                tsEnable[data[j]] = false;
            }
            for (i = 0; i < 6; i++) {
                if (tsEnable[i]) {
                    content += "<label class='radio-inline'><input type='radio' name='timeslot' value = " + i +
                        ">&nbsp;&nbsp;"
                        + ts[i] + "&nbsp;&nbsp;</label>"
                } else {
                    content += "<label class='radio-inline'><input type='radio' name='timeslot' value = " + i +
                        " disabled>&nbsp;&nbsp;"
                        + ts[i] + "&nbsp;&nbsp;</label>"
                }
            }

            $("#timeSlot").html(content);
        });
    })

})