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

## Usage
1. Click on a table type to add it to the room
2. Click and drag tables to position them
3. Guest count updates automatically
4. Tables can be freely moved within room boundaries