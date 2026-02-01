document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add enhanced shadow to header on scroll
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 2px 30px rgba(0, 212, 255, 0.4)';
        } else {
            header.style.boxShadow = '0 2px 20px rgba(0, 212, 255, 0.2)';
        }
    });

    // AUTOPLAY MUSIC - Alan Walker - On My Way
    let musicPlaying = false;
    let musicStarted = false;
    const musicToggle = document.getElementById('musicToggle');
    const musicPlayer = document.getElementById('music-player');

    function playAudio() {
        console.log('🎵 Attempting to play audio...');
        musicPlayer.volume = 0.3;
        musicPlayer.muted = false;
        
        // Check if audio file loads
        musicPlayer.addEventListener('loadeddata', function() {
            console.log('✅ Audio file loaded successfully');
        }, { once: true });
        
        musicPlayer.addEventListener('error', function(e) {
            console.log('❌ Audio error:', e);
        });
        
        musicPlayer.play().then(() => {
            console.log('✅ Audio playing successfully!');
            musicToggle.innerHTML = '<i class="fas fa-pause"></i>';
            musicToggle.classList.add('playing');
            musicPlaying = true;
            musicStarted = true;
        }).catch(err => {
            console.log('❌ Audio play failed:', err.message);
            
            // Try muted play then unmute after 1 second
            musicPlayer.muted = true;
            musicPlayer.play().then(() => {
                console.log('✅ Audio muted play successful, will unmute in 1s');
                setTimeout(() => {
                    musicPlayer.muted = false;
                    console.log('🔊 Audio unmuted');
                }, 1000);
                musicToggle.innerHTML = '<i class="fas fa-pause"></i>';
                musicToggle.classList.add('playing');
                musicPlaying = true;
                musicStarted = true;
            }).catch(err2 => {
                console.log('❌ Even muted play failed:', err2.message);
            });
        });
    }

    function bestDelayedAutoplay() {
        const delays = [500, 1000, 2000, 3000]; // Multiple attempts
        
        delays.forEach((delay, index) => {
            setTimeout(() => {
                musicPlayer.volume = 0.3;
                musicPlayer.play().then(() => {
                    console.log(`✅ Audio started at ${delay}ms`);
                    musicToggle.innerHTML = '<i class="fas fa-pause"></i>';
                    musicToggle.classList.add('playing');
                    musicPlaying = true;
                    musicStarted = true;
                }).catch(err => {
                    console.log(`❌ Attempt ${index + 1} failed at ${delay}ms:`, err.message);
                });
            }, delay);
        });
    }

    function toggleMusic() {
        if (musicPlaying) {
            musicPlayer.pause();
            musicToggle.innerHTML = '<i class="fas fa-music"></i>';
            musicToggle.classList.remove('playing');
            musicPlaying = false;
        } else {
            playAudio();
        }
    }



    // Initialize autoplay on page load
    if (musicToggle && musicPlayer) {
        musicToggle.addEventListener('click', toggleMusic);
        
        // Start delayed autoplay immediately
        bestDelayedAutoplay();
        
        // Fallback: start on first user interaction if autoplay blocked
        document.addEventListener('click', function startMusic() {
            if (!musicStarted) {
                setTimeout(() => {
                    playAudio();
                    console.log('✅ Audio started via user interaction');
                }, 500);
            }
        }, { once: true });
        
        // Also try on scroll
        document.addEventListener('scroll', function startMusicOnScroll() {
            if (!musicStarted && window.scrollY > 100) {
                console.log('📜 Scroll detected, attempting to start music...');
                playAudio();
                document.removeEventListener('scroll', startMusicOnScroll);
            }
        });
        
        // Try on any key press
        document.addEventListener('keydown', function startMusicOnKey() {
            if (!musicStarted) {
                console.log('⌨️ Key press detected, attempting to start music...');
                playAudio();
                document.removeEventListener('keydown', startMusicOnKey);
            }
        });
    }

    // Form submission handling
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');
            
            // Here you would normally send the data to a server
            // For demo purposes, we'll show a success message
            showNotification('🚀 Message sent successfully! I\'ll get back to you soon.');
            
            // Reset form
            this.reset();
        });
    }

    // Enhanced Notification function
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.innerHTML = `
            <div class="notification-content">
                <div class="notification-icon">🚀</div>
                <div class="notification-text">${message}</div>
            </div>
        `;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: linear-gradient(135deg, rgba(0, 212, 255, 0.9), rgba(255, 0, 255, 0.9));
            color: white;
            padding: 20px 25px;
            border-radius: 15px;
            box-shadow: 0 10px 40px rgba(0, 212, 255, 0.4);
            z-index: 10000;
            transform: translateX(120%);
            transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
            max-width: 320px;
            font-weight: 600;
            font-family: 'Rajdhani', sans-serif;
            border: 1px solid rgba(0, 212, 255, 0.3);
            backdrop-filter: blur(10px);
        `;
        
        const contentStyle = `
            display: flex;
            align-items: center;
            gap: 15px;
        `;
        
        const iconStyle = `
            font-size: 1.5rem;
            animation: bounce 1s ease-in-out infinite;
        `;
        
        document.body.appendChild(notification);
        
        // Add styles
        const notificationContent = notification.querySelector('.notification-content');
        notificationContent.style.cssText = contentStyle;
        
        const notificationIcon = notification.querySelector('.notification-icon');
        notificationIcon.style.cssText = iconStyle;
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after 6 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(120%)';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 500);
        }, 6000);
    }

    // Enhanced Intersection Observer with stagger effect
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) scale(1)';
                }, index * 100); // Stagger animation
            }
        });
    }, observerOptions);

    // Add enhanced fade-in animation to sections and cards
    const animatedElements = document.querySelectorAll('section, .skill-card, .project-card, .stat');
    animatedElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(50px) scale(0.95)';
        element.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(element);
    });

    // Enhanced hover effects for skill cards with glow
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.05) rotateX(5deg)';
            this.style.boxShadow = '0 30px 60px rgba(0, 212, 255, 0.4)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1) rotateX(0)';
            this.style.boxShadow = '0 20px 40px rgba(0, 212, 255, 0.3)';
        });

        // Add particle effect on click
        card.addEventListener('click', function(e) {
            createParticleEffect(e.pageX, e.pageY);
        });
    });

    // Enhanced typing effect with multiple colors
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.innerHTML;
        heroTitle.innerHTML = '';
        
        let index = 0;
        const typingSpeed = 100;
        const colors = ['#00d4ff', '#ff00ff', '#00ff88', '#00d4ff'];
        let colorIndex = 0;
        
        function typeWriter() {
            if (index < originalText.length) {
                const char = originalText[index];
                if (char === ' ') {
                    heroTitle.innerHTML += char;
                } else {
                    const span = document.createElement('span');
                    span.textContent = char;
                    span.style.color = colors[colorIndex % colors.length];
                    span.style.animation = 'glow 2s ease-in-out infinite';
                    heroTitle.appendChild(span);
                    colorIndex++;
                }
                index++;
                setTimeout(typeWriter, typingSpeed);
            } else {
                // Restore original gradient animation
                setTimeout(() => {
                    heroTitle.innerHTML = originalText;
                }, 2000);
            }
        }
        
        // Start typing effect after page load
        setTimeout(typeWriter, 500);
    }

    // Enhanced parallax effect with multiple layers
    let ticking = false;
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        const heroContent = document.querySelector('.hero-container');
        
        if (hero && scrolled < window.innerHeight) {
            hero.style.transform = `translateY(${scrolled * 0.3}px)`;
            heroContent.style.transform = `translateY(${scrolled * 0.1}px)`;
        }
        
        ticking = false;
    }

    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    });

    // Enhanced active nav link highlighting with glow
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

    function highlightNavLink() {
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightNavLink);
    highlightNavLink();

    // Add keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Press 'm' to toggle music
        if (e.key === 'm' || e.key === 'M') {
            if (musicToggle) {
                musicToggle.click();
            }
        }
        
        // Press 't' to scroll to top
        if (e.key === 't' || e.key === 'T') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });

    // Particle effect function
    function createParticleEffect(x, y) {
        const particles = 8;
        for (let i = 0; i < particles; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: fixed;
                left: ${x}px;
                top: ${y}px;
                width: 4px;
                height: 4px;
                background: linear-gradient(135deg, #00d4ff, #ff00ff);
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                animation: particleFloat 1s ease-out forwards;
            `;
            
            const angle = (Math.PI * 2 * i) / particles;
            const velocity = 100 + Math.random() * 100;
            
            particle.style.setProperty('--tx', `${Math.cos(angle) * velocity}px`);
            particle.style.setProperty('--ty', `${Math.sin(angle) * velocity}px`);
            
            document.body.appendChild(particle);
            
            setTimeout(() => {
                if (document.body.contains(particle)) {
                    document.body.removeChild(particle);
                }
            }, 1000);
        }
    }

    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
        .nav-link.active {
            color: #00d4ff !important;
            text-shadow: 0 0 15px rgba(0, 212, 255, 0.8);
        }
        
        .hamburger.active .bar:nth-child(2) {
            opacity: 0;
        }
        
        .hamburger.active .bar:nth-child(1) {
            transform: translateY(8px) rotate(45deg);
            background: #00d4ff;
        }
        
        .hamburger.active .bar:nth-child(3) {
            transform: translateY(-8px) rotate(-45deg);
            background: #00d4ff;
        }

        @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-5px); }
        }

        @keyframes glow {
            0%, 100% { filter: brightness(1); }
            50% { filter: brightness(1.2); }
        }

        @keyframes particleFloat {
            0% {
                transform: translate(0, 0) scale(1);
                opacity: 1;
            }
            100% {
                transform: translate(var(--tx), var(--ty)) scale(0);
                opacity: 0;
            }
        }

        .notification-content {
            display: flex;
            align-items: center;
            gap: 15px;
        }

        .notification-icon {
            font-size: 1.5rem;
            animation: bounce 1s ease-in-out infinite;
        }
    `;
    document.head.appendChild(style);

    // Add floating animation to avatar
    const avatar = document.querySelector('.avatar');
    if (avatar) {
        avatar.addEventListener('mouseenter', function() {
            this.style.animation = 'avatarFloat 3s ease-in-out infinite, glow 2s ease-in-out infinite';
        });
        
        avatar.addEventListener('mouseleave', function() {
            this.style.animation = 'avatarFloat 6s ease-in-out infinite';
        });
    }

    // Add cyberpunk cursor trail effect
    let mouseTrail = [];
    const maxTrailLength = 5;

    document.addEventListener('mousemove', function(e) {
        const trail = document.createElement('div');
        trail.className = 'mouse-trail';
        trail.style.cssText = `
            position: fixed;
            left: ${e.clientX}px;
            top: ${e.clientY}px;
            width: 8px;
            height: 8px;
            background: radial-gradient(circle, #00d4ff, transparent);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9998;
            animation: trailFade 1s ease-out forwards;
        `;
        
        document.body.appendChild(trail);
        mouseTrail.push(trail);
        
        if (mouseTrail.length > maxTrailLength) {
            const oldTrail = mouseTrail.shift();
            if (document.body.contains(oldTrail)) {
                document.body.removeChild(oldTrail);
            }
        }
        
        setTimeout(() => {
            if (document.body.contains(trail)) {
                document.body.removeChild(trail);
            }
        }, 1000);
    });

    // Add trail animation
    const trailStyle = document.createElement('style');
    trailStyle.textContent = `
        @keyframes trailFade {
            0% {
                transform: scale(1);
                opacity: 0.6;
            }
            100% {
                transform: scale(0);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(trailStyle);
});