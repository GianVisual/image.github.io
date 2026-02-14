
import { QuoteData } from '../types';

export const generateHtml = (data: QuoteData): string => {
  const servicesHtml = data.services
    .map(
      (s) => `
                    <div class="service-card">
                        <div class="service-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></svg>
                        </div>
                        <h3 class="service-title">${s.title}</h3>
                        <p class="service-desc">${s.description}</p>
                    </div>`
    )
    .join('');

  const conditionsHtml = data.conditions
    .map(
      (c) => `
                    <div class="condition-card">
                        <div class="condition-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg></div>
                        <div class="condition-content"><h4>${c.title}</h4><p>${c.description}</p></div>
                    </div>`
    )
    .join('');

  return `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cotización - Gian Visual | Cotización ${data.clientName}</title>
    
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&family=Montserrat:wght@500;600;700;800;900&display=swap" rel="stylesheet">
    
    <style>
        :root {
            --bg-main: #05010f;
            --bg-card: #130626;
            --bg-card-hover: #1e0a3b;
            --gradient-primary: linear-gradient(135deg, #6a00f4, #c200c9, #00dde6);
            --gradient-text: linear-gradient(90deg, #a855f7, #ec4899, #06b6d4);
            --text-primary: #ffffff;
            --text-secondary: #c0b6d1;
            --text-muted: #8a7a9e;
            --border-color: rgba(168, 85, 247, 0.2); 
            --glow-color: rgba(168, 85, 247, 0.6);
        }

        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body {
            font-family: 'Inter', sans-serif;
            background-color: var(--bg-main);
            color: var(--text-primary);
            line-height: 1.7;
            overflow-x: hidden;
        }

        h1, h2, h3, h4, .logo-text, .price-value, .client-value, .cta-button, .btn-primary-glow {
            font-family: 'Montserrat', sans-serif;
        }

        #hero-canvas {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
            opacity: 0.6;
        }

        .header {
            position: fixed;
            top: 0; left: 0; right: 0;
            z-index: 1000;
            padding: 20px 5%;
            background: rgba(5, 1, 15, 0.7);
            backdrop-filter: blur(15px);
            border-bottom: 1px solid rgba(255,255,255,0.05);
            transition: all 0.4s ease;
        }

        .header.scrolled {
            padding: 12px 5%;
            background: rgba(5, 1, 15, 0.95);
            box-shadow: 0 10px 30px rgba(0,0,0,0.5);
        }

        .header-content {
            max-width: 1400px;
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .logo { display: flex; align-items: center; gap: 12px; }
        .logo-icon {
            width: 40px; height: 40px;
            background: var(--gradient-primary);
            border-radius: 8px;
            display: flex; align-items: center; justify-content: center;
            font-family: 'Montserrat', sans-serif;
            font-weight: 900; font-size: 18px; color: white;
            box-shadow: 0 0 15px var(--glow-color);
        }
        .logo-text { font-size: 1.4rem; font-weight: 700; color: white; }

        .contact-info a {
            color: var(--text-secondary);
            text-decoration: none;
            font-weight: 600;
            font-size: 0.9rem;
            transition: color 0.3s;
            display: flex; align-items: center; gap: 8px;
        }
        
        .contact-info a:hover { color: white; }

        .hero {
            min-height: 90vh;
            display: flex; flex-direction: column; justify-content: center; align-items: center;
            text-align: center; padding: 100px 20px 40px; position: relative;
        }

        .hero-content {
            max-width: 1000px;
            z-index: 2;
            opacity: 0;
            transform: translateY(30px);
            animation: fadeInUp 1s ease forwards 0.3s;
        }

        @keyframes fadeInUp { to { opacity: 1; transform: translateY(0); } }

        .hero-badge {
            display: inline-block;
            padding: 8px 20px;
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(168, 85, 247, 0.3);
            border-radius: 50px;
            font-size: 0.85rem; font-weight: 600;
            text-transform: uppercase; letter-spacing: 1px;
            color: #d8b4fe; margin-bottom: 30px;
            backdrop-filter: blur(5px);
        }

        .hero-title {
            font-size: clamp(3rem, 7vw, 5.5rem);
            font-weight: 900;
            text-transform: uppercase;
            line-height: 1.1; margin-bottom: 30px; color: white;
            letter-spacing: -2px;
        }

        .gradient-text {
            background: var(--gradient-text);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            display: inline-block;
        }

        .hero-subtitle {
            font-size: 1.25rem; color: var(--text-secondary);
            max-width: 700px; margin: 0 auto 40px; font-weight: 400;
        }

        .btn-primary-glow {
            display: inline-flex; align-items: center; justify-content: center;
            padding: 18px 45px; font-size: 1.1rem; font-weight: 700;
            color: white; background: var(--gradient-primary);
            border: none; border-radius: 50px; cursor: pointer; text-decoration: none;
            transition: transform 0.3s, box-shadow 0.3s;
            box-shadow: 0 0 30px var(--glow-color), inset 0 0 20px rgba(255,255,255,0.2);
            position: relative; overflow: hidden;
        }

        .btn-primary-glow:hover {
            transform: scale(1.05);
            box-shadow: 0 0 50px var(--glow-color), inset 0 0 30px rgba(255,255,255,0.4);
        }

        .container { max-width: 1200px; margin: 0 auto; padding: 0 25px; }

        .section { padding: 80px 0; opacity: 0; transform: translateY(40px); transition: all 0.8s ease; }
        .section.visible { opacity: 1; transform: translateY(0); }
        .section-title { font-size: 2.5rem; font-weight: 800; margin-bottom: 60px; text-align: center; color: white; }

        .client-card {
            background: var(--bg-card); border-radius: 24px; padding: 0;
            border: 1px solid rgba(255,255,255,0.05);
            box-shadow: 0 20px 50px rgba(0,0,0,0.5);
            overflow: hidden; margin-top: -50px; position: relative; z-index: 5;
        }
        .client-card-layout { display: flex; align-items: stretch; flex-direction: column; }
        .client-image-container { position: relative; min-height: 300px; }
        .client-image { width: 100%; height: 100%; object-fit: cover; object-position: center top; display: block; }
        .client-image-overlay { position: absolute; inset: 0; background: linear-gradient(to top, var(--bg-card) 0%, transparent 50%, rgba(0,0,0,0.5) 100%); }
        .client-info-content { padding: 40px; display: flex; flex-direction: column; justify-content: center; }
        .client-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 30px; }
        .client-label { font-size: 0.8rem; color: #d8b4fe; text-transform: uppercase; font-weight: 700; letter-spacing: 1px; margin-bottom: 8px; display: block; font-family: 'Montserrat', sans-serif; }
        .client-value { font-size: 1.4rem; color: white; font-weight: 600; }
        .client-value.highlight { background: var(--gradient-text); -webkit-background-clip: text; -webkit-text-fill-color: transparent; font-weight: 800; }

        @media (min-width: 900px) {
            .client-card-layout { flex-direction: row; }
            .client-image-container { flex: 2; min-height: auto; }
            .client-info-content { flex: 3; padding: 50px; }
            .client-image-overlay { background: linear-gradient(to right, transparent 60%, var(--bg-card) 100%); }
        }

        .services-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px; }
        .service-card { background: var(--bg-card); border-radius: 20px; padding: 40px; border: 1px solid rgba(255,255,255,0.03); transition: all 0.4s ease; }
        .service-card:hover { transform: translateY(-8px); background: var(--bg-card-hover); border-color: #a855f7; box-shadow: 0 10px 40px rgba(168, 85, 247, 0.15); }
        .service-icon { width: 60px; height: 60px; margin-bottom: 25px; display: flex; align-items: center; justify-content: center; background: rgba(255,255,255,0.05); border-radius: 16px; transition: all 0.4s ease; }
        .service-card:hover .service-icon { background: var(--gradient-primary); transform: scale(1.1); }
        .service-icon svg { width: 30px; height: 30px; stroke: white; }
        .service-title { font-size: 1.4rem; margin-bottom: 15px; color: white; font-weight: 700; }
        .service-desc { color: var(--text-secondary); }

        .price-section { background: linear-gradient(180deg, var(--bg-card) 0%, rgba(5,1,15,0) 100%); border-radius: 30px; padding: 80px 40px; border: 1px solid rgba(255,255,255,0.05); text-align: center; position: relative; box-shadow: 0 0 50px rgba(168, 85, 247, 0.1); }
        .price-value { font-size: clamp(4rem, 10vw, 7rem); font-weight: 800; background: var(--gradient-text); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin-bottom: 10px; line-height: 1; }

        .conditions-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 30px; }
        .condition-card { background: var(--bg-card); border-radius: 20px; padding: 30px; display: flex; gap: 20px; border: 1px solid transparent; transition: 0.3s; }
        .condition-card:hover { border-color: rgba(168, 85, 247, 0.3); transform: translateY(-5px); }
        .condition-icon { min-width: 50px; height: 50px; background: rgba(168, 85, 247, 0.1); border-radius: 12px; display: flex; align-items: center; justify-content: center; }
        .condition-icon svg { stroke: #d8b4fe; width: 24px; height: 24px; }
        .condition-content h4 { font-size: 1.2rem; font-weight: 700; margin-bottom: 5px; color: white; }
        .condition-content p { font-size: 0.95rem; color: var(--text-secondary); }

        .footer { padding: 100px 0 40px; margin-top: 100px; border-top: 1px solid rgba(255,255,255,0.05); background: #020005; }
        .footer-content { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 40px; margin-bottom: 60px; }
        .footer h4 { font-size: 1.2rem; margin-bottom: 25px; color: white; font-weight: 700; }
        .footer a { color: var(--text-secondary); text-decoration: none; transition: 0.3s; }
        .footer a:hover { color: #00dde6; }
        .footer-bottom { text-align: center; padding-top: 40px; border-top: 1px solid rgba(255,255,255,0.05); color: var(--text-muted); font-size: 0.9rem; }

        .loader { position: fixed; inset: 0; background: var(--bg-main); display: flex; align-items: center; justify-content: center; z-index: 9999; transition: opacity 0.5s, visibility 0.5s; }
        .loader.hidden { opacity: 0; visibility: hidden; }
        .loader-spinner { width: 60px; height: 60px; border: 4px solid rgba(168, 85, 247, 0.2); border-top-color: #00dde6; border-radius: 50%; animation: spin 1s infinite linear; }
        @keyframes spin { to { transform: rotate(360deg); } }

        @media (max-width: 768px) { .hero-title { font-size: 3rem; } .section-title { font-size: 2rem; } .client-card { border-radius: 20px; margin-top: 0; } .btn-primary-glow { width: 100%; } }
    </style>
</head>
<body>
    <div class="loader" id="loader">
        <div class="loader-spinner"></div>
    </div>
    <canvas id="hero-canvas"></canvas>
    <header class="header" id="header">
        <div class="header-content">
            <div class="logo">
                <div class="logo-icon">GV</div>
                <span class="logo-text">Gian Visual</span>
            </div>
            <div class="contact-info">
                <a href="tel:${data.phone.replace(/\s/g, '')}">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                    <span>${data.phone}</span>
                </a>
            </div>
        </div>
    </header>

    <main>
        <section class="hero">
            <div class="hero-content">
                <div class="hero-badge">${data.projectBadge}</div>
                <h1 class="hero-title">${data.projectName}</h1>
                <p class="hero-subtitle">${data.heroSubtitle}</p>
                <a href="#client-section" class="btn-primary-glow">Ver Propuesta</a>
            </div>
        </section>

        <div class="container">
            <section class="section" id="client-section">
                <div class="client-card">
                    <div class="client-card-layout">
                        <div class="client-image-container">
                            <img src="${data.clientImageUrl}" alt="${data.clientName}" class="client-image">
                            <div class="client-image-overlay"></div>
                        </div>
                        <div class="client-info-content">
                            <h2 style="margin-bottom: 30px; font-size: 2rem; font-weight: 800;">Información del Cliente</h2>
                            <div class="client-grid">
                                <div class="client-info-item">
                                    <span class="client-label">Profesional</span>
                                    <span class="client-value">${data.clientName}</span>
                                </div>
                                <div class="client-info-item">
                                    <span class="client-label">Especializado</span>
                                    <span class="client-value">${data.clientSpecialty}</span>
                                </div>
                                <div class="client-info-item">
                                    <span class="client-label">Proyecto</span>
                                    <span class="client-value highlight">${data.projectName}</span>
                                </div>
                                <div class="client-info-item">
                                    <span class="client-label">Fecha</span>
                                    <span class="client-value" id="current-date">--</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section class="section" id="services-section">
                <h2 class="section-title">Soluciones Incluidas</h2>
                <div class="services-grid">${servicesHtml}</div>
            </section>

            <section class="section" id="price-section">
                <div class="price-section">
                    <p style="text-transform: uppercase; letter-spacing: 2px; color: var(--text-secondary); margin-bottom: 20px;">${data.priceSectionText}</p>
                    <div class="price-value">
                        $<span id="price-counter">${data.price.toLocaleString('es-CO')}</span>
                    </div>
                    <p style="font-size: 1.2rem; color: #8a7a9e;">${data.currency}</p>
                    
                    <div style="margin-top: 50px;">
                        <a href="${data.whatsappLink}" class="btn-primary-glow" target="_blank">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" style="margin-right: 10px;">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                            </svg>
                            Confirmar por WhatsApp
                        </a>
                    </div>
                </div>
            </section>

            <section class="section" id="conditions-section">
                <h2 class="section-title">Términos y Condiciones</h2>
                <div class="conditions-grid">${conditionsHtml}</div>
            </section>
        </div>
    </main>

    <footer class="footer">
        <div class="container">
            <div class="footer-content">
                <div class="footer-brand">
                    <div class="logo">
                        <div class="logo-icon">GV</div>
                        <span class="logo-text">Gian Visual</span>
                    </div>
                    <p style="color: #8a7a9e; margin-top: 20px;"> Avancemos Juntos.</p>
                </div>
                <div class="footer-links">
                    <h4>Contacto</h4>
                    <p><a href="tel:${data.phone.replace(/\s/g, '')}">${data.phone}</a></p>
                    <p><a href="mailto:${data.email}">${data.email}</a></p>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; <span id="year"></span> Gian Visual.</p>
            </div>
        </div>
    </footer>

    <script>
        window.addEventListener('load', () => { setTimeout(() => { document.getElementById('loader').classList.add('hidden'); }, 800); });
        const today = new Date();
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        document.getElementById('current-date').textContent = today.toLocaleDateString('es-CO', options);
        document.getElementById('year').textContent = today.getFullYear();
        const header = document.getElementById('header');
        window.addEventListener('scroll', () => { if (window.pageYOffset > 50) header.classList.add('scrolled'); else header.classList.remove('scrolled'); });
        const observer = new IntersectionObserver((entries) => { entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); }); }, { threshold: 0.1 });
        document.querySelectorAll('.section').forEach(section => observer.observe(section));
        const priceCounter = document.getElementById('price-counter');
        const priceSection = document.getElementById('price-section');
        let animated = false;
        const priceObserver = new IntersectionObserver((entries) => {
            if(entries[0].isIntersecting && !animated) {
                animated = true;
                let start = 0, end = ${data.price};
                let duration = 2000;
                let increment = end / (duration / 16);
                function update() {
                    start += increment;
                    if(start < end) { priceCounter.innerText = Math.floor(start).toLocaleString('es-CO'); requestAnimationFrame(update); } else { priceCounter.innerText = end.toLocaleString('es-CO'); }
                }
                update();
            }
        }, { threshold: 0.5 });
        priceObserver.observe(priceSection);
        const canvas = document.getElementById('hero-canvas');
        const ctx = canvas.getContext('2d');
        let width, height, particles = [];
        let time = 0; const spacing = 45;
        function resize() { width = canvas.width = window.innerWidth; height = canvas.height = window.innerHeight; initParticles(); }
        function initParticles() { particles = []; for (let x = 0; x < width + spacing; x += spacing) { for (let y = 0; y < height + spacing; y += spacing) { particles.push({ x: x, y: y, originX: x, originY: y, size: 1 + Math.random() * 2 }); } } }
        function animate() {
            ctx.clearRect(0, 0, width, height); time += 0.005;
            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];
                const movementX = Math.sin(p.originY * 0.002 + time * 2) * 15;
                const movementY = Math.cos(p.originX * 0.003 + time * 3) * 15;
                p.x = p.originX + movementX; p.y = p.originY + movementY;
                ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                const alpha = 0.2 + Math.sin(time + p.x * 0.01) * 0.2;
                ctx.fillStyle = \`rgba(168, 85, 247, \${alpha})\`; ctx.fill();
            }
            requestAnimationFrame(animate);
        }
        window.addEventListener('resize', resize); resize(); animate();
    </script>
</body>
</html>`;
};
