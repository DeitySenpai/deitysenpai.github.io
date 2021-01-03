const [header] = document.getElementsByTagName("header");
const avatar = document.getElementById("avatar");
const welcome = document.getElementById("welcome");

window.onscroll = function scrollFunction() {
	let n = (document.documentElement.scrollTop == 0 ? 1 : .9 - (document.documentElement.scrollTop-100)/900).toFixed(2);
	avatar.style.opacity = n < 0 ? 0 : n;
  if (document.documentElement.scrollTop > document.documentElement.clientHeight-header.offsetHeight) header.classList.add('header-scrolled'); 
  else header.classList.remove('header-scrolled'); //for alna >>.>
}
