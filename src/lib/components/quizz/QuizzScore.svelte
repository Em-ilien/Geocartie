<script>
	import { fade } from 'svelte/transition';
	import { departments } from '../../../routes/france/departments/data';

	export let score;

	let totalLandmarks = departments.length;

	$: totalAnswers = score.goodAnswers + score.wrongAnswers;
	$: scoreStr = `${score.goodAnswers} / ${totalAnswers}`;
	$: successRate = Math.round((score.goodAnswers / (totalAnswers != 0 ? totalAnswers : 1)) * 100);

	let scoreHeight = 0;
	let scoreWidth = 0;
	let tooltipWidth = 0;

	let scoreIsHovered = false;

	$: topTooltip = () => {
		return `${scoreHeight}px`;
	};

	function onMouseEnter() {
		scoreIsHovered = true;
	}
	function onMouseLeave() {
		scoreIsHovered = false;
	}
</script>

<div
	class="score"
	title={null}
	on:mouseenter={onMouseEnter}
	on:focus={onMouseEnter}
	on:mouseleave={onMouseLeave}
	on:blur={onMouseLeave}
	bind:offsetHeight={scoreHeight}
	bind:offsetWidth={scoreWidth}
	role={null}
>
	<div class="style-ctn">
		<span>
			{scoreStr}
		</span>
	</div>
	{#if scoreIsHovered}
		<div
			class="score-popover"
			style:top={topTooltip()}
			bind:offsetWidth={tooltipWidth}
			on:mouseenter={onMouseLeave}
			in:fade
			out:fade={{ duration: 250 }}
			role="tooltip"
		>
			<h1>Progression : {Math.round((score.goodAnswers / totalLandmarks) * 100)} %</h1>
			<p>
				Vous avez retrouvé <b class="green">{score.goodAnswers} département{totalAnswers > 1 ? 's' : ''}</b> sur
				<b>{totalLandmarks}</b>.
			</p>
			<p>
				Vous avez commis <b class="red">{score.wrongAnswers} erreur{score.wrongAnswers > 1 ? 's' : ''}</b>, soit
				un taux de réussite est de
				<b class="green">{successRate} %</b>.
			</p>
		</div>
	{/if}
</div>

<style>
	.score {
		min-width: max-content;
		padding: 1.15em 1em;
		height: 100%;
		display: flex;
		align-items: center;
		cursor: pointer;
	}

	.score .style-ctn {
		padding-bottom: 0.125em;
		border-bottom: 2px dotted #226bc2bb;
		position: relative;
		top: 0.125em;
	}

	.score-popover {
		position: absolute;
		margin-left: -1em;
		z-index: 2;
		padding: 1em;
		box-shadow: 1px 1px 0.5em 0 #00000050;
		border-radius: 0.5em;
		background: #fff;
		width: max-content;
		max-width: 100vw;
	}

	.score-popover p {
		margin: 0.5em 0;
	}

	h1 {
		color: #226bc2;
		font-size: 1.25em;
	}

	b {
		font-weight: 600;
		color: #363636;
	}

	.green {
		color: #30b730;
	}

	.red {
		color: #da2b2b;
	}
</style>
