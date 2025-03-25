const toggleBtn = document.getElementById('toggleSidebar');
const menuIcon = document.getElementById('menuIcon');
const sidebar = document.getElementById('sidebarMenu');
const overlay = document.getElementById('sidebarOverlay');

const menuImg = 'assets/icon/menu.png';
const closeImg = 'assets/icon/menu-close.png';

toggleBtn.addEventListener('click', () => {
  const isOpen = sidebar.classList.contains('active');
  sidebar.classList.toggle('active');
  overlay.classList.toggle('active');
  menuIcon.src = isOpen ? menuImg : closeImg;
});

overlay.addEventListener('click', () => {
  sidebar.classList.remove('active');
  overlay.classList.remove('active');
  menuIcon.src = menuImg;
});

document.querySelectorAll('.scroll-link').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').substring(1);
    const section = document.getElementById(targetId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      sidebar.classList.remove('active');
      overlay.classList.remove('active');
      menuIcon.src = menuImg;
    }
  });
});

document.querySelectorAll('.scroll-link').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').substring(1);
    const section = document.getElementById(targetId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      // Cierra el menú en mobile
      const bsCollapse = bootstrap.Collapse.getInstance(document.getElementById('mainNavbar'));
      if (bsCollapse) {
        bsCollapse.hide();
      }
    }
  });
});


//MARK: - animacion de contador de numeros 

function animateCounter(el, finalValue, suffix) {
  const numberEl = el.querySelector('.counter-number'); // ← esta línea se agregó
  if (!numberEl) return; // seguridad por si no existe

  let start = 0;
  const duration = 1000;
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const current = finalValue * progress;

    // Formatear el número correctamente
    let displayValue = current;

    if (suffix === 'K') {
      displayValue = current / 1000;
    } else if (suffix === 'M') {
      displayValue = current / 1000000;
    }

    // Quitar decimales si no es necesario
    displayValue = (displayValue % 1 === 0)
      ? parseInt(displayValue)
      : displayValue.toFixed(1);

    numberEl.textContent = displayValue + suffix; // ← solo cambia el número

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

function initCounterAnimation() {
  const counters = document.querySelectorAll('.text-blue-aterna[data-count]');

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = el.getAttribute('data-count');

        let finalValue = 0;
        let suffix = '';

        if (target.includes('M')) {
          finalValue = parseFloat(target) * 1000000;
          suffix = 'M';
        } else if (target.includes('K')) {
          finalValue = parseFloat(target) * 1000;
          suffix = 'K';
        } else {
          finalValue = parseFloat(target);
        }

        animateCounter(el, finalValue, suffix);
        obs.unobserve(el);
      }
    });
  }, {
    threshold: 0.5
  });

  counters.forEach(counter => observer.observe(counter));
}

document.addEventListener('DOMContentLoaded', initCounterAnimation);


//MARK: - abrir modales

function openModal(modalId) {
  const overlayId = `overlay${modalId.replace('modal', '')}`;
  const modalOverlay = document.getElementById(overlayId);
  const modal = document.getElementById(modalId);

  modalOverlay.classList.remove('d-none');
  modal.classList.add('show'); // ← activa animación para mobile
}

function closeModal(modalId) {
  const overlayId = `overlay${modalId.replace('modal', '')}`;
  const modalOverlay = document.getElementById(overlayId);
  const modal = document.getElementById(modalId);

  modal.classList.remove('show');
  modalOverlay.classList.add('d-none');
}
