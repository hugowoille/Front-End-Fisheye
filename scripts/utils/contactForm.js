/* eslint-disable indent */
// eslint-disable-next-line no-unused-vars
function displayModal(name) {
	const modal = document.getElementById("contact_modal");
	modal.style.display = "block";

	document.getElementById(
		"contact-name"
	).innerHTML = `Contactez moi <br> ${name}`;
}

// eslint-disable-next-line no-unused-vars
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
// using keyboard to navigate in contact modal
document.addEventListener("keydown", (event) => {
	const contactModal = document.getElementById("contact_modal");

	if (contactModal.style.display !== "block") {
		return;
	}
	switch (event.code) {
		case "Escape": {
			closeModal();
			break;
		}
		case "Enter": {
			validate();
			break;
		}
		default:
			break;
	}
});
