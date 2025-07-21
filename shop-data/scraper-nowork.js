// New scraper as shop now blocks nerds 
// Copy-Paste in console while in shop

const lang = 6;
const region_data = [];

const regions = [
    "US",
    "EU",
    "IN",
    "CA",
    "AU",
    "XX",
]

for(let l = 0; l < lang; l++) {
    document.querySelector('#region-selector').selectedIndex = l;
    // navigation.navigate("/shop?region=" + regions[l])
    // document.querySelector('#region-selector').dispatchEvent(new Event('change'));
    // await new Promise(r => setTimeout(r, 3000));
    
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
    
    region_data.push({
        region: document.querySelector('#region-selector').value,
        data: item_data
    });
}

const badges = document.getElementsByClassName('mb-12')[1].children[1].children;
const badge_data = []

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

const shop = {
    date: new Date(),
    normal_items: region_data,
    badge_items: badge_data
}

// console.log(shop);

const json = JSON.stringify(shop);
console.log(json)