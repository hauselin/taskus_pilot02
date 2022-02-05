function myFunction() {
	// one formID for randomization form (id from EDIT page!)
	let editFormID = "1ReY9LZFIhW6lzeOLDArNFyU5MyrCLw-fqLO3Oqp-Lvk";  // taskus pilot survey 1

	// form actual urls for different sets for participants (surveys 2 onward)
	let formURLs = [
		"https://docs.google.com/forms/d/e/1FAIpQLSfgDcPV6GXR43KjQDm00X8ph9AVuKNvvh2R1RlFF_3DLQl6kg/viewform?usp=sf_link",
		"https://docs.google.com/forms/d/e/1FAIpQLSfIsBrLju80-lShdUwj7Mv6voT-WbziOeGOhAAyhKmOqzMj_Q/viewform?usp=sf_link",
		"https://docs.google.com/forms/d/e/1FAIpQLScPCZe74n8mNG12Bv3UcCdbN84li96hD20eC-W_WbkSxJ4iBA/viewform?usp=sf_link",
		"https://docs.google.com/forms/d/e/1FAIpQLSdH78OywqdU9ZIiXJozoFWd3bnoezjq-gJpX4BXQXKHIDIYeg/viewform?usp=sf_link"
	];

	// assign survey/condition by minute
	const d = new Date();
	let minutes = d.getMinutes();

	// repeat formURLs 60 times (at least 1 for each minute)
	for (let i = 0; i < 60; i++) {
		formURLs.push(formURLs[(i) % formURLs.length]);
	}

	let formURL = formURLs[minutes];
	Logger.log(formURL);

	let form = FormApp.openById(editFormID);

	// change dynamically
	form.setDescription("Click/visit this link to begin: " + formURL);
}
