// Add a salt meter below a comment box that updates as the user types
// It shows how negative that user's comment is.

setInterval(update, 1000);

// Update the Indicator below the comment.
function update() {
	// Find the comment
	comments = document.getElementsByClassName("md");
	for (var i=0; i<comments.length; i++) {
		comment = comments[i]
		if (comment.innerHTML.indexOf("textarea") > -1) {
			// Get response from the API
			getResponse(comment);
		}
	}
}

// Get a response from the API, place it within the comment div element
function getResponse(comment) {
	// Connect to the API
	var output = $.ajax({
		crossDomain: true,
		url: 'https://community-sentiment.p.mashape.com/text/', // The URL to the API. You can get this by clicking on "Show CURL example" from an API profile
		type: 'POST', // The HTTP Method, can be GET POST PUT DELETE etc
		data: {txt: comment.childNodes[0].value}, // Additional parameters here
		dataType: 'json',
		success: function(data) {
			// Successful post, apply the response
			
			// First time adding the salt meter
			if (comment.childNodes[1] == undefined) {
				var p = document.createElement("p");
				var salty = getSalt(data);
				var img = "<img src='http://orig14.deviantart.net/f231/f/2015/030/6/c/salt_shaker_pixel_by_alfvie-d8g1phq.png' width=10 height=10></img>";
				if (salty == "Very Negative") {
					p.innerHTML = salty+": "+img+img+img+img+img;
				} else if (salty == "Negative") {
					p.innerHTML = salty+": "+img+img+img+img;
				} else if (salty == "Neutral") {
					p.innerHTML = salty+": "+img+img+img;
				} else if (salty == "Positive") {
					p.innerHTML = salty+": "+img+img;
				} else if (salty == "Very Positive") {
					p.innerHTML = salty+": "+img;
				}
				comment.appendChild(p);
			// All other updates
			} else {
				var salty = getSalt(data);
				var img = "<img src='http://orig14.deviantart.net/f231/f/2015/030/6/c/salt_shaker_pixel_by_alfvie-d8g1phq.png' width=10 height=10></img>";
				if (salty == "Very Negative") {
					comment.childNodes[1].innerHTML = salty+": "+img+img+img+img+img;
				} else if (salty == "Negative") {
					comment.childNodes[1].innerHTML = salty+": "+img+img+img+img;
				} else if (salty == "Neutral") {
					comment.childNodes[1].innerHTML = salty+": "+img+img+img;
				} else if (salty == "Positive") {
					comment.childNodes[1].innerHTML = salty+": "+img+img;
				} else if (salty == "Very Positive") {
					comment.childNodes[1].innerHTML = salty+": "+img;
				}
			}
			},
		// Something went wrong
		error: function(err) {
			appendComment("ERROR", i);
			alert("error");
			},
		// Apply headers before sending
		beforeSend: function(xhr) {
			xhr.setRequestHeader("X-Mashape-Key", "QFheDA3xy4msh6RQ2M5aXPqrHJJOp1b483ojsnlQEjzksKtFYu"); // Enter here your Mashape key
			xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
			xhr.setRequestHeader("Accept", "application/json");
		}
	});
}

// Get a string that ranges from "Very Negative" to "Very Positive"
function getSalt(data) {
	if (data["result"]["sentiment"] == "Neutral") {
		return "Neutral";
	} 
	var out = data["result"]["sentiment"];
	var conf = parseFloat(data["result"]["confidence"]);
	if (conf > 75) {
		out = "Very " + out;
	}
	
	return out;
}