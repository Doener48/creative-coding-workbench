<script lang="ts">
	import { createEventDispatcher } from "svelte";

	const dispatch = createEventDispatcher();
	export let settings;
	function redraw() {
		dispatch("redraw");
	}
	function download() {
		dispatch("download");
	}
</script>

<style>
	.panel-container {
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	ul {
		list-style: none;
		padding: 0;
	}
</style>

<section class="panel-container">
	<ul>
		{#each Object.keys(settings) as key}
			<li>
				{key}:
				{#if typeof settings[key] === 'boolean'}
					<input type="checkbox" bind:checked={settings[key]} />
				{:else if typeof settings[key] === 'number'}
					<input type="number" bind:value={settings[key]} />
				{:else}<input type="text" bind:value={settings[key]} />{/if}
			</li>
		{/each}
	</ul>
		<button on:click={redraw}>apply</button>
		<button on:click={download}>download</button>

</section>
