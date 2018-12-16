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
	// Recently Moved Dimension
	rmd: Dimension[]
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

	moveToDegree(): void

	changeZoom(
		// zoomLevel: ZoomLevel
		zoomIndex: ZoomIndex
	): void

	reset(): void

}

export interface PositionPercentages {
	x: DimensionPercentages
	y: DimensionPercentages
	z: DimensionPercentages
}

export interface DimensionPercentages {
	minus: PositionPercent
	plus: PositionPercent
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

export type Dimension = 'x' | 'y' | 'z'

export type ValueArrayPosition = 0 | 1 | 2 | 3 | 4 | 5

export const viewport: ViewPort = {
	cb: null,
	cr: {
		x: 0,
		y: 0
	},
	el: null,
	increment: MoveIncrement.FIVE,
	pp: {
		x: {
			minus: 0,
			plus: 0
		},
		y: {
			minus: 0,
			plus: 0
		},
		z: {
			minus: 0,
			plus: 100
		}
	},
	// Recently moved dimension
	rmd: [],
	x: 0,
	xi: 0,
	y: 0,
	yi: 0,
	vd: {
		x: 1,
		y: 1,
		z: 1
	},
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
		// }moveCoordinates
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
			this.x = moveCoordinates(Pxs, this.zm, this.xi += xBy)[0]
		}
		if (moveY) {
			this.y = moveCoordinates(Pys, this.zm, this.yi += yBy)[0]
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

		this.cb(VALUE_MATRICES[this.zm][xiRemainder][yiRemainder])

		console.log('x: ' + xiRemainder + '\t\ty: ' + yiRemainder)

		this.moveToDegree()
	},
	/**
	 * Need to be able to move to a particular angle
	 */
	moveToDegree(): void {
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
