import {VALUE_MATRICES} from './cube-move-matrix'
import {
	Bool,
	getMod24AbsRemainder,
	Move,
	moveCoordinates,
	MoveIncrement,
	Px,
	Py,
	ValuesOutCallback,
	ZoomLevel
} from './cube-movement'

export interface ViewPort {

	cb: ValuesOutCallback,
	el: Element | null
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
	increment: MoveIncrement.FIFTEEN,
	x: 0,
	xi: 0,
	y: 0,
	yi: 0,
	zoom: ZoomLevel.COARSE,
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

		this.cb(VALUE_MATRICES[0][xiRemainder][yiRemainder])

		console.log('x: ' + xiRemainder + '\t\ty: ' + yiRemainder)

		this.el.style['transform'] = 'rotateX(' + this.x + 'deg) rotateY(' + this.y + 'deg)'
	},
	reset(): void {
		if (!this.el) {
			return
		}
		this.increment = MoveIncrement.FIFTEEN
		this.xi        = 0
		this.yi        = 0
		this.zoom      = ZoomLevel.COARSE
		this.move(0, 0, 0, 0)
	}
}
