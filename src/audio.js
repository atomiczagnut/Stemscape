import * as Tone from 'tone';

document.addEventListener('click', async () => {
    await Tone.start();
    console.log("Audio context started");
});

// Create a simple synth
const synth = new Tone.Synth().toDestination();

// Play a note immediately
synth.triggerAttackRelease("C4", "8n");