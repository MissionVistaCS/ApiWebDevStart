var request = new Request();
//Full List of Events
var DaList = [];
//Filtered List of Events
var DaPrintList = [];

//When the document is fully loaded it calls this.
$( document ).ready(function() {
	getEventInfo();
});

//This gets the id LoadEvents and adds a click event onto it
$("#LoadEvents").click(function() {
	console.log("click");
	//resents DaPrintList
	DaPrintList.length = 0;
	//Copies data in DaList into DaPrintList
	DaPrintList = DaList.slice(0);
	if($("#typeSelect").val()!="none")
	{
		filterByType($("#typeSelect").val());
	}
	FormatEvents();
});

//I use .on() here b/c the <p> elements in EvenTitle are dynamically added
$("#EvenTitle").on('click', 'p', function() {
	var id = this.id;
	console.log(id);
});

function getEventInfo() {
	var options = {
		method: "GET",
		url: "http://data.sandiego.gov/api/action/datastore/search.json?resource_id=8a5018b2-7635-416f-a252-cf04e54d6719&limit=100"
	};
	request.send(options, function(error,data) {
		loadEventsIntoArray(data);
	});
}

function loadEventsIntoArray(data) {
	DaList.length = 0;
	for(var i = 0; i<100; i++)
	{
		//console.log((data.result.records[i].event_id));

		//data is a parsed Json file that you can access information from
		//To get Event_ID of a record what you do is
		//data.result.records[i].event_id
		//This first accesses data, then goes into result, and pulls out the record[i] and then grabs the event_id from it
		//If you want to read the json file to figure out whats going on and stuff 
		//Use https://jsonformatter.curiousconcept.com/ to format it so its easy to read

		//I'm sending the data of a specific record so that I don't have to send in its location in results
		DaList.push(new Event(data.result.records[i]));
	}
}

// This is how you create a javascript class
var Event = function(data) {
	this.id = data.event_id;
	this.title = data.event_title;
	this.desc = data.event_desc;
	this.location = data.event_loc;
	this.type = data.event_type;
	this.start = data.event_start;
	this.end = data.event_end;
	this.host = data.event_host;
	this.url = data.event_url;
	this.attendance = data.exp_attendance;
	this.participants = data.exp_participants;
	this.address = data.event_address;
	this.latitude = data.latitude;
	this.longitude = data.longitude;
}

function filterByType(type)
{
	for(var i = 0; i<DaPrintList.length; i++)
	{
		if(DaPrintList[i].type.toLowerCase() != type.toLowerCase())
		{
			//I use splice to take out a single element at location i
			DaPrintList.splice(i,1);
			i--;
		}
	}
}

function FormatEvents() {
	//clears out everything in EvenTitle	
	$("#EvenTitle").html("");
	for(var i = 0; i < DaPrintList.length; i++)
	{
		//console.log(DaList[i].title);

		//adds a <p> element of class Events, that has the id of the Event and shows the title and id
		$("#EvenTitle").append("<p class=\"Events\" id=\"" + DaPrintList[i].id + "\">" + DaPrintList[i].title + " " + DaList[i].id + "</p>");
	}
}