<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import type { Sketch } from "../sketches/model";
	export let sketches: Sketch[];
	const dispatch = createEventDispatcher();
	function select(index:number) {
		dispatch("selected",{sketch: sketches[index]});
	}
</script>

<style>
	.panel-container {
		height: 100%;
		display: flex;
		flex-direction: column;
		padding: 1rem;
	}
	ul {
		list-style: none;
		padding: 0;
	}

	li {
		cursor: pointer;
		padding: 0.5rem;
		padding-left: 0;
	}

	li:hover{
		background: #eee;
	}

	h3{
		text-decoration: underline;
			}
</style>

<div class="panel-container">
	<h3>Sketches</h3>
	<ul>
		{#each sketches as s,i}
			<li on:click="{()=>select(i)}">{s.name}</li>
		{/each}
	</ul>
</div>
