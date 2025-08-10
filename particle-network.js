(() => {
  const container = document.querySelector('.particle-network');
  const canvas = document.createElement('canvas');
  container.appendChild(canvas);
  const ctx = canvas.getContext('2d');

  let width, height;
  let particles = [];
  // Adjust particle count for desktop and mobile devices
  const maxParticles = window.innerWidth < 600 ? 50 : 80;
  const maxDistance = window.innerWidth < 600 ? 120 : 150;

  let mouse = { x: null, y: null, active: false };

  function init() {
    resize();
    particles = [];
    for (let i = 0; i < maxParticles; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: 2 + Math.random() * 2,
      });
    }
    animate();
  }

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;

    // For retina displays
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);
  }

  // Event listeners for desktop mouse and mobile touch support
  canvas.addEventListener('mousemove', function(e) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    mouse.active = true;
  });

  canvas.addEventListener('mouseleave', function() {
    mouse.active = false;
  });

  canvas.addEventListener('touchstart', function(e) {
    if (e.touches.length === 1) {
      mouse.x = e.touches[0].clientX;
      mouse.y = e.touches[0].clientY;
      mouse.active = true;
    }
  });

  canvas.addEventListener('touchmove', function(e) {
    if (e.touches.length === 1) {
      mouse.x = e.touches[0].clientX;
      mouse.y = e.touches[0].clientY;
      mouse.active = true;
    }
  });

  canvas.addEventListener('touchend', function() {
    mouse.active = false;
  });

  window.addEventListener('resize', resize);

  function draw() {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = 'rgba(16, 185, 129, 0.7)';
    ctx.strokeStyle = 'rgba(16, 185, 129, 0.3)';
    ctx.lineWidth = 1;

    for (const p of particles) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI);
      ctx.fill();
    }

    // Draw lines between particles
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const p1 = particles[i];
        const p2 = particles[j];
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < maxDistance) {
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      }
    }

    // Draw lines to mouse/touch position
    if (mouse.active && mouse.x !== null && mouse.y !== null) {
      for (const p of particles) {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < maxDistance) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = 'rgba(16, 185, 129, 0.7)';
          ctx.stroke();
        }
      }
    }
  }

  function update() {
    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > width) p.vx = -p.vx;
      if (p.y < 0 || p.y > height) p.vy = -p.vy;
    }
  }

  function animate() {
    update();
    draw();
    requestAnimationFrame(animate);
  }

  init();
})();
