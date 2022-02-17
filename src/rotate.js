function myFunction() {
	// one formID for randomization form (id from EDIT page!)
	let editFormID = "1aXiljp9TOiuRGBC-0Km3kzJipQHnpth4rBn3ylVlUEc";  // taskus pilot survey 1

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
	deleteTheFreakinForm(form);
	form.setShowLinkToRespondAgain(false);

	// change confirmation message dynamically
	form.setTitle("TaskUs Pilot Survey");
	form.setConfirmationMessage("Click/visit this link to begin: " + formURL);
	form.setDescription("Welcome to the pilot survey. Thanks for taking the time to complete it. To begin, click the Submit button below.");
}






function deleteTheFreakinForm(form) {

	//First, remove list item choices. Then delete the list items.

	var listItems = form.getItems(FormApp.ItemType.LIST);
	let itemIndex = 0;
	while (itemIndex < listItems.length) {
		listItems[itemIndex].asListItem().setChoiceValues(['']);
		form.deleteItem(listItems[itemIndex]);
		itemIndex++;
	}

	//Second, remove the multiple choice item choices. Then delete the multiple 
	//choice items.

	var multipleChoiceItems = form.getItems(FormApp.ItemType.MULTIPLE_CHOICE);
	itemIndex = 0;
	while (itemIndex < multipleChoiceItems.length) {
		multipleChoiceItems[itemIndex].asMultipleChoiceItem().setChoiceValues(['']);
		form.deleteItem(multipleChoiceItems[itemIndex]);
		itemIndex++;
	}

	//Finally, delete the remaining form items.

	var items = form.getItems();
	itemIndex = 0;
	while (itemIndex < items.length) {
		form.deleteItem(items[itemIndex]);
		itemIndex++;
	}
}



