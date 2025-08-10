(() => {
  const container = document.querySelector('.particle-network');
  const canvas = document.createElement('canvas');
  container.appendChild(canvas);
  const ctx = canvas.getContext('2d');

  let width, height;
  const dpr = window.devicePixelRatio || 1;

  // Configuration
  const maxParticles = window.innerWidth < 600 ? 40 : 70;
  const repulsionRadius = window.innerWidth < 600 ? 100 : 130;
  const repulsionForce = 0.15;

  let particles = [];
  let pointer = { x: null, y: null, active: false };

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);
  }

  function initParticles() {
    particles = [];
    for(let i = 0; i < maxParticles; i++){
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: 2,
      });
    }
  }

  function dist(a, b) {
    const dx = a.x - b.x;
    const dy = a.y - b.y;
    return Math.sqrt(dx*dx + dy*dy);
  }

  function updateParticles() {
    particles.forEach(p => {
      // Move particles
      p.x += p.vx;
      p.y += p.vy;

      // Bounce on edges
      if(p.x <= p.radius || p.x >= width - p.radius) p.vx = -p.vx;
      if(p.y <= p.radius || p.y >= height - p.radius) p.vy = -p.vy;

      // Repulsion from pointer
      if(pointer.active && pointer.x !== null && pointer.y !== null){
        const dx = p.x - pointer.x;
        const dy = p.y - pointer.y;
        const distanceToPointer = Math.sqrt(dx*dx + dy*dy);

        if(distanceToPointer < repulsionRadius && distanceToPointer > 0){
          // Calculate repulsion force inversely proportional to distance
          const force = repulsionForce * (1 - distanceToPointer / repulsionRadius);

          // Apply repulsion to velocity (normalized direction away from pointer)
          p.vx += (dx / distanceToPointer) * force;
          p.vy += (dy / distanceToPointer) * force;

          // Slight damping for smooth return
          p.vx *= 0.95;
          p.vy *= 0.95;
        } else {
          // Slight damping when no repulsion
          p.vx *= 0.98;
          p.vy *= 0.98;
        }
      } else {
        // Slow down when no pointer active
        p.vx *= 0.98;
        p.vy *= 0.98;
      }
    });
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);

    // Draw particles as emerald green dots
    particles.forEach(p => {
      ctx.beginPath();
      ctx.fillStyle = 'rgba(16,185,129,0.9)';
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI*2);
      ctx.fill();
    });
  }

  // Event listeners to track pointer (mouse or touch)
  canvas.addEventListener('mousemove', e => {
    pointer.x = e.clientX;
    pointer.y = e.clientY;
    pointer.active = true;
  });

  canvas.addEventListener('mouseleave', () => {
    pointer.active = false;
    pointer.x = null;
    pointer.y = null;
  });

  canvas.addEventListener('touchstart', e => {
    if(e.touches.length === 1){
      pointer.x = e.touches[0].clientX;
      pointer.y = e.touches[0].clientY;
      pointer.active = true;
    }
  }, {passive:true});

  canvas.addEventListener('touchmove', e => {
    if(e.touches.length === 1){
      pointer.x = e.touches[0].clientX;
      pointer.y = e.touches[0].clientY;
      pointer.active = true;
    }
  }, {passive:true});

  canvas.addEventListener('touchend', () => {
    pointer.active = false;
    pointer.x = null;
    pointer.y = null;
  });

  window.addEventListener('resize', () => {
    resize();
    initParticles();
  });

  function animate(){
    updateParticles();
    draw();
    requestAnimationFrame(animate);
  }

  // Initialize
  function start(){
    resize();
    initParticles();
    animate();
  }
  start();
})();
