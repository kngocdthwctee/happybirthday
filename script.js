let loveCount = 0;
let isCutePartyMode = false;
let musicPlaying = false;
let candlesBlown = 0;
let heartsActive = false;
let hedgehogMessages = [
    "Mẹ là người tuyệt vời nhất! 🦔💕",
    "Con yêu mẹ rất nhiều! 🌟",
    "Chúc mẹ sinh nhật vui vẻ! 🎂",
    "Mẹ nhím xinh đẹp nhất! ✨",
    "Chúc mẹ luôn khỏe mạnh! 🌸",
    "Mẹ xứng đáng có những điều tốt đẹp nhất! 💖",
    "Con sẽ luôn bên cạnh mẹ! 🦔👶",
    "Sinh nhật 23 tuổi thật ý nghĩa! 🎈"
];

// Create audio element for the birthday music
const birthdayMusic = new Audio('happy-birthday-220024.mp3');
birthdayMusic.loop = true;

// LOADING ANIMATION
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loading').style.display = 'none';
        document.getElementById('main-content').style.display = 'block';
        initializeCuteAnimations();
    }, 2000);
});

// CUTE CURSOR
const cursor = document.getElementById('cursor');
let mouseX = 0, mouseY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = (mouseX - 15) + 'px';
    cursor.style.top = (mouseY - 15) + 'px';
});

document.addEventListener('mousedown', () => {
    cursor.classList.add('clicked');
    createHeartBurst(mouseX, mouseY);
    setTimeout(() => cursor.classList.remove('clicked'), 200);
});

// HEDGEHOG INTERACTION
document.getElementById('hedgehog-main').addEventListener('click', () => {
    playHedgehogMessage();
    createSparkleEffect();
    addLove();
});

function playHedgehogMessage() {
    const speechBubble = document.getElementById('hedgehog-speech');
    const randomMessage = hedgehogMessages[Math.floor(Math.random() * hedgehogMessages.length)];

    speechBubble.style.animation = 'none';
    speechBubble.textContent = randomMessage;

    setTimeout(() => {
        speechBubble.style.animation = 'speechBubble 2s ease-in-out infinite';
    }, 100);

    // setTimeout(() => {
    //     speechBubble.textContent = 'Nhấp vào nhím con để nghe lời chúc! 💕';
    // }, 4000);
}

// CAKE INTERACTION
document.getElementById('candles').addEventListener('click', (e) => {
    if (e.target.classList.contains('candle-cute')) {
        blowCandle(e.target, e);
    }
});

function blowCandle(candle, e) {
    if (!candle.classList.contains('blown-out')) {
        candle.classList.add('blown-out');
        candlesBlown++;

        const message = document.getElementById('cake-message');

        if (candlesBlown === 3) {
            message.textContent = '🎉 Mẹ đã thổi hết nến rồi! Ước gì sẽ thành hiện thực! ✨';
            createFloatingHearts();
            addLove();
            setTimeout(() => {
                message.textContent = '💕 Chúc mẹ sinh nhật thật hạnh phúc! 💕';
            }, 4000);
        } else {
            const remaining = 3 - candlesBlown;
            message.textContent = `💨 Còn ${remaining} ngọn nến nữa mẹ nhé! 🕯️`;
        }

        createHeartBurst(e.clientX, e.clientY);
        playBlowSound();
    }
}

function playBlowSound() {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.setValueAtTime(200, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(50, audioContext.currentTime + 0.5);

    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
}

// BUTTON EVENT LISTENERS
document.getElementById('surprise-btn').addEventListener('click', () => {
    showSurprise();
    createConfetti();
    addLove();
});

document.getElementById('music-btn').addEventListener('click', () => {
    toggleCuteMusic();
});

document.getElementById('party-btn').addEventListener('click', () => {
    startCutePartyMode();
});

// LOVE SYSTEM
function addLove() {
    loveCount++;
    document.getElementById('love-count').textContent = loveCount;

    if (loveCount === 10) {
        showSpecialMessage("🎉 Wow! 10 lần yêu thương rồi! Mẹ thật đặc biệt! 🎉");
    } else if (loveCount === 25) {
        showSpecialMessage("💖 25 lần! Con yêu mẹ lắm lắm! 💖");
    } else if (loveCount === 50) {
        showSpecialMessage("🌟 50 lần rồi! Mẹ là số 1! 🌟");
    }
}

function showSpecialMessage(message) {
    const specialDiv = document.createElement('div');
    specialDiv.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, #ff69b4, #ff1493);
        color: white;
        padding: 25px 35px;
        border-radius: 25px;
        font-size: 1.5rem;
        font-weight: 700;
        text-align: center;
        z-index: 1000;
        animation: specialPop 0.8s ease;
        box-shadow: 0 15px 35px rgba(255, 105, 180, 0.5);
        border: 3px solid white;
    `;
    specialDiv.textContent = message;

    document.body.appendChild(specialDiv);

    setTimeout(() => {
        document.body.removeChild(specialDiv);
    }, 3000);
}

var isSurpriseShowed = false;

// SURPRISE FUNCTIONS
function showSurprise() {
    const giftSection = document.getElementById('gift-section');
    giftSection.style.display = 'block';

    setTimeout(() => {
        document.getElementById('gift-cute').click();
    }, 1000);
    if (!isSurpriseShowed) {
        isSurpriseShowed = true;
        setTimeout(() => {
            const photoGallery = document.getElementById('photo-gallery');
            photoGallery.style.display = 'block';
            photoGallery.scrollIntoView({ behavior: 'smooth' });
        }, 3000);
    }
}

document.getElementById('gift-cute').addEventListener('click', () => {
    const giftContent = document.getElementById('gift-content');
    if (giftContent.style.display === 'none') {
        giftContent.style.display = 'block';
        createConfetti();
        addLove();
    }
});

// MUSIC SYSTEM
function toggleCuteMusic() {
    const musicBtn = document.getElementById('music-btn');

    if (musicPlaying) {
        stopCuteMusic();
        musicBtn.innerHTML = '<span class="btn-icon">🎵</span><span class="btn-text">Nhạc sinh nhật</span>';
    } else {
        playCuteMusic();
        musicBtn.innerHTML = '<span class="btn-icon">⏸️</span><span class="btn-text">Dừng nhạc</span>';
    }
    musicPlaying = !musicPlaying;
}

function playCuteMusic() {
    birthdayMusic.play().catch(error => {
        console.error('Error playing music:', error);
    });
}

function stopCuteMusic() {
    birthdayMusic.pause();
    birthdayMusic.currentTime = 0;
}

// PARTY MODE
function startCutePartyMode() {
    if (isCutePartyMode) return;

    isCutePartyMode = true;
    const partyBtn = document.getElementById('party-btn');
    partyBtn.innerHTML = '<span class="btn-icon">🎊</span><span class="btn-text">Đang tiệc!</span>';
    partyBtn.disabled = true;

    createFloatingHearts();
    createConfetti();
    createHedgehogRain();
    createSparkleEffect();

    // showSpecialMessage("🎉 TIỆC NHÍM BẮT ĐẦU! 🦔💕 HAPPY BIRTHDAY MẸ! 🎂✨");

    setTimeout(() => {
        isCutePartyMode = false;
        partyBtn.innerHTML = '<span class="btn-icon">🎉</span><span class="btn-text">Tiệc nhím!</span>';
        partyBtn.disabled = false;
    }, 20000);
}

// ANIMATION FUNCTIONS
function createFloatingHearts() {
    const heartsContainer = document.getElementById('hearts');
    const heartTypes = ['💕', '💖', '💗', '💝', '💘', '💞'];

    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.className = 'heart';
            heart.textContent = heartTypes[Math.floor(Math.random() * heartTypes.length)];
            heart.style.left = Math.random() * 100 + '%';
            heart.style.animationDuration = (Math.random() * 4 + 4) + 's';
            heart.style.animationDelay = Math.random() * 2 + 's';
            heart.style.fontSize = (Math.random() * 1.5 + 1) + 'rem';

            heartsContainer.appendChild(heart);

            setTimeout(() => {
                if (heart.parentNode) {
                    heart.parentNode.removeChild(heart);
                }
            }, 8000);
        }, i * 100);
    }
}

function createHeartBurst(x, y) {
    for (let i = 0; i < 8; i++) {
        const heart = document.createElement('div');
        heart.textContent = '💕';
        heart.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            font-size: 1.5rem;
            pointer-events: none;
            z-index: 1000;
            animation: heartBurst 1s ease-out forwards;
            transform-origin: center;
        `;

        heart.style.setProperty('--angle', i * 45 + 'deg');
        document.body.appendChild(heart);

        setTimeout(() => {
            if (heart.parentNode) {
                heart.parentNode.removeChild(heart);
            }
        }, 1000);
    }

    if (!document.getElementById('heart-burst-style')) {
        const style = document.createElement('style');
        style.id = 'heart-burst-style';
        style.textContent = `
            @keyframes heartBurst {
                0% { 
                    transform: scale(0) rotate(var(--angle)); 
                    opacity: 1; 
                }
                100% { 
                    transform: scale(1) rotate(var(--angle)) translateX(50px); 
                    opacity: 0; 
                }
            }
        `;
        document.head.appendChild(style);
    }
}

function createConfetti() {
    const confettiContainer = document.getElementById('confetti');
    const confettiTypes = ['🎊', '🎉', '🌸', '✨', '💖', '🦔', '🎂', '🎈'];

    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti-piece';
            confetti.textContent = confettiTypes[Math.floor(Math.random() * confettiTypes.length)];
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.fontSize = (Math.random() * 1.5 + 1) + 'rem';
            confetti.style.animationDuration = (Math.random() * 3 + 3) + 's';
            confetti.style.animationDelay = Math.random() * 2 + 's';

            confettiContainer.appendChild(confetti);

            setTimeout(() => {
                if (confetti.parentNode) {
                    confetti.parentNode.removeChild(confetti);
                }
            }, 6000);
        }, i * 50);
    }
}

function createHedgehogRain() {
    const hedgehogContainer = document.getElementById('hedgehog-rain');

    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            const hedgehog = document.createElement('div');
            hedgehog.className = 'falling-hedgehog';
            hedgehog.textContent = '🦔';
            hedgehog.style.left = Math.random() * 100 + '%';
            hedgehog.style.animationDuration = (Math.random() * 5 + 5) + 's';
            hedgehog.style.animationDelay = Math.random() * 3 + 's';

            hedgehogContainer.appendChild(hedgehog);

            setTimeout(() => {
                if (hedgehog.parentNode) {
                    hedgehog.parentNode.removeChild(hedgehog);
                }
            }, 10000);
        }, i * 200);
    }
}

function createSparkleEffect() {
    const sparklesContainer = document.getElementById('sparkles');
    const sparkleTypes = ['✨', '⭐', '🌟', '💫'];

    for (let i = 0; i < 20; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.textContent = sparkleTypes[Math.floor(Math.random() * sparkleTypes.length)];
        sparkle.style.left = Math.random() * 100 + '%';
        sparkle.style.top = Math.random() * 100 + '%';
        sparkle.style.animationDelay = Math.random() * 4 + 's';
        sparkle.style.animationDuration = (Math.random() * 2 + 3) + 's';

        sparklesContainer.appendChild(sparkle);

        setTimeout(() => {
            if (sparkle.parentNode) {
                sparkle.parentNode.removeChild(sparkle);
            }
        }, 8000);
    }
}

// KEYBOARD SHORTCUTS
document.addEventListener('keydown', (e) => {
    switch (e.key.toLowerCase()) {
        case 'h':
            document.getElementById('hedgehog-main').click();
            break;
        case 'l':
            addLove();
            createFloatingHearts();
            break;
        case 'c':
            createConfetti();
            break;
        case 'p':
            startCutePartyMode();
            break;
        case 'm':
            toggleCuteMusic();
            break;
        case 's':
            createSparkleEffect();
            break;
        case ' ':
            e.preventDefault();
            const candles = document.querySelectorAll('.candle-cute:not(.blown-out)');
            if (candles.length > 0) {
                blowCandle(candles[0]);
            }
            break;
    }
});

// AUTO CUTE MESSAGES
const cuteMessages = [
    "🦔 Nhím con gửi lời yêu thương đến mẹ!",
    "💕 Mẹ là người tuyệt vời nhất!",
    "🌸 Chúc mẹ luôn xinh đẹp như hoa!",
    "✨ Mẹ xứng đáng có những điều tốt đẹp nhất!",
    "🎂 Sinh nhật vui vẻ mẹ nhím yêu!",
    "💖 Con yêu mẹ nhiều lắm!",
    "🌟 Mẹ là ngôi sao sáng nhất!",
    "🎈 23 tuổi thật tuyệt vời!"
];

function showRandomCuteMessage() {
    const message = cuteMessages[Math.floor(Math.random() * cuteMessages.length)];
    const messageElement = document.createElement('div');
    messageElement.style.cssText = `
        position: fixed;
        top: 30px;
        right: 30px;
        background: linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 182, 193, 0.95));
        padding: 15px 25px;
        border-radius: 25px;
        font-size: 1.1rem;
        color: #d63384;
        font-weight: 600;
        z-index: 1000;
        animation: cuteMessageSlide 0.6s ease, cuteMessageFade 0.6s ease 4s;
        box-shadow: 0 8px 25px rgba(255, 105, 180, 0.3);
        border: 2px solid #ffb3d9;
        max-width: 300px;
        text-align: center;
    `;
    messageElement.textContent = message;

    document.body.appendChild(messageElement);

    setTimeout(() => {
        if (messageElement.parentNode) {
            messageElement.parentNode.removeChild(messageElement);
        }
    }, 5000);
}

// SPECIAL BIRTHDAY FEATURES
function checkIfBirthdayToday() {
    const today = new Date();
    const isBirthday = today.getMonth() === 8 && today.getDate() === 9;

    if (isBirthday) {
        setTimeout(() => {
            showSpecialMessage("🎉 HÔM NAY LÀ SINH NHẬT MẸ! 🎂 CHÚC MỪNG MẸ NHÍM YÊU! 🦔💕");
            startCutePartyMode();
            createFloatingHearts();
        }, 5000);
    }
}

// TOUCH SUPPORT
document.addEventListener('touchstart', (e) => {
    const touch = e.touches[0];
    const element = document.elementFromPoint(touch.clientX, touch.clientY);

    if (element && element.onclick) {
        element.click();
    }

    createHeartBurst(touch.clientX, touch.clientY);
});

// INITIALIZATION
function initializeCuteAnimations() {
    setInterval(createFloatingHearts, 8000);
    setInterval(showRandomCuteMessage, 25000);
    checkIfBirthdayToday();

    setTimeout(() => {
        showSpecialMessage("🦔💕 Chào mừng đến bữa tiệc sinh nhật của mẹ nhím! 💕🦔");
    }, 2000);

    addCuteAnimationStyles();
}

function addCuteAnimationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes cuteMessageSlide {
            0% { transform: translateX(100%); opacity: 0; }
            100% { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes cuteMessageFade {
            0% { opacity: 1; }
            100% { opacity: 0; }
        }
        
        @keyframes specialPop {
            0% { 
                transform: translate(-50%, -50%) scale(0) rotate(-10deg); 
                opacity: 0; 
            }
            50% { 
                transform: translate(-50%, -50%) scale(1.1) rotate(5deg); 
            }
            100% { 
                transform: translate(-50%, -50%) scale(1) rotate(0deg); 
                opacity: 1; 
            }
        }
    `;
    document.head.appendChild(style);
}

// RESIZE HANDLING
window.addEventListener('resize', () => {
    const canvas = document.getElementById('hearts-canvas');
    if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
});

// WINDOW FOCUS EVENTS
window.addEventListener('focus', () => {
    if (Math.random() < 0.3) {
        setTimeout(() => {
            showRandomCuteMessage();
        }, 1000);
    }
});