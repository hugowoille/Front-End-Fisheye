function displayModal(name) {
	const modal = document.getElementById("contact_modal");
	modal.style.display = "block";
	console.log("photographerName:", name);
	document.getElementById(
		"contact-name"
	).innerHTML = `Contactez moi <br> ${name}`;
}

function closeModal() {
	const modal = document.getElementById("contact_modal");
	modal.style.display = "none";
	form.reset();
}

const form = document.getElementById("form-signup");
form.addEventListener("submit", validate);

function validate(event) {
	event.preventDefault();

	const getFirstnameValue = document.getElementById("firstname").value;
	console.log("prénom :", getFirstnameValue);

	const getLasttnameValue = document.getElementById("lastname").value;
	console.log("nom :", getLasttnameValue);

	const getEmailValue = document.getElementById("email").value;
	console.log("email :", getEmailValue);

	const getMessageValue = document.getElementById("message").value;
	console.log("message :", getMessageValue);
}
