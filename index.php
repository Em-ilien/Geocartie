<?php
require("config.php");

session_start();

?>
<!DOCTYPE html>
<html lang="fr">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta name="description" content="Apprendre et découvrir les départements français avec Géocartie">
	<meta name="twitter:card" content="summary"></meta>
	<meta name="twitter:creator" content="@Em_ixocle"></meta>
	<meta name="og:title" content="Géocartie"></meta>
	<meta name="og:description" content="Apprendre et découvrir les départements français avec Géocartie">
	<meta name="og:image" content="https://media.discordapp.net/attachments/567292343791910913/985221514892828732/unknown.png"></meta>
	<title>Géocartie</title>
	<link rel="stylesheet" href="css/style.css">	
	<link rel="stylesheet" href="css/windows.css">	
</head>
<body>
	<div class="carte" info-bulle="<p>Afficher la page d'accueil</p>" info-bulle--is-disabled="true">
		<?php include('data/carte-svg.html'); ?>
		<span class="mode-switcher" info-bulle="<p>Lancer le Mode quizz</p>">Mode quizz</span>
	</div>
	<div class="infos">
		<div class="default">
			<h1>Géocartie</h1>
			<h2>Apprendre et découvrir les départements français</h2>
			<p>Pour commencer, cliquez sur l'un des départements français métropolitains.</p>
			<p>Lancez le Mode quizz pour vous exercer.</p>

			<div class="links">
				<p><a 	info-bulle="<p>Ouvrir l'interface d'envoi de courriel</p>"
						target="_blank"
						onClick="showEmailWindow(`Message concernant Géocartie`, `Monsieur Cosson,\n\n
				J'ai découvert l'application Web nommée Géocartie que vous avez réalisée.\n
				Je vous adresse ce courriel afin de {SAISISSEZ_UN_MOTIF}.\n
				{VEUILLEZ_POURSUIVRE_VOTRE_MESSAGE}\n\n
				Je devine l'attention que vous porterez à mon message.\n
				Mes sincères salutations,\n{SIGNATURE}`); event.preventDefault();"
				href="mailto:emilien@em-ilien.fr">Suggestion, question ou demande</a></p>
				<p><a info-bulle="<p>Se rendre sur le projet Github</p>" target="_blank" href="https://github.com/em-ilien/geocartie">Code source - GitHub</a></p>
				<p><a info-bulle="<p>Consulter les mentions légales</p>" target="_blank" href="mentions-legales.php">Mentions légales</a></p>
			</div>
		</div>
	</div>
	<div class="burger-menu">
		<span></span>
		<span></span>
		<span></span>
	</div>
	<script src="js/main.js"></script>
	<script src="js/quizz.js"></script>
	<script src="js/email-window.js"></script>
	<script src="js/small-crown.js"></script>
	<script src="js/backing-home-page.js"></script>
	<script src="js/burger-menu.js"></script>
	<script src="js/info-bulle.js"></script>
</body>
</html>
