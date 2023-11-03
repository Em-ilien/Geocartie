<script>
	import { preferences } from './../../stores/preferencesStore.js';
	import ContextSection from './ContextSection.svelte';

	preferences.layout.contextSection.open();
</script>

<ContextSection>
	<section class="legal">
		<h1>Mentions légales</h1>

		<h2>Editeur du site Web</h2>
		<p>L'administration de ce site est assurée M. Emilien COSSON.</p>
		<p>
			Vous pouvez contacter l'administrateur du site par courriel à <a href="mailto:emilien@em-ilien.fr"
				>l'adresse emilien@em-ilien.fr</a
			>.
		</p>

		<h2>Hébergeur</h2>
		<p>Ce site web est hébergé par Vercel.</p>
		<p>
			Vercel Inc.<br />
			340 S Lemon Ave #4133<br />
			Walnut, CA 91789<br />
			<a href="https://vercel.com">https://vercel.com</a>
		</p>

		<h2>Politique de confidentialité et cookies</h2>
		<p>
			Ce site ne collecte aucune donnée personnelle, hormis l'adresse email fournie par l'utilisateur à la
			connexion (voir section "<a href="#login_with_google">Connexion avec Google</a>").
		</p>
		<p>Ce site ne dépose aucun cookie.</p>

		<h3 id="login_with_google">Connexion avec Google</h3>
		<p>
			Ce site se sert de la <a target="_blank" href="https://support.google.com/accounts/answer/112802"
				>Connexion avec Google</a
			> pour proposer à l'utilisateur de suivre sa progession dans son apprentissage.
		</p>
		<p>Dans ce cadre, l'adresse électronique reliée au compte Google de l'utilisateur est collectée.</p>
		<p>
			Il est entendu que l'utilisateur accepte la politique de confidentialité de Google et ses conditions
			générales.
		</p>

		<h2>Propriété intellectuelle</h2>
		<h3>Code source</h3>
		<p>
			Le code source, soumis à la propriété intellectuelle de son auteur, est disponible sur <a
				target="_blank"
				href="https://github.com/em-ilien/geocartie">GitHub</a
			>.
		</p>

		<p>
			Ce code source appartient à M. Emilien COSSON. Toute utilisation ou reproduction est autorisée à condition :
		</p>
		<ul>
			<li>de mentionner le lien vers le repository Github, ou bien vers la page Web https://geocartie.fr ;</li>
			<li>de ne pas revendre le code source ;</li>
			<li>
				de ne pas générer des revenus à l'aide de ce code source sans en avoir reçu l'autorisation écrite de son
				dépositaire.
			</li>
		</ul>
		<p>
			Vous pouvez mettre en ligne Géocartie sur votre serveur Web et le mettre à la disposition de vos
			utilisateurs aux conditions mentionnés ci-dessus.
		</p>
		<p>
			Vous pouvez mettre en ligne le code source de Géocartie, que vous l'ayez édité ou non, aux mêmes conditions
			en veillant tout particulièrement à informer vos utilisateurs que ce code est soumis au moins aux mêmes
			conditions mentionnées ci-dessus.
		</p>
		<p>
			Pour toute question ou demande, je serai ravi de vous renseigner par courriel (<a
				href="mailto:emilien@em-ilien.fr">emilien@em-ilien.fr</a
			>).
		</p>

		<h3>Images</h3>
		<p>Les images sont issues de pages Internet.</p>
		<p>
			Pour toute demande d'ajout d'images, veuillez rédiger un courriel à <a href="mailto:emilien@em-ilien.fr"
				>emilien@em-ilien.fr</a
			> en mentionnant le numéro de département concerné et les liens vers les images.
		</p>
		<p>
			Pour des questions de droit d'auteur, les images doivent être hébergées sur des serveurs Web par le soin des
			détenteurs desdits droits.
		</p>
	</section>
</ContextSection>

<svelte:head>
	<title>Géocartie - Mentions légales</title>
</svelte:head>
