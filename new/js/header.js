const [header] = document.getElementsByTagName("header");

window.onscroll = function scrollFunction() {
  if (document.documentElement.scrollTop > document.documentElement.clientHeight-header.offsetHeight) header.classList.add('header-scrolled'); 
  else header.classList.remove('header-scrolled');
}
