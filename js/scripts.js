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