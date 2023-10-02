<script>
    import { page } from "$app/stores";
    import ContactContextSection from "./ContactContextSection.svelte";
  import ContextSection from "./ContextSection.svelte";
    import DefaultContextSection from "./DefaultContextSection.svelte";
    import LegalContextSection from "./LegalContextSection.svelte";

    export let dataState;

    function urlPathContains(path) {
        return $page.url.pathname.includes(path);
    }
</script>


{#if urlPathContains("/contact")}
    <ContactContextSection />
{:else if urlPathContains("/legal")}
    <LegalContextSection />
{:else if dataState == null}
    <DefaultContextSection bind:dataState={dataState}/>
{:else if dataState == "loading"}
    <ContextSection>
        <div class="loading">
            <h1>Chargement</h1>
            <p>Chargement des données en cours...</p>
        </div>
    </ContextSection>
{:else if dataState == "error"}
    <ContextSection>
        <div class="error">
            <h1>Erreur</h1>
            <p>Une erreur est survenue lors du chargement des données.</p>
            <p>Veuillez réessayer plus tard.</p>
        </div>
    </ContextSection>
{/if}