<script lang="ts">
	let settings = { var1: false, var2: "hello", var3: 55 };
	function getGUIelement(key: string) {
		const element = settings[key];
		return `${typeof element} = ${element}`;
	}
</script>

<style>
</style>

<svelte:head>
	<title>page2</title>
</svelte:head>

<h1>page2!</h1>
<ul>
	{#each Object.keys(settings) as key}
		<li>
			{key}:
			{#if typeof settings[key] === 'boolean'}
				<input type="checkbox" bind:checked={settings[key]} />
			{:else if typeof settings[key] === 'number'}
				<input type="number" bind:value={settings[key]} />
				{:else}
				<input type="text" bind:value={settings[key]} />

			{/if}
		</li>
	{/each}
</ul>
