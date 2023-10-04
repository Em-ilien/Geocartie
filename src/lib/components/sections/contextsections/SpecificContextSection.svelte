<script>
    import { page } from "$app/stores";
    import ContextSection from "./ContextSection.svelte";
    import ContactContextSection from "./ContactContextSection.svelte";
    import DefaultContextSection from "./DefaultContextSection.svelte";
    import LegalContextSection from "./LegalContextSection.svelte";
    import DepartmentContextSection from "./DepartmentContextSection.svelte";

    export let data;

    function urlPathContains(path) {
        return $page.url.pathname.includes(path);
    }
</script>


{#if urlPathContains("/contact")}
    <ContactContextSection />
{:else if urlPathContains("/legal")}
    <LegalContextSection />
{:else if urlPathContains("/france/departments/")}
    <DepartmentContextSection department={data.department}/>
{:else}
    <DefaultContextSection />
{/if}