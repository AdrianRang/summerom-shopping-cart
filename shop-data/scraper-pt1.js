// New scraper as shop now blocks nerds 
// Copy-Paste in console while in shop

console.log("scraping data for region " + document.querySelector('#region-selector').value)
console.log("After this is done scraping copy the output and place in a file named " + document.querySelector('#region-selector').value + ".json, then change the region and run the code until you have a file for all regions. then run scraper-pt2")

const items = document.getElementsByClassName('mb-12')[0].children[1].children;
const item_data = []

for(let i = 0; i < items.length; i++ ) {
    const data = items[i].children[0].children[0].children;
    const cost = data[0].innerText
    const title = data[1].children[0].innerText
    const description = data[1].children[1].innerText
    const img = data[1].children[2].children[0].src
    const hours = data[2].children[1].innerText.slice(1, data[2].children[1].innerText.indexOf(' '));
    
    item_data.push({
        title: title,
        description: description,
        cost: cost,
        img: img,
        hours: hours
    })
}

console.log(JSON.stringify(item_data));