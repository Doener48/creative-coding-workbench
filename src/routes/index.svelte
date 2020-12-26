<script context="module">
	export async function preload(page, session) {
		const { dev } = session;
		return { isDev: dev };
	}
</script>

<script lang="ts">
	import { onMount } from "svelte";
	import SettingsPanel from "../components/SettingsPanel.svelte";
	import SketchesPanel from "../components/SketchesPanel.svelte";
	import type { DrawFunc, Sketch } from "../sketches/model";
	import { sketches } from "../sketches";
	import {
		EditorState,
		EditorView,
		basicSetup,
	} from "@codemirror/next/basic-setup";
	import { javascript } from "@codemirror/next/lang-javascript";
	import { oneDark } from "@codemirror/next/theme-one-dark";

	export let isDev: Boolean;
	let currentSketch: Sketch = sketches[0];
	let cvs;
	let code;
	let codeView: EditorView;
	let ctx;
	let dpr;
	const dpi = 300;
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
	function exportImage() {
		const downloadUrl = cvs.toDataURL();
		const a = document.createElement("a");
		a.href = downloadUrl;
		const date = new Date().toISOString();
		a.setAttribute("download", `Sketch_${date}.png`);
		a.click();
	}
	function importSettings(event) {
		let reader = new FileReader();

		reader.readAsText(event.detail.file);

		reader.onload = function () {
			if (typeof reader.result === 'string') {
				const loadedSettings = JSON.parse(reader.result)
				if (loadedSettings.name === currentSketch.name) {
					currentSketch.settings = loadedSettings.settings;
					redraw();
				}
				else{
					alert('settings don\'t match sketch');
				}
			}
		};
	}
	function exportSettings() {
		var dataStr =
			"data:text/json;charset=utf-8," +
			encodeURIComponent(currentSketch.getExportJSON());
		var a = document.createElement("a");
		a.href = dataStr;
		const date = new Date().toISOString();
		a.setAttribute("download", `Settings_${date}.json`);
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
		codeView.setState(
			EditorState.create({
				doc: currentSketch.drawFunction.toString(),
				extensions: [basicSetup, javascript(), oneDark],
			})
		);
	}
	function init() {
		cvs.width = width * dpi * dpr;
		cvs.height = height * dpi * dpr;
		ctx.scale(dpr, dpr);
		ctx.lineJoin = "bevel";
		ctx.fillStyle = "#000000";
		redraw();
		codeView = new EditorView({
			state: EditorState.create({
				doc: currentSketch.drawFunction.toString(),
				extensions: [basicSetup, javascript(), oneDark],
			}),
			parent: code,
		});
	}
	function resize(event) {
		width = event.detail.width;
		height = event.detail.height;
		init();
	}

	function animate() {
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
	function toggleCode(event) {
		cvs.classList.toggle("hide");
		code.classList.toggle("hide");
		if (!event.detail.viewCode) {
			const newfunc = codeView.state.doc.toString();
			const params = newfunc
				.substring(newfunc.indexOf("(") + 1, newfunc.indexOf(")"))
				.split(",");
			const body = newfunc.substring(
				newfunc.indexOf("{") + 1,
				newfunc.lastIndexOf("}")
			);
			currentSketch.drawFunction = new Function(...params, body) as DrawFunc;
			redraw();
		}
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
		width: 600px;
		height: 600px;
	}
	.hide {
		display: none;
	}
	.code-mirror {
		width: 600px;
		height: 600px;
		overflow: auto;
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
	<div class="board">
		<canvas id="drawing" bind:this={cvs} />
		{#if isDev}
			<div class="code-mirror hide" bind:this={code} />
		{/if}
	</div>
	<SettingsPanel
		settings={currentSketch.settings}
		{width}
		{height}
		title={currentSketch.name}
		{fps}
		showCodeBtn={isDev}
		on:redraw={redraw}
		on:download={exportImage}
		on:export={exportSettings}
		on:import={importSettings}
		on:resize={resize}
		on:cancelAnimation={stopAnimation}
		on:startAnimation={startAnimation}
		on:toggleCode={toggleCode} />
</div>
