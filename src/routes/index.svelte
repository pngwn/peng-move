<script lang="ts">
	import { fly } from 'svelte/transition';

	import Categories from '$lib/Categories.svelte';
	import Animal from '$lib/Animal.svelte';
	import Detail from '$lib/Detail.svelte';

	import {
		categories,
		peng,
		giraffe,
		goose,
		bee
	} from '$lib/data';

	const animals: Array<[string, string[]]> = [
		['Penguin', peng],
		['Giraffe', giraffe],
		['Goose', goose],
		['Bee', bee]
	];

	let page: string = 'home';
	let category: string = '';

	function change_page(_page: string, cat?: string) {
		if (cat) category = cat;

		page = _page;
	}
</script>

{#if page === 'home'}
	<div
		class="wrap"
		transition:fly={{
			y: 0,
			x: -150,
			opacity: 0.5,
			duration: 250
		}}
	>
		<h1>Browse</h1>
		<div class="divider" />

		<Categories
			items={categories}
			on:animal_select={({ detail }) =>
				change_page('detail', detail)}
		/>

		<div>
			{#each animals as [name, items]}
				<Animal {items} {name} />
			{/each}
		</div>
	</div>
{:else if page === 'detail'}
	<Detail
		{category}
		categories={animals}
		on:back={() => change_page('home')}
	/>
{/if}

<style>
	h1 {
		padding-top: 2rem;
		margin: 0 1.5rem 0 1.5rem;
		font-size: var(--text-title);
		font-weight: 600;
	}

	.divider {
		border-bottom: #333 solid 1px;
		margin: 0rem 1.5rem 0 1.5rem;
	}

	.wrap {
		width: 100%;
		height: 100;
	}
</style>
