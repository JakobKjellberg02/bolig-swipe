"use strict";
const container = document.getElementById('Bolig');
let startX = 0;
let currentCard = null;
async function loadCard() {
    try {
        const res = await fetch(`http://192.168.68.80:5212/apartments/random`);
        const data = await res.json();
        if (!container)
            return;
        if (currentCard)
            container.removeChild(currentCard);
        const card = document.createElement('div');
        card.className = 'Bolig';
        const img = document.createElement('img');
        img.src = 'no_bolig.jpg';
        img.alt = data.street;
        const info = document.createElement('div');
        info.className = 'info';
        info.innerHTML = `
            <h3>${data.street}, ${data.city}</h3>
            <p>${data.price.toLocaleString()} kr.</p>
            <p>${data.rooms} vær., ${data.size} m²</p>
        `;
        card.append(img, info);
        container.appendChild(card);
        currentCard = card;
        setSwipeEvents(card);
        if (data.images?.[0]?.url) {
            const realImg = new Image();
            realImg.src = data.images[0].url;
            realImg.onload = () => img.src = realImg.src;
            realImg.onerror = () => img.src = 'no_bolig.jpg';
        }
    }
    catch (err) {
        console.error('Error loading content:', err);
    }
}
function setSwipeEvents(card) {
    let offsetX = 0;
    let startX = 0;
    const handleStart = (e) => {
        if ('touches' in e)
            startX = e.touches[0].clientX;
        else {
            startX = e.clientX;
            document.onmousemove = handleMove;
            document.onmouseup = handleEnd;
        }
        card.style.transition = 'none';
    };
    const handleMove = (e) => {
        let x = 'touches' in e ? e.touches[0].clientX : e.clientX;
        offsetX = x - startX;
        card.style.transform = `translateX(${offsetX}px) rotate(${offsetX / 20}deg)`;
        if (!container)
            return;
        container.classList.remove('right-swipe', 'left-swipe');
        if (offsetX > 0)
            container.classList.add('right-swipe');
        else if (offsetX < 0)
            container.classList.add('left-swipe');
    };
    const handleEnd = () => {
        card.style.transition = 'transform 0.3s ease';
        if (!container)
            return;
        container.classList.remove('right-swipe', 'left-swipe');
        if (Math.abs(offsetX) > 100) {
            card.style.transform = `translateX(${offsetX > 0 ? 1000 : -1000}px) rotate(${offsetX > 0 ? 30 : -30}deg)`;
            setTimeout(() => loadCard(), 300);
        }
        else {
            card.style.transform = 'translateX(0) rotate(0)';
        }
        document.onmousemove = null;
        document.onmouseup = null;
    };
    if ('ontouchstart' in window) {
        card.addEventListener('touchstart', handleStart);
        card.addEventListener('touchmove', handleMove);
        card.addEventListener('touchend', handleEnd);
    }
    card.addEventListener('mousedown', handleStart);
}
loadCard();
