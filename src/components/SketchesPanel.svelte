<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import type { Sketch } from "../sketches/model";
	export let sketches: Sketch[];
	const dispatch = createEventDispatcher();
	function select(index: number) {
		dispatch("selected", { sketch: sketches[index] });
	}
</script>

<style>
	.panel-container {
		border-radius: 0 10px 10px 0;
	}

	.panel-item {
		display: flex;
		justify-content: space-between;
		margin: 0.5rem 0;
		cursor:pointer;
	}
	.panel-item:hover {
		background: #333;
	}

	h3 {
		text-decoration: underline;
	}
</style>

<div class="panel-container">
	<h3>Sketches</h3>
	{#each sketches as s, i}
		<div class="panel-item" on:click={() => select(i)}>{s.name}</div>
	{/each}
</div>
