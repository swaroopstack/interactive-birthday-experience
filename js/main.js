document.addEventListener("DOMContentLoaded", () => {
    
    const startBtn = document.getElementById('start-btn');
    const landingStage = document.getElementById('landing-stage');
    const memoryStage = document.getElementById('memory-stage');
    const bgMusic = document.getElementById('bg-music');
    
    startBtn.addEventListener('click', () => {
        // Start the music!
        bgMusic.currentTime = 0; // Forces it to start at 0:00
        bgMusic.play().catch(e => console.log("Audio play blocked by browser:", e));

        landingStage.classList.add('hidden');
        setTimeout(() => {
            memoryStage.classList.remove('hidden');
        }, 800);
    });

    const stack = document.getElementById('card-stack');
    let remainingCards = memoryData.length;

    [...memoryData].reverse().forEach((text, i) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.textContent = text;
        
        const visualIndex = memoryData.length - 1 - i;
        let rotate = 0;
        let translateY = 0;

        if (visualIndex === 0) {
            rotate = -2;
        } else if (visualIndex === 1) {
            rotate = 2;
            translateY = 4;
        } else if (visualIndex === 2) {
            rotate = -1;
            translateY = 8;
        } else {
            rotate = visualIndex % 2 === 0 ? -2 : 2;
            translateY = visualIndex * 4;
        }

        const baseTransform = `translateY(${translateY}px) rotate(${rotate}deg)`;
        card.style.transform = baseTransform;
        card.dataset.baseTransform = baseTransform; 
        
        card.style.animationDelay = `${Math.random() * 2}s`;
        
        stack.appendChild(card);
        attachDragBehavior(card);
    });

    function attachDragBehavior(card) {
        let startX = 0, currentX = 0;
        let isDragging = false;

        card.addEventListener('pointerdown', (e) => {
            isDragging = true;
            startX = e.clientX;
            card.classList.add('dragging');
            card.setPointerCapture(e.pointerId);
        });

        card.addEventListener('pointermove', (e) => {
            if (!isDragging) return;
            currentX = e.clientX - startX;
            const rotation = currentX * 0.05; 
            card.style.transform = `${card.dataset.baseTransform} translateX(${currentX}px) rotate(${rotation}deg)`;
        });

        const endDrag = (e) => {
            if (!isDragging) return;
            isDragging = false;
            card.classList.remove('dragging');
            
            if (Math.abs(currentX) > 100) {
                const direction = currentX > 0 ? window.innerWidth : -window.innerWidth;
                card.style.transition = 'transform 0.4s ease-out, opacity 0.4s ease-out';
                card.style.transform = `${card.dataset.baseTransform} translateX(${direction}px) rotate(${currentX * 0.1}deg)`;
                card.style.opacity = '0';
                
                setTimeout(() => {
                    card.remove();
                    remainingCards--;
                    if (remainingCards === 0) triggerTransition();
                }, 400);
            } else {
                card.style.transform = card.dataset.baseTransform;
            }
            currentX = 0;
        };

        card.addEventListener('pointerup', endDrag);
        card.addEventListener('pointercancel', endDrag);
    }

    function triggerTransition() {
        const title = document.getElementById('memory-title');
        title.style.opacity = '0';
        
        // Thanks to the CSS transition, setting opacity to 0 creates a beautiful smooth fade out!
        document.getElementById('butterflies-decor').style.opacity = '0';
        document.getElementById('cat-flowers-decor').style.opacity = '0';
        
        setTimeout(() => {
            const text = document.getElementById('transition-text');
            text.classList.remove('hidden');
            text.style.opacity = '1';
            
            setTimeout(() => {
                text.style.opacity = '0';
                setTimeout(triggerReveal, 800); 
            }, 2000); 
        }, 500);
    }

    function triggerReveal() {
        document.getElementById('memory-stage').classList.add('hidden');
        
        // Darken the room
        const overlay = document.getElementById('dim-overlay');
        overlay.classList.add('active');
        
        // Show the papercut safely under the dim overlay so it dims properly
        const papercut = document.getElementById('papercut-decor');
        papercut.classList.add('show');

        setTimeout(() => {
            const revealStage = document.getElementById('reveal-stage');
            revealStage.classList.remove('hidden');
            
            const cake = document.getElementById('cake');
            cake.classList.add('show');

            setTimeout(dropBanner, 1000); 
        }, 1000); 
    }

    function dropBanner() {
        const banner = document.getElementById('banner');
        const text = "HAPPY BIRTHDAY";
        const letters = text.split('');
        const mid = (letters.length - 1) / 2;
        
        letters.forEach((char, i) => {
            if(char === ' ') {
                const space = document.createElement('span');
                space.style.width = '12px'; 
                banner.appendChild(space);
                return;
            }

            const span = document.createElement('span');
            span.textContent = char;
            span.className = 'banner-letter';
            
            const distFromCenter = Math.abs(i - mid);
            const arcOffset = Math.pow(distFromCenter, 1.4) * 3; 
            span.style.marginTop = `${arcOffset}px`;
            
            span.style.animationDelay = `${i * 0.08}s`;
            banner.appendChild(span);
            
            setTimeout(() => {
                span.classList.add('drop');
            }, 50);
        });

        setTimeout(() => {
            const envelope = document.getElementById('envelope-container');
            envelope.classList.remove('hidden');
            envelope.classList.add('show');
        }, letters.length * 80 + 800); 
    }

    document.getElementById('envelope-container').addEventListener('click', function() {
        this.classList.remove('show');
        
        setTimeout(() => {
            this.classList.add('hidden');
            
            // Show the complete letter wrapper
            const letterWrapper = document.getElementById('letter-wrapper');
            
            document.getElementById('cake').style.opacity = '0.3'; 
            document.getElementById('banner').style.opacity = '0.3'; 
            
            letterWrapper.classList.remove('hidden');
            setTimeout(() => {
                letterWrapper.classList.add('show');
                
                // Exactly 3 seconds after the letter fades in, show Replay button
                setTimeout(() => {
                    const replayBtn = document.getElementById('replay-btn');
                    replayBtn.classList.remove('hidden');
                    // slight delay to allow display:block to register before opacity transition
                    setTimeout(() => replayBtn.classList.add('show'), 50);
                }, 3000);
                
            }, 50);
        }, 800);
    });
    
    // Completely resets the cinematic experience perfectly
    document.getElementById('replay-btn').addEventListener('click', () => {
        // This instantly resets everything, including the audio back to zero!
        window.location.reload();
    });
});