/**
 * NexusAuth Celebration & Flower Shower Animation Engine
 */

class CelebrationEngine {
  constructor(canvasId = 'celebration-canvas') {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas ? this.canvas.getContext('2d') : null;
    this.particles = [];
    this.animationFrame = null;
    this.flowers = ['🌸', '🌺', '🌻', '🌷', '🌼', '🌹', '✨', '🍃'];
    this.colors = ['#f472b6', '#fb7185', '#fbbf24', '#34d399', '#818cf8', '#c084fc', '#fbcfe8', '#a78bfa'];
    
    this.resize();
    window.addEventListener('resize', () => this.resize());
  }

  resize() {
    if (!this.canvas) return;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  /**
   * Triggers a magnificent flower shower & confetti burst
   */
  startCelebration(durationMs = 5000) {
    if (!this.canvas || !this.ctx) return;
    
    this.resize();
    this.particles = [];

    // Create 70 flower and confetti particles
    const particleCount = 80;
    for (let i = 0; i < particleCount; i++) {
      const isEmojiFlower = Math.random() > 0.4;
      this.particles.push({
        isEmoji: isEmojiFlower,
        emoji: this.flowers[Math.floor(Math.random() * this.flowers.length)],
        color: this.colors[Math.floor(Math.random() * this.colors.length)],
        x: Math.random() * this.canvas.width,
        y: Math.random() * -this.canvas.height * 0.5 - 20,
        size: isEmojiFlower ? Math.floor(Math.random() * 16 + 20) : Math.floor(Math.random() * 8 + 6),
        speedY: Math.random() * 2.5 + 2.5,
        speedX: (Math.random() - 0.5) * 2,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 4,
        swayAmplitude: Math.random() * 30 + 10,
        swaySpeed: Math.random() * 0.03 + 0.01,
        swayOffset: Math.random() * Math.PI * 2,
        opacity: 1
      });
    }

    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }

    const startTime = Date.now();

    const render = () => {
      const elapsed = Date.now() - startTime;
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      let activeParticles = 0;

      for (const p of this.particles) {
        p.y += p.speedY;
        p.rotation += p.rotationSpeed;
        
        // Horizontal sinusoidal sway
        const currentX = p.x + Math.sin(p.y * p.swaySpeed + p.swayOffset) * p.swayAmplitude;

        // Fade out towards the bottom
        if (p.y > this.canvas.height - 100) {
          p.opacity = Math.max(0, p.opacity - 0.02);
        }

        if (p.opacity > 0 && p.y < this.canvas.height + 50) {
          activeParticles++;
          this.ctx.save();
          this.ctx.translate(currentX, p.y);
          this.ctx.rotate((p.rotation * Math.PI) / 180);
          this.ctx.globalAlpha = p.opacity;

          if (p.isEmoji) {
            this.ctx.font = `${p.size}px sans-serif`;
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            this.ctx.fillText(p.emoji, 0, 0);
          } else {
            this.ctx.fillStyle = p.color;
            this.ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 1.5);
          }

          this.ctx.restore();
        }
      }

      if (activeParticles > 0 && elapsed < durationMs + 2000) {
        this.animationFrame = requestAnimationFrame(render);
      } else {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      }
    };

    render();
  }
}

window.celebrationEngine = new CelebrationEngine();
