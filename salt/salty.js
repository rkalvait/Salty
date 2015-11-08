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
for (var i=0; i<comments.length; i++) {
	comments[i].innerHTML = comments[i].innerHTML + "HERES A COMMENT";
	var output = $.ajax({
		url: 'https://community-sentiment.p.mashape.com/', // The URL to the API. You can get this by clicking on "Show CURL example" from an API profile
		type: 'POST', // The HTTP Method, can be GET POST PUT DELETE etc
		data: {}, // Additional parameters here
		dataType: 'json',
		success: function(data) {
			//
			//Change data.source to data.something , where something is whichever part of the object you want returned.
			//To see the whole object you can output it to your browser console using:
			//console.log(data);
			comments[i].innerHTML = comments[i].innerHTML + data.source;
			alert('success');
			//alert(data.source);
			},
		error: function(err) { 
			alert('error');
			comments[i].innerHTML = comments[i].innerHTML + "AN ERROR HAPPENED"; 
			},
		beforeSend: function(xhr) {
		xhr.setRequestHeader("X-Mashape-Authorization", "QFheDA3xy4msh6RQ2M5aXPqrHJJOp1b483ojsnlQEjzksKtFYu"); // Enter here your Mashape key
		}
	});
}