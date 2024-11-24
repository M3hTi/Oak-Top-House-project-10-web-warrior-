# Rose Room Banquet Hall Table Management System

## Table Manipulation Functions Documentation

### 1. grabTable Function
This function initializes the table dragging operation when a user clicks on a table.

```javascript
function grabTable(e) {
    e.target.style.touchAction = "none";
    startingX = e.clientX;
    startingY = e.clientY;
    zIndex++;
    e.target.style.zIndex = zIndex;
    tableX = e.target.offsetLeft;
    tableY = e.target.offsetTop;
}
```

**Key Operations:**
- Disables touch actions for better mobile handling
- Stores initial cursor position (startingX, startingY)
- Records initial table position (tableX, tableY)
- Updates z-index to bring selected table to front
- Sets up move and release event listeners

### 2. moveTable Function
Handles real-time table movement during drag operations.

```javascript
function moveTable(e) {
    const dx = e.clientX - startingX;
    const dy = e.clientY - startingY;
    e.target.style.left = `${tableX + dx}px`;
    e.target.style.top = `${tableY + dy}px`;
}
```

**Calculations:**
- dx = current cursor X - initial cursor X
- dy = current cursor Y - initial cursor Y
- New position = initial position + displacement
  - X position = tableX + dx
  - Y position = tableY + dy

### 3. releaseTable Function
Cleans up after table movement is complete.

```javascript
function releaseTable(e) {
    e.target.removeEventListener("pointermove", moveTable);
    e.target.removeEventListener("pointerup", releaseTable);
}
```

**Purpose:**
- Removes movement event listeners
- Finalizes table position

### Guest Capacity Calculations

Tables have different guest capacities:
- Large Round Table: 12 guests
- Small Round Table: 8 guests
- Rectangular Table: 20 guests
- Square Table: 8 guests

```javascript
const tableStorage = {
    tables: {
        "round-large": 12,
        "round-small": 8,
        "rectangular": 20,
        "square": 8
    }
}
```

### Table Placement Logic

When adding new tables:
1. Random initial position within room bounds
2. Automatic guest count update
3. Proper layering with z-index
4. Boundary checks to keep tables in room

## Maps Implementation Guide

### 1. Leaflet Maps Implementation (Current)
Our current implementation uses Leaflet, an open-source JavaScript mapping library that's free to use and doesn't require an API key.

#### HTML Setup
```html
<!-- Add to the head section -->
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" 
    integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=" 
    crossorigin="" />

<!-- Add before closing body tag -->
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js" 
    integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=" 
    crossorigin=""></script>
```

#### CSS Styling
```css
#map {
    width: 100%;
    height: 400px;
}
```

#### JavaScript Implementation (direction.js)
```javascript
// Initialize the map with specific coordinates
const map = L.map('map').setView([40.7128, -74.0060], 13);

// Add the OpenStreetMap tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: ' OpenStreetMap contributors'
}).addTo(map);

// Add a marker for Oak Top House
const marker = L.marker([40.7128, -74.0060])
    .addTo(map)
    .bindPopup('Oak Top House<br>123 Conference Drive');

// Add custom popup with more information
marker.bindPopup(`
    <strong>Oak Top House</strong><br>
    123 Conference Drive<br>
    Oak City, ST 12345<br>
    <small>Click for directions</small>
`).openPopup();
```

**Key Features Explained:**
1. `L.map('map')` - Creates a new map instance in the 'map' div
2. `setView([lat, lng], zoom)` - Sets initial map position and zoom level
3. `L.tileLayer()` - Adds the map tiles from OpenStreetMap
4. `L.marker()` - Adds a clickable marker at the specified location
5. `bindPopup()` - Creates an information popup for the marker

### 2. Google Maps Alternative
To implement Google Maps instead, follow these steps:

#### 1. Get API Key
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Maps JavaScript API
4. Create credentials (API key)
5. Restrict the API key to your domain for security

#### 2. HTML Setup
```html
<!-- Replace Leaflet links with Google Maps -->
<script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY"></script>
```

#### 3. JavaScript Implementation
```javascript
function initMap() {
    // Define Oak Top House location
    const oakTopHouse = { 
        lat: 40.7128, 
        lng: -74.0060  // Replace with actual coordinates
    };

    // Create the map
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 13,
        center: oakTopHouse,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    // Add marker for Oak Top House
    const marker = new google.maps.Marker({
        position: oakTopHouse,
        map: map,
        title: "Oak Top House"
    });

    // Create info window with location details
    const infoWindow = new google.maps.InfoWindow({
        content: `
            <div class="info-window">
                <strong>Oak Top House</strong><br>
                123 Conference Drive<br>
                Oak City, ST 12345<br>
                <a href="https://www.google.com/maps/dir/?api=1&destination=${oakTopHouse.lat},${oakTopHouse.lng}" 
                   target="_blank">Get Directions</a>
            </div>
        `
    });

    // Show info window when marker is clicked
    marker.addListener("click", () => {
        infoWindow.open(map, marker);
    });
}

// Call initMap when the page loads
window.onload = initMap;
```

**Key Differences from Leaflet:**
1. Requires API key and may have usage costs
2. More robust features and customization options
3. Direct integration with Google services
4. Different syntax and event handling
5. Built-in directions service

**Choosing Between Leaflet and Google Maps:**
- Use Leaflet for:
  - Free, open-source solution
  - Basic mapping needs
  - Lower traffic websites
  
- Use Google Maps for:
  - More detailed maps
  - Complex features needed
  - Integration with Google services
  - Business/commercial use

## Usage
1. Click on a table type to add it to the room
2. Click and drag tables to position them
3. Guest count updates automatically
4. Tables can be freely moved within room boundaries