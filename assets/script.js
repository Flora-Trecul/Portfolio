// Bouton scroll to top : afficher si l'utilisateur scrolle + retour en haut de la page au clic
window.onscroll = function() {scrollFunction()}

function scrollFunction() {
	const btnScroll = document.querySelector(".btn--scroll")
	if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
		btnScroll.style.display = "block";
	} else {
		btnScroll.style.display = "none";
	}

	const navbarLinks = document.querySelectorAll(".navbar__menu a")
	if (document.body.scrollTop > 400 || document.documentElement.scrollTop > 400) {
		navbarLinks[0].classList.remove("active")
	} else {
		navbarLinks[0].classList.add("active")
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
	const inputName = document.getElementById("name").value
	const inputMsg = document.getElementById("message").value
	const inputMail = document.getElementById("email").value
	const regex = new RegExp("^[a-zA-Z0-9]+[a-zA-Z0-9_\\-\\.?]+[a-zA-Z0-9]+@[a-zA-Z-]+\\.[a-zA-Z]{2,3}$");

	const msgError = document.querySelector(".contact__form__error")
	if (!inputMail || !inputMsg || !inputName) {
		msgError.innerText = "Tous les champs du formulaire doivent être remplis"
		msgError.style.visibility = "visible"
	} else if (!regex.test(inputMail)) {
		msgError.innerText = "Veuillez renseigner une adresse mail valide"
		msgError.style.visibility = "visible"
	} else {
		// Envoi de mail avec EmailJS
		const templateParams = {
			name: inputName,
			message: inputMsg,
			email: inputMail
		}
		emailjs
			.send("service_u9wybr7", "template_cilzmkb", templateParams)
			.then(() => {
				msgError.innerText = "Votre message a bien été envoyé !"
				msgError.style.visibility = "visible"
			})
			.catch(() => {
				msgError.innerText = "Votre message n'a pas pu être envoyé, veuillez réessayer"
				msgError.style.visibility = "visible"
			})
	}
})


// Affichage dynamique des projets dans le portfolio
const portfolio = document.querySelector(".portfolio__projects")
fetch("assets/data.json")
	.then(response => response.json())
    .then(projects => displayProjects(projects))
    .catch(error => console.error('Error fetching JSON:', error));

function displayProjects(projects) {
	projects.forEach(project => {
		const article = document.createElement("article")
		article.classList.add("project")
		const h3 = document.createElement("h3")
		h3.innerText = project.title
		article.appendChild(h3)
		const picture = document.createElement("picture")
		picture.innerHTML = `<source srcset="${project.image}.webp" type="image/webp"><source srcset="${project.image}.jpg" type="image/jpeg"><img class="project__image" src="${project.image}.jpg" alt="${project.alt}">`
		article.appendChild(picture)

		const buttons = document.createElement("div")
		buttons.classList.add("project__buttons")
		const code = document.createElement("a")
		code.href = project.URL.code
		code.target = "_blank"
		code.innerHTML = "<button class=\"btn--left\">Code</button>"
		buttons.appendChild(code)
		const site = document.createElement("a")
		site.href = project.URL.site
		site.target = "_blank"
		site.innerHTML = "<button class=\"btn--right\">Site</button>"
		buttons.appendChild(site)
		article.appendChild(buttons)

		const content = document.createElement("div")
		content.classList.add("project__content")
		const synopsisTitle = document.createElement("h4")
		synopsisTitle.innerText = "Synopsis"
		content.appendChild(synopsisTitle)
		const synopsisText = document.createElement("p")
		synopsisText.classList.add("project__content__synopsis")
		synopsisText.innerText = project.description
		content.appendChild(synopsisText)
		const challengesTitle = document.createElement("h4")
		challengesTitle.innerText = "Challenges"
		content.appendChild(challengesTitle)
		const challengesText = document.createElement("p")
		challengesText.classList.add("project__content__challenges")
		challengesText.innerText = project.challenges
		content.appendChild(challengesText)
		if (project.URL.backend) {
			const backend = document.createElement("a")
			backend.href = project.URL.backend
			backend.target = "_blank"
			backend.innerHTML = "<button class=\"button\">Activer l'API</button>"
			content.appendChild(backend)
		}
		if (project.instructions) {
			const instructionsTitle = document.createElement("h4")
			instructionsTitle.innerText = "Instructions"
			content.appendChild(instructionsTitle)
			const instructionsText = document.createElement("p")
			instructionsText.innerText = project.instructions
			content.appendChild(instructionsText)
		}

		article.appendChild(content)
		portfolio.appendChild(article)
	});
}