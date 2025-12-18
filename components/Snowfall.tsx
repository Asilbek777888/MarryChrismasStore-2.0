import React, { useEffect, useRef } from 'react';

const Snowfall: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Snowflake[] = [];
    const globalDrift = 0.15; // Subtle horizontal drift to simulate wind

    class Snowflake {
      x: number = 0;
      y: number = 0;
      size: number = 0;
      speed: number = 0;
      sway: number = 0;
      swaySpeed: number = 0;
      opacity: number = 0;
      blur: number = 0;

      constructor() {
        this.reset(true);
      }

      reset(initial: boolean = false) {
        this.x = Math.random() * window.innerWidth;
        this.y = initial ? Math.random() * window.innerHeight : -10;
        
        // Subtle sizes (0.5px to 2.5px)
        this.size = Math.random() * 2 + 0.5;
        
        // Increased speed variation (0.2 to 2.0) for more dynamic depth
        this.speed = Math.random() * 1.8 + 0.2;
        
        this.sway = Math.random() * 2 * Math.PI;
        this.swaySpeed = Math.random() * 0.015 + 0.005;
        
        // Low opacities for subtlety (0.1 to 0.4)
        this.opacity = Math.random() * 0.3 + 0.1;
        
        // Depth of field blur for larger flakes
        this.blur = this.size > 1.8 ? Math.random() * 1 : 0;
      }

      update() {
        this.y += this.speed;
        this.sway += this.swaySpeed;
        
        // Natural oscillation + Global horizontal drift (wind)
        this.x += (Math.sin(this.sway) * 0.4) + globalDrift;

        // Reset if goes off bottom
        if (this.y > window.innerHeight) {
          this.reset();
        }

        // Wrap around if goes off sides due to drift
        if (this.x > window.innerWidth) {
          this.x = 0;
        } else if (this.x < 0) {
          this.x = window.innerWidth;
        }
      }

      draw() {
        if (!ctx) return;
        ctx.save();
        ctx.beginPath();
        if (this.blur > 0) {
          ctx.filter = `blur(${this.blur}px)`;
        }
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.fill();
        ctx.restore();
      }
    }

    const init = () => {
      // High-DPI support
      const dpr = window.devicePixelRatio || 1;
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      
      ctx.scale(dpr, dpr);
      
      // Decreased particle count for a lighter, more professional density
      particles = Array.from({ length: 100 }, () => new Snowflake());
    };

    const animate = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      init();
    };

    init();
    animate();
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 50,
      }}
    />
  );
};

export default Snowfall;