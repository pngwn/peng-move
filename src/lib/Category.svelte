<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let title: string;
	export let subtitle: string;
	export let image: string;

	const dispatch = createEventDispatcher<{
		animal_select: string;
	}>();
</script>

<div
	class="box"
	on:click={() => dispatch('animal_select', title)}
>
	<p class="sub">{subtitle}</p>
	<h2>{title}</h2>

	<img src={image} alt="" class="img" />
</div>

<style>
	.img {
		border-radius: 3px;
		margin: 0.5rem 1.5rem 1rem 1.5rem;
		transform-origin: 50% 0;
		width: calc(100% - 3rem);
	}

	.box {
		width: 100%;
		flex-shrink: 0;
		margin-left: -2rem;
		position: relative;
	}

	.box:first-child {
		margin-left: 0;
	}

	h2 {
		margin: 0rem 1.5rem 0 1.5rem;
		font-size: var(--text-large);
		font-weight: 300;
	}
	.sub {
		margin: 0.5rem 1.5rem 0 1.5rem;
		font-weight: 600;
		font-size: var(--text-small);
		text-transform: uppercase;
		color: #aaa;
	}
</style>
