<script>

  import Header from "../../lib/components/sections/Header.svelte";

</script>
<Header />

<section class="legal">
    <h1>Mentions légales</h1>

    <h2>Editeur du site Web</h2>
    <p>L'administration de ce site est assurée M. Emilien COSSON.</p>
    <p>Vous pouvez contacter l'administrateur du site par courriel à <a href="mailto:emilien@em-ilien.fr">l'adresse emilien@em-ilien.fr</a>.</p>

    <h2>Hébergeur</h2>
    <p>Ce site web est hébergé par OVH.</p>
    <p>RCS Roubaix – Tourcoing 424 761 419 00045 ; Code APE 6202A ; N° TVA : FR 22 424 761 419 ; Siège social : 2 rue Kellermann - 59100 Roubaix - France.</p>

    <h2>Politique de confidentialité et cookies</h2>
    <p>Ce site ne collecte aucune donnée personnelle, hormis l'adresse email fournie par l'utilisateur à la connexion (voir section "Connexion avec Google").</p>
    <p>Ce site ne dépose aucun cookie.</p>

    <h3>Connexion avec Google</h3>
    <p>Ce site se sert de la <a target="_blank" href="https://support.google.com/accounts/answer/112802">Connexion avec Google</a> pour proposer à l'utilisateur de suivre sa progession dans son apprentissage.</p>
    <p>Dans ce cadre, l'adresse électronique reliée au compte Google de l'utilisateur est collectée.</p>
    <p>Il est entendu que l'utilisateur accepte la politique de confidentialité de Google et ses conditions générales.</p>

    <h2>Propriété intellectuelle</h2>
    <h3>Code source</h3>
    <p>Le code source, soumis à la propriété intellecutelle de son auteur, est disponible sur <a target="_blank" href="https://github.com/em-ilien/geocartie">GitHub</a>.</p>

    <p>Ce code source appartient à M. Emilien COSSON. Toute utilisation ou reproduction est autorisée à condition :</p>
    <ul>
        <li>de mentionner le lien vers ce repository Github, ou bien vers la page Web https://em-ilien.fr/geocartie ;</li>
        <li>de ne pas revendre le code source ;</li>
        <li>de ne pas générer des revenus à l'aide de ce code source sans en avoir reçu mon autorisation écrite (<a href="emilien@em-ilien.fr">emilien@em-ilien.fr</a>).</li>
    </ul>
    <p>Vous pouvez mettre en ligne Géocartie sur votre serveur Web et le mettre à la disposition de vos utilisateurs aux conditions mentionnés ci-dessus.</p>
    <p>Vous pouvez mettre en ligne le code source de Géocartie, que vous l'ayez édité ou non, aux mêmes conditions en veillant tout particulièrement à informer vos utilisateurs que ce code est soumis au moins aux mêmes conditions mentionnées ci-dessus.</p>
    <p>Pour toute question ou demande, je serai ravi de vous renseigner par courriel (<a href="mailto:emilien@em-ilien.fr">emilien@em-ilien.fr</a>).</p>

    <h3>Images et carte</h3>
    <p>La carte de France provient de comersis.com et les images sont issues de pages Internet.</p>
    <p>Pour toute demande d'ajout d'images, veuillez rédiger un courriel à <a href="emilien@em-ilien.fr">emilien@em-ilien.fr</a> en mentionnant le numéro de département concerné et les liens vers les images.</p>
    <p>Pour des questions de droit d'auteur, les images doivent être hébergées sur des serveurs Web par le soin des détenteurs desdits droits.</p>
</section>

<style>
    :global(*) {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    :global(body) {
        font-family: 'Roboto', 'Lato', sans-serif;
    }
    
    .legal {
        font-family: 'Roboto', 'Lato', sans-serif;
        font-size: 14px;
        line-height: 1.42857143;
        color: #333;
        background-color: #fff;
        padding: 1em 2em 20em;
    }


    h1 {
        font-size: 3em;
        margin-top: 1.5em;
    }

    h2 {
        margin: 1.5em 0 0 1em;
    }

    h3 {
        margin: 1em 0 0 1em;
    }

    ul li {
        margin-left: 3em;
        margin-top: 0.25em;
    }

    p {
        margin: 1em 0 0 1em;
    }
</style>