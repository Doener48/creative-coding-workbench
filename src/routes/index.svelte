<script lang="ts">
	import { onMount } from "svelte";
	import SettingsPanel from "../components/SettingsPanel.svelte";
	import SketchesPanel from "../components/SketchesPanel.svelte";
	import type { Sketch } from "../sketches/model";
	import { sketches } from "../sketches";

	let currentSketch: Sketch = sketches[0];
	let cvs;
	let ctx;
	let dpr;
	//x inch in 300dpi => print size
	let dpi = 300;
	let width = 2;
	let height = 2;
	onMount(() => {
		ctx = cvs.getContext("2d");
		dpr = window.devicePixelRatio;
		init();
	});
	function download() {
		const durl = cvs.toDataURL();
		const a = document.createElement("a");
		a.href = durl;
		a.setAttribute("download", "SketchDownload");
		a.click();
	}
	function redraw() {
		currentSketch.drawFunction(ctx, width*dpi*dpr, height*dpi*dpr, currentSketch.settings);
	}
	function sketchSelected(event) {
		currentSketch = event.detail.sketch;
		redraw();
	}
	function init() {
		cvs.width = width * dpi * dpr;
		cvs.height = height * dpi * dpr;
		ctx.scale(dpr, dpr);
		ctx.lineJoin = "bevel";
		ctx.fillStyle = "#000000";
		redraw();
	}
	function resize(event) {
		width = event.detail.width;
		height = event.detail.height;
		init();
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
		width: 600px;
		height: 600px;
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
	<SettingsPanel
		settings={currentSketch.settings}
		width={width}
		height={height}
		on:redraw={redraw}
		on:download={download} 
		on:resize={resize}
		/>
</div>
