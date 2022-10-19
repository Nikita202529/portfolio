const gamburger = document.getElementById('gamburger');
const navLink = document.getElementsByClassName('nav-link-header');
const navigation = document.getElementById('navigation');

const toggleNavigation = () => {
    navigation.classList.toggle('d-none');
}

gamburger.onclick = toggleNavigation;

for (let item of navLink) {
    item.onclick = toggleNavigation;
}
