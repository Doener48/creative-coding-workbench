<script>
	import { onMount } from "svelte";
	let cvs;
	onMount(() => {
		const ctx = cvs.getContext("2d");
		let size = window.innerWidth;
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
			ctx.fill();
			ctx.stroke();
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
</script>

<style>
	.board {
		margin: 0;
		padding: 0;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	/* canvas {
		width: 400px;
		height: 400px;
	} */
</style>

<svelte:head>
	<title>UniquePieces</title>
</svelte:head>

<div class="board"><canvas bind:this={cvs} /></div>
