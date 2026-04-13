// Cookie Consent Management Script
document.addEventListener('DOMContentLoaded', function() {
  const cookieConsent = 'lexia_cookie_consent';
  
  // Detect if we're in a nested directory and adjust paths accordingly
  const isNested = window.location.pathname.includes('/servicios/') || window.location.pathname.includes('/blogs/');
  const privacyLink = isNested ? '../aviso-privacidad.html' : 'aviso-privacidad.html';
  
  // Create and inject cookie banner if it doesn't exist
  function initializeCookieBanner() {
    let cookieBanner = document.getElementById('cookieBanner');
    
    // If banner doesn't exist in the page, create it
    if (!cookieBanner) {
      const bannerHTML = `
        <div id="cookieBanner" style="position:fixed; bottom:0; left:0; right:0; background:var(--navy); color:white; padding:1.5rem; text-align:center; z-index:9999; box-shadow:0 -2px 10px rgba(0,0,0,0.3); display:flex;">
          <div style="width:100%;">
            <div style="display:flex; align-items:center; justify-content:space-between; gap:2rem; flex-wrap:wrap; max-width:1400px; margin:0 auto;">
              <div style="text-align:left; flex:1; min-width:250px;">
                <p style="margin:0; font-size:.9rem; line-height:1.6;">Utilizamos cookies para mejorar tu experiencia en nuestro sitio web. Las cookies nos ayudan a personalizar contenido, analizar tráfico y recordar tus preferencias. <a href="${privacyLink}" style="color:var(--gold); text-decoration:underline;">Conoce más</a>.</p>
              </div>
              <div style="display:flex; gap:1rem; flex-shrink:0;">
                <button id="acceptCookies" style="padding:.65rem 1.5rem; background:linear-gradient(135deg, var(--gold), var(--gold-dark)); color:var(--navy); border:none; border-radius:6px; cursor:pointer; font-weight:600; font-size:.9rem; transition:var(--transition);">Aceptar Cookies</button>
                <button id="rejectCookies" style="padding:.65rem 1.5rem; background:transparent; border:1px solid rgba(255,255,255,.5); color:white; border-radius:6px; cursor:pointer; font-weight:600; font-size:.9rem; transition:var(--transition);" onmouseover="this.style.borderColor='var(--gold)';this.style.color='var(--gold)'" onmouseout="this.style.borderColor='rgba(255,255,255,.5)';this.style.color='white'">Rechazar</button>
              </div>
            </div>
          </div>
        </div>
      `;
      
      document.body.insertAdjacentHTML('beforeend', bannerHTML);
      cookieBanner = document.getElementById('cookieBanner');
    }
    
    // Check if user has already accepted/rejected cookies
    const consent = localStorage.getItem(cookieConsent);
    if (consent) {
      // Hide banner if consent already given
      cookieBanner.style.display = 'none';
    } else {
      // Show banner after brief delay
      cookieBanner.style.display = 'flex';
    }
    
    // Set up button listeners
    const acceptBtn = document.getElementById('acceptCookies');
    const rejectBtn = document.getElementById('rejectCookies');
    
    if (acceptBtn) {
      acceptBtn.addEventListener('click', function() {
        localStorage.setItem(cookieConsent, 'accepted');
        cookieBanner.style.display = 'none';
        // You can add tracking code here if needed
        console.log('Cookies aceptadas');
      });
    }
    
    if (rejectBtn) {
      rejectBtn.addEventListener('click', function() {
        localStorage.setItem(cookieConsent, 'rejected');
        cookieBanner.style.display = 'none';
        console.log('Cookies rechazadas');
      });
    }
  }
  
  // Initialize on page load
  initializeCookieBanner();
});
