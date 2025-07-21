// New scraper as shop now blocks nerds 
// Run using nodejs

const fs = require('fs');

console.log("joining data")

const regions = [
    "US",
    "EU",
    "IN",
    "CA",
    "AU",
    "XX",
]

const normal_items = []

for(let i = 0; i < regions.length; i++) {
    console.log(regions[i])
    // fs.readFile("./" + regions[i] + ".json", ((e)=>{console.error(e)}, (data)=>{
    //     console.log(data)
    //     normal_items.push({
    //         region: regions[i],
    //         data: JSON.parse(data)
    //     })
    // }))
    const data = fs.readFileSync("./" + regions[i] + ".json", 'utf-8')
    normal_items.push({
        region: regions[i],
        data: JSON.parse(data)
    })
}

const badges = JSON.parse(fs.readFileSync('badges.json','utf8'))

const shop = {
    date: new Date(),
    normal_items: normal_items,
    badge_items: badges
}

const json = JSON.stringify(shop)
console.log("done")
console.log(json)
fs.writeFileSync("./shop.json", json);