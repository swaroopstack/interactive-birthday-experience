document.addEventListener("DOMContentLoaded", () => {
    
    /* -------------------------------------------------------------
       1. STAGE TRANSITIONS & SETUP
       ------------------------------------------------------------- */
    const startBtn = document.getElementById('start-btn');
    const landingStage = document.getElementById('landing-stage');
    const memoryStage = document.getElementById('memory-stage');
    
    startBtn.addEventListener('click', () => {
        landingStage.classList.add('hidden');
        setTimeout(() => {
            memoryStage.classList.remove('hidden');
        }, 800);
    });

    /* -------------------------------------------------------------
       2. MEMORY CARD STACK & DRAG LOGIC
       ------------------------------------------------------------- */
    const stack = document.getElementById('card-stack');
    let remainingCards = memoryData.length;

    // We reverse the array so the first element is generated last (putting it highest in the DOM z-index)
    [...memoryData].reverse().forEach((text, i) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.textContent = text;
        
        // Calculate stacking rules visually (Top Card is visualIndex 0)
        const visualIndex = memoryData.length - 1 - i;
        let rotate = 0;
        let translateY = 0;

        if (visualIndex === 0) {
            rotate = -2; // Top card
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
        card.dataset.baseTransform = baseTransform; // Store to snap back if drag fails
        
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
            // Add a slight rotation linked to the drag distance for organic feel
            const rotation = currentX * 0.05; 
            card.style.transform = `${card.dataset.baseTransform} translateX(${currentX}px) rotate(${rotation}deg)`;
        });

        card.addEventListener('pointerup', (e) => {
            if (!isDragging) return;
            isDragging = false;
            card.classList.remove('dragging');
            
            // Threshold for successful swipe
            if (Math.abs(currentX) > 100) {
                // Throw card out of frame
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
                // Snap card back
                card.style.transform = card.dataset.baseTransform;
            }
            currentX = 0;
        });
    }

    /* -------------------------------------------------------------
       3. CINEMATIC TRANSITIONS (DIMMING & REVEAL)
       ------------------------------------------------------------- */
    function triggerTransition() {
        const title = document.getElementById('memory-title');
        title.style.opacity = '0';
        
        setTimeout(() => {
            const text = document.getElementById('transition-text');
            text.classList.remove('hidden');
            text.style.opacity = '1';
            
            // Keep text visible briefly, then dim background
            setTimeout(() => {
                text.style.opacity = '0';
                setTimeout(triggerReveal, 800); // Wait for text to fade before full dim
            }, 2000); 
        }, 500);
    }

    function triggerReveal() {
        document.getElementById('memory-stage').classList.add('hidden');
        
        // Full screen blackout overlay
        const overlay = document.getElementById('dim-overlay');
        overlay.classList.add('active');

        setTimeout(() => {
            const revealStage = document.getElementById('reveal-stage');
            revealStage.classList.remove('hidden');
            
            // 1. Reveal Cake
            const cake = document.getElementById('cake');
            cake.classList.add('show');

            // 2. Drop Banner shortly after
            setTimeout(dropBanner, 1000); 
        }, 1000); // Matches the 1s dim duration
    }

    /* -------------------------------------------------------------
       4. BANNER GENERATOR & LETTER LOGIC
       ------------------------------------------------------------- */
    function dropBanner() {
        const banner = document.getElementById('banner');
        const text = "HAPPY BIRTHDAY";
        const letters = text.split('');
        const mid = (letters.length - 1) / 2;
        
        letters.forEach((char, i) => {
            if(char === ' ') {
                const space = document.createElement('span');
                space.style.width = '12px'; // Gap for space character
                banner.appendChild(space);
                return;
            }

            const span = document.createElement('span');
            span.textContent = char;
            span.className = 'banner-letter';
            
            // Arc logic: Calculate absolute distance from center point.
            // Pushing outer letters down (margin-top) creates a hanging banner 'U' arc.
            const distFromCenter = Math.abs(i - mid);
            const arcOffset = Math.pow(distFromCenter, 1.4) * 3; 
            span.style.marginTop = `${arcOffset}px`;
            
            // Stagger animation timing
            span.style.animationDelay = `${i * 0.08}s`;
            banner.appendChild(span);
            
            // Trigger drop
            setTimeout(() => {
                span.classList.add('drop');
            }, 50);
        });

        // 3. Drop Envelope
        setTimeout(() => {
            const envelope = document.getElementById('envelope-container');
            envelope.classList.remove('hidden');
            envelope.classList.add('show');
        }, letters.length * 80 + 800); 
    }

    // 4. Envelope click -> Letter Reveal End State
    document.getElementById('envelope-container').addEventListener('click', function() {
        this.classList.remove('show');
        
        setTimeout(() => {
            this.classList.add('hidden');
            const letter = document.getElementById('letter');
            document.getElementById('cake').style.opacity = '0.3'; // Dim cake so letter pops
            document.getElementById('banner').style.opacity = '0.3'; // Dim banner
            
            letter.classList.remove('hidden');
            setTimeout(() => {
                letter.classList.add('show');
            }, 50);
        }, 800);
    });
});