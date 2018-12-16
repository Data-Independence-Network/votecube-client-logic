import {
	Direction,
	PositionPercent
} from '../cube-movement'
import {
	Dimension,
	ValueArrayPosition,
	ViewPort
} from '../viewport'

export class PercentagePositionChooser {

	setPositionPercentages(
		dimension: Dimension,
		percent: PositionPercent,
		direction: Direction,
		viewport: ViewPort
	): void {
		let dimensionToPreserve = this.getDimensionToPreserve(dimension, viewport)
		let dimensionToMove     = this.getDimensionToMove(dimension, dimensionToPreserve)

		let positionsToSetAndZeroOut = this.getPositionsToSetAndZeroOut(dimension, direction)

		let positionPercentages                            = viewport.pp
		positionPercentages[positionsToSetAndZeroOut.set]  = percent
		positionPercentages[positionsToSetAndZeroOut.zero] = 0

		let positionsToPreserve        = this.getPositionsForDimension(dimensionToPreserve)
		let positivePositionToPreserve = positionPercentages[positionsToPreserve[0]]
		let negativePositionToPreserve = positionPercentages[positionsToPreserve[1]]
		let valueToPreserve            = positivePositionToPreserve + negativePositionToPreserve

		let valueToMove
		if (valueToPreserve + percent >= 100) {
			valueToPreserve = 100 - percent
			if (!negativePositionToPreserve) {
				positionPercentages[positionsToPreserve[0]] = valueToPreserve
			} else {
				positionPercentages[positionsToPreserve[1]] = valueToPreserve
			}
			valueToMove = 0
		} else {
			valueToMove = 100 - valueToPreserve + percent
		}

		let positionsToMove = this.getPositionsForDimension(dimensionToMove)
		if (positionPercentages[positionsToMove[0]]) {
			positionPercentages[positionsToMove[0]] = valueToMove
		} else {
			positionPercentages[positionsToMove[1]] = valueToMove
		}
	}

	private getDimensionToPreserve(
		dimension: Dimension,
		viewport: ViewPort
	): Dimension {
		if (viewport.rmd.length > 1) {
			return viewport.rmd[1]
		}

		// If the order between the dimensions is the same, use the top-to-bottom
		// order of the displayed controls
		// 1) 0-5 - x
		// 2) 2-4 - z
		// 3) 1-3 - y
		switch (dimension) {
			case 'x':
				return 'z'
			case 'y':
			case 'z':
				return 'x'
		}
	}

	private getDimensionToMove(
		changedDimension: Dimension,
		dimensionToPreserve: Dimension
	): Dimension {
		switch (changedDimension) {
			case 'x':
				switch (dimensionToPreserve) {
					case 'y':
						return 'z'
					case 'z':
						return 'y'
				}
			case 'y':
				switch (dimensionToPreserve) {
					case 'x':
						return 'z'
					case 'z':
						return 'x'
				}
			case 'z':
				switch (dimensionToPreserve) {
					case 'x':
						return 'y'
					case 'y':
						return 'x'
				}
		}
	}

	private getPositionsToSetAndZeroOut(
		dimension: Dimension,
		direction: Direction
	): {
		set: ValueArrayPosition
		zero: ValueArrayPosition
	} {
		switch (dimension) {
			case 'x':
				switch (direction) {
					case 1:
						return {
							set: 0,
							zero: 5
						}
					case -1:
						return {
							set: 5,
							zero: 0
						}
				}
			case 'y':
				switch (direction) {
					case 1:
						return {
							set: 1,
							zero: 3
						}
					case -1:
						return {
							set: 3,
							zero: 1
						}
				}
			case 'z':
				switch (direction) {
					case 1:
						return {
							set: 2,
							zero: 4
						}
					case -1:
						return {
							set: 4,
							zero: 2
						}
				}
		}
	}

	private getPositionsForDimension(
		dimension: Dimension
	): [ValueArrayPosition, ValueArrayPosition] {
		switch (dimension) {
			case 'x':
				return [0, 5]
			case 'y':
				return [1, 3]
			case 'z':
				return [2, 4]
		}
	}

}
