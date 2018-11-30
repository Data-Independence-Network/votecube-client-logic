var D = document

// View Port
var VP = gQ('#viewport')

// document listener map
var dLM = LM.ad(D)


dLM.ad('keydown', function (ev) {
    rmMmTm();
    switch (ev.keyCode) {
        case 37: // left
            viewport.move(0, 0, 1, -1)
            break

        case 38: // up
            // prevent default
            pD(ev)
            viewport.move(1, 1)
            break

        case 39: // right
            viewport.move(0, 0, 1, 1)
            break

        case 40: // down
            // prevent default
            pD(ev)
            viewport.move(1, -1)
            break

        case 27: //esc
            viewport.reset()
            break
        case 109:
            if (moveSpeed > 128)
                moveSpeed /= 2
            break
        case 107:
            if (moveSpeed < 4096)
                moveSpeed *= 2
            break

        default:
            break
    }

})
('mousedown', oMdTs)
('touchstart', oMdTs)
('mouseup', rmMmTm)
('touchend', rmMmTm)

var moveSpeed = 256;

/**
 * On mousedown or touchstart
 */
function oMdTs(
    ev // Event
) {
    rmMmTm();

    delete mouse.last

    // clicks on links, images, or videos
    if (iT(ev.target, 'A')('IFRAME')()) {
        return true
    }

    // ev.originalEvent.touches ? ev = ev.originalEvent.touches[0] : null
    let p = ev.touches ? ev.touches[0] : ev
    // console.log('---===<<<((( mouse start )))>>>===---')
    mouse.start.x = p.screenX
    mouse.start.y = p.screenY
    dLM.ad('mousemove', oMmTm)('touchmove', oMmTm)
}


/**
 * On mousemove or touchmove
 */
function oMmTm(
    ev // event
) {
    let t = ev.touches

    // Only perform rotation if one touch or mouse (e.g. still scale with pinch and zoom)
    if (!touch || !(t && t.length > 1)) {
        ev.preventDefault()
        let p = t ? t[0] : ev
        // Get touch co-ords
        // ev.originalEvent.touches ? ev = ev.originalEvent.touches[0] : null
        // dispatch 'move-viewport' event
        dE(VP, 'move-viewport', {x: p.screenX, y: p.screenY})
    }
}

/**
 * Remove mousemove or touchmove
 */
function rmMmTm() {
    dLM.rm('mousemove')('touchmove')
}

var lastMove = 0;

LM.ad(VP).ad('move-viewport', function (
    ev // event
) {
    let newMouseLocation = ev.detail;

    let mouseObject = mouse
    let startCoords = mouseObject.start
    let lastCoords = mouseObject.last

    let dx, dy,
        vx,
        vy,
        moveX = 0,
        xBy = 0,
        moveY = 0,
        yBy = 0
    // directionChanged = 0

    let now = new Date();

    if (!mouse.last) {
        mouse.last = lastCoords = mouse.start
        lastMove = now;
        // vx = directionVector(startCoords.x, newMouseLocation.x)
        // vy = directionVector(startCoords.y, newMouseLocation.y)
        // } else {
        // vx = directionVector(lastCoords.x, newMouseLocation.x)
        // let oldVx = directionVector(startCoords.x, lastCoords.x);
        // console.log('old vx: ' + directionVector(startCoords.x, lastCoords.x))
        // console.log('new vx: ' + vx)
        // if the movement in x axis changed directionVector
        // if (oldVx[0] != vx[0] && oldVx[1] != 0) {
        //     if (oldVx[1] > 2 || vx[1] > 2) {
        // console.log('X dir changed, old: ' + oldVx + ', new: ' + vx)
        // set the last X coordinates as the start (of new directionVector in movement)
        // startCoords.x = lastCoords.x
        directionChanged = 1
        // }
        // else {
        //     console.log('X directionVector change too small, old: ' + oldVx + ', new: ' + vx)
        // }
        // }
        // vy = directionVector(lastCoords.y, newMouseLocation.y)
        // let oldVy = directionVector(startCoords.y, lastCoords.y)
        // console.log('old vy: ' + directionVector(startCoords.y, lastCoords.y))
        // console.log('new vy: ' + vy)
        // if the movement in y axis changed directionVector
        // if (oldVy[0] != vy[0] && oldVy[1] != 0) {
        //     if (oldVy[1] > 2 || vy[1] > 2) {
        // console.log('Y dir changed, old: ' + oldVy + ', new: ' + vy)
        // set the last X coordinates as the start (of new directionVector in movement)
        // startCoords.y = lastCoords.y
        directionChanged = 1
        // }
        // else {
        //     console.log('Y directionVector change too small, old: ' + oldVy + ', new: ' + vy)
        // }
        // }
    }
    // dx = movementInPixels(startCoords.x, newMouseLocation.x)
    // dy = movementInPixels(startCoords.y, newMouseLocation.y)

    // if (!directionChanged) {
    vx = directionVector(startCoords.x, newMouseLocation.x)
    vy = directionVector(startCoords.y, newMouseLocation.y)
    // }
    // console.log('x: ' + vx)
    // console.log('y: ' + vy)
    dx = vx[1]
    dy = vy[1]

    // If general directionVector is in X
    if (dx >= 4 && dx / 4 > dy) {
        // console.log('dx >= 4 && dx / 4 > dy')
        yBy = vx[0]
        moveY = 1
    }
    // If general directionVector is in Y
    else if (dy >= 4 && dy / 4 > dx) {
        // console.log('dy >= 4 && dy / 4 > dx')
        xBy = -vy[0]
        moveX = 1
    }
    // Otherwise its in both x and y
    else if (dx >= 4 && dy >= 4) {
        // console.log('dx >= 4 && dy >= 4')
        xBy = -vy[0]
        yBy = vx[0]
        moveX = 1
        moveY = 1
    }

    if (now - lastMove >= 128) {
        startCoords.x = lastCoords.x
        startCoords.y = lastCoords.y
        if (moveX || moveY) {
            // console.log('moving, time elapsed: ' + (now - lastMove))
            // if (directionChanged) {
            //     // console.log('moving, dir changed:  ' + directionChanged)
            //     alert('direction changed!');
            // }


            // console.log("moveX: " + xBy + ", moveY: " + yBy)
            viewport.move(moveX, xBy, moveY, yBy)
        }
        lastMove = now
    }
    // else {
    //     console.log('staying, time elapsed: ' + (now - lastMove))
    //     console.log('staying, dir changed:  ' + directionChanged)
    // }

    lastCoords.x = newMouseLocation.x
    lastCoords.y = newMouseLocation.y
})

// setTimeout(function () {
//     console.log('---===<<<((( TICK )))>>>===---');
// }, 4000)

function directionVector(fromPosition, toPosition) {
    let movementDirection, changeInPixels, range
    if (toPosition >= 0 && fromPosition >= 0) {
        range = 1
        if (toPosition >= fromPosition) {
            movementDirection = 1
            changeInPixels = toPosition - fromPosition
        } else {
            movementDirection = -1
            changeInPixels = fromPosition - toPosition
        }
    } else {
        range = -1
        if (toPosition < fromPosition) {
            movementDirection = -1
            changeInPixels = toPosition - fromPosition
        } else {
            movementDirection = 1
            changeInPixels = fromPosition - toPosition
        }
    }
    return [movementDirection, changeInPixels, range]
}

/*function movementInPixels(fromPosition, toPosition) {
    // If both positions are non-negative
    if (toPosition >= 0 && fromPosition >= 0) {
        // If the position is growing
        if (toPosition >= fromPosition) {
            return toPosition - fromPosition
        } else {
            return fromPosition - toPosition
        }
    } else {
        if (toPosition < fromPosition) {
            return toPosition - fromPosition
        } else {
            return fromPosition - toPosition
        }
    }
}*/
