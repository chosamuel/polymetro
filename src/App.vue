<template>
	<div id="app">
		<vue-p5 @setup="setup" @draw="draw"></vue-p5>
		<div>
			<div class="clickable unselectable" @click="dec1">-1</div>
			<div class="clickable unselectable" @click="dec10">-10</div>
			<div class="clickable unselectable" @click="inc10">+10</div>
			<div class="clickable unselectable" @click="inc1">+1</div>
			<div
				class="tempo-display"
				@click="toggleTempoInput"
				v-if="!tempoInput"
			>
				{{ tempo }}
			</div>
			<input
				v-if="tempoInput"
				class="tempo-display"
				v-model="tempo"
				@keyup.enter="toggleTempoInput"
			/>
			<div @click="toggle" v-if="!toggled" class="clickable unselectable">
				PLAY
			</div>
			<div @click="toggle" v-if="toggled" class="clickable unselectable">
				STOP
			</div>
		</div>
	</div>
</template>

<script>
import VueP5 from "vue-p5";
import p5 from "p5";
import "p5/lib/addons/p5.sound";

export default {
	name: "App",
	components: {
		"vue-p5": VueP5
	},
	data: () => ({
		wave: null,
		toggled: false,
		tempoInput: false,
		tempo: 60,
		id: null,
		interval: null
	}),

	methods: {
		setup(sketch) {
			var canvas = sketch.createCanvas(400, 400);
			canvas.style("display", "none");
			this.wave = new p5.Oscillator();
			this.wave.freq(1175);
			this.wave.amp(0);
		},
		draw() {},
		toggle() {
			this.toggled = !this.toggled;
			if (this.toggled) {
				this.wave.start();
				this.bang();
			}

			if (!this.toggled) {
				clearTimeout(this.id);
				this.wave.stop();
			}
		},
		bang() {
			this.interval = (60 / this.tempo) * 1000;
			this.wave.amp(1);
			setTimeout(() => {
				this.wave.amp(0);
			}, 40);
			this.id = setTimeout(this.bang, this.interval);
		},
		inc10() {
			this.tempo += 10;
		},
		dec10() {
			this.tempo -= 10;
		},
		inc1() {
			this.tempo += 1;
		},
		dec1() {
			this.tempo -= 1;
		},
		toggleTempoInput() {
			this.tempoInput = !this.tempoInput;
		}
	}
};
</script>

<style>
.unselectable {
	-webkit-user-select: none; /* Safari */
	-moz-user-select: none; /* Firefox */
	-ms-user-select: none; /* IE10+/Edge */
	user-select: none; /* Standard */
}
.clickable {
	margin: 20px;
	padding: 20px;
	border: solid black;
	border-radius: 10%;
	display: block;
	cursor: pointer;
	text-align: center;
}
.tempo-display {
	text-align: center;
	font-size: 3rem;
	background: lightgreen;
}
</style>
