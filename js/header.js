const [header] = document.getElementsByTagName("header");
const welcome = document.getElementById("welcome");

window.addEventListener('scroll', () => {
	if (document.documentElement.scrollTop > document.documentElement.clientHeight-header.offsetHeight) header.classList.add('header-scrolled');
	else header.classList.remove('header-scrolled');
})
