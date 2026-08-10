// dynamic year
    document.getElementById('year').textContent = new Date().getFullYear();

    // Hamburger toggle
    document.getElementById('menuToggle').addEventListener('click', function() {
      document.getElementById('menuList').classList.toggle('show');
    });

    // Close menu after select
    document.querySelectorAll('#menuList a').forEach(a=>{
      a.addEventListener('click', ()=> document.getElementById('menuList').classList.remove('show'));
    });



    // Gallery lightbox
    const gallery = document.getElementById('galleryGrid');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    gallery.querySelectorAll('img').forEach(img=>{
      img.addEventListener('click', e=>{
        lightboxImg.src = img.src;
        lightbox.style.display = 'flex';
      });
    });
    function closeLightbox(){ lightbox.style.display='none'; lightboxImg.src=''; }

    function escapeHtml(text){
      const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
      return text.replace(/[&<>"']/g, m => map[m]);
    }

    // Optional: Auto-populate map iframe placeholder with real Google Maps embed if you paste iframe HTML into the "map" div.
    // Example how to embed Google Maps:
    // document.getElementById('map').innerHTML = '<iframe src="PASTE_GOOGLE_MAPS_EMBED_URL" width="100%" height="180" style="border:0;" allowfullscreen="" loading="lazy"></iframe>';

    // Smooth scroll for nav
    document.querySelectorAll('nav a').forEach(a=>{
      a.addEventListener('click', function(ev){
        ev.preventDefault();
        const id = this.getAttribute('href').slice(1);
        const el = document.getElementById(id);
        if(el) el.scrollIntoView({behavior:'smooth', block:'start'});
      });
    });

    // Accessibility: close lightbox on Esc
    document.addEventListener('keydown', (e)=>{
      if(e.key === 'Escape') closeLightbox();
    });

    // Toggle contact information visibility with encoding
    const toggleContactBtn = document.getElementById('toggleContactBtn');
    const contactPhones = document.querySelectorAll('.contact-phone');
    const contactEmails = document.querySelectorAll('.contact-email');
    let contactVisible = false;

    // Base64 decode function
    function decodeBase64(encoded) {
        try {
            return atob(encoded);
        } catch (e) {
            return '';
        }
    }

    toggleContactBtn.addEventListener('click', function() {
        contactVisible = !contactVisible;

        if (contactVisible) {
            // Decode and show real values
            contactPhones.forEach(span => {
                span.textContent = decodeBase64(span.getAttribute('data-encoded'));
            });
            contactEmails.forEach(span => {
                span.textContent = decodeBase64(span.getAttribute('data-encoded'));
            });
            toggleContactBtn.textContent = 'Ukryj kontakt';
        } else {
            // Mask again
            contactPhones.forEach(span => {
                const decodedPhone = decodeBase64(span.getAttribute('data-encoded'));
                span.textContent = decodedPhone.substring(0, 4) + '*** *** ' + decodedPhone.substring(decodedPhone.length - 3);
            });
            contactEmails.forEach(span => {
                const decodedEmail = decodeBase64(span.getAttribute('data-encoded'));
                const username = decodedEmail.split('@')[0];
                const domain = decodedEmail.split('@')[1];
                span.textContent = username.charAt(0) + '*******' + '@' + domain;
            });
            toggleContactBtn.textContent = 'Pokaż kontakt';
        }
    });

// Table assignment data
const tableAssignments = [
  { name: "Szuba", table: 1 },
  { name: "Malina", table: 1 },
  { name: "Sawicka", table: 1 },
  { name: "Sawicki", table: 1 },
  { name: "Kotasińska", table: 1 },
  { name: "Mellem", table: 1 },
  { name: "Sokalska", table: 1 },
  { name: "Moliński", table: 1 },
  { name: "Derejczyk", table: 1 },

  { name: "Mielczarek", table: 2 },
  { name: "Łapkowski", table: 2 },
  { name: "Stemplewski", table: 2 },
  { name: "Stemplewska", table: 2 },
  { name: "Strzelbicka", table: 2 },
  { name: "Strzelbicki", table: 2 },
  { name: "Samol", table: 2 },
  { name: "Nowakowski", table: 2 },
  { name: "Simka", table: 2 },

  { name: "Muzyk", table: 3 },
  { name: "Krakowska", table: 3 },
  { name: "Krakowski", table: 3 },
  { name: "Śleziak", table: 3 },
  { name: "Dróżdż", table: 3 },
  { name: "Szuba", table: 3 },

  { name: "Kazała", table: 4 },
  { name: "Noga", table: 4 },
  { name: "Fidos", table: 4 },
  { name: "Ślusarczyk", table: 4 },
  { name: "Kowalska", table: 4 },
  { name: "Polak", table: 4 },
  { name: "Świat", table: 4 },
  { name: "Zawłocki", table: 4 },
  { name: "Gacek", table: 4 },
  { name: "Borek", table: 4 },
  { name: "Piątek", table: 4 },
  { name: "Duda", table: 4 },

  { name: "Borkowska", table: 5 },
  { name: "Dziuba", table: 5 },
  { name: "Mucha", table: 5 },
  { name: "Partyk", table: 5 },
  { name: "Trybalski", table: 5 },
  { name: "Korab", table: 5 },
  { name: "Kurek", table: 5 },
  { name: "Kawałkiewicz", table: 5 },
  { name: "Nowosielska", table: 5 },
  { name: "Kaleta", table: 5 },

  { name: "Seta", table: 6 },
  { name: "Kaźmierczak", table: 6 },
  { name: "Kęsek", table: 6 },
  { name: "Usarek", table: 6 },

  { name: "Gawleta", table: 7 },
  { name: "Purchla", table: 7 },
  { name: "Ciepłowska", table: 7 },
  { name: "Ciepłowski", table: 7 },
  { name: "Michalska", table: 7 },
  { name: "Michalski", table: 7 }
];

// Find table functionality
document.getElementById('searchButton')?.addEventListener('click', function() {
  const input = document.getElementById('guestName').value.trim();
  if (!input) {
    document.getElementById('searchResult').textContent = 'Proszę wpisać imię i nazwisko.';
    return;
  }
  const found = tableAssignments.find(entry => entry.name.toLowerCase() === input.toLowerCase());
  if (found) {
    document.getElementById('searchResult').innerHTML = `Twój numer stolika: <strong>${escapeHtml(found.table.toString())}</strong>`;
  } else {
    document.getElementById('searchResult').textContent = 'Nie znaleziono gościa.';
  }
});