function initMap() {
    const map  = L.map('map', {
        center:[50, 8],
        zoom: 15
    })

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);


    
    L.marker([50, 8]).addTo(map).bindPopup('Oak Top House').openPopup();

    // console.log(navigator);

    navigator.geolocation.getCurrentPosition(getPos, handleError)

    function getPos(pos) {
        // console.log(pos);
        const myPos = {}
        myPos["lat"] = pos.coords.latitude;
        myPos["lng"] = pos.coords.longitude;
        console.log(myPos);
        L.marker(myPos).addTo(map).bindPopup('Your Location').openPopup();
    }

    function handleError(err) {
        // console.log(err);
        switch (err.code) {
            case err.PERMISSION_DENIED:
                alert("Error: Access denied by user");
                break;
            case err.POSITION_UNAVAILABLE:
                alert("Error: Position unavailable");
                break;
            case err.TIMEOUT:
                alert("Error: Timeout");
                break;
            default:
                alert(`Error: ${err.message}`);
        }
    }
}





window.addEventListener('load', initMap)