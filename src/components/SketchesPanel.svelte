<script lang="ts">
	import type {Sketch}  from "../routes/sketch";
	export let sketches:Sketch[];
</script>

<style>
	.panel-container {
		height: 100%;
	}
	ul {
		list-style: none;
	}
</style>

<section class="panel-container">
	<ul>
		{#each sketches as s}
			<li>{s.name}</li>
		{/each}
	</ul>
</section>
