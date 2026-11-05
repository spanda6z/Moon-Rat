// Web Audio API synthesized cosmic ambience (zero external audio file dependencies)
class CosmicAudio {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private osc1: OscillatorNode | null = null;
  private osc2: OscillatorNode | null = null;
  private filter: BiquadFilterNode | null = null;
  private masterGain: GainNode | null = null;

  public init() {
    if (this.ctx) return;
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    this.ctx = new AudioContextClass();
  }

  public toggle(): boolean {
    if (!this.ctx) {
      this.init();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.play();
      return true;
    }
  }

  public play() {
    if (!this.ctx) return;
    try {
      this.isPlaying = true;
      const now = this.ctx.currentTime;

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.001, now);
      this.masterGain.gain.exponentialRampToValueAtTime(0.08, now + 3);

      this.filter = this.ctx.createBiquadFilter();
      this.filter.type = 'lowpass';
      this.filter.frequency.setValueAtTime(220, now);
      this.filter.Q.setValueAtTime(4, now);

      // Deep space drone 55Hz (A1)
      this.osc1 = this.ctx.createOscillator();
      this.osc1.type = 'sine';
      this.osc1.frequency.setValueAtTime(55, now);

      // Subtle celestial harmonic 110.5Hz
      this.osc2 = this.ctx.createOscillator();
      this.osc2.type = 'triangle';
      this.osc2.frequency.setValueAtTime(110.5, now);

      this.osc1.connect(this.filter);
      this.osc2.connect(this.filter);
      this.filter.connect(this.masterGain);
      this.masterGain.connect(this.ctx.destination);

      this.osc1.start();
      this.osc2.start();
    } catch (e) {
      console.warn('Audio playback not permitted yet', e);
      this.isPlaying = false;
    }
  }

  public stop() {
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;
    this.masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 1);
    setTimeout(() => {
      try {
        this.osc1?.stop();
        this.osc2?.stop();
        this.osc1?.disconnect();
        this.osc2?.disconnect();
      } catch {
        // clean
      }
      this.isPlaying = false;
    }, 1000);
  }

  public getStatus(): boolean {
    return this.isPlaying;
  }
}

export const cosmicAudio = new CosmicAudio();
