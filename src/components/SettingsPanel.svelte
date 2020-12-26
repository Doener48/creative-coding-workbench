<script lang="ts">
	import { createEventDispatcher } from "svelte";
	const dispatch = createEventDispatcher();
	export let settings;
	export let width;
	export let height;
	export let title;
	export let fps;
	export let showCodeBtn;
	let viewCode = false;
	let importedSetting;
	function redraw() {
		dispatch("redraw");
	}
	function resize() {
		dispatch("resize", { width: width, height: height });
	}
	function download() {
		dispatch("download");
	}
	function exportSettings() {
		dispatch("export");
	}
	function importSettings() {
		dispatch("import", { file: importedSetting.files[0] });
	}
	function cancelAnimation() {
		dispatch("cancelAnimation");
	}
	function startAnimation() {
		dispatch("startAnimation", { fps: fps });
	}
	function toggleCode() {
		viewCode = !viewCode;
		dispatch("toggleCode", { viewCode: viewCode });
	}
</script>

<style>
	.panel-container {
		justify-content: space-between;
		border-radius: 10px 0 0 10px;
	}
	.panel-item {
		display: flex;
		justify-content: space-between;
		margin: 0.5rem 0;
	}
	button {
		margin-bottom: 0.5rem;
		background-color: #fff;
		color: #333;
		border-color: #fff;
		border-style: solid;
		border-radius: 5px;
		padding: 0.5rem;
		text-transform: uppercase;
	}
	h3 {
		text-decoration: underline;
	}
	input[type="number"] {
		background: #666;
		color: #fff;
		border-color: #fff;
		border-style: solid;
		border-radius: 5px;
		padding-left: 0.5rem;
	}
	input[type="text"] {
		background: #666;
		color: #fff;
		border-color: #fff;
		border-style: solid;
		border-radius: 5px;
		padding-left: 0.5rem;
	}
</style>

<div class="panel-container">
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
	<button on:click={redraw}>apply</button>

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
	<button on:click={resize}>resize</button>
	<button on:click={download}>download</button>

	{#if showCodeBtn}
		<button on:click={toggleCode}>toggle code/canvas</button>
	{/if}

	<h3>Animation</h3>
	<div class="panel-item">
		<label for="animation-fps">fps:</label>
		<input
			type="number"
			id="animation-fps"
			name="animation-fps"
			bind:value={fps} />
	</div>
	<button on:click={startAnimation}>start</button>
	<button on:click={cancelAnimation}>stop</button>

	<h3>Settings</h3>
	<div class="panel-item">
		<input
			type="file"
			name="import-file"
			id="import-file"
			accept="application/json"
			bind:this={importedSetting} />
	</div>
	<button on:click={importSettings}>import</button>
	<button on:click={exportSettings}>export</button>
</div>
