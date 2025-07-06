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

        // Project tabs functionality
        function showProjects(category) {
            // Hide all project grids
            document.querySelectorAll('.project-grid').forEach(grid => {
                grid.classList.add('hidden');
            });
            
            // Show selected project grid
            const selectedGrid = document.getElementById(category + '-projects');
            if (selectedGrid) {
                selectedGrid.classList.remove('hidden');
            }
            
            // Update active tab
            document.querySelectorAll('.tab-button').forEach(btn => {
                btn.classList.remove('active');
            });
            event.target.classList.add('active');
        }

        // Gallery tabs functionality
        function showGallery(category) {
            // Hide all gallery grids
            document.querySelectorAll('.gallery-grid').forEach(grid => {
                grid.classList.add('hidden');
            });
            
            // Show selected gallery grid
            const selectedGrid = document.getElementById(category + '-gallery');
            if (selectedGrid) {
                selectedGrid.classList.remove('hidden');
            }
            
            // Update active tab
            document.querySelectorAll('.gallery-tabs .tab-button').forEach(btn => {
                btn.classList.remove('active');
            });
            event.target.classList.add('active');
        }

        // Form submission
        document.querySelector('.contact-form').addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! I will get back to you soon.');
            this.reset();
        });

        // Intersection Observer for animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                }
            });
        }, observerOptions);

        // Observe all sections
        document.querySelectorAll('section').forEach(section => {
            observer.observe(section);
        });

        // Header background change on scroll
        window.addEventListener('scroll', () => {
            const header = document.querySelector('header');
            if (window.scrollY > 100) {
                header.style.background = 'rgba(191, 215, 237, 0.95)';
                header.style.backdropFilter = 'blur(10px)';
            } else {
                header.style.background = 'linear-gradient(135deg, var(--blue-soft), var(--pale-cyan))';
                header.style.backdropFilter = 'none';
            }
        });

        // Typing effect for hero title
        function typeWriter(element, text, speed = 100) {
            let i = 0;
            element.innerHTML = '';
            
            function type() {
                if (i < text.length) {
                    element.innerHTML += text.charAt(i);
                    i++;
                    setTimeout(type, speed);
                }
            }
            type();
        }

        // Initialize typing effect when page loads
        window.addEventListener('load', () => {
            const heroTitle = document.querySelector('.hero-text h1');
            if (heroTitle) {
                const originalText = heroTitle.textContent;
                typeWriter(heroTitle, originalText, 80);
            }
        });

        // Parallax effect for hero section
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            const heroSection = document.querySelector('.hero');
            if (heroSection) {
                heroSection.style.transform = `translateY(${rate}px)`;
            }
        });

        // Skills animation on scroll
        const skillCategories = document.querySelectorAll('.skill-category');
        const skillObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 200);
                }
            });
        }, { threshold: 0.1 });

        skillCategories.forEach((category, index) => {
            category.style.opacity = '0';
            category.style.transform = 'translateY(50px)';
            category.style.transition = 'all 0.6s ease';
            skillObserver.observe(category);
        });

        // Project cards hover effect
        document.querySelectorAll('.project-card').forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) scale(1.02)';
                this.style.boxShadow = '0 15px 35px rgba(47, 69, 80, 0.2)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
                this.style.boxShadow = '0 5px 15px rgba(47, 69, 80, 0.1)';
            });
        });

        // Gallery item hover effect
        document.querySelectorAll('.gallery-item').forEach(item => {
            item.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.05) rotate(1deg)';
                this.style.boxShadow = '0 20px 40px rgba(47, 69, 80, 0.2)';
            });
            
            item.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1) rotate(0deg)';
                this.style.boxShadow = '0 5px 15px rgba(47, 69, 80, 0.1)';
            });
        });

        // Counter animation for stats
        function animateCounter(element, start, end, duration) {
            let startTime = null;
            
            function animate(currentTime) {
                if (startTime === null) startTime = currentTime;
                const timeElapsed = currentTime - startTime;
                const progress = Math.min(timeElapsed / duration, 1);
                
                const currentValue = Math.floor(progress * (end - start) + start);
                element.textContent = currentValue + (element.textContent.includes('+') ? '+' : '') + 
                                    (element.textContent.includes('%') ? '%' : '');
                
                if (progress < 1) {
                    requestAnimationFrame(animate);
                }
            }
            
            requestAnimationFrame(animate);
        }

        // Initialize counter animations
        const statObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const statNumber = entry.target.querySelector('.stat-number');
                    const value = parseInt(statNumber.textContent);
                    animateCounter(statNumber, 0, value, 2000);
                }
            });
        }, { threshold: 0.5 });

        document.querySelectorAll('.stat-item').forEach(item => {
            statObserver.observe(item);
        });

        // Mobile menu toggle (for responsive design)
        function toggleMobileMenu() {
            const navLinks = document.querySelector('.nav-links');
            navLinks.classList.toggle('show');
        }

        // Add mobile menu button for small screens
        const nav = document.querySelector('nav');
        const mobileMenuBtn = document.createElement('button');
        mobileMenuBtn.innerHTML = '☰';
        mobileMenuBtn.className = 'mobile-menu-btn';
        mobileMenuBtn.style.display = 'none';
        mobileMenuBtn.style.background = 'none';
        mobileMenuBtn.style.border = 'none';
        mobileMenuBtn.style.fontSize = '1.5rem';
        mobileMenuBtn.style.color = 'var(--slate-dark)';
        mobileMenuBtn.style.cursor = 'pointer';
        mobileMenuBtn.onclick = toggleMobileMenu;

        nav.appendChild(mobileMenuBtn);

        // Show mobile menu button on small screens
        function checkScreenSize() {
            if (window.innerWidth <= 768) {
                mobileMenuBtn.style.display = 'block';
            } else {
                mobileMenuBtn.style.display = 'none';
                document.querySelector('.nav-links').classList.remove('show');
            }
        }

        window.addEventListener('resize', checkScreenSize);
        checkScreenSize();