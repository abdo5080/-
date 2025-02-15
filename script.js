document.addEventListener('DOMContentLoaded', function () {
    // إضافة تأثيرات للبطاقات
    const cards = document.querySelectorAll('.grade-card, .video-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
});
