<script lang="ts">
	export let items: string[];
	export let name: string;

	let el: HTMLImageElement[] = [];

	function handle_click(i: number) {}

	async function clear() {}
</script>

<div class="divider" />
<h2>{name}</h2>
<div class="container">
	{#each items as src, i}
		<div class="box">
			<img
				class="img"
				{src}
				alt=""
				on:click={() => handle_click(i)}
				bind:this={el[i]}
			/>
		</div>
	{/each}
</div>

<style>
	.container {
		overflow-x: scroll;
		display: flex;
		flex-shrink: 0;
		scrollbar-width: none;
	}

	.divider {
		border-bottom: #333 solid 1px;
		margin: 0rem 1.5rem 0 1.5rem;
	}

	.container::-webkit-scrollbar {
		display: none;
	}

	.img {
		display: block;
		height: calc(100vw / 2 - 2.25rem);
		width: calc(100vw / 2 - 2.25rem);
		border-radius: 3px;
		margin: 0.5rem 0.2rem 1rem 1.5rem;
	}

	.box {
		width: calc(50vw - 0.75rem);
		flex-shrink: 0;
	}

	.box:last-child {
		margin-right: 1.5rem;
	}

	h2 {
		margin: 0.5rem 1.5rem 0 1.5rem;
		font-size: var(--text-large);
		font-weight: 300;
	}
</style>
