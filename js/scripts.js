// MARK: - Menú sidebar (mobile)
const toggleBtn = document.getElementById('toggleSidebar');
const menuIcon = document.getElementById('menuIcon');
const sidebar = document.getElementById('sidebarMenu');
const overlay = document.getElementById('sidebarOverlay');

const menuImg = 'assets/icon/menu.png';
const closeImg = 'assets/icon/menu-close.png';

if (toggleBtn && menuIcon && sidebar && overlay) {
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
}

// MARK: - Smooth scroll + cerrar menú mobile
document.querySelectorAll('.scroll-link').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').substring(1);
    const section = document.getElementById(targetId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });

      // Cierra menú tipo sidebar si existe
      if (sidebar && overlay && menuIcon) {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
        menuIcon.src = menuImg;
      }

      // Cierra menú Bootstrap si está activo (para menús tipo navbar collapse)
      const mainNavbar = document.getElementById('mainNavbar');
      if (mainNavbar) {
        const bsCollapse = bootstrap.Collapse.getInstance(mainNavbar);
        if (bsCollapse) {
          bsCollapse.hide();
        }
      }
    }
  });
});

// MARK: - Animación contador de números
function animateCounter(el, finalValue, suffix) {
  const numberEl = el.querySelector('.counter-number');
  if (!numberEl) return;

  let start = 0;
  const duration = 1000;
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    let current = finalValue * progress;

    // Ajustar según sufijo
    if (suffix === 'K') current = current / 1000;
    else if (suffix === 'M') current = current / 1000000;

    // Redondeo
    const displayValue = (current % 1 === 0) ? parseInt(current) : current.toFixed(1);

    numberEl.textContent = displayValue + suffix;

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

function initCounterAnimation() {
  const counters = document.querySelectorAll('.text-blue-aterna[data-count]');
  if (!counters.length) return;

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

// MARK: - Abrir y cerrar modales
function openModal(modalId) {
  const overlayId = `overlay${modalId.replace('modal', '')}`;
  const modalOverlay = document.getElementById(overlayId);
  const modal = document.getElementById(modalId);

  if (modalOverlay && modal) {
    modalOverlay.classList.remove('d-none');
    modal.classList.add('show');
  }
}

function closeModal(modalId) {
  const overlayId = `overlay${modalId.replace('modal', '')}`;
  const modalOverlay = document.getElementById(overlayId);
  const modal = document.getElementById(modalId);

  if (modalOverlay && modal) {
    modal.classList.remove('show');
    modalOverlay.classList.add('d-none');
  }
}
