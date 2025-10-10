import * as Tone from 'tone';

// Create a simple synth
const synth = new Tone.Synth().toDestination();

// Audio context starter
document.addEventListener('click', async () => {
    await Tone.start();
    console.log("Audio context started");
}, { once: true }); // Only run once

// Function to play branch-specific sounds
export function playBranchSound(branch) {
    // Map branch angle to frequency (200Hz to 800Hz)
    const frequency = 200 + (Math.abs(branch.angle) / Math.PI) * 600;

    // Map generation to note duration (deeper = longer notes)
    const duration = Math.max(0.1, 0.8 - (branch.generation * 0.1));

    // Play the note
    synth.triggerAttackRelease(frequency, duration);

    console.log(`Playing branch sound: ${frequency.toFixed(1)}Hz for ${duration}s (gen ${branch.generation})`);

}

// Synth for pruning
export const prunesynth = new Tone.MembraneSynth({
    pitchDecay: 0.05,
    octaves: 4,
    // Play with the shape
    oscillator: { type: 'square' },
    // This is a standard ADSR envelope
     envelope: { attack: 0.001, decay: 0.2, sustain: 0.01, release: 0.5 }
}).toDestination();

// Function for pruning sound
export function playPruneSound() {
    // Low, percussive, "snip" sound
    prunesynth.triggerAttackRelease('C2', '8n');
    console.log("🪚 Pruning sound!");
}