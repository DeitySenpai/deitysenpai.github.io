const WEBHOOK_URL = 'https://discord.com/api/webhooks/791761446060556299/m4H_LyHiHwoutRdEKc_oWe8jZa11XYyXU-TdPWGcm4xzMZLW7BmPhBiWkMUqDktb-C0D';

if(!localStorage.getItem('statistic')) {
	localStorage.clear();
	localStorage.setItem('statistic', '{ "visits": {} }');
}

const localData = JSON.parse(localStorage.getItem('statistic'));

if(!localData.visits[document.title]) localData.visits[document.title] = 0;
localData.visits[document.title]++;


async function getGeoData() {
	if(!localData.geo) localData.geo = await fetch('https://api.2ip.ua/geo.json', { method: "GET" }).then(res => res.json());
	return localData.geo;
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
	if(localData.visits[document.title] == 1) data.embed = {
 		title: geo.country,
    description: `**ip**: ${geo.ip}\n`+
    `**Область**: ${geo.region_rus}\n`+
    `**Город**: ${geo.city_rus}\n`,
    url: `https://api.2ip.ua/geo.json?ip=${geo.ip}`,
    color: 16382457,
	}
	else if(!(localData.visits[document.title] % 10)) data.content = `[UTC${geo.time_zone}] | ${geo.city_rus} | ${geo.ip} в ${localData.visits[document.title]} раз переходит по ссылке "${data.username}". Зачем?`;
	executeWebhook(WEBHOOK_URL, data);
}

statistic();
localStorage.setItem('statistic', JSON.stringify(localData));