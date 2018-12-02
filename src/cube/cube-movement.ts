import {
	populateValueMatrix,
	VALUE_MATRIX
} from './cube-move-matrix'

let Px        = []
let Py        = []
let DIVISIONS = 24

for (let i = 0; i < DIVISIONS; i++) {
	Px[i] = Py[i] = i * 15
}

populateValueMatrix()

export interface Position {
	x: number
	y: number
}

export interface MousePosition {
	last?: Position
	start: Position
}

export interface ViewPort {
	cb: {
		(
			values: number[]
		): void
	},
	el: Element | null
	x: number
	xi: number
	y: number
	yi: number

	move(
		moveX: 0 | 1,
		xBy: -1 | 0 | 1,
		moveY?: 0 | 1,
		yBy?: -1 | 0 | 1
	)

	reset(): void

}

export const mouse: MousePosition = {
				 start: {x: undefined, y: undefined}
			 },
						 viewport: ViewPort   = {
							 cb: null,
							 el: null,
							 x: 0,
							 xi: 0,
							 y: 0,
							 yi: 0,
							 move(
								 moveX,
								 xBy,
								 moveY,
								 yBy
							 ) {
								 if (!this.el) {
									 return
								 }
								 if (!moveX && !moveY) {
									 return
								 }
								 if (moveX) {
									 this.x = moveCoordinates(Px, this.xi += xBy)[0]
								 }
								 if (moveY) {
									 this.y = moveCoordinates(Py, this.yi += yBy)[0]
								 }
								 // console.log('x: ' + this.x + '\t\ty: ' + this.y);
								 // console.log('xi: ' + this.xi + '\t\tyi: ' + this.yi);
								 let xiRemainder = getMod24AbsRemainder(this.xi)
								 let yiRemainder = getMod24AbsRemainder(this.yi)

								 // Have a position, now need to map it to the right frame of matrix

								 // let boundaryX = xiRemainder % 6 == 0
								 // let boundaryY = yiRemainder % 6 == 0
								 // if (boundaryX && boundaryY) {
								 //     console.log('axis-aligned full square');
								 // }

								 this.cb(VALUE_MATRIX[xiRemainder][yiRemainder])

								 console.log('x: ' + xiRemainder + '\t\ty: ' + yiRemainder)

								 this.el.style['transform'] = 'rotateX(' + this.x + 'deg) rotateY(' + this.y + 'deg)'
							 },
							 reset() {
								 if (!this.el) {
									 return
								 }
								 this.xi = 0
								 this.yi = 0
								 this.move(0, 0, 0, 0)
							 }
						 }

function getMod24AbsRemainder(num) {
	let remainder = num % DIVISIONS
	if (remainder < 0) {
		remainder = 24 + remainder
	}
	// remainder = Math.round(remainder)
	// if (remainder == 24) {
	//     remainder = 0
	// }
	return remainder
}

/*
function move(
	xMove,
	yMove
) {
	if (yMove == 24) {
		return
	}
	setTimeout(function () {
		if (xMove == 24) {
			moveY(0, ++yMove)
		} else {
			moveX(++xMove, yMove)
		}
	}, moveSpeed)
}

function moveX(
	x,
	y
) {
	viewport.move(0, 0, 1, 1)
	move(x, y)
}

function moveY(
	x,
	y
) {
	viewport.move(1, 1)
	move(x, y)
}
*/

// setTimeout(function () {
//     move(0, 0)
// });

/*
viewport.duration = function () {
	var d                       = touch ? 50 : 500
	VP.style.transitionDuration = d + 'ms'
	return d
}()
*/

/*
var DISPLAYED_SURFACE_PERCENTAGES = [gQ('#n0'), gQ('#n1'), gQ('#n2'), gQ('#n3'), gQ('#n4'), gQ('#n5')]

function setDisplayedSurfacePercentages(
	values: number[]
) {
	for (let i = 0; i < 6; i++) {
		DISPLAYED_SURFACE_PERCENTAGES[i].innerText = values[i]
	}
}
*/

// setDisplayedSurfacePercentages(VALUE_MATRIX[0][0])

function moveCoordinates(
	percentArray: number[],
	currentIndex: number
) {
	let multiplier = 1
	if (currentIndex < 0) {
		multiplier   = -1
		currentIndex = -currentIndex
	}
	let page  = Math.floor(currentIndex / DIVISIONS)
	let index = currentIndex % DIVISIONS

	if (index === DIVISIONS) {
		page++
		index = 0
	}

	let angle = percentArray[index]

	let rotation = (page * 360 + angle) * multiplier

	return [rotation, angle, index, page, multiplier]
}


/* Just for fun */
// if(!touch) {
//     $('.cube > div').eq(2).html('<object width="360" height="360"><param name="movie"
// value="http://www.youtube.com/v/MY5PkidV1cM?fs=1&amphl=en_GB&amprel=0"></param><param
// name="allowFullScreen" value="true"></param><param name="allowscriptaccess"
// value="always"></param><embed
// src="http://www.youtube.com/v/MY5PkidV1cM?fs=1&amphl=en_GB&amprel=0"
// type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true"
// width="360" height="360"></embed></object>') }