(() => {
  const container = document.querySelector('.particle-network');
  const canvas = document.createElement('canvas');
  container.appendChild(canvas);
  const ctx = canvas.getContext('2d');

  let width, height;
  const dpr = window.devicePixelRatio || 1;

  // Configuration - optimized for both mobile and desktop
  const maxParticles = window.innerWidth < 600 ? 50 : 80;
  const repulsionRadius = window.innerWidth < 600 ? 120 : 150;
  const repulsionForce = 0.2;
  const baseSpeed = 0.4; // Base movement speed for continuous motion

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
        vx: (Math.random() - 0.5) * baseSpeed,
        vy: (Math.random() - 0.5) * baseSpeed,
        baseVx: (Math.random() - 0.5) * baseSpeed, // Store original velocity
        baseVy: (Math.random() - 0.5) * baseSpeed,
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
      // Always maintain base movement (continuous motion)
      p.x += p.vx;
      p.y += p.vy;

      // Bounce on edges with some energy retention
      if(p.x <= p.radius) {
        p.x = p.radius;
        p.vx = Math.abs(p.vx);
        p.baseVx = Math.abs(p.baseVx);
      }
      if(p.x >= width - p.radius) {
        p.x = width - p.radius;
        p.vx = -Math.abs(p.vx);
        p.baseVx = -Math.abs(p.baseVx);
      }
      if(p.y <= p.radius) {
        p.y = p.radius;
        p.vy = Math.abs(p.vy);
        p.baseVy = Math.abs(p.baseVy);
      }
      if(p.y >= height - p.radius) {
        p.y = height - p.radius;
        p.vy = -Math.abs(p.vy);
        p.baseVy = -Math.abs(p.baseVy);
      }

      // Repulsion from pointer when active
      if(pointer.active && pointer.x !== null && pointer.y !== null){
        const dx = p.x - pointer.x;
        const dy = p.y - pointer.y;
        const distanceToPointer = Math.sqrt(dx*dx + dy*dy);

        if(distanceToPointer < repulsionRadius && distanceToPointer > 0){
          // Calculate repulsion force
          const force = repulsionForce * (1 - distanceToPointer / repulsionRadius);
          
          // Apply repulsion
          p.vx += (dx / distanceToPointer) * force;
          p.vy += (dy / distanceToPointer) * force;
          
          // Damping for smooth movement
          p.vx *= 0.92;
          p.vy *= 0.92;
        } else {
          // Gradually return to base velocity when not repelling
          p.vx += (p.baseVx - p.vx) * 0.02;
          p.vy += (p.baseVy - p.vy) * 0.02;
        }
      } else {
        // When no pointer, gradually return to base velocity
        p.vx += (p.baseVx - p.vx) * 0.01;
        p.vy += (p.baseVy - p.vy) * 0.01;
      }

      // Ensure minimum movement (particles always move)
      const speed = Math.sqrt(p.vx*p.vx + p.vy*p.vy);
      if(speed < 0.1) {
        p.vx = p.baseVx;
        p.vy = p.baseVy;
      }
    });
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);

    // Draw particles as emerald green dots with slight glow
    particles.forEach(p => {
      ctx.beginPath();
      ctx.fillStyle = 'rgba(16,185,129,0.9)';
      ctx.shadowColor = 'rgba(16,185,129,0.3)';
      ctx.shadowBlur = 4;
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI*2);
      ctx.fill();
      ctx.shadowBlur = 0; // Reset shadow
    });
  }

  // Event listeners for both mouse and touch
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
    e.preventDefault();
    if(e.touches.length === 1){
      pointer.x = e.touches.clientX;
      pointer.y = e.touches.clientY;
      pointer.active = true;
    }
  }, {passive:false});

  canvas.addEventListener('touchmove', e => {
    e.preventDefault();
    if(e.touches.length === 1){
      pointer.x = e.touches.clientX;
      pointer.y = e.touches.clientY;
      pointer.active = true;
    }
  }, {passive:false});

  canvas.addEventListener('touchend', e => {
    e.preventDefault();
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

  // Initialize everything
  function start(){
    resize();
    initParticles();
    animate();
  }
  
  start();
})();
