import { useEffect, useRef } from 'react';

export default function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Create stars
    const starCount = Math.min(140, Math.floor((width * height) / 12000));
    const stars: {
      x: number;
      y: number;
      radius: number;
      baseAlpha: number;
      alpha: number;
      speed: number;
      twinkleSpeed: number;
      phase: number;
      color: string;
    }[] = [];

    const colors = ['#ffffff', '#fef08a', '#e0f2fe', '#bae6fd', '#fed7aa'];

    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.5 + 0.4,
        baseAlpha: Math.random() * 0.7 + 0.2,
        alpha: Math.random() * 0.7 + 0.2,
        speed: Math.random() * 0.15 + 0.03,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        phase: Math.random() * Math.PI * 2,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    // Shooting stars
    const meteors: {
      x: number;
      y: number;
      length: number;
      speed: number;
      alpha: number;
      active: boolean;
    }[] = [];

    const spawnMeteor = () => {
      if (Math.random() > 0.985 && meteors.filter(m => m.active).length < 2) {
        meteors.push({
          x: Math.random() * width * 0.8,
          y: Math.random() * (height * 0.4),
          length: Math.random() * 80 + 40,
          speed: Math.random() * 6 + 7,
          alpha: 1,
          active: true,
        });
      }
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render static stars
      for (const s of stars) {
        s.phase += s.twinkleSpeed;
        s.alpha = s.baseAlpha + Math.sin(s.phase) * 0.25;
        s.y -= s.speed;
        if (s.y < 0) {
          s.y = height;
          s.x = Math.random() * width;
        }

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fillStyle = s.color;
        ctx.globalAlpha = Math.max(0.1, Math.min(1, s.alpha));
        ctx.fill();
      }

      // Check meteors
      spawnMeteor();
      for (let i = meteors.length - 1; i >= 0; i--) {
        const m = meteors[i];
        if (!m.active) continue;

        ctx.beginPath();
        const grad = ctx.createLinearGradient(m.x, m.y, m.x - m.length * 0.8, m.y - m.length * 0.6);
        grad.addColorStop(0, `rgba(255, 255, 255, ${m.alpha})`);
        grad.addColorStop(0.3, `rgba(253, 224, 71, ${m.alpha * 0.7})`);
        grad.addColorStop(1, 'rgba(255, 255, 255, 0)');

        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(m.x - m.length * 0.8, m.y - m.length * 0.6);
        ctx.stroke();

        m.x += m.speed * 1.3;
        m.y += m.speed;
        m.alpha -= 0.02;

        if (m.alpha <= 0 || m.x > width || m.y > height) {
          m.active = false;
          meteors.splice(i, 1);
        }
      }

      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 opacity-80"
      aria-hidden="true"
    />
  );
}
