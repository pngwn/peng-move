<script lang="ts">
	import Category from './Category.svelte';

	interface Category {
		title: string;
		subtitle: string;
		image: string;
	}
	export let items: Category[];
</script>

<div class="container">
	{#each items as item}
		<Category {...item} on:animal_select />
	{/each}
</div>

<style>
	.container {
		scroll-snap-type: x mandatory;
		overflow-x: scroll;
		display: flex;
		flex-shrink: 0;
		scrollbar-width: none;
	}

	.container::-webkit-scrollbar {
		display: none;
	}
</style>
