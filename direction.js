function initMap() {
    const oakTopHouse = [50, 8];
        
    const map  = L.map('map', {
        center: oakTopHouse,
        zoom: 15
    })

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);


    
    L.marker(oakTopHouse).addTo(map).bindPopup('Oak Top House').openPopup();

    // console.log(navigator);

    navigator.geolocation.getCurrentPosition(getPos, handleError)

    function getPos(pos) {
        // console.log(pos);
        const myPos = [pos.coords.latitude, pos.coords.longitude];
        console.log(myPos);
        L.marker(myPos).addTo(map).bindPopup('Your Location').openPopup();

        L.Routing.control({
            waypoints: [
                L.latLng(myPos),
                L.latLng(oakTopHouse)
            ],
            lineOptions: {
                styles: [{ color: '#6FA1EC', weight: 4 }]
            }
        }).addTo(map);
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