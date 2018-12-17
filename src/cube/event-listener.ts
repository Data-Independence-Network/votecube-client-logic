import {
	gQ,
	IsKnownElementOfTag,
	iT,
	LM,
	pD
}                 from '../utils/utils'
import {
	Bool,
	mouse,
	Move,
	ValuesOutCallback
}                 from './cube-movement'
import {
	mutationApi,
	MutationApi
}                 from './mutation/mutation-api'
import {viewport} from './viewport'

export interface MoveViewportEvent {
	x: number;
	y: number;
}

// View Port
// const VP = new NodePtr('#viewport')

// document listener map
// export const dLM = LM.ad(D)
export const dLM = LM.ad(document)


export function setViewPort(
	cb?: ValuesOutCallback
): MutationApi {
	viewport.reset()
	viewport.cb = cb
	viewport.el = cb ? gQ('#cube') : null

	if (cb) {
		cb(viewport.pp)
	}

	return cb ? mutationApi : null
}

dLM.ad('keydown', function (ev) {
	rmMmTm()
	switch (ev.keyCode) {
		case 37: // left
			viewport.move(Bool.False, Move.None, Bool.True, Move.Down)
			break

		case 38: // up
			// prevent default
			pD(ev)
			viewport.move(Bool.True, Move.Up)
			break

		case 39: // right
			viewport.move(Bool.False, Move.None, Bool.True, Move.Up)
			break

		case 40: // down
			// prevent default
			pD(ev)
			viewport.move(Bool.True, Move.Down)
			break

		case 27: // esc
			viewport.reset()
			break
		case 109:
			if (!viewport.el) {
				return
			}
			if (moveSpeed > 128)
				moveSpeed /= 2
			break
		case 107:
			if (!viewport.el) {
				return
			}
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

let moveSpeed = 256

/**
 * On mousedown or touchstart
 */
function oMdTs(
	ev: MouseEvent | TouchEvent // Event
) {
	if (!viewport.el) {
		return
	}
	rmMmTm()

	delete mouse.last

	// clicks on links, images, or videos
	if ((<IsKnownElementOfTag>(<IsKnownElementOfTag>iT(<Element>ev.target, 'A'))('IFRAME'))()) {
		return true
	}

	// ev.originalEvent.touches ? ev = ev.originalEvent.touches[0] : null
	let p: MouseEvent | Touch = (<TouchEvent>ev).touches
		? (<TouchEvent>ev).touches[0]
		: <MouseEvent>ev
	// console.log('---===<<<((( mouse start )))>>>===---')
	mouse.start.x             = p.screenX
	mouse.start.y             = p.screenY
	dLM.ad('mousemove', oMmTm)('touchmove', oMmTm)
}

const TOUCH = document.ontouchmove !== undefined

/**
 * On mousemove or touchmove
 */
function oMmTm(
	ev // event
) {
	if (!viewport.el) {
		return
	}
	let t = ev.touches

	// Only perform rotation if one touch or mouse (e.g. still scale with pinch and zoom)
	if (!TOUCH || !(t && t.length > 1)) {
		ev.preventDefault()
		let p = t ? t[0] : ev
		// Get touch co-ords
		// ev.originalEvent.touches ? ev = ev.originalEvent.touches[0] : null
		// dispatch 'move-viewport' event
		moveViewport({x: p.screenX, y: p.screenY})
	}
}

/**
 * Remove mousemove or touchmove
 */
function rmMmTm() {
	if (!viewport.el) {
		return
	}
	dLM.rm('mousemove')('touchmove')
}

var lastMove = 0

function moveViewport(
	event: MoveViewportEvent // event
) {
	let mouseObject = mouse
	let startCoords = mouseObject.start
	let lastCoords  = mouseObject.last

	let dx, dy,
			vx: DirectionVector,
			vy: DirectionVector,
			moveX: 0 | 1           = 0,
			xBy: MovementDirection = 0,
			moveY: 0 | 1           = 0,
			yBy: MovementDirection = 0
	// directionChanged = 0

	let now: number = new Date().getTime()

	if (!mouse.last) {
		mouse.last = lastCoords = mouse.start
		lastMove   = now
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
		// directionChanged = 1
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
		// directionChanged = 1
		// }
		// else {
		//     console.log('Y directionVector change too small, old: ' + oldVy + ', new: ' + vy)
		// }
		// }
	}
	// dx = movementInPixels(startCoords.x, newMouseLocation.x)
	// dy = movementInPixels(startCoords.y, newMouseLocation.y)

	// if (!directionChanged) {
	vx = directionVector(startCoords.x, event.x)
	vy = directionVector(startCoords.y, event.y)
	// }
	// console.log('x: ' + vx)
	// console.log('y: ' + vy)
	dx = vx[1]
	dy = vy[1]

	// If general directionVector is in X
	if (dx >= 4 && dx / 4 > dy) {
		// console.log('dx >= 4 && dx / 4 > dy')
		yBy   = vx[0]
		moveY = 1
	}
	// If general directionVector is in Y
	else if (dy >= 4 && dy / 4 > dx) {
		// console.log('dy >= 4 && dy / 4 > dx')
		xBy   = <MovementDirection>-vy[0]
		moveX = 1
	}
	// Otherwise its in both x and y
	else if (dx >= 4 && dy >= 4) {
		// console.log('dx >= 4 && dy >= 4')
		xBy   = <MovementDirection>-vy[0]
		yBy   = vx[0]
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

	lastCoords.x = event.x
	lastCoords.y = event.y
}

// setTimeout(function () {
//     console.log('---===<<<((( TICK )))>>>===---');
// }, 4000)

export type MovementDirection = -1 | 0 | 1;
export type ChangeInPixels = number;
export type Range = -1 | 1;
export type DirectionVector = [MovementDirection, ChangeInPixels, Range];

function directionVector(
	fromPosition,
	toPosition
): DirectionVector {
	let movementDirection, changeInPixels, range
	if (toPosition >= 0 && fromPosition >= 0) {
		range = 1
		if (toPosition >= fromPosition) {
			movementDirection = 1
			changeInPixels    = toPosition - fromPosition
		} else {
			movementDirection = -1
			changeInPixels    = fromPosition - toPosition
		}
	} else {
		range = -1
		if (toPosition < fromPosition) {
			movementDirection = -1
			changeInPixels    = toPosition - fromPosition
		} else {
			movementDirection = 1
			changeInPixels    = fromPosition - toPosition
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
