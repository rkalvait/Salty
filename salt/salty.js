document.body.style.border = "5px solid red";
//var s = document.createElement("script");
//s.type = "text/javascript";
//s.src = "http://code.jquery.com/jquery-1.11.3.min.js";
//document.head.appendChild(s);

alert("jq");

$(document).ready(function(){
 $("#header").html("This is Hello World by JQuery");
});

alert("endjq");

comments = document.getElementsByClassName("md");
for (var i=0; i<5; i++) {
	//comments[i].innerHTML = comments[i].innerHTML + "HERES A COMMENT";
	var output = $.ajax({
		crossDomain: true,
		url: 'https://community-sentiment.p.mashape.com/text/', // The URL to the API. You can get this by clicking on "Show CURL example" from an API profile
		type: 'POST', // The HTTP Method, can be GET POST PUT DELETE etc
		data: {txt: comments[i].innerHTML}, // Additional parameters here
		dataType: 'json',
		success: function(data) {
			//
			//Change data.source to data.something , where something is whichever part of the object you want returned.
			//To see the whole object you can output it to your browser console using:
			//console.log(data);
			//alert(data);
			//comments[i].innerHTML = comments[i].innerHTML + data.source;
			//alert(data["result"]["sentiment"]);
			appendComment(data["result"]["sentiment"], i);
			},
		error: function(err) {
			//alert(typeof err);
			appendComment("ERROR", i);
			alert("error");
			},
		beforeSend: function(xhr) {
			xhr.setRequestHeader("X-Mashape-Key", "QFheDA3xy4msh6RQ2M5aXPqrHJJOp1b483ojsnlQEjzksKtFYu"); // Enter here your Mashape key
			xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
			xhr.setRequestHeader("Accept", "application/json");
		}
	});
}

function appendComment(str, i) {
	comments = document.getElementsByClassName("md");
	comment = comments[i];
	comment.innerHTML = comment.innerHTML + str;
}