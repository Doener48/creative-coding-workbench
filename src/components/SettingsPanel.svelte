<script lang="ts">
	export let settings;
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
</section>
