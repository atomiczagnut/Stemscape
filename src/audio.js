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

    console.log(`Playing branch sound: ${frequency}.toFixed(1)Hz for ${duration}s (gen ${branch.generation})`);
    
}