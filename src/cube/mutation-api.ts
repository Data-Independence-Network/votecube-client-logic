import {
	PositionValues,
	VALUE_MATRICES,
	ZoomIndex
} from './cube-move-matrix'
import {
	Direction,
	PositionPercent
} from './cube-movement'
import {
	Dimension,
	DimensionPercentages,
	PositionPercentages,
	ValueArrayPosition,
	ViewPort,
	viewport
} from './viewport'

export type DistanceFromMatrixPosition = 0 | 1 | 2 | 3 | 4



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

		this.setPositionPercentages(dimension, percent, direction)

		let closestMatrixPosition = this.getClosestMatrixPosition()

		
	}

	private getDimensionToPreserve(
		dimension: Dimension
	): Dimension {
		if (this.vp.rmd.length > 1) {
			return this.vp.rmd[1]
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

	private setPositionPercentages(
		dimension: Dimension,
		percent: PositionPercent,
		direction: Direction
	): void {
		let dimensionToPreserve = this.getDimensionToPreserve(dimension)
		let dimensionToMove     = this.getDimensionToMove(dimension, dimensionToPreserve)

		let positionsToSetAndZeroOut = this.getPositionsToSetAndZeroOut(dimension, direction)

		let positionPercentages                            = this.vp.pp
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

	private getZeroedPositions(): ValueArrayPosition[] {
		let positionPercentages = this.vp.pp

		const zeroedPositions: ValueArrayPosition[] = []
		if (!positionPercentages.x.plus) {
			zeroedPositions.push(0)
		}
		if (!positionPercentages.x.minus) {
			zeroedPositions.push(5)
		}
		if (!positionPercentages.y.plus) {
			zeroedPositions.push(1)
		}
		if (!positionPercentages.y.minus) {
			zeroedPositions.push(3)
		}
		if (!positionPercentages.z.plus) {
			zeroedPositions.push(2)
		}
		if (!positionPercentages.z.minus) {
			zeroedPositions.push(4)
		}

		return zeroedPositions
	}

	private getDimensionDistance(
		newDimensionPercentages: DimensionPercentages,
		positionPercentages: PositionValues,
		positiveIndex: ValueArrayPosition,
		negativeIndex: ValueArrayPosition,
		positionsWithZeroes: boolean[]
	): DistanceFromMatrixPosition | undefined {
		let positiveDistance = 0
		if (!positionsWithZeroes[positiveIndex]) {
			positiveDistance = Math.abs(positionPercentages[positiveIndex]
				- newDimensionPercentages.plus)
			if (positiveDistance > 4) {
				return undefined
			}
		}
		let negativeDistance = 0
		if (!positionsWithZeroes[negativeIndex]) {
			negativeDistance = Math.abs(positionPercentages[negativeIndex]
				- newDimensionPercentages.minus)
			if (negativeDistance > 4) {
				return undefined
			}
		}
		return (positiveDistance > negativeDistance
			? positiveDistance
			: negativeDistance) as DistanceFromMatrixPosition
	}

	private pickLowestFromDimensionOrder(
		minimumDistanceMatches: PositionValues[][][]
	): {
		dist: DistanceFromMatrixPosition
		vals: PositionValues
	} {
		let i: DistanceFromMatrixPosition = 0
		let secondDimensionArray
		for (; i < 4; i++) {
			secondDimensionArray = minimumDistanceMatches[i]
			if (secondDimensionArray) {
				break
			}
		}
		let thirdDimensionArray
		let j: DistanceFromMatrixPosition = 0
		for (; j < 4; j++) {
			thirdDimensionArray = secondDimensionArray[j]
			if (thirdDimensionArray) {
				break
			}
		}
		let k: DistanceFromMatrixPosition = 0
		for (; k < 4; k++) {
			if (thirdDimensionArray[k]) {
				break
			}
		}
		const dist: DistanceFromMatrixPosition = (i > j
			? (i > k
				? i
				: k)
			: (j > k
				? j
				: k)) as DistanceFromMatrixPosition


		return {
			dist,
			vals: minimumDistanceMatches[i][j][k]
		}
	}

	private getMinimumDistanceMatches(
		newPositionPercentages: PositionPercentages
	): PositionValues[][][][] {
		const zeroedPositions = this.getZeroedPositions()

		let xYZMinimumDistanceMatches: PositionValues[][][]
			    = [[[], [], [], [], []], [[], [], [], [], []], [[], [], [], [], []], [[], [], [], [], []], [[], [], [], [], []]]
		let xZYMinimumDistanceMatches: PositionValues[][][]
			    = [[[], [], [], [], []], [[], [], [], [], []], [[], [], [], [], []], [[], [], [], [], []], [[], [], [], [], []]]

		let yXZMinimumDistanceMatches: PositionValues[][][]
			    = [[[], [], [], [], []], [[], [], [], [], []], [[], [], [], [], []], [[], [], [], [], []], [[], [], [], [], []]]
		let yZXMinimumDistanceMatches: PositionValues[][][]
			    = [[[], [], [], [], []], [[], [], [], [], []], [[], [], [], [], []], [[], [], [], [], []], [[], [], [], [], []]]

		let zXYMinimumDistanceMatches: PositionValues[][][]
			    = [[[], [], [], [], []], [[], [], [], [], []], [[], [], [], [], []], [[], [], [], [], []], [[], [], [], [], []]]
		let zYXMinimumDistanceMatches: PositionValues[][][]
			    = [[[], [], [], [], []], [[], [], [], [], []], [[], [], [], [], []], [[], [], [], [], []], [[], [], [], [], []]]

		// need to find the percentages that best match the specified ones
		const valueMatrix = VALUE_MATRICES[2]

		let positionsWithZeroes: boolean[] = []
		zeroedPositions.forEach(
			position => positionsWithZeroes[position] = true)

		for (let i = 0; i < valueMatrix.length; i++) {
			const dimensionMatrix = valueMatrix[i]
			value_loop:
				for (let j = 0; j < dimensionMatrix.length; j++) {
					const values = dimensionMatrix[j]
					for (let k = 0; k < zeroedPositions.length; k++) {
						if (values[zeroedPositions[k]]) {
							continue value_loop
						}
					}

					const xDistance = this.getDimensionDistance(newPositionPercentages.x,
						values, 0, 5, positionsWithZeroes)
					if (xDistance === undefined) {
						continue
					}

					const yDistance = this.getDimensionDistance(newPositionPercentages.y,
						values, 1, 3, positionsWithZeroes)
					if (yDistance === undefined) {
						continue
					}

					const zDistance = this.getDimensionDistance(newPositionPercentages.z,
						values, 2, 4, positionsWithZeroes)
					if (zDistance === undefined) {
						continue
					}

					xYZMinimumDistanceMatches[xDistance][yDistance][zDistance] = values
					xZYMinimumDistanceMatches[xDistance][zDistance][yDistance] = values
					yXZMinimumDistanceMatches[yDistance][xDistance][zDistance] = values
					yZXMinimumDistanceMatches[yDistance][zDistance][xDistance] = values
					zXYMinimumDistanceMatches[zDistance][xDistance][yDistance] = values
					zYXMinimumDistanceMatches[zDistance][yDistance][xDistance] = values
				}
		}

		return [
			xYZMinimumDistanceMatches,
			xZYMinimumDistanceMatches,
			yXZMinimumDistanceMatches,
			yZXMinimumDistanceMatches,
			zXYMinimumDistanceMatches,
			zYXMinimumDistanceMatches
		]
	}

	private getClosestMatrixPosition(): PositionValues {
		let minimumDistanceMatches = this.getMinimumDistanceMatches(this.vp.pp)

		let match = this.pickLowestFromDimensionOrder(minimumDistanceMatches[0])
		for (let i = 1; i < 6; i++) {
			let nextMatch = this.pickLowestFromDimensionOrder(minimumDistanceMatches[i])
			if (match.dist > nextMatch.dist) {
				match = nextMatch
			}
		}

		return match.vals
	}

}

export const mutationApi = new MutationApi(viewport)
