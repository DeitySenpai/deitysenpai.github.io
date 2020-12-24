const scrollToElement = (element) => () => {
	let [header] = document.getElementsByTagName("header");
	window.scrollTo({
	  top: element.getBoundingClientRect().top - document.body.getBoundingClientRect().top - (header.offsetHeight+10),
	  behavior: 'smooth'
	});
}

const hooks = [
	'top',
	'skills',
	'webstack',
	'libraries',
	'contacts'
]

for(const hook of hooks){
	const hookBtnElement = document.getElementById(`hook-navbtn-${hook}`);
	const hookElement = document.getElementById(`hook-${hook}`);
	if(!hookBtnElement)continue;
	if(!hookElement)continue;
	
	hookBtnElement.onclick = scrollToElement(hookElement); 
}
