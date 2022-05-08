<!DOCTYPE html>
<html lang="fr">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Géocartie</title>
	<script async src="https://cse.google.com/cse.js?cx=12d426587d6da4cbd">
	</script>
	
	<style>
		* {
			margin: 0;
			padding: 0;
		}

		body {
			display: flex;
			flex-direction: row;
			font-family: Arial, Helvetica, sans-serif;
		}

		a {
			text-decoration: none;
			color: rgb(202, 43, 237);
			font-weight: bold;
		}

		.carte {
			margin: 1em 2em;
		}

		.carte .petite-couronne-agrandie.active-paris > *, .carte .paris-petite-couronne.active-paris{
			fill: #555;
		}

		.infos {
			max-height: 100vh;
			width: 100%;
			overflow-y: scroll;
			font-size: 1.3em;
			padding-left: 0.75em;
			border-left: 1px solid #555;
		}

		.infos h2, .infos h1 {
			margin: 1em auto 0;
			width: fit-content;
		}

		.infos h2 span {
			margin-left: 0.75em;
			font-weight: 100;
			font-size: 0.8em;
		}

		.infos .images {
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			justify-content: space-between;
			margin: 2em 1em 1em 0;
			gap: 0.5em;
		}

		.infos .images img {
			width: auto;
			flex-grow: +1;
			height: 25vh;
			object-fit: cover;
			border-radius: 0.1em;
		}

		.infos a.voir-plus-images {
			padding-bottom: 1em;
		}
		
		.infos .default p {
			margin-top: 1em;
			color: #888;
		}

		.infos .default p:nth-child(3n) {
			margin-top: 3em;
			color: #000;
		}

		span.description {
			position: absolute;
			display: none;
			background-color: #fff;
			padding: 0.5em;
			border-radius: 0.1em;
			border: 1px solid #555;
			z-index: 1;
			font-size: 0.8em;
			font-weight: 100;
			box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
		}

		span.description.show {
			display: unset;
		}

		path.departement {
			cursor: pointer;
		}

		path.departement:hover{
			fill: #ddd;
		}

		path.departement.active{
			fill: #aaa;
		}
	</style>
</head>
<body>
	


<div class="carte">
	<?php include('carte-svg.html'); ?>
</div>
<div class="infos">		
	<div class="default">
		<h1>Géocartie</h1>
		<h2>Apprendre et découvrir les départements français</h2>
		<p>Pour commencer, cliquez sur l'un des départements français métropolitains.</p>
		<p>Pour toute suggestion, question ou demande, <a target="_blank" onClick="javascript:window.open(`mailto:emilien@emixocle.fr?subject=Message%20concernant%20G%C3%A9ocartie&body=Monsieur%20Cosson%2C%0D%0A%0D%0A%0D%0AJ'ai%20d%C3%A9couvert%20l'application%20Web%20nomm%C3%A9e%20G%C3%A9ocartie%20que%20vous%20avez%20r%C3%A9alis%C3%A9e.%0D%0A%0D%0AJe%20vous%20adresse%20ce%20courriel%20afin%20de%20%7BSAISISSEZ_UN_MOTIF%7D.%0D%0A%0D%0A%7BVEUILLEZ_POURSUIVRE_VOTRE_MESSAGE%7D%0D%0A%0D%0A%0D%0AJe%20devine%20l'attention%20que%20vous%20porterez%20%C3%A0%20mon%20message.%0D%0A%0D%0AMes%20sinc%C3%A8res%20salutations%2C%0D%0A%7BSIGNATURE%7D`, 'mail'); event.preventDefault();" href="mailto:emilien@emixocle.fr">veuillez rédiger un courriel</a>.</p>
		<p>La carte de France provient de comersis.com et les images sont issues de pages Internet.</p>
	</div>
</div>
<span class="description"></span>

<script>
	let departements = document.body.querySelectorAll(".departement");
	let infos = document.body.querySelector(".infos");

	let json = getJSONFromFile("departements.json");

	let petiteCouronne = document.querySelector(".paris-petite-couronne");
	let petiteCouronneagrandie = document.querySelector(".petite-couronne-agrandie");

	function getJSONFromFile(url) {
		let xhr = new XMLHttpRequest();
		xhr.open('GET', url, false);
		xhr.send();
		if (xhr.status != 200) {
			console.log(xhr.status + ': ' + xhr.statusText);
		} else {
			return JSON.parse(xhr.responseText);
		}
	}


	departements.forEach(departement => {
		departement.addEventListener("click", (e) => {
			let activeDepartement = document.querySelector(".active");
			if (activeDepartement)
				activeDepartement.classList.remove("active");
			if (petiteCouronne.classList.contains("active-paris"))
				petiteCouronne.classList.remove("active-paris");
			
			departement.classList.add("active");
			
			let departementID = departement.classList[1];

			let departementInfos = json.filter(function(data){ return data.id == departementID })[0];

			infos.innerHTML = "";

			let infosDepartementName = document.createElement("h2");
			infosDepartementName.classList.add("departement-name");
			infosDepartementName.innerText = departementInfos.name;
			infos.appendChild(infosDepartementName);

			let infosDepartementID = document.createElement("span");
			infosDepartementID.innerText = departementInfos.id;
			infosDepartementName.appendChild(infosDepartementID);

			let infosDepartementRegion = document.createElement("p");
			infosDepartementRegion.classList.add("region");
			infosDepartementRegion.innerHTML = "Région : <span>" + departementInfos.region_name + "</span>";
			infos.appendChild(infosDepartementRegion);

			let infosDepartementPrefecture = document.createElement("p");
			infosDepartementPrefecture.classList.add("prefecture");
			infosDepartementPrefecture.innerHTML = "Préfecture : <span>" + departementInfos.prefecture_name + "</span>";
			infos.appendChild(infosDepartementPrefecture);

			let infosDepartementImages = document.createElement("div");
			infosDepartementImages.classList.add("images");
			infos.appendChild(infosDepartementImages);

			let req = "https://www.googleapis.com/customsearch/v1?key=AIzaSyCplyH_C3uMHj4BOvUC3pFDr3YlhDTca08&cx=12d426587d6da4cbd&lr=lang_fr&searchType=image&q=" + encodeURIComponent(departementInfos.name + " département paysage")
			let jsonGoogle = getJSONFromFile(req);

			for (var i = 0; i < jsonGoogle.items.length; i++) {
				var item = jsonGoogle.items[i];
				let imgEl = document.createElement("img");
				imgEl.src = item.link;
				imgEl.setAttribute("onclick", "window.open(`" + item.image.contextLink + "`, '_blank');");
				imgEl.setAttribute("description", item.snippet);
				infosDepartementImages.appendChild(imgEl);

				imgEl.addEventListener("mouseenter", (e) => {
					let description = document.querySelector(".description");
					description.innerHTML = e.target.getAttribute("description");
					description.classList.add("show");
					description.style.top = e.clientY + "px";
					description.style.left = e.clientX + "px";
				});

				imgEl.addEventListener("mouseout", (e) => {
					let description = document.querySelector(".description");
					description.classList.remove("show");
				});
			}

			let voirPlusImages = document.createElement("a");
			voirPlusImages.classList.add("voir-plus-images");
			voirPlusImages.innerText = "Voir plus d'images sur Google";
			voirPlusImages.href = "https://www.google.com/search?q=" + encodeURIComponent(departementInfos.name + " département paysage") + "&tbm=isch";
			voirPlusImages.target = "_blank";
			infos.appendChild(voirPlusImages);
		});
	});
	
	petiteCouronne.addEventListener("click", (e) => {
		for (let i = 0; i < 10; i++) {
			if (i % 2 == 0) {
				setTimeout(() => {
					petiteCouronneagrandie.classList.add("active-paris");
					petiteCouronne.classList.add("active-paris");
				}, i*100);
			} else {
				setTimeout(() => {
					petiteCouronneagrandie.classList.remove("active-paris");
					petiteCouronne.classList.remove("active-paris");
				}, i*100);
			}	
		}
	});

	for (let i = 0; i < petiteCouronneagrandie.children.length; i++) {
		petiteCouronneagrandie.children[i].addEventListener("click", (e) => {
			petiteCouronne.classList.add("active-paris");
		});
	}

</script>
</script>

</body>
</html>