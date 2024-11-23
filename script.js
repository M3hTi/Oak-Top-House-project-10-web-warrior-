
const tableStorage = {
    tables:{
        "round-large": 12,
        "round-small": 8,
        "rectangular": 20,
        "square": 8
    }
}

let guests = 0;
let startingX, startingY;
let tableX, tableY;
let zIndex = 1;

function setUpRoom(){
    const roomLayout = document.querySelector(".room-layout");
    console.dir(roomLayout);
    const tableIcons = document.querySelectorAll(".table");
    // console.log(tableIcons);

    for (const table of tableIcons) {
        table.addEventListener("click", () => {
            const tableType = table.classList[1];
            const tableCount = tableStorage.tables[tableType];
            // console.log(tableType, tableCount);
            guests = guestsCount(tableCount);
            // console.log(guests);

            const guestCounter = document.querySelector(".guest-counter");
            guestCounter.textContent = `Rose Room (Guests: ${guests})`;


            const tableCopy = table.cloneNode(true);
            tableCopy.style.position = "absolute";

             // Get table dimensions
             const tableWidth = table.offsetWidth;
             const tableHeight = table.offsetHeight;
             
             // Calculate maximum positions to keep table within bounds
             const maxX = roomLayout.offsetWidth - tableWidth;
             const maxY = roomLayout.offsetHeight - tableHeight;


            tableCopy.style.left = `${Math.random() * maxX}px`;
            tableCopy.style.top = `${Math.random() * maxY}px`;
            tableCopy.style.zIndex = zIndex;
            tableCopy.style.cursor = "move";

            roomLayout.appendChild(tableCopy);

            
            zIndex++;

            tableCopy.addEventListener('pointerdown', (e) => {
                grabTable(e)
            });
        });
    }

}


function guestsCount(counter){
    return guests += counter;
}



function grabTable(e) {
    e.target.style.touchAction = "none";
    startingX = e.clientX;
    startingY = e.clientY;
    zIndex ++;
    e.target.style.zIndex = zIndex;

    tableX = e.target.offsetLeft;
    tableY = e.target.offsetTop;

    e.target.addEventListener("pointermove", moveTable);
    e.target.addEventListener("pointerup", releaseTable);
}


function moveTable(e) {
    const dx = e.clientX - startingX;
    const dy = e.clientY - startingY;
    e.target.style.left = `${tableX + dx}px`;
    e.target.style.top = `${tableY + dy}px`;
}


function releaseTable(e) {
    e.target.removeEventListener("pointermove", moveTable);
    e.target.removeEventListener("pointerup", releaseTable);
}


window.addEventListener("load", setUpRoom);

















