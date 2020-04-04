var ddmmyy = new Date();
var eventName;
var inputPost;
var eventArray = [];
var val;

//Days are printed in a manner where if they were placed in an array it would appear as:
//SUNDAY = 0, MON = 1; ... SAT = 6; ETC
$(document).ready(function () {
    $(document).ready(function () {

// Returns the starting day of the month
        function startOfCal(dayName, cDate) {
            var cDate = cDate - 1; //gets the current date and subtracts one to match the order of the days displayed in the calender
            var startOfMonth = (cDate % 7) - dayName;
            /*gets the modulus of the current date, eg: Tuesday 14 Jan, it's subtracted by 1 to align with the order of
                 the week days. Now, the current date will be 13 and '13%7 = 6'. So 6 - 2, because in the order of week day Tue is 2, the startOfMonth is 4. */

            if (startOfMonth > 0) {
                startOfMonth -= 7; // using the example above '7 - 4 = 3'
            }

            return Math.abs(startOfMonth); //don't want the negative value so instead
        }

        //prints the calendar to the screen
        function printCalender(startDay, monthTotalDays, cDate) {
            var cRow = 1;
            var cDay = startDay;//the day the month starts on
            var $week = makeCalendarRow();
            var $day;// the area where day will go
            var i = 1;

            while (i <= monthTotalDays) {
                $day = $week.find('td').eq(cDay);
                //  var inputPost = '#inputPost' + i;//then the inputPost(the area where it will be printed) is found accordingly
                var inputPost = '#inputPost' + i;
                var text = $(inputPost).contents().text();
                var dayNumber = "" +
                    "<a tabindex=\"0\" id = \"dayNumber";
                dayNumber += i;
                dayNumber += '\" class = \"dayNum\" data-toggle=\"modal\" data-target=\"#dayModalCenter';
                dayNumber+= i;
                dayNumber+= '\"role=\"button\" ';
                dayNumber += '>';
                dayNumber += i;
                dayNumber += '</a>';
                dayNumber += "<div class=\"modal fade\" id=\"dayModalCenter";
                dayNumber += i;
                dayNumber += "\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"dayModalCenterTitle\" aria-hidden=\"true\">\n" +
                    "  <div class=\"modal-dialog modal-dialog-centered\" role=\"document\">\n" +
                    "    <div class=\"modal-content\">\n" +
                    "      <div class=\"modal-header\">\n" +
                    "        <h5 class=\"modal-title\" id=\"dayNumTitle\">Events</h5>\n" +
                    "        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n" +
                    "          <span aria-hidden=\"true\">&times;</span>\n" +
                    "        </button>\n" +
                    "      </div>\n" +

                    "      <div class ='modal-body' id = 'postArea";
                dayNumber += i;
                dayNumber += "'></div>\n" +
                    "      <div class=\"modal-footer\">\n" +
                    "        <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Close</button>\n" +
                    "        <button type=\"button\" class=\"btn btn-primary\" data-dismiss=\"modal\">Save changes</button>\n" +
                    "  <button class=\"btn btn-danger\" id = 'removeButton' > Remove Event</button>"+
                    "      </div>\n" +
                    "    </div>\n" +
                    "  </div>\n" +
                    "</div>";
                $day.append(dayNumber);


                var todo = "<div id = 'inputPost";//creates the area where the input box goes
                todo += i;
                todo += "' class = 'todoArea' > <\div>";
                $day.append(todo);//adds the post area to the calendar


                //i don't know if this will be needed because it was supposed to highlight today's date
                if (i === cDate) {
                    $day.addClass('today');
                }

                cDay = (cDay + 1) % 7; //resets the day back to sunday

                // Generate new row when day is Saturday, but only if there are
                // additional days to render
                if (cDay === 0 && (i + 1 <= monthTotalDays)) {
                    $week = makeCalendarRow();
                    cRow++;
                }
                i++

            }

        }


// Clear generated calendar
        function clearCalendar() {
            var $trs = $('tr').not(':eq(0)');
            $trs.remove();
            $('#monthAndYear').empty();
        }


// Generates table row used when rendering Calendar
        function makeCalendarRow() {
            var $table = $('table');
            var $tr = $('<tr/>');
            var lengthOfWeek = 7;
            var i = 0;
            while (i < lengthOfWeek) {

                $tr.append($('<td/>'));
                i++

            }
            $table.append($tr);
            return $tr;
        }

        var monthName = 'January February March April May June July August September October November December'.split(' ');
        var monthNumOfDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

        function theCalendar() {//sets up the calendar with the arrays for the dates
            var month = ddmmyy.getUTCMonth();
            var day = ddmmyy.getUTCDay();
            var year = ddmmyy.getUTCFullYear();
            var date = ddmmyy.getUTCDate();
            var monthDays = monthNumOfDays[month];

            var monthAndYearTitle = '<h3> ';
            monthAndYearTitle += monthName[month];
            monthAndYearTitle += ' / ';
            monthAndYearTitle += year;

            monthAndYearTitle += '<\h3>';
            $('#monthAndYear').append(monthAndYearTitle);

            //Getting February Days Including The Leap Year
            if (month === 1) { //feburary's month is 1
                if ((year % 100 !== 0) && (year % 4 === 0) || (year % 400 === 0)) {
                    monthDays = 29;
                }
            }

            // Get Start Day and calls the print calendar using the information from this function
            printCalender(startOfCal(day, date), monthDays);


        }

        function getEvent() {

            $.ajax({
                url: 'http://danu7.it.nuigalway.ie:8642/getEvent',
                type: 'GET',
                success: function (data) {
                    var newData ="";
                    var monthCheck = ddmmyy.getUTCMonth();
                    console.log(monthCheck);
                    for(var i = 0; i<data.length; i++){
                        if(data[i].month_id == monthCheck ) {

                            for (var k = 0; k < 31; k++) {
                                var check = (k + 1) + "day";//loops through the day ids
                                newData += "<ul class=\"list-group list-group-flush\">";
                                newData+= "<li class=\"list-group-item\">";
                                newData += data[i].Event_name;
                                newData += "</li> </ul>";

                                if (data[i].day_id == check) {//if they share the same id (and they should)
                                    var post = '#inputPost' + (k+1);//then the inputPost(the area where it will be printed) is found accordingly

                                    var popUpBox = '#postArea'+(k+1);

                                    $(post).append(newData);//the event is added to the area
                                    $(post).append("\n");
                                    $(popUpBox).append(newData);//the event is added to the area
                                    $(popUpBox).append("\n");

                                }
                            }
                        }
                    }


                }
            })
        }
        //changes the calendar months
        function navigationHandler(dir) {
            ddmmyy.setUTCMonth(ddmmyy.getUTCMonth() + dir);
            clearCalendar();
            theCalendar();
            getEvent();

        }


        $(document).ready(function () {
            // Bind Events
            $('#previous').click(function () {

                navigationHandler(-1);
            });
            $('#next').click(function () {

                navigationHandler(1);
            });
            // Generate Calendar

            theCalendar();

            //this is the selector will all the year options it will be used to check whether or not feb is a leap year
            var years = "";
            for (var y = 0; y < 20; y++) {
                years += '<option id = \"';
                years += ddmmyy.getUTCFullYear() + y;
                years += '\"';

                years += ' value=\"';
                years += ddmmyy.getUTCFullYear() + y;
                years += "\">";

                years += ddmmyy.getUTCFullYear() + y;
                years += "</option>\n";


            }

            //this needs to be integrated to the function which adds event to the calendar so that
            //you can pick the month and save the events and print them when the month is called by for that to work the
            //year list, month list and daylist all have to be able to influence each other -- i don't know how to do that yet
            //then when the add event button is pressed the details will be saved and then when the months are changed the database is
            //checked for any event information
            var months = "";
            for (var l = 0; l < monthName.length; l++) {
                months += '<option id = \"';
                months += l;
                months += '\"';

                months += ' value=\"';
                months += l;
                months += "\">";

                months += monthName[l];
                months += "</option>\n";
            }



            var addThing = "<div id = \"eventDetails\" data-role=\"popup\" data-theme=\"a\" class=\"ui-corner-all\">\n" +

                " </div>";
            addThing += "<button type=\"button\" id = \"buttonPopEvent\" class=\"btn btn-dark\" data-toggle=\"modal\" data-target=\"#exampleModalCenter\">\n" +
                " Create new event!\n" +
                "</button>\n" +
                "\n" +
                "<!-- Modal -->\n" +
                "<div class=\"modal fade\" id=\"exampleModalCenter\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"exampleModalCenterTitle\" aria-hidden=\"true\">\n" +
                "  <div class=\"modal-dialog modal-dialog-centered\" role=\"document\">\n" +
                "    <div class=\"modal-content\">\n" +
                "      <div class=\"modal-header\">\n" +
                "        <h5 class=\"modal-title\" id=\"CreateEventTitle\">Create an Event</h5>\n" +
                "        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n" +
                "          <span aria-hidden=\"true\">&times;</span>\n" +
                "        </button>\n" +
                "      </div>\n" +
                "      <div class=\"modal-body\">\n" +
                "<form>\n" +
                "<div style=\"padding:10px 20px;\">\n" +
                " \n" +
                "<label for=\"un\" class=\"ui-hidden-accessible\">Event Name:</label>\n" +
                "<input type=\"text\" name=\"eventName\" id=\"eventName\" placeholder=\"Event Name\">\n" +
                "\n" +
                "<select id = \"yearsList\"> ";
            addThing += years;
            addThing += "</select>" +
                "<select id = \"months\">";
            addThing += months;
            addThing += "</select>" +
                "<select id = \"daysList\">\n";

            addThing += "</select>" +

                "   </div>\n" +
                " </form>\n" +
                "      </div>\n" +
                "      <div class=\"modal-footer\">\n" +
                "        <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Close</button>\n" +
                "        <button id=\"newEvent\" type=\"button\" class=\"btn btn-primary\"data-dismiss=\"modal\">Save changes</button>\n" +
                "      </div>\n" +
                "    </div>\n" +
                "  </div>\n" +
                "</div>";

            addThing += "\n";


            var count = 0;

            $('#eventButton').append(addThing);

            var removeThing = "";
            removeThing += "<button type=\"button\" id = \"buttonPopEvent\" class=\"btn btn-danger\" data-toggle=\"modal\" data-target=\"#exampleModalCenter1\">\n" +
                " Remove the event!\n" +
                "</button>\n" +
                "\n" +
                "<!-- Modal -->\n" +
                "<div class=\"modal fade\" id=\"exampleModalCenter1\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"exampleModalCenterTitle\" aria-hidden=\"true\">\n" +
                "  <div class=\"modal-dialog modal-dialog-centered\" role=\"document\">\n" +
                "    <div class=\"modal-content\">\n" +
                "      <div class=\"modal-header\">\n" +
                "        <h5 class=\"modal-title\" id=\"CreateEventTitle1\">Delete an Event</h5>\n" +
                "        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n" +
               // "          <span aria-hidden=\"true\">&times;</span>\n" +
                "        </button>\n" +
                "      </div>\n" +
                "      <div class=\"modal-body\" data-backdrop=\"static\"> \n" +
                "<form>\n" +
                "<div style=\"padding:10px 20px;\">\n" +
                " \n" +
                "<select id = \"yearsList\"> ";
            removeThing += years;
            removeThing += "</select>" +
                "<select id = \"monthsRemove\">";
            removeThing += months;
            removeThing += "</select>" +
                "<select id = \"daysListRemove\">\n";

            removeThing += "</select>" +
                "   </div>\n" +
                " </form>\n" +
                "      </div>\n" +
                "      <div class=\"modal-footer\">\n" +
                "        <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Close</button>\n" +
                "        <button id=\"remEvent\" type=\"button\" class=\"btn btn-primary\">Search Events</button>\n" +
                "        <button id=\"getRidOfEvent\" type=\"button\" class=\"btn btn-danger\"data-dismiss=\"modal\">Remove Event</button>\n" +
                "      </div>\n" +
                "    </div>\n" +
                "  </div>\n" +
                "</div>";

            removeThing += "\n";
            $('#removeTheEvent').append(removeThing);



            $(document).ready(function () {

                if ((ddmmyy.getUTCFullYear() % 100 !== 0) && (ddmmyy.getUTCFullYear() % 4 === 0) || (ddmmyy.getUTCFullYear() % 400 === 0)) {
                    var leapYear = true;
                } else {
                    var leapYear = false;
                }
                changeDays();

                $('#yearsList').change(function () {
                    var yVal = $('#yearsList').val();
                    if ((yVal % 100 !== 0) && (yVal % 4 === 0) || (yVal % 400 === 0)) {
                        leapYear = true;
                        console.log("leap year");
                        changeDays();

                    } else {
                        leapYear = false;
                        changeDays();
                        console.log("not leap year");
                    }
                });

                $("#months").change(function () {

                    changeDays();
                });
                $("#monthsRemove").change(function () {

                    changeDays();
                });

                function changeDays() {

                    var val = $('#months').val();
                    var valR = $('#monthsRemove').val();
                    var monthDays = monthNumOfDays[val];
                    var monthDaysR = monthNumOfDays[valR];

                    for (var a = 0; a < monthName.length; a++) {
                        if (val == a) {
                            if (leapYear == true && val == 1) {
                                monthDays = 29;
                            }
                            var days = "";
                            for (var k = 0; k < monthDays; k++) {
                                days += '<option id = \"';
                                days += k + 1;
                                days += 'day\"';
                                days += ' value=\"';
                                days += k + 1;
                                days += "\">";
                                days += k + 1;
                                /** If the day button gets clicked the id of the selected is gotten
                                 * then print the eventName  = getDocumentbyID from the input box and $(selectedday).append(event name);**/
                                days += "</option>\n";

                            }

                            $("#daysList").html(days);//adds the day options to the html

                        }

                    }

                    for (var a = 0; a < monthName.length; a++) {
                        if (valR == a) {
                            if (leapYear == true && valR == 1) {
                                monthDaysR = 29;
                            }
                            var daysR = "";
                            for (var k = 0; k < monthDaysR; k++) {
                                daysR += '<option id = \"';
                                daysR += k + 1;
                                daysR += 'day\"';
                                daysR += ' value=\"';
                                daysR += k + 1;
                                daysR += "\">";
                                daysR += k + 1;
                                /** If the day button gets clicked the id of the selected is gotten
                                 * then print the eventName  = getDocumentbyID from the input box and $(selectedday).append(event name);**/
                                daysR += "</option>\n";

                            }


                            $("#daysListRemove").html(daysR);
                        }

                    }

                    $("#daysListRemove").change(function () {//if the day options change then the area to print the message has to change as well

                        //if you want to add a new event to the day

                        var eventCell = "";
                        eventCell += eventCell + " " + eventName;

                        //  eventArray[1] = eventCell;


                        // console.log(eventName);
                        //clearBox();//the input box is cleared





                        function clearBox() {//Function only clears the input box
                            $('#removeName').val('');
                        }




                    });

// Manipulate the DOM to place the data in the feedposts div
                    $("#daysList").change(function () {//if the day options change then the area to print the message has to change as well

                        //if you want to add a new event to the day

                        var eventCell = "";
                        eventCell += eventCell + " " + eventName;

                        //  eventArray[1] = eventCell;


                        // console.log(eventName);
                        //clearBox();//the input box is cleared





                        function clearBox() {//Function only clears the input box
                            $('#eventName').val('');
                        }




                    });
                }
                window.onload = getEvent();

                $("#newEvent").click(function addEvent() {
                    var mon = $('#months').children(":selected").attr("value");
                    var day_id = $('#daysList').children(":selected").attr("id");
                    var eventName = $('#eventName').val();
                        $.ajax({
                            url: 'http://danu7.it.nuigalway.ie:8642/addEvent',
                            type: 'POST',
                            data: {"Event_name": eventName, "day_id":day_id, "month_id":mon},
                            success: function (data) {
                                window.onload = getEvent();
                            }
                        })
                    })

                function getEvent() {

                    $.ajax({
                        url: 'http://danu7.it.nuigalway.ie:8642/getEvent',
                        type: 'GET',
                        success: function (data) {
                            var newData ="";
                            var monthCheck = ddmmyy.getUTCMonth();

                            for(var i = 0; i<data.length; i++){
                                if(data[i].month_id == monthCheck ) {

                                    for (var k = 0; k < 31; k++) {
                                        var check = (k + 1) + "day";//loops through the day ids
                                        newData = data[i].Event_name;
                                        var popUpBox = '#postArea'+(k+1);
                                        if (data[i].day_id == check) {//if they share the same id (and they should)
                                            var post = '#inputPost' + (k+1);//then the inputPost(the area where it will be printed) is found accordingly





                                            $(post).append(newData);//the event is added to the area
                                            $(post).append("\n");
                                            $(popUpBox).append(newData);//the event is added to the area
                                            $(popUpBox).append("\n");

                                        }
                                    }
                                }
                            }


                        }
                    })
                }


                $("#remEvent").click(function (event) {
                    var dropdown = "";
                    var val = $('#monthsRemove').children(":selected").attr("value");
                    var dayID = $('#daysListRemove').children(":selected").attr("id");
                    var eventName = $('#eventName').val();
                    console.log(eventName+" "+val+" "+dayID);
                    $.ajax({
                        url: 'http://danu7.it.nuigalway.ie:8642/findDelEvent',
                        type: 'GET',
                        success: function (data) {
                            //  console.log(eventName);
                            console.log(dayID);
                            console.log(val);
                            dropdown+= "<select id = \"RemoveDD\" > <div class=\"dropdown\">\n" +
                                "  <button class=\"btn btn-secondary dropdown-toggle\" type=\"button\" id=\"dropdownMenuButton\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">\n" +
                                "    Dropdown button\n" +
                                "  </button>\n" +
                                "  <div class=\"dropdown-menu\" aria-labelledby=\"dropdownMenuButton\">\n";
                            for(var i=0;i<data.length; i++) {
                                if (dayID == data[i].day_id && val == data[i].month_id){

                                    dropdown+=   "<option class=\"dropdown-item\" value = \"";
                                    dropdown+=  data[i]._id;
                                    dropdown+="\" id = \"";
                                    dropdown += data[i]._id;
                                    dropdown +="\" >";
                                    dropdown+= data[i].Event_name;
                                    dropdown+= "</option>\n";

                                }
                            }

                            dropdown+=   "  </div>\n" +
                                "</div></select>";
                            $(".modal-body").append(dropdown);
                        }
                    });
                });


                $("#getRidOfEvent").click(function (event) {

                        var removingId = $('#RemoveDD').children(":selected").attr("id");
                    $.ajax({
                        url: 'http://danu7.it.nuigalway.ie:8642/removeEvent',
                        type: 'DELETE',
                        data: {_id: removingId},
                        success: function (data) {
                            console.log(removingId);
                            window.onload = getEvent();
                        }
                    });


                })
            })

        })


    })
});
