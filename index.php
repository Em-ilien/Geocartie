<!DOCTYPE html>
<html lang="fr">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta name="description" content="Apprendre et découvrir les départements français avec Géocartie">
	<title>Géocartie</title>
	<link rel="stylesheet" href="style.css">	
</head>
<body>
	<div class="carte">
		<?php include('data/carte-svg.html'); ?>
		<span class="mode-switcher">Mode quizz</span>
	</div>
	<div class="infos">
		<div class="default">
			<h1>Géocartie</h1>
			<h2>Apprendre et découvrir les départements français</h2>
			<p>Pour commencer, cliquez sur l'un des départements français métropolitains.</p>
			<p>Pour toute suggestion, question ou demande, <a target="_blank" onClick="javascript:window.open(`mailto:emilien@em-ilien.fr?subject=Message%20concernant%20G%C3%A9ocartie&body=Monsieur%20Cosson%2C%0D%0A%0D%0A%0D%0AJ'ai%20d%C3%A9couvert%20l'application%20Web%20nomm%C3%A9e%20G%C3%A9ocartie%20que%20vous%20avez%20r%C3%A9alis%C3%A9e.%0D%0A%0D%0AJe%20vous%20adresse%20ce%20courriel%20afin%20de%20%7BSAISISSEZ_UN_MOTIF%7D.%0D%0A%0D%0A%7BVEUILLEZ_POURSUIVRE_VOTRE_MESSAGE%7D%0D%0A%0D%0A%0D%0AJe%20devine%20l'attention%20que%20vous%20porterez%20%C3%A0%20mon%20message.%0D%0A%0D%0AMes%20sinc%C3%A8res%20salutations%2C%0D%0A%7BSIGNATURE%7D`, 'mail'); event.preventDefault();" href="mailto:emilien@em-ilien.fr">veuillez rédiger un courriel</a>.</p>
			<p>La carte de France provient de comersis.com et les images sont issues de pages Internet.</p>
			<p><a target="_blank" href="https://github.com/em-ilien/geocartie">Voir le code source - GitHub</a></p>
			<p><a target="_blank" href="https://twitter.com/Em_ixocle">Twitter : @Em_ixocle</a></p>
		</div>
	</div>

	<script src="main.js"></script>
	<script src="quizz.js"></script>
</body>
</html>
