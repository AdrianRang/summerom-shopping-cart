const axios = require('axios')
const cheerio = require('cheerio');
const { time } = require('console');
const fs = require('fs');

const url = 'https://summer.hackclub.com/shop'

axios.get(url).then((response) => {
    const $ = cheerio.load(response.data)

    const data = [{
        date: new Date()
    }];
    data.push($('.card-content').slice(3).map((i, element) => {
        return {
            i: i,
            title: $(element).find('h3').text(),
            description: $(element).find('p').text().slice(0, $(element).find('p').text().indexOf('\n')),
            img: $(element).find('div').find('div').find('div').find('img').attr('src'),
            cost: $(element).find('div').text().slice(70, 70 + $(element).find('div').text().slice(70).indexOf("\n")),
            hours: $(element).find('div.text-xs').text().slice(10, $(element).find('div.text-xs').text().indexOf(' hours'))
        };
    }).get());

    const json = JSON.stringify(data);

    fs.writeFile("shop-data/shop.json", json, (err) => {
        console.log('error writing file: ' + err)
    })
})