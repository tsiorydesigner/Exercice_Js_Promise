 // Menu mobile toggle
 const menuToggle = document.getElementById('menuToggle');
 const navLinks = document.getElementById('navLinks');

 menuToggle.addEventListener('click', () => {
     navLinks.classList.toggle('active');
 });

 // Fermer le menu au clic sur un lien
 document.querySelectorAll('.nav-links a').forEach(link => {
     link.addEventListener('click', () => {
         navLinks.classList.remove('active');
     });
 });

 // Smooth scroll
 document.querySelectorAll('a[href^="#"]').forEach(anchor => {
     anchor.addEventListener('click', function(e) {
         e.preventDefault();
         const target = document.querySelector(this.getAttribute('href'));
         if (target) {
             target.scrollIntoView({ behavior: 'smooth', block: 'start' });
         }
     });
 });

 // Form submission
 document.getElementById('contactForm').addEventListener('submit', (e) => {
     e.preventDefault();
     alert('Merci pour votre message! Nous vous contacterons bientôt.');
     e.target.reset();
    
 });



