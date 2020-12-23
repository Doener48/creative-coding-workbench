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
	let fps = 30;
	let animationId;
	let fpsInterval, now, then, elapsed;

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
		currentSketch.drawFunction(
			ctx,
			width * dpi * dpr,
			height * dpi * dpr,
			currentSketch.settings
		);
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

	function animate(timestamp) {
		animationId = window.requestAnimationFrame(animate);
		now = Date.now();
		elapsed = now - then;
		if (elapsed > fpsInterval) {
			then = now - (elapsed % fpsInterval);
			redraw();
		}
	}
	function startAnimation(event) {
		fps = event.detail.fps;
		fpsInterval = 1000 / fps;
		then = Date.now();
		window.requestAnimationFrame(animate);
	}
	function stopAnimation() {
		window.cancelAnimationFrame(animationId);
	}
</script>

<style>
	.board {
		margin: 0;
		padding: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 1rem;
	}
	canvas {
		width: 100%;
	}
	.content {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 100vh;
	}
</style>

<svelte:head>
	<title>Generative-Pieces</title>
</svelte:head>

<div class="content">
	<SketchesPanel {sketches} on:selected={sketchSelected} />
	<div class="board"><canvas id="drawing" bind:this={cvs} /></div>
	<SettingsPanel
		settings={currentSketch.settings}
		{width}
		{height}
		title={currentSketch.name}
		{fps}
		on:redraw={redraw}
		on:download={download}
		on:resize={resize}
		on:cancelAnimation={stopAnimation}
		on:startAnimation={startAnimation} />
</div>
