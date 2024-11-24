function initMap() {
    const map  = L.map('map', {
        center:[39.95, -83.12],
        zoom: 15
    })

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);


    
    L.marker([39.95, -83.12]).addTo(map).bindPopup('Oak Top House').openPopup();
}





window.addEventListener('load', initMap)