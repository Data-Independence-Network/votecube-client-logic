import {
	PositionValues,
	ZoomIndex
}                                  from '../cube-move-matrix'
import {
	Direction,
	PositionPercent
}                                  from '../cube-movement'
import {
	Dimension,
	DimensionPercentages,
	ViewPort,
	viewport
}                                  from '../viewport'
import {DegreePositionChooser}     from './DegreePositionChooser'
import {FinalPositionFinder}       from './FinalPositionFinder'
import {MatrixValueChooser}        from './MatrixValueChooser'
import {PercentagePositionChooser} from './PercentagePositionChooser'

export interface IMutationApi {

	changeZoom(
		zoomIndex: ZoomIndex
	): void

	moveX(
		direction: Direction
	): void

	moveXToPercent(
		movePercent: PositionPercent
	): void

	moveY(
		direction: Direction
	): void

	moveYToPercent(
		movePercent: PositionPercent
	): void

	moveZ(
		direction: Direction
	): void

	moveZToPercent(
		movePercent: PositionPercent
	): void

}

export class MutationApi
	implements IMutationApi {

	private degreePositionChooser     = new DegreePositionChooser()
	private finalPositionFinder       = new FinalPositionFinder()
	private matrixValueChooser        = new MatrixValueChooser()
	private percentagePositionChooser = new PercentagePositionChooser()

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
	): void {
		this.moveToPercent('x', movePercent, this.vp.vd.x)
	}

	moveY(
		direction: Direction
	): void {
		this.move('y', direction)
	}

	moveYToPercent(
		movePercent: PositionPercent
	): void {
		this.moveToPercent('y', movePercent, this.vp.vd.y)
	}

	moveZ(
		direction: Direction
	): void {
		this.move('z', direction)
	}

	moveZToPercent(
		movePercent: PositionPercent
	): void {
		this.moveToPercent('z', movePercent, this.vp.vd.z)
	}

	private move(
		dimension: Dimension,
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
			nextStep[0] * percentChange as PositionPercent, nextStep[1])
	}

	private getNextStep(
		minus: PositionPercent,
		plus: PositionPercent,
		direction: Direction
	): [number, Direction] {
		let percentChange = this.getPercentChange()
		if (plus) {
			return [Math.floor(plus / percentChange) + 1, direction]
		} else if (minus) {
			if (minus <= percentChange) {
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
		dimension: Dimension,
		percent: PositionPercent,
		direction: Direction
	): void {
		// First see the order of recently moved dimensions
		this.vp.rmd.unshift(dimension)
		let numPreviousMoves = this.vp.rmd.length
		if (numPreviousMoves > 3) {
			this.vp.rmd.pop()
		}

		this.percentagePositionChooser.setPositionPercentages(dimension, percent, direction, this.vp)

		const closestMatrixPosition = this.matrixValueChooser.getClosestMatrixPosition(this.vp)

		const finalPosition = this.finalPositionFinder.findFinalPosition(closestMatrixPosition, this.vp)

		this.degreePositionChooser.setFinalDegrees(finalPosition, this.vp)
	}

	private matrixPositionsMatch(
		vals1: PositionValues,
		vals2: PositionValues
	) {
		for (let i = 0; i < 6; i++) {
			if (vals1[i] !== vals2[i]) {
				return false
			}
		}

		return true
	}

}

export const mutationApi = new MutationApi(viewport)
