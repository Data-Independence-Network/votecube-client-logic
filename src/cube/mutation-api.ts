import {ZoomIndex} from './cube-move-matrix'
import {
	Direction,
	PositionPercent
}                  from './cube-movement'
import {
	DimensionPercentages,
	ViewPort,
	viewport
}                  from './viewport'

export interface IMutationApi {

	changeZoom(
		zoomIndex: ZoomIndex
	): void

}

export class MutationApi
	implements IMutationApi {

	constructor(
		private vp: ViewPort
	) {
	}

	changeZoom(
		zoomIndex: ZoomIndex
	): void {
		this.vp.zm = zoomIndex
	}

	moveX(
		direction: Direction
	): void {
		this.move('x', direction)
	}

	moveXToPercent(
		movePercent: PositionPercent
	) {
		this.moveToPercent('x', movePercent, this.vp.vd.x)
	}

	moveY(
		direction: Direction
	): void {
		this.move('y', direction)
	}

	moveYToPercent(
		movePercent: PositionPercent
	) {
		this.moveToPercent('y', movePercent, this.vp.vd.y)
	}

	moveZ(
		direction: Direction
	): void {
		this.move('z', direction)
	}

	moveZToPercent(
		movePercent: PositionPercent
	) {
		this.moveToPercent('z', movePercent, this.vp.vd.z)
	}

	private move(
		dimension: 'x' | 'y' | 'z',
		direction: Direction
		// dimensionPercentages: DimensionPercentages
	): void {
		const dimensionPercentages = this.vp.pp[dimension]
		if (!this.isChangeAllowed(direction, dimensionPercentages)) {
			return
		}
		let percentChange = this.getPercentChange()
		let nextStep
		switch (direction) {
			case 1:
				nextStep = this.getNextStep(
					dimensionPercentages.plus, dimensionPercentages.minus, direction)
				break
			case -1:
				nextStep = this.getNextStep(
					dimensionPercentages.minus, dimensionPercentages.plus, direction)
				break
		}

		this.moveToPercent(dimension,
			nextStep[0] * percentChange as PositionPercent, nextStep[1]);
	}

	private getNextStep(
		minus: PositionPercent,
		plus: PositionPercent,
		direction: Direction
	): [number, Direction] {
		let percentChange = this.getPercentChange()
		if(plus) {
			return [Math.floor(plus / percentChange) + 1, direction]
		} else if(minus) {
			if(minus <= percentChange) {
				return [0, direction]
			}
			return [Math.floor(minus / percentChange) - 1, -direction as Direction]
		} else {
			return [1, direction]
		}
	}

	private getPercentChange(): 1 | 5 | 20 {
		switch (this.vp.zm) {
			case 0:
				return 20
			case 1:
				return 5
			case 2:
				return 1
		}
	}

	private isChangeAllowed(
		direction: Direction,
		dimensionPercentages: DimensionPercentages
	): boolean {
		let currentValue = direction === 1
			? dimensionPercentages.plus
			: dimensionPercentages.minus

		return currentValue !== 100
	}

	private moveToPercent(
		dimension: 'x' | 'y' | 'z',
		percent: PositionPercent,
		direction: Direction
	): void {

	}

}

export const mutationApi = new MutationApi(viewport)
