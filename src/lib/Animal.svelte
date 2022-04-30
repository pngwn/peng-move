<script lang="ts">
	import { spring } from 'svelte/motion';

	export let items: string[];
	export let name: string;

	let el: HTMLImageElement[] = [];
	let ww: number = 0;
	let wh: number = 0;

	interface Active {
		index: number;
		left: string;
		top: string;
		origin: string;
	}

	let overlay = false;
	let active_el: Active = {
		index: -1,
		left: '0',
		top: '0',
		origin: '0 0'
	};

	let scale = spring(1);
	let opacity = spring(0, { stiffness: 0.2, damping: 1 });

	function handle_click(i: number) {
		if (el[i] === null) return;

		const styles = window.getComputedStyle(el[i]);
		const top_offset = parseInt(
			styles.getPropertyValue('margin-top')
		);
		const left_offset = parseInt(
			styles.getPropertyValue('margin-left')
		);

		const { left, right, top, bottom, width } =
			el[i].getBoundingClientRect();
		let pos = [
			left < ww - right ? 0 : 100,
			top < wh - bottom ? 0 : 100
		];

		active_el.index = i;
		active_el.left = `${left - left_offset}px`;
		active_el.top = `${top - top_offset}px`;
		active_el.origin = `${pos[0]}% ${pos[1]}%`;

		overlay = !overlay;

		requestAnimationFrame(() => {
			scale.set((ww - 2 - left_offset * 2) / width);
			opacity.set(0.95);
		});
	}

	async function clear() {
		requestAnimationFrame(async () => {
			await Promise.all([scale.set(1), opacity.set(0)]);

			active_el = {
				index: -1,
				left: '0',
				top: '0',
				origin: '0 0'
			};
			overlay = false;
		});
	}
</script>

<div
	class="overlay"
	on:click={clear}
	style:opacity={$opacity}
	style:pointer-events={overlay ? 'auto' : 'none'}
	bind:clientWidth={ww}
	bind:clientHeight={wh}
/>

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
				style:position={active_el.index === i
					? 'fixed'
					: 'static'}
				style:left={active_el.index === i ? active_el.left : 0}
				style:top={active_el.index === i ? active_el.top : 0}
				style:transform-origin={active_el.index === i
					? active_el.origin
					: 0}
				style:transform="scale({active_el.index === i
					? $scale
					: 1})"
				style:pointer-events={active_el.index === i && overlay
					? 'none'
					: 'auto'}
				style:z-index={active_el.index === i ? '12' : '1'}
			/>
		</div>
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
		scroll-snap-align: start;
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

	.overlay {
		position: fixed;
		z-index: 12;
		top: -1px;
		left: -1px;
		right: -1px;
		bottom: -1px;
		background: black;
		margin: auto;
		pointer-events: none;
	}
</style>
