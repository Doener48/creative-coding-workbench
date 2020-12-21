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
	}
	ul {
		list-style: none;
	}

	li {
		cursor: pointer;
	}
</style>

<section class="panel-container">
	<ul>
		{#each sketches as s,i}
			<li on:click="{()=>select(i)}">{s.name}</li>
		{/each}
	</ul>
</section>
