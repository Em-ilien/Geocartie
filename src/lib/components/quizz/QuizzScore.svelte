<script>
	import { tooltip } from '$lib/helpers/tooltip.js';
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
	let tooltipIsHovered = false;

	$: topTooltip = () => {
		return `${scoreHeight}px`;
	};
</script>

<div
	class="score"
	title={null}
	on:mouseenter={() => (scoreIsHovered = true)}
	on:mouseleave={() =>
		setTimeout(() => {
			scoreIsHovered = false;
		}, 500)}
	bind:offsetHeight={scoreHeight}
	bind:offsetWidth={scoreWidth}
	role={null}
>
	<span>
		{scoreStr}
	</span>
</div>

{#if scoreIsHovered || tooltipIsHovered}
	<div
		class="score-tooltip"
		style:top={topTooltip()}
		bind:offsetWidth={tooltipWidth}
		on:mouseenter={() => (tooltipIsHovered = true)}
		on:mouseleave={() => {
			setTimeout(() => {
				tooltipIsHovered = false;
			}, 500);
		}}
		role={null}
	>
		<h1>Progression : {Math.round((score.goodAnswers / totalLandmarks) * 100)} %</h1>
		<p>
			Vous avez retrouvé <b class="green">{score.goodAnswers} département{totalAnswers > 1 ? 's' : ''}</b> sur
			<b>{totalLandmarks}</b>.
		</p>
		<p>
			Vous avez commis <b class="red">{score.wrongAnswers} erreur{score.wrongAnswers > 1 ? 's' : ''}</b>, soit un
			taux de réussite est de
			<b class="green">{successRate} %</b>.
		</p>
	</div>
{/if}

<style>
	.score {
		min-width: max-content;
		padding: 1.15em 1em;
		height: 100%;
		display: flex;
		align-items: center;
		cursor: pointer;
	}

	.score-tooltip {
		position: absolute;
		z-index: 100000;
		padding: 1em;
		box-shadow: 1px 1px 0.5em 0 #00000050;
		border-radius: 0.5em;
		background: #fff;
	}

	.score-tooltip p {
		margin: 0.5em 0;
	}

	h1 {
		font-size: 1.25em;
		font-weight: 600;
		margin-bottom: 0.5em;
		font-family: 'Roboto', 'Lato', sans-serif;
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
