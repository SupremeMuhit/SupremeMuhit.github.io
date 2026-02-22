// Very simple script to add a highly subtle mouse-follow tilt effect to the bento boxes
const cards = document.querySelectorAll('.bento-item');

cards.forEach(card => {
    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        // Calculate tilt
        const rotateX = ((y - centerY) / centerY) * -2; // Max 2 degrees
        const rotateY = ((x - centerX) / centerX) * 2;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});
