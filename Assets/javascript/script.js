//get reference to current day section & set current day
$("#currentDay").text(moment().format("dddd, MMMM D, YYYY"));
//set time block range
var startTime = 9;
var endTime = 17;

//create time block elements
for (var i = startTime; i < endTime + 1; i++)
{
    //create time
    var timeText = moment().hour(i).format("hA");
    //create time block div row
    var timeRowElem = $("<div>").addClass("row row-cols-3 time-block px-2");
    //create div to hold time and add time text to it
    var timeHourElem = $("<div>").addClass("hour col-2 col-sm-1").text(timeText).attr("style", "padding-top: 30px;");
    //create task text area element
    var textAreaElem = $("<textarea>").addClass("description col-8 col-sm-10");
    //create save button element and add save icon to it
    var buttonElem = $("<button>").addClass("btn saveBtn col-2 col-sm-1").html("<i class='fas fa-save'></i>");

    //append elements to row in correct order
    timeRowElem.append(timeHourElem);
    timeRowElem.append(textAreaElem);
    timeRowElem.append(buttonElem);
    //append items to page
    $("#timeBlocks").append(timeRowElem);
}