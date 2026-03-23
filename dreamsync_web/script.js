// 1. MOUSE FOLLOW
const bgContainer = document.getElementById('ambient-bg');

document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 2; 
    const y = (e.clientY / window.innerHeight - 0.5) * 2;
    
    bgContainer.style.setProperty('--mouse-x', x);
    bgContainer.style.setProperty('--mouse-y', y);
});

// 2. FAQ
const faqButtons = document.querySelectorAll('.faq-btn');
faqButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const item = btn.closest('.faq-item');
        const answer = item.querySelector('.faq-answer');
        if (answer.style.maxHeight) {
            answer.style.maxHeight = null;
            btn.style.transform = 'rotate(0deg)';
        } else {
            answer.style.maxHeight = answer.scrollHeight + "px";
            btn.style.transform = 'rotate(180deg)';
        }
    });
});

// 3. SCROLL REVEAL
const revealOnScroll = () => {
    const reveals = document.querySelectorAll('.reveal');
    const windowHeight = window.innerHeight;
    const elementVisible = 150;

    reveals.forEach((reveal) => {
        const elementTop = reveal.getBoundingClientRect().top;
        if (elementTop < windowHeight - elementVisible) {
            reveal.classList.add('active');
        }
    });
};

window.addEventListener('scroll', revealOnScroll);
revealOnScroll();

// 4. COUNTERS
const counters = document.querySelectorAll('.counter');
let hasAnimated = false; 

const animateCounters = () => {
    const statsSection = document.querySelector('.stats-section');
    if(!statsSection) return;

    const sectionTop = statsSection.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (sectionTop < windowHeight - 100 && !hasAnimated) {
        hasAnimated = true;

        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const duration = 2000; 
            const increment = target / (duration / 16); 
            let current = 0;

            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.innerText = Math.ceil(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.innerText = target;
                }
            };
            updateCounter();
        });
    }
};

window.addEventListener('scroll', animateCounters);