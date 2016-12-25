var allTExt = {
	"welcome" : {
		"key" : "welcome",
		"q" : ["Hi there. Welcome!", "Hey, nice to meet you!"],
		"opts" : ["see his work", "tell me about him"]
	},
	"-" : {
		"key" : "intro q",
		"q" : ["Will you like to see Uchi's work or learn about him", "Should I show you Uchi's works or tell you about him"],
		"opts" : ["see his work", "tell me about him"]
	},
	"see his work" : {
		"key" : "see his work",
		"q" : ["Awesome! Which work will you like to learn about", "2"],
		"opts" : works
	},
	"tell me about him" : {
		"key" : "tell me about him",
		"q" : ["1", "2"],
		"opts" : ["Uchi is a design student", "He enjoys show business"]
	}
};

var works = {
	"eventstone" : {
		"title" : "Eventstone",
		"about" : "",
		"url" : ""
	},
	"tranxi" : {
		"title" : "Tranxi",
		"about" : "",
		"url" : ""
	}
};
