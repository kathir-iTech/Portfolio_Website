<!-- Add this inside the <body> tag, preferably just after the opening tag -->
<canvas id="swarm"></canvas>

<!-- Add this script near the end of the <body> tag, before closing </body> -->
<script>
  const canvas = document.getElementById("swarm");
  const ctx = canvas.getContext("2d");
  let width, height;

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  window.addEventListener("resize", resize);
  resize();

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 1.5;
      this.vy = (Math.random() - 0.5) * 1.5;
      this.size = 3;
    }
    update(mouse) {
      if (mouse) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          const force = (150 - dist) / 150;
          this.vx += (dx / dist) * force * 0.5;
          this.vy += (dy / dist) * force * 0.5;
        } else {
          this.vx += (Math.random() - 0.5) * 0.1;
          this.vy += (Math.random() - 0.5) * 0.1;
        }
      }

      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0) { this.x = 0; this.vx *= -1; }
      if (this.x > width) { this.x = width; this.vx *= -1; }
      if (this.y < 0) { this.y = 0; this.vy *= -1; }
      if (this.y > height) { this.y = height; this.vy *= -1; }

      this.vx *= 0.95;
      this.vy *= 0.95;
    }
    draw() {
      ctx.beginPath();
      ctx.fillStyle = 'rgba(16, 185, 129, 0.9)';  // Accent green color matching your site (#10b981)
      ctx.shadowColor = 'rgba(16, 185, 129, 0.9)';
      ctx.shadowBlur = 12;
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  const particles = [];
  for (let i = 0; i < 120; i++) {
    particles.push(new Particle());
  }

  let mouse = null;
  window.addEventListener("mousemove", e => { mouse = { x: e.clientX, y: e.clientY }; });
  window.addEventListener("mouseout", () => { mouse = null; });

  function animate() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach(p => { p.update(mouse); p.draw(); });
    requestAnimationFrame(animate);
  }
  animate();
</script>

<!-- Add this CSS in your main stylesheet or inside a <style> tag in your HTML head -->
<style>
  body, html {
    margin: 0;
    height: 100%;
    background: #111827; /* Your site primary dark background */
    overflow: hidden;
  }
  #swarm {
    display: block;
    position: fixed;
    top: 0; left: 0;
    width: 100%; height: 100%;
    z-index: -1;  /* Keeps background behind content */
  }
</style>
