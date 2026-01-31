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