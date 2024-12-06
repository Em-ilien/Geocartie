<script>
	// import Modal from '$lib/composants/numinfo/Modal.svelte';
	// import Button from '$lib/composants/Button.svelte';
	// import InputFile from '$lib/composants/numinfo/form/InputFile.svelte';
	import { onDestroy, onMount } from 'svelte';
	import { Editor } from '@tiptap/core';
	import StarterKit from '@tiptap/starter-kit';
	// import Image from '@tiptap/extension-image';
	// import Link from '@tiptap/extension-link';
	import TextAlign from '@tiptap/extension-text-align';
	import Underline from '@tiptap/extension-underline';
	import Color from '@tiptap/extension-color';
	import TextStyle from '@tiptap/extension-text-style';
	// import articlesService from '$lib/services/articlesService';
	// import InputLink from '$lib/composants/numinfo/form/InputLink.svelte';

	export let content = '';
	export let editable = true;

	export let editor = null;
	let element;

	$: {
		content;
		updateContent();
	}

	const updateContent = () => {
		if (editor && editor.isEditable) {
			editor.commands.setContent(content);
		}
	};

	let showColorDropdown = false;
	const colors = [
		['#000', '#333', '#666', '#999', '#bbb', '#fff'],
		['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'],
	];

	function toggleColorDropdown() {
		showColorDropdown = !showColorDropdown;
	}

	function setColor(color) {
		editor?.chain().focus().setColor(color).run();
		showColorDropdown = false;
	}

	onMount(() => {
		if (!element) {
			console.error('Element not ready for editor');
			return;
		}

		// Initialisation de l'Ã©diteur
		editor = new Editor({
			element,
			editable,
			extensions: [
				StarterKit,
				// Image,

				// Link.configure({ openOnClick: false, defaultProtocol: 'https' }),

				TextAlign.configure({ types: ['heading', 'paragraph'] }),
				Underline,
				Color,
				TextStyle,
			],
			content,
			onTransaction: () => {
				// force re-render so `editor.isActive` works as expected
				editor = editor;
			},
		});
	});

	onDestroy(() => {
		if (editor) {
			editor.destroy();
		}
	});

	function toggleBold() {
		editor?.chain().focus().toggleBold().run();
	}

	function toggleItalic() {
		editor?.chain().focus().toggleItalic().run();
	}

	function toggleUnderline() {
		editor?.chain().focus().toggleUnderline().run();
	}

	function setHeading(event) {
		const level = parseInt(event.target.value);
		editor?.chain().focus().toggleHeading({ level }).run();
	}

	function toggleBulletList() {
		editor?.chain().focus().toggleBulletList().run();
	}

	function toggleOrderedList() {
		editor?.chain().focus().toggleOrderedList().run();
	}

	function setTextAlign(alignment) {
		editor?.chain().focus().setTextAlign(alignment).run();
	}

	// let showAddImageModal = false;
	// function addImage() {
	// 	showAddImageModal = true;
	// }

	// async function handleImageFileSelected(event) {
	// 	const file = event.detail.file;
	// 	if (file) {
	// 		const url = await articlesService.uploadPostImage(file);
	// 		editor
	// 			?.chain()
	// 			.focus()
	// 			.setImage({
	// 				src: import.meta.env.VITE_BASE_API_URL + '/public/v1/posts/images/' + url.filepath,
	// 			})
	// 			.run();
	// 	}
	// 	showAddImageModal = false;
	// }

	// let linkModal = {
	// 	showAddLinkModal: false,
	// 	url: '',
	// };

	// function addLink() {
	// 	linkModal = {
	// 		showAddLinkModal: true,
	// 		url: editor?.isActive('link') ? editor.getAttributes('link').href : '',
	// 	};
	// }

	// async function handleAddLink() {
	// 	editor?.chain().focus().setLink({ href: linkModal.url }).run();
	// 	linkModal.showAddLinkModal = false;
	// }
</script>

<div on:keydown|capture|stopPropagation|stopImmediatePropagation>
	{#if editor && editor.isEditable}
		<div class="toolbar">
			<div>
				<!-- Undo/Redo -->
				<button
					class="icon undo"
					title="Annuler la derniÃ¨re action"
					on:click={() => editor?.chain().focus().undo().run()}
					disabled={!editor?.can().undo()}
				>
					<svg width="24" height="24" focusable="false"
						><path
							d="M17.6 10H12c-2.8 0-4.4 1.4-4.9 3.5-.4 2 .3 4 1.4 4.6a1 1 0 1 1-1 1.8c-2-1.2-2.9-4.1-2.3-6.8.6-3 3-5.1 6.8-5.1h5.6l-3.3-3.3a1 1 0 1 1 1.4-1.4l5 5a1 1 0 0 1 0 1.4l-5 5a1 1 0 0 1-1.4-1.4l3.3-3.3Z"
							fill-rule="nonzero"
						></path></svg
					>
				</button>
				<button
					class="icon redo"
					title="Refaire la derniÃ¨re action"
					on:click={() => editor?.chain().focus().redo().run()}
					disabled={!editor?.can().redo()}
				>
					<svg width="24" height="24" focusable="false"
						><path
							d="M17.6 10H12c-2.8 0-4.4 1.4-4.9 3.5-.4 2 .3 4 1.4 4.6a1 1 0 1 1-1 1.8c-2-1.2-2.9-4.1-2.3-6.8.6-3 3-5.1 6.8-5.1h5.6l-3.3-3.3a1 1 0 1 1 1.4-1.4l5 5a1 1 0 0 1 0 1.4l-5 5a1 1 0 0 1-1.4-1.4l3.3-3.3Z"
							fill-rule="nonzero"
						></path></svg
					>
				</button>
			</div>

			<div>
				<!-- Paragraph/Heading -->
				<select class="select" on:change={setHeading} title="Titre ou paragraphe">
					<option value="0">Paragraphe</option>
					<option value="1">Titre 1</option>
					<option value="2">Titre 2</option>
					<option value="3">Titre 3</option>
				</select>
			</div>
			<div>
				<!-- Text Formatting -->

				<button class:is-active={editor.isActive('bold')} class="icon" on:click={toggleBold} title="Gras"
					><svg width="24" height="24" focusable="false"
						><path
							d="M7.8 19c-.3 0-.5 0-.6-.2l-.2-.5V5.7c0-.2 0-.4.2-.5l.6-.2h5c1.5 0 2.7.3 3.5 1 .7.6 1.1 1.4 1.1 2.5a3 3 0 0 1-.6 1.9c-.4.6-1 1-1.6 1.2.4.1.9.3 1.3.6s.8.7 1 1.2c.4.4.5 1 .5 1.6 0 1.3-.4 2.3-1.3 3-.8.7-2.1 1-3.8 1H7.8Zm5-8.3c.6 0 1.2-.1 1.6-.5.4-.3.6-.7.6-1.3 0-1.1-.8-1.7-2.3-1.7H9.3v3.5h3.4Zm.5 6c.7 0 1.3-.1 1.7-.4.4-.4.6-.9.6-1.5s-.2-1-.7-1.4c-.4-.3-1-.4-2-.4H9.4v3.8h4Z"
							fill-rule="evenodd"
						></path></svg
					></button
				>
				<button
					class:is-active={editor.isActive('italic')}
					class="icon"
					on:click={toggleItalic}
					title="Italique"
					><svg width="24" height="24" focusable="false"
						><path
							d="m16.7 4.7-.1.9h-.3c-.6 0-1 0-1.4.3-.3.3-.4.6-.5 1.1l-2.1 9.8v.6c0 .5.4.8 1.4.8h.2l-.2.8H8l.2-.8h.2c1.1 0 1.8-.5 2-1.5l2-9.8.1-.5c0-.6-.4-.8-1.4-.8h-.3l.2-.9h5.8Z"
							fill-rule="evenodd"
						></path></svg
					></button
				>
				<button
					class:is-active={editor.isActive('underline')}
					class="icon"
					on:click={toggleUnderline}
					title="SoulignÃ©"
				>
					<svg width="16" height="16" viewBox="0 0 360 360" fill="none" xmlns="http://www.w3.org/2000/svg">
						<rect x="62.877" y="330" width="234.245" height="30" fill="currentColor" />
						<path
							d="M180,290c61.825,0,112.123-50.298,112.123-112.122V0h-30v177.878C262.123,223.16,225.283,260,180,260 s-82.123-36.84-82.123-82.122V0h-30v177.878C67.877,239.702,118.175,290,180,290z"
							fill="currentColor"
						/>
					</svg>
				</button>
				<button
					class:is-active={editor.isActive('link')}
					class="icon"
					on:click={toggleColorDropdown}
					title="Couleur du texte"
				>
					<svg width="24" height="24" focusable="false"
						><g fill-rule="evenodd"
							><path class="tox-icon-highlight-bg-color__color" d="M3 18h18v3H3z" fill="#000000"
							></path><path
								fill-rule="nonzero"
								d="M7.7 16.7H3l3.3-3.3-.7-.8L10.2 8l4 4.1-4 4.2c-.2.2-.6.2-.8 0l-.6-.7-1.1 1.1zm5-7.5L11 7.4l3-2.9a2 2 0 0 1 2.6 0L18 6c.7.7.7 2 0 2.7l-2.9 2.9-1.8-1.8-.5-.6"
							></path></g
						></svg
					>
					{#if showColorDropdown}
						<div class="color-dropdown">
							{#each colors as colorGroup}
								<div class="color-group">
									{#each colorGroup as color}
										<div
											class="color-option"
											style="background-color: {color};"
											on:click={() => setColor(color)}
										></div>
									{/each}
								</div>
							{/each}
						</div>
					{/if}
				</button>
			</div>

			<div>
				<!-- Text Alignment -->
				<button
					class:is-active={editor.isActive('text-align:left')}
					class="icon"
					on:click={() => setTextAlign('left')}
					title="Aligner Ã  gauche"
				>
					<svg width="24" height="24" focusable="false"
						><path
							d="M5 5h14c.6 0 1 .4 1 1s-.4 1-1 1H5a1 1 0 1 1 0-2Zm0 4h8c.6 0 1 .4 1 1s-.4 1-1 1H5a1 1 0 1 1 0-2Zm0 8h8c.6 0 1 .4 1 1s-.4 1-1 1H5a1 1 0 0 1 0-2Zm0-4h14c.6 0 1 .4 1 1s-.4 1-1 1H5a1 1 0 0 1 0-2Z"
							fill-rule="evenodd"
						></path></svg
					>
				</button>
				<button
					class:is-active={editor.isActive('text-align:center')}
					class="icon"
					on:click={() => setTextAlign('center')}
					title="Centrer"
				>
					<svg width="24" height="24" focusable="false"
						><path
							d="M5 5h14c.6 0 1 .4 1 1s-.4 1-1 1H5a1 1 0 1 1 0-2Zm3 4h8c.6 0 1 .4 1 1s-.4 1-1 1H8a1 1 0 1 1 0-2Zm0 8h8c.6 0 1 .4 1 1s-.4 1-1 1H8a1 1 0 0 1 0-2Zm-3-4h14c.6 0 1 .4 1 1s-.4 1-1 1H5a1 1 0 0 1 0-2Z"
							fill-rule="evenodd"
						></path></svg
					>
				</button>
				<button
					class:is-active={editor.isActive('text-align:right')}
					class="icon"
					on:click={() => setTextAlign('right')}
					title="Aligner Ã  droite"
					><svg width="24" height="24" focusable="false"
						><path
							d="M5 5h14c.6 0 1 .4 1 1s-.4 1-1 1H5a1 1 0 1 1 0-2Zm6 4h8c.6 0 1 .4 1 1s-.4 1-1 1h-8a1 1 0 0 1 0-2Zm0 8h8c.6 0 1 .4 1 1s-.4 1-1 1h-8a1 1 0 0 1 0-2Zm-6-4h14c.6 0 1 .4 1 1s-.4 1-1 1H5a1 1 0 0 1 0-2Z"
							fill-rule="evenodd"
						></path></svg
					></button
				>

				<button
					class:is-active={editor.isActive('text-align:justify')}
					class="icon"
					on:click={() => setTextAlign('justify')}
					title="Justifier"
				>
					<svg width="24" height="24" focusable="false"
						><path
							d="M5 5h14c.6 0 1 .4 1 1s-.4 1-1 1H5a1 1 0 1 1 0-2Zm0 4h14c.6 0 1 .4 1 1s-.4 1-1 1H5a1 1 0 1 1 0-2Zm0 4h14c.6 0 1 .4 1 1s-.4 1-1 1H5a1 1 0 0 1 0-2Zm0 4h14c.6 0 1 .4 1 1s-.4 1-1 1H5a1 1 0 0 1 0-2Z"
							fill-rule="evenodd"
						></path></svg
					></button
				>
			</div>

			<div>
				<!-- Lists -->
				<button
					class:is-active={editor.isActive('bulletList')}
					class="icon"
					on:click={toggleBulletList}
					title="Liste Ã  puces"
					><svg width="24" height="24" focusable="false"
						><path
							d="M11 5h8c.6 0 1 .4 1 1s-.4 1-1 1h-8a1 1 0 0 1 0-2Zm0 6h8c.6 0 1 .4 1 1s-.4 1-1 1h-8a1 1 0 0 1 0-2Zm0 6h8c.6 0 1 .4 1 1s-.4 1-1 1h-8a1 1 0 0 1 0-2ZM4.5 6c0-.4.1-.8.4-1 .3-.4.7-.5 1.1-.5.4 0 .8.1 1 .4.4.3.5.7.5 1.1 0 .4-.1.8-.4 1-.3.4-.7.5-1.1.5-.4 0-.8-.1-1-.4-.4-.3-.5-.7-.5-1.1Zm0 6c0-.4.1-.8.4-1 .3-.4.7-.5 1.1-.5.4 0 .8.1 1 .4.4.3.5.7.5 1.1 0 .4-.1.8-.4 1-.3.4-.7.5-1.1.5-.4 0-.8-.1-1-.4-.4-.3-.5-.7-.5-1.1Zm0 6c0-.4.1-.8.4-1 .3-.4.7-.5 1.1-.5.4 0 .8.1 1 .4.4.3.5.7.5 1.1 0 .4-.1.8-.4 1-.3.4-.7.5-1.1.5-.4 0-.8-.1-1-.4-.4-.3-.5-.7-.5-1.1Z"
							fill-rule="evenodd"
						></path></svg
					></button
				>
				<button
					class:is-active={editor.isActive('orderedList')}
					class="icon"
					on:click={toggleOrderedList}
					title="Liste numÃ©rotÃ©e"
					><svg width="24" height="24" focusable="false"
						><path
							d="M10 17h8c.6 0 1 .4 1 1s-.4 1-1 1h-8a1 1 0 0 1 0-2Zm0-6h8c.6 0 1 .4 1 1s-.4 1-1 1h-8a1 1 0 0 1 0-2Zm0-6h8c.6 0 1 .4 1 1s-.4 1-1 1h-8a1 1 0 1 1 0-2ZM6 4v3.5c0 .3-.2.5-.5.5a.5.5 0 0 1-.5-.5V5h-.5a.5.5 0 0 1 0-1H6Zm-1 8.8.2.2h1.3c.3 0 .5.2.5.5s-.2.5-.5.5H4.9a1 1 0 0 1-.9-1V13c0-.4.3-.8.6-1l1.2-.4.2-.3a.2.2 0 0 0-.2-.2H4.5a.5.5 0 0 1-.5-.5c0-.3.2-.5.5-.5h1.6c.5 0 .9.4.9 1v.1c0 .4-.3.8-.6 1l-1.2.4-.2.3ZM7 17v2c0 .6-.4 1-1 1H4.5a.5.5 0 0 1 0-1h1.2c.2 0 .3-.1.3-.3 0-.2-.1-.3-.3-.3H4.4a.4.4 0 1 1 0-.8h1.3c.2 0 .3-.1.3-.3 0-.2-.1-.3-.3-.3H4.5a.5.5 0 1 1 0-1H6c.6 0 1 .4 1 1Z"
							fill-rule="evenodd"
						></path></svg
					></button
				>
			</div>

			<!-- <div>
				<button
					class:is-active={editor.isActive('image')}
					class="icon"
					on:click={addImage}
					title="InsÃ©rer une image"
				>
					<svg width="24" height="24" focusable="false"
						><path
							d="m5 15.7 3.3-3.2c.3-.3.7-.3 1 0L12 15l4.1-4c.3-.4.8-.4 1 0l2 1.9V5H5v10.7ZM5 18V19h3l2.8-2.9-2-2L5 17.9Zm14-3-2.5-2.4-6.4 6.5H19v-4ZM4 3h16c.6 0 1 .4 1 1v16c0 .6-.4 1-1 1H4a1 1 0 0 1-1-1V4c0-.6.4-1 1-1Zm6 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"
							fill-rule="nonzero"
						></path></svg
					>
				</button>

				<button
					class:is-active={editor.isActive('link')}
					class="icon"
					on:click={addLink}
					title="InsÃ©rer un lien"
				>
					<svg width="24" height="24" focusable="false"
						><path
							d="M6.2 12.3a1 1 0 0 1 1.4 1.4l-2 2a2 2 0 1 0 2.6 2.8l4.8-4.8a1 1 0 0 0 0-1.4 1 1 0 1 1 1.4-1.3 2.9 2.9 0 0 1 0 4L9.6 20a3.9 3.9 0 0 1-5.5-5.5l2-2Zm11.6-.6a1 1 0 0 1-1.4-1.4l2-2a2 2 0 1 0-2.6-2.8L11 10.3a1 1 0 0 0 0 1.4A1 1 0 1 1 9.6 13a2.9 2.9 0 0 1 0-4L14.4 4a3.9 3.9 0 0 1 5.5 5.5l-2 2Z"
							fill-rule="nonzero"
						></path></svg
					>
				</button>
			</div> -->
		</div>

		<!-- <Modal
			bind:show={showAddImageModal}
			title="Ajouter une image"
			--background-color="#2d2d2d"
			--title-color="#ccc"
		>
			<InputFile label="Ajouter une image" accept=".jpg,.png" onFileSelected={handleImageFileSelected} />
		</Modal>

		<Modal
			bind:show={linkModal.showAddLinkModal}
			title="Ajouter un lien"
			--background-color="#2d2d2d"
			--title-color="#ccc"
			--width="600px"
		>
			<InputLink label="URL" bind:value={linkModal.url} />
			<Button label="Ajouter" on:click={handleAddLink} boStyle={true} />
		</Modal> -->
	{/if}

	<div class="editor" bind:this={element} />
</div>

<style>
	.toolbar {
		display: flex;
		align-items: center;
		flex-direction: row;
		gap: 2rem;
		background: #f9f9f9;
		padding: 0.5rem 1rem;
		border-bottom: 1px solid #ddd;
	}

	.toolbar > div {
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}

	.icon {
		font-size: 1rem;
		padding: 0.3rem;
		cursor: pointer;
		color: #333;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 5px;
		transition:
			background-color 0.2s ease,
			color 0.2s ease;
	}

	.icon:hover {
		background-color: #eaeaea;
		color: #000;
	}

	.icon.is-active {
		background-color: #ddd;
	}

	.icon.undo {
		transform: rotateY(180deg);
	}

	.select {
		padding: 0.3rem;
		font-size: 1rem;
		border: 1px solid #ddd;
		background: #f9f9f9;
		border-radius: 5px;
		outline: none;
		cursor: pointer;
	}

	.editor {
		border: 1px solid var(--border, #ddd);
		padding: var(--padding, 1rem);
		background: var(--background, #fff);
		min-height: 150px;
	}

	.editor > :global(div) {
		outline: none;
	}

	.toolbar button {
		background: none;
		border: none;
		cursor: pointer;
	}

	.toolbar button:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.color-dropdown {
		position: absolute;
		background: #ffffffdd;
		border: 1px solid #ccc;
		padding: 0.75rem;
		margin-top: -0.75rem;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		transform: translate(0, 100%);
		z-index: 100;
	}

	.color-group {
		display: flex;
		flex-direction: row;
		gap: 0.5rem;
	}

	.color-option {
		width: 20px;
		height: 20px;
		cursor: pointer;
		border-radius: 50%;
		border: 1px solid #ddd;
	}

	.editor :global(img) {
		max-width: 100%;
	}
</style>
