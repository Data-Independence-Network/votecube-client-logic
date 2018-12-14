import {
	MOVE_INCREMENTS,
	MoveIncrement,
	MV_INC_IDX,
	VALUE_MATRICES,
	ZoomIndex
} from './cube-move-matrix'
import {
	Bool,
	Direction,
	getModXAbsRemainder,
	Move,
	moveCoordinates,
	PositionPercent,
	Pxs,
	Pys,
	ValuesOutCallback
} from './cube-movement'

export interface ViewPort {

	cb: ValuesOutCallback,
	cr: CubeRotation,
	el: Element | null
	increment: MoveIncrement
	pp: PositionPercentages
	x: number
	xi: number
	y: number
	yi: number
	vd: VisibleDirection,
	zm: ZoomIndex

	move(
		moveX: Bool,
		xBy: Move,
		moveY?: Bool,
		yBy?: Move
	): void

	changeZoom(
		// zoomLevel: ZoomLevel
		zoomIndex: ZoomIndex
	): void

	reset(): void

}

export interface PositionPercentages {
	xA: PositionPercent,
	xB: PositionPercent,
	yA: PositionPercent,
	yB: PositionPercent,
	zA: PositionPercent,
	zB: PositionPercent,
}

export interface CubeRotation {
	x: number,
	y: number
}

export interface VisibleDirection {
	x: Direction,
	y: Direction,
	z: Direction
}

export const viewport: ViewPort = {
	cb: null,
	cr: {
		x: 0,
		y: 0
	},
	el: null,
	increment: MoveIncrement.FIVE,
	pp: {
		xA: 0,
		xB: 0,
		yA: 0,
		yB: 0,
		zA: 100,
		zB: 0
	},
	x: 0,
	xi: 0,
	y: 0,
	yi: 0,
	zm: MV_INC_IDX[MoveIncrement.FIVE],
	// zoom: ZoomLevel.FINE,
	changeZoom(
		zoomIndex: ZoomIndex
	): void {
		// this.zoom = zoomLevel
		this.increment = MOVE_INCREMENTS[zoomIndex]
		// let moveIncrement: MoveIncrement
		// switch (increment) {
		// 	case ZoomLevel.BROAD:
		// 		moveIncrement = MoveIncrement.FORTY_FIVE
		// 		break
		// 	case ZoomLevel.COARSE:
		// 		moveIncrement = MoveIncrement.FIFTEEN
		// 		break
		// 	case ZoomLevel.FINE:
		// 		moveIncrement = MoveIncrement.FIVE
		// 		break
		// }
		console.log('TODO: implement')
	},
	move(
		moveX: Bool,
		xBy: Move,
		moveY: Bool,
		yBy: Move
	): void {
		if (!this.el) {
			return
		}
		if (!moveX && !moveY) {
			return
		}
		if (moveX) {
			this.x = moveCoordinates(Pxs, this.idx, this.xi += xBy)[0]
		}
		if (moveY) {
			this.y = moveCoordinates(Pys, this.idx, this.yi += yBy)[0]
		}
		// console.log('x: ' + this.x + '\t\ty: ' + this.y);
		// console.log('xi: ' + this.xi + '\t\tyi: ' + this.yi);
		let xiRemainder = getModXAbsRemainder(this.xi, this.increment)
		let yiRemainder = getModXAbsRemainder(this.yi, this.increment)

		// Have a position, now need to map it to the right frame of matrix

		// let boundaryX = xiRemainder % 6 == 0
		// let boundaryY = yiRemainder % 6 == 0
		// if (boundaryX && boundaryY) {
		//     console.log('axis-aligned full square');
		// }

		this.cb(VALUE_MATRICES[this.idx][xiRemainder][yiRemainder])

		console.log('x: ' + xiRemainder + '\t\ty: ' + yiRemainder)

		this.el.style['transform'] = 'rotateX(' + this.x + 'deg) rotateY(' + this.y + 'deg)'
	},
	reset(): void {
		if (!this.el) {
			return
		}
		this.increment = MoveIncrement.FIVE
		this.xi        = 0
		this.yi        = 0
		// this.zoom      = ZoomLevel.FINE
		this.move(0, 0, 0, 0)
	}
}

viewPort
