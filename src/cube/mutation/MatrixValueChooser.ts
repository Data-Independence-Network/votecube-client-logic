import {
	PositionValues,
	VALUE_MATRICES
}                            from '../cube-move-matrix'
import {
	DimensionPercentages,
	PositionPercentages
} from '../cube-movement'
import {
	ValueArrayPosition,
	ViewPort
}                            from '../viewport'
import {
	DistanceFromMatrixPosition,
	MatrixPosition
}                            from './types'


export class MatrixValueChooser {

	getClosestMatrixPosition(
		viewport: ViewPort
	): MatrixPosition {
		let minimumDistanceMatches = this.getMinimumDistanceMatches(viewport)

		let match = this.pickLowestFromDimensionOrder(minimumDistanceMatches[0])
		for (let i = 1; i < 6; i++) {
			let nextMatch = this.pickLowestFromDimensionOrder(minimumDistanceMatches[i])
			if (match.dist > nextMatch.dist) {
				match = nextMatch
			}
		}

		return match.mPos
	}

	private getMinimumDistanceMatches(
		viewport: ViewPort
	): MatrixPosition[][][][] {
		const zeroedPositions = this.getZeroedPositions(viewport)

		let xYZMinimumDistanceMatches: MatrixPosition[][][]
					= [[[], [], [], [], [], []], [[], [], [], [], [], []], [[], [], [], [], [], []], [[], [], [], [], [], []], [[], [], [], [], [], []], [[], [], [], [], [], []]]
		let xZYMinimumDistanceMatches: MatrixPosition[][][]
					= [[[], [], [], [], [], []], [[], [], [], [], [], []], [[], [], [], [], [], []], [[], [], [], [], [], []], [[], [], [], [], [], []], [[], [], [], [], [], []]]

		let yXZMinimumDistanceMatches: MatrixPosition[][][]
					= [[[], [], [], [], [], []], [[], [], [], [], [], []], [[], [], [], [], [], []], [[], [], [], [], [], []], [[], [], [], [], [], []], [[], [], [], [], [], []]]
		let yZXMinimumDistanceMatches: MatrixPosition[][][]
					= [[[], [], [], [], [], []], [[], [], [], [], [], []], [[], [], [], [], [], []], [[], [], [], [], [], []], [[], [], [], [], [], []], [[], [], [], [], [], []]]

		let zXYMinimumDistanceMatches: MatrixPosition[][][]
					= [[[], [], [], [], [], []], [[], [], [], [], [], []], [[], [], [], [], [], []], [[], [], [], [], [], []], [[], [], [], [], [], []], [[], [], [], [], [], []]]
		let zYXMinimumDistanceMatches: MatrixPosition[][][]
					= [[[], [], [], [], [], []], [[], [], [], [], [], []], [[], [], [], [], [], []], [[], [], [], [], [], []], [[], [], [], [], [], []], [[], [], [], [], [], []]]

		// need to find the percentages that best match the specified ones
		const valueMatrix = VALUE_MATRICES[2]

		let positionsWithZeroes: boolean[] = []
		zeroedPositions.forEach(
			position => positionsWithZeroes[position] = true)

		const newPositionPercentages: PositionPercentages = viewport.pp

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

					xYZMinimumDistanceMatches[xDistance][yDistance][zDistance] = {
						values,
						i,
						j
					}
					yXZMinimumDistanceMatches[yDistance][xDistance][zDistance] = {
						values,
						i,
						j
					}
					xZYMinimumDistanceMatches[xDistance][zDistance][yDistance] = {
						values,
						i,
						j
					}
					yZXMinimumDistanceMatches[yDistance][zDistance][xDistance] = {
						values,
						i,
						j
					}
					zXYMinimumDistanceMatches[zDistance][xDistance][yDistance] = {
						values,
						i,
						j
					}
					zYXMinimumDistanceMatches[zDistance][yDistance][xDistance] = {
						values,
						i,
						j
					}
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

	private getZeroedPositions(
		viewport: ViewPort
	): ValueArrayPosition[] {
		let positionPercentages = viewport.pp

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
			if (positiveDistance > 5) {
				return undefined
			}
		}
		let negativeDistance = 0
		if (!positionsWithZeroes[negativeIndex]) {
			negativeDistance = Math.abs(positionPercentages[negativeIndex]
				- newDimensionPercentages.minus)
			if (negativeDistance > 5) {
				return undefined
			}
		}
		return (positiveDistance > negativeDistance
			? positiveDistance
			: negativeDistance) as DistanceFromMatrixPosition
	}

	private pickLowestFromDimensionOrder(
		minimumDistanceMatches: MatrixPosition[][][]
	): {
		dist: DistanceFromMatrixPosition
		mPos: MatrixPosition
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
			mPos: minimumDistanceMatches[i][j][k]
		}
	}
}
