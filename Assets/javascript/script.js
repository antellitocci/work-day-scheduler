//get reference to current day section & set current day
$("#currentDay").text(moment().format("dddd, MMMM D, YYYY"));
//set time block range
var startTime = 9; //9 am
var endTime = 17; //5 pm

//create time block elements and add to html
for (var i = startTime; i < endTime + 1; i++)
{
    //create time text
    var timeText = moment().hour(i).format("hA");
    //create time block div row
    var timeRowElem = $("<div>").addClass("row row-cols-3 time-block px-2");
    //create div to hold time and add time text to it
    var timeHourElem = $("<div>").addClass("hour col-2 col-sm-1").text(timeText).attr("style", "padding-top: 30px;");
    //create task text area element
    var textAreaElem = $("<textarea>").addClass("description col-8 col-sm-10");
    
    //pass textArea and time text to audit time to style appropriately
    auditTime(textAreaElem, timeText);
    
    //create save button element and add save icon to it
    var buttonElem = $("<button>").addClass("btn saveBtn col-2 col-sm-1").html("<i class='fas fa-save'></i>");

    //append elements to row in correct order
    timeRowElem.append(timeHourElem);
    timeRowElem.append(textAreaElem);
    timeRowElem.append(buttonElem);
    //append items to page
    $("#timeBlocks").append(timeRowElem);

    //add id to each div in here somewhere
}

//audit task to assign appropriate color
function auditTime(textAreaElem, timeText){
    //create variable to compare current time and timeText in appropriate ISO format
    var timeTextFormat = moment(timeText, "hA").format();
    //color code the text area based on past / present / future
    if (moment().isAfter(timeTextFormat, "hour")){
        textAreaElem.addClass("past");
        textAreaElem.removeClass("present");
        textAreaElem.removeClass("future");
    }
    else if (moment().isSame(timeTextFormat, "hour")){
        textAreaElem.addClass("present");
        textAreaElem.removeClass("past");
        textAreaElem.removeClass("future");
    }
    else {
        textAreaElem.addClass("future");
        textAreaElem.removeClass("past");
        textAreaElem.removeClass("presenet");
    }
};    


function saveTasks()
{
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

//audit time block time colors every 15 minutes
setInterval(function(){
    $(".description").each(function(index, elem){
        auditTime(elem);
    });
}, (1000*60)*15);
//add tasks to page from local storage
//click into time block enter event
//click save button and it is saved to local storage

