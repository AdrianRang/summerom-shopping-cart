// New scraper as shop now blocks nerds 
// Copy-Paste in console while in shop

const badges = document.getElementsByClassName('mb-12')[1].children[1].children;
const badge_data = []

console.log("scraping badges")
console.log("After this is done scraping copy the output and place in a file named badges.json, then run scraper-pt3 using node")

for(let i = 0; i < badges.length; i++ ) {
    const data = badges[i].children[0].children[0].children;
    const cost = data[0].innerText
    const title = data[1].children[0].innerText
    const description = data[1].children[1].innerText
    const img = data[1].children[2].children[0].src
    const hours = data[2].children[1].innerText.slice(1, data[2].children[1].innerText.indexOf(' '));    
    
    badge_data.push({
        title: title,
        description: description,
        cost: cost,
        img: img,
        hours: hours
    })
}

console.log(JSON.stringify(badge_data))