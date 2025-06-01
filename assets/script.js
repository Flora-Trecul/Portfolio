// Bouton scroll to top : afficher si l'utilisateur scrolle + retour en haut de la page au clic
const btnScroll = document.querySelector(".btn--scroll")
window.onscroll = function() {scrollFunction()}

function scrollFunction() {
	if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
		btnScroll.style.display = "block";
	} else {
		btnScroll.style.display = "none";
	}
}

function scrollToTop() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}


// Gestion du formulaire
const form = document.querySelector(".contact__form")
form.addEventListener("submit", function(e) {
	e.preventDefault()

	// On vérifie qu'il y a bien un mail valide + un message renseigné
	const inputMail = document.getElementById("email").value
	const inputMsg = document.getElementById("message").value

	const msgError = document.querySelector(".contact__form__error")
	if (!inputMail || !inputMsg) {
		msgError.innerText = "Tous les champs du formulaire doivent être remplis"
		msgError.style.visibility = "visible"
	} else if (!inputMail.includes("@")) {
		msgError.innerText = "Veuillez renseigner une adresse mail valide"
		msgError.style.visibility = "visible"
	} else {
		msgError.style.visibility = "hidden"
	}
})


// Fonction pour afficher un message d'erreur dans le formulaire
function addErrorMsg(errorText) {
    error.innerText = errorText
}