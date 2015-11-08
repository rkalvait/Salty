document.body.style.border = "5px solid red";
//alert(chrome.extension.getURL("beasts/frog.jpg"));

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
			//alert(data["result"]["confidence"]);
			// Successful post, apply the response
			if (comment.childNodes[1] == undefined) {
				var p = document.createElement("p");
				p.innerHTML = getSalt(data);
				comment.appendChild(p);
				
				var img = document.createElement("img");
				alert(chrome.extension.getURL("beasts/frog.jpg"));
				//img.setAttribute("src", chrome.extension.getURL("beasts/frog.jpg"));
				img.setAttribute("src", "http://orig14.deviantart.net/f231/f/2015/030/6/c/salt_shaker_pixel_by_alfvie-d8g1phq.png");
				img.setAttribute("style", "width: 100px");
				img.setAttribute("style", "height: 100px");
				comment.appendChild(img);
			} else {
				comment.childNodes[1].innerHTML = getSalt(data);
				//comment.removeChild(comment.childNodes[2]);
				var img = document.createElement("img");
				//img.setAttribute("src", chrome.extension.getURL("beasts/frog.jpg"));
				comment.childNodes[2].setAttribute("src", "http://orig14.deviantart.net/f231/f/2015/030/6/c/salt_shaker_pixel_by_alfvie-d8g1phq.png");
				//img.setAttribute("src", "http://orig14.deviantart.net/f231/f/2015/030/6/c/salt_shaker_pixel_by_alfvie-d8g1phq.png");
				//img.setAttribute("style", "width: 100vw");
				//img.setAttribute("style", "height: 100vh");
				//comment.appendChild(img);
			}
			},
		error: function(err) {
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