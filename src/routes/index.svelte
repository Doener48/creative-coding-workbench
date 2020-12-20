<script lang="ts">
	import { onMount } from "svelte";
	import SettingsPanel from "../components/SettingsPanel.svelte";
	import SketchesPanel from "../components/SketchesPanel.svelte";
	import type { Sketch } from "./sketch";
	import { sketches } from "./sketches";

	let currentSketch: Sketch = sketches[0];
	let cvs;
	let ctx;
	let size = 23 * 300; //23inch in 300dpi => print size for pillow
	onMount(() => {
		ctx = cvs.getContext("2d");
		let dpr = window.devicePixelRatio;
		cvs.width = size * dpr;
		cvs.height = size * dpr;
		ctx.scale(dpr, dpr);
		ctx.lineJoin = "bevel";
		ctx.fillStyle = "#000000";

		currentSketch.drawFunction(ctx, size, size, currentSketch.settings);
	});
	function download() {
		const durl = cvs.toDataURL();
		const a = document.createElement("a");
		a.href = durl;
		a.setAttribute("download", "SketchDownload");
		a.click();
	}

	function redraw() {
		currentSketch.drawFunction(ctx, size, size, currentSketch.settings);
	}
	function sketchSelected(event) {
		currentSketch = event.detail.sketch;
		redraw()
	}
</script>

<style>
	.board {
		margin: 0;
		padding: 0;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	canvas {
		width: 500px;
		height: 500px;
	}
	.content {
		display: flex;
		justify-content: space-between;
		height: 100%;
	}
</style>

<svelte:head>
	<title>UniquePieces</title>
</svelte:head>

<div class="content">
	<SketchesPanel {sketches} on:selected={sketchSelected} />
	<div class="board"><canvas id="drawing" bind:this={cvs} /></div>
	<SettingsPanel settings={currentSketch.settings} on:redraw={redraw} on:download={download}/>
</div>
