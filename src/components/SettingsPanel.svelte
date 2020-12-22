<script lang="ts">
	import { createEventDispatcher } from "svelte";
	const dispatch = createEventDispatcher();
	export let settings;
	export let width;
	export let height;
	export let title;
	export let fps;
	function redraw() {
		dispatch("redraw");
	}
	function resize() {
		dispatch("resize", { width: width, height: height });
	}
	function download() {
		dispatch("download");
	}
	function cancelAnimation() {
		dispatch("cancelAnimation");
	}
	function startAnimation() {
		dispatch("startAnimation");
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
	h3{
		text-decoration: underline;
	}
</style>

<div class="panel-container">
	<h3>Canvas</h3>
	<div class="panel-item">
		<label for="canvas-width">width inch:</label>
		<input
			type="number"
			id="canvas-width"
			name="canvas-width"
			bind:value={width} />
	</div>
	<div class="panel-item">
		<label for="canvas-height">height inch:</label>
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

	<h3>Animation</h3>
	<div class="panel-item">
		<label for="animation-fps">fps:</label>
		<input
			type="number"
			id="animation-fps"
			name="animation-fps"
			bind:value={fps} />
	</div>
	<div class="btn-group panel-item">
		<button on:click={startAnimation}>startAnimation</button>
		<button on:click={cancelAnimation}>stopAnimation</button>
	</div>

	<h3>{title}</h3>
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
