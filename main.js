// Optimized particle creation
function createParticles() {
    const emojis = ['❤️', '💖', '✨', '💝', '🌟', '💞'];
    const container = document.body;
    let lastTime = 0;

    function animate(timestamp) {
        if (!lastTime || timestamp - lastTime >= 600) { 
            const particle = document.createElement('div');
            particle.className = 'love-particle';
            particle.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDuration = Math.random() * 3 + 4 + 's';
            container.appendChild(particle);
            setTimeout(() => particle.remove(), 7000);
            lastTime = timestamp;
        }
        requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
}

// Message animation sequence
let currentMessage = 0;
const messages = document.querySelectorAll('.message');
const finalQuestion = document.querySelector('.final-question');

function showNextMessage() {
    if (currentMessage > 0) {
        messages[currentMessage - 1].classList.remove('active');
        messages[currentMessage - 1].classList.add('exit');
    }
    
    if (currentMessage < messages.length) {
        messages[currentMessage].classList.add('active');
        currentMessage++;
        setTimeout(showNextMessage, 3000);
    } else {
        finalQuestion.style.display = 'block';
        setTimeout(() => finalQuestion.style.opacity = '1', 50);
    }
}

// Button interactions
document.querySelector('.yes-btn').addEventListener('click', function() {
    const celebration = document.querySelector('.celebration');
    const letter = document.getElementById('love-letter');
    celebration.style.display = 'block';

    // Heart burst effect
    for (let i = 0; i < 40; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart-burst';
        heart.textContent = '❤️';
        heart.style.left = '50%';
        heart.style.top = '50%';
        // Random directions for burst
        heart.style.setProperty('--tx', (Math.random() * 400 - 200) + 'px');
        heart.style.setProperty('--ty', (Math.random() * 400 - 200) + 'px');
        celebration.appendChild(heart);
        setTimeout(() => heart.remove(), 1200);
    }

    // Change main text and show letter button
    finalQuestion.innerHTML = 
        "<h2>I love you so much! 💝</h2>" +
        "<p>You've made me the happiest person alive.</p>" +
        "<button id='open-letter-btn' class='valentine-btn'>Open My Letter 💌</button>";

    document.getElementById('open-letter-btn').addEventListener('click', () => {
        letter.style.display = 'block';
        setTimeout(() => letter.classList.add('show'), 10);
    });
});

// "No" button dodging logic
const noBtn = document.querySelector('.no-btn');
noBtn.addEventListener('mouseover', function() {
    const x = Math.random() * (window.innerWidth - this.offsetWidth);
    const y = Math.random() * (window.innerHeight - this.offsetHeight);
    
    this.style.position = 'fixed';
    this.style.left = x + 'px';
    this.style.top = y + 'px';
});

// Close letter
document.querySelector('.close-letter').addEventListener('click', () => {
    const letter = document.getElementById('love-letter');
    letter.classList.remove('show');
    setTimeout(() => letter.style.display = 'none', 500);
});

// Initialize
createParticles();
setTimeout(showNextMessage, 1000);