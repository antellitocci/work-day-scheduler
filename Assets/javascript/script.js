//get reference to current day section & set current day
$("#currentDay").text(moment().format("dddd, MMMM D, YYYY"));
//set time block range
var startTime = 9; //9 am
var endTime = 17; //5 pm

var toDos = JSON.parse(localStorage.getItem("toDos")) || [];

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
    //give textArea an ID
    textAreaElem.attr("data-time-id", i);
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
}

function loadToDos(){
    $.each(toDos, function(arr, object){
            createToDo(object.id, object.text);
        });
};

function createToDo(timeSlot, text){
    //find the text area to add the task date to
    var taskToAdd = $(".description[data-time-id="+timeSlot+"]"); 
    //add the to do
    $(taskToAdd).val(text);
};

//audit task to assign appropriate color
function auditTime(textAreaEl, time){
    //create variable to compare current time and timeText in appropriate ISO format
    var timeTextFormat = moment(time, "hA").format();
    var currentTime = moment().format();
    //color code the text area based on past / present / future
    if (moment(currentTime).isAfter(timeTextFormat, "hour")){
        $(textAreaEl).addClass("past");
        $(textAreaEl).removeClass("present");
        $(textAreaEl).removeClass("future");
    }
    else if (moment(currentTime).isSame(timeTextFormat, "hour")){
        $(textAreaEl).addClass("present");
        $(textAreaEl).removeClass("past");
        $(textAreaEl).removeClass("future");
    }
    else {
        $(textAreaEl).addClass("future");
        $(textAreaEl).removeClass("past");
        $(textAreaEl).removeClass("presenet");
    }
};    

//save task to local storage when the save button is clicked
$(".saveBtn").click(function(event){

    //find the nearest text area and grab its value and id
    var toDoFind = $(this).siblings(".description");
    var toDoText = $(toDoFind).val().trim();
    var timeSlot = $(toDoFind).attr("data-time-id");
    console.log(toDos);

    //handle edits
    for (i=0; i < toDos.length; i++)
    {
        if(toDos[i].id === timeSlot)
        {
            console.log("hit it");
            toDos[i].text = toDoText;
            //if the user removes all text - remove the to do from the array
            if(toDos[i].text == ""){
                toDos.splice(i, 1);
            }
            saveTasks();
            return;
        }
    }

    //if not editing, create and save the new to do
    if (toDoText !== ""){
        var toDo ={
            id: timeSlot,
            text: toDoText
        };
        //push the toDo to the toDos array and save to local storage
        toDos.push(toDo);
        saveTasks();
    }
    
});

function saveTasks()
{
    localStorage.setItem("toDos", JSON.stringify(toDos));
};

$("#delete-all").click(function(event){
    $(".description").each(function(){
        $(this).val("");
    });
    toDos = [];
    saveTasks();
});

//audit time block time colors every 15 minutes
setInterval(function(){

    $(".description").each(function(index, elem){
        var elemTime = $(this).siblings(".hour").text();
        auditTime(elem, elemTime);
        console.log("ran the time check");
    });
}, (1000*60)*15);

loadToDos();
