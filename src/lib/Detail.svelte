<script lang="ts">
	import { fly } from 'svelte/transition';
	import { createEventDispatcher } from 'svelte';
	import { categories as _categories } from '$lib/data';

	export let category: string;
	export let categories: Array<[string, string[]]>;

	$: current_index = categories.findIndex(
		([s]) => s === category
	);
	$: curr = categories[current_index];

	const dispatch = createEventDispatcher<{ back: undefined }>();
</script>

<div
	class="box"
	transition:fly={{ x: 500, opacity: 1, duration: 250 }}
>
	<img
		src={_categories.find((x) => x.title === curr[0])?.image}
		alt=""
		on:click={() => dispatch('back')}
	/>

	<div class="wrap">
		{#each curr[1] as src}
			<div>
				<img class="img" {src} alt="" />
			</div>
		{/each}
	</div>
</div>

<style>
	.box {
		width: 100%;
		height: 100;
		position: absolute;
		top: 0;
		background: #111;
		z-index: 99;
	}

	.wrap {
		display: flex;
		flex-wrap: wrap;
	}

	.img {
		display: block;
		height: calc(100vw / 2 - 2.25rem);
		width: calc(100vw / 2 - 2.25rem);
		border-radius: 3px;
		margin: 0.5rem 0.2rem 1rem 1.5rem;
	}
</style>
