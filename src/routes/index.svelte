<script lang="ts">
	import { onMount } from "svelte";
	let cvs;
	let ctx;
	onMount(() => {
		ctx = cvs.getContext("2d");
		let size = 23*300; //23inch in 300dpi => print size for pillow
		let dpr = window.devicePixelRatio;
		cvs.width = size * dpr;
		cvs.height = size * dpr;
		ctx.scale(dpr, dpr);
		ctx.lineJoin = "bevel";
		ctx.fillStyle = "#000000";

		let line;
		let lines = [];
		let gap = size / 12;
		let alternate = false;

		for (let y = gap / 2; y <= size; y += gap) {
			line = [];
			alternate = !alternate;
			for (let x = gap / 4; x <= size; x += gap) {
				line.push({
					x: x + (Math.random() * 0.8 - 0.4) * gap + (alternate ? gap / 2 : 0),
					y: y + (Math.random() * 0.8 - 0.4) * gap,
				});
			}
			lines.push(line);
		}

		let dotLine;
		alternate = true;

		function drawTriangle(pointA, pointB, pointC) {
			ctx.beginPath();
			ctx.moveTo(pointA.x, pointA.y);
			ctx.lineTo(pointB.x, pointB.y);
			ctx.lineTo(pointC.x, pointC.y);
			ctx.lineTo(pointA.x, pointA.y);
			ctx.closePath();
			let gray = Math.floor(Math.random() * 16).toString(16);
			ctx.fillStyle = "#" + gray + gray + gray;
			ctx.stroke();
			ctx.fill();
		}

		for (let y = 0; y < lines.length - 1; y++) {
			alternate = !alternate;
			dotLine = [];
			for (let i = 0; i < lines[y].length; i++) {
				dotLine.push(alternate ? lines[y][i] : lines[y + 1][i]);
				dotLine.push(alternate ? lines[y + 1][i] : lines[y][i]);
			}
			for (let i = 0; i < dotLine.length - 2; i++) {
				drawTriangle(dotLine[i], dotLine[i + 1], dotLine[i + 2]);
			}
		}
	});
	function download() {
		console.log("download");
		const durl = cvs.toDataURL();
		const a = document.createElement("a");
		a.href = durl;
		a.setAttribute("download", 'SketchDownload');
		a.click();
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
		width: 800px;
		height: 800px;
	}
	.download-btn {
		position: absolute;
	}
</style>

<svelte:head>
	<title>UniquePieces</title>
</svelte:head>

<button class="download-btn" on:click={download}>download</button>
<div class="board"><canvas id="drawing" bind:this={cvs} /></div>

