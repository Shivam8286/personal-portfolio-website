document.addEventListener("DOMContentLoaded", function () {
	const form = document.getElementById("contactForm");
	const responseMessage = document.getElementById("responseMessage");

	form.addEventListener("submit", function (event) {
		event.preventDefault(); // Prevent the form from submitting the traditional way

		// Retrieve form data
		const formData = new FormData(form);
		const data = {};
		formData.forEach((value, key) => {
			data[key] = value;
		});

		// Simple validation
		if (!data.name || !data.email || !data.message) {
			responseMessage.textContent = "Please fill in all fields.";
			responseMessage.style.color = "red";
			return;
		}

		// Display a success message (you can replace this with an actual form submission)
		responseMessage.textContent = "Thank you for your message!";
		responseMessage.style.color = "green";

		// Clear the form fields
		form.reset();
	});
});
