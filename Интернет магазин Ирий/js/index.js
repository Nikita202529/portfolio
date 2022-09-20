function showModal() {

    const modal = document.getElementById('modal-header');
    const modalNone = document.getElementById('modal-header-none');

    if (modal.style.display == 'flex' && modalNone.style.display == 'none') {
        modal.style.display = 'none';
        modalNone.style.display = 'flex';
    } else {
        modal.style.display = 'flex';
        modalNone.style.display = 'none';
    }   
}