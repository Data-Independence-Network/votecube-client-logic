import {VALUE_MATRICES} from './cube-move-matrix'
import {
	Bool,
	getModXAbsRemainder,
	Move,
	moveCoordinates,
	MoveIncrement,
	Pxs,
	Pys,
	ValuesOutCallback,
	ZoomLevel
} from './cube-movement'

export interface ViewPort {

	cb: ValuesOutCallback,
	el: Element | null
	idx: 0 | 1 | 2
	increment: MoveIncrement
	x: number
	xi: number
	y: number
	yi: number
	zoom: ZoomLevel

	move(
		moveX: Bool,
		xBy: Move,
		moveY?: Bool,
		yBy?: Move
	): void

	changeZoom(
		zoomLevel: ZoomLevel
	): void

	reset(): void

}

export const viewport: ViewPort = {
	cb: null,
	el: null,
	idx: 2,
	increment: MoveIncrement.FIVE,
	x: 0,
	xi: 0,
	y: 0,
	yi: 0,
	zoom: ZoomLevel.FINE,
	changeZoom(
		zoomLevel: ZoomLevel
	): void {
		this.zoom = zoomLevel
		let moveIncrement: MoveIncrement
		switch (zoomLevel) {
			case ZoomLevel.BROAD:
				moveIncrement = MoveIncrement.FORTY_FIVE
				break
			case ZoomLevel.COARSE:
				moveIncrement = MoveIncrement.FIFTEEN
				break
			case ZoomLevel.FINE:
				moveIncrement = MoveIncrement.FIVE
				break
		}
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
		this.zoom      = ZoomLevel.FINE
		this.move(0, 0, 0, 0)
	}
}
