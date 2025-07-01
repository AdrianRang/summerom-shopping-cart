const axios = require('axios')
const cheerio = require('cheerio');
const { time } = require('console');
const fs = require('fs');

const regions = [
    'US',
    'EU',
    'IN',
    'CA',
    'AU',
    'XX'
]

const data = [{
    date: new Date()
}];

for(let region in regions) {    
    const url = 'https://summer.hackclub.com/shop?region=' + regions[region]

    const regionData = [];
    
    axios.get(url).then((response) => {
        const $ = cheerio.load(response.data)
        
        regionData.push($('.card-content').slice(4).map((i, element) => {
            return {
                i: i,
                title: $(element).find('h3').text(),
                description: $(element).find('p').text().slice(0, $(element).find('p').text().indexOf('\n')),
                img: $(element).find('div').find('div').find('div').find('img').attr('src'),
                cost: $(element).find('div').text().slice(70, 70 + $(element).find('div').text().slice(70).indexOf("\n")),
                hours: $(element).find('div.text-xs').text().slice(10, $(element).find('div.text-xs').text().indexOf(' hours'))
            };
        }).get());

        data.push({ region: regions[region], data: regionData })
        const json = JSON.stringify(data);
        fs.writeFile("shop-data/shop.json", json, (err) => {
            console.log('error writing file: ' + err)
        })
    })
}

