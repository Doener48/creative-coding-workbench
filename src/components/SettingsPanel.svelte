<script lang="ts">
	import { createEventDispatcher } from "svelte";
	const dispatch = createEventDispatcher();
	export let settings;
	export let width;
	export let height;
	function redraw() {
		dispatch("redraw");
	}
	function resize() {
		dispatch("resize", { width: width, height: height });
	}
	function download() {
		dispatch("download");
	}
</script>

<style>
	.panel-container {
		height: 100%;
		width: 300px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding: 1rem;
	}
	.panel-item {
		display: flex;
		justify-content: space-between;
		margin: 0.5rem 0;
	}
	.btn-group {
		display: flex;
		justify-content: flex-end;
	}
	button{
		margin-left: 1rem;
	}
</style>

<div class="panel-container">
	<div class="panel-item">
		<label for="canvas-width">canvas width:</label>
		<input
			type="number"
			id="canvas-width"
			name="canvas-width"
			bind:value={width} />
	</div>
	<div class="panel-item">
		<label for="canvas-height">canvas height:</label>
		<input
			type="number"
			id="canvas-height"
			name="canvas-height"
			bind:value={height} />
	</div>
	<div class="btn-group panel-item">
		<button on:click={resize}>resize</button>
		<button on:click={download}>download</button>
	</div>

	{#each Object.keys(settings) as key}
		<div class="panel-item">
			<label for={key}>{key}:</label>
			{#if typeof settings[key] === 'boolean'}
				<input type="checkbox" bind:checked={settings[key]} id={key} />
			{:else if typeof settings[key] === 'number'}
				<input type="number" bind:value={settings[key]} id={key} />
			{:else}<input type="text" bind:value={settings[key]} id={key} />{/if}
		</div>
	{/each}
	<div class="btn-group panel-item"><button on:click={redraw}>apply</button></div>
</div>
