import {
	PositionValues,
	VALUE_MATRICES
} from '../cube-move-matrix'
import {
	ValueArrayPosition,
	ViewPort
} from '../viewport'
import {
	DistanceFromMatrixPosition,
	FinalPosition,
	MatrixPosition
} from './types'

export interface NeighborDistance {
	valueDists: DistanceFromMatrixPosition[],
	dist: DistanceFromMatrixPosition,
	maxDistIndex: ValueArrayPosition
}

export interface MinDistancePosition {
	i: number
	j: number
	dist: DistanceFromMatrixPosition
}

export interface DistancePositions {
	minDist: MinDistancePosition
	neighborDists: NeighborDistance[][]
}

export class FinalPositionFinder {

	findFinalPosition(
		closestMatrixPosition: MatrixPosition,
		viewport: ViewPort
	): FinalPosition {
		let positionPercentages             = viewport.pp
		let currentPosition: PositionValues = [
			positionPercentages.x.plus,
			positionPercentages.y.plus,
			positionPercentages.z.plus,
			positionPercentages.y.minus,
			positionPercentages.z.minus,
			positionPercentages.x.minus,
		]
		if (this.matrixPositionsMatch(closestMatrixPosition.values, currentPosition)) {
			return {
				x: closestMatrixPosition.i * 5,
				y: closestMatrixPosition.j * 5
			}
		}

		let distancePositions = this.findDistancePositions(currentPosition, closestMatrixPosition)
		let minDist           = distancePositions.minDist
		// If the difference is in one dimension
		if (!minDist.i || !minDist.j) {
			return this.get1DOffsetFinalPosition(closestMatrixPosition, minDist)
		} else {
			return this.get2DOffsetFinalPosition(closestMatrixPosition, minDist)
		}
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

	private findDistancePositions(
		currentPosition: PositionValues,
		closestMatrixPosition: MatrixPosition
	): DistancePositions {
		let minDist: MinDistancePosition
		let neighborDists: NeighborDistance[][] = [[], [], []]
		for (let i = -1; i <= 1; i++) {
			for (let j = -1; j <= 1; j++) {
				if (i === 0 && j === 0) {
					continue
				}
				const neighborI = (closestMatrixPosition.i + i) % 72
				const neighborJ = (closestMatrixPosition.j + j) % 72
				const values    = VALUE_MATRICES[2][neighborI][neighborJ]

				let maxDistance: DistanceFromMatrixPosition = 0
				const neighborDistance: NeighborDistance    = {
					valueDists: [],
					dist: maxDistance,
					maxDistIndex: null
				}
				neighborDists[i][j]                         = neighborDistance
				for (let k = 0; k < 6; k++) {
					const currentDistance =
									Math.abs(currentPosition[k] - values[k]) as DistanceFromMatrixPosition
					neighborDistance.valueDists.push(currentDistance)
					if (currentDistance > maxDistance) {
						maxDistance                   = currentDistance as DistanceFromMatrixPosition
						neighborDistance.dist         = maxDistance
						neighborDistance.maxDistIndex = k as ValueArrayPosition
					}
				}

				if (!minDist
					|| minDist.dist > maxDistance) {
					minDist = {
						i,
						j,
						dist: maxDistance
					}
				}
			}
		}

		return {
			minDist,
			neighborDists
		}
	}

	private get1DOffsetFinalPosition(
		closestMatrixPosition: MatrixPosition,
		minDist: MinDistancePosition
	): FinalPosition {
		let separation = this.get1DDegreeSeparation(closestMatrixPosition, minDist)
		switch (minDist.i) {
			case -1:
				return {
					x: closestMatrixPosition.i - separation,
					y: closestMatrixPosition.j
				}
			case 1:
				return {
					x: closestMatrixPosition.i + separation,
					y: closestMatrixPosition.j
				}
			default:
				switch (minDist.j) {
					case -1:
						return {
							x: closestMatrixPosition.i,
							y: closestMatrixPosition.j - separation
						}
					case 1:
						return {
							x: closestMatrixPosition.i,
							y: closestMatrixPosition.j + separation
						}
				}
		}
	}

	private get1DDegreeSeparation(
		closestMatrixPosition: MatrixPosition,
		minDist: MinDistancePosition
	): number {
		const nextClosestCellValues = VALUE_MATRICES[2]
			[closestMatrixPosition.i + minDist.i][closestMatrixPosition.j + minDist.j]
		const closestCellValues     = closestMatrixPosition.values
		let maxDistance             = 0
		for (let k = 0; k < 6; k++) {
			const currentDistance =
							Math.abs(nextClosestCellValues[k] - closestCellValues[k]) as DistanceFromMatrixPosition
			if (maxDistance > currentDistance) {
				maxDistance = currentDistance
			}
		}
		let increment = maxDistance / 5

		return Math.round(minDist.dist / increment)
	}

	private get2DOffsetFinalPosition(
		closestMatrixPosition: MatrixPosition,
		minDist: MinDistancePosition
	): FinalPosition {
		let separations = this.get2DDegreeSeparations(closestMatrixPosition, minDist)
		switch (minDist.i) {
			case -1:
				switch (minDist.j) {
					case -1:
						return {
							x: closestMatrixPosition.i - separations.i,
							y: closestMatrixPosition.j - separations.j
						}
					case 1:
						return {
							x: closestMatrixPosition.i - separations.i,
							y: closestMatrixPosition.j + separations.j
						}
				}
			case 1:
				switch (minDist.j) {
					case -1:
						return {
							x: closestMatrixPosition.i + separations.i,
							y: closestMatrixPosition.j - separations.j
						}
					case 1:
						return {
							x: closestMatrixPosition.i + separations.i,
							y: closestMatrixPosition.j + separations.j
						}
				}
		}
	}

	private get2DDegreeSeparations(
		closestMatrixPosition: MatrixPosition,
		minDist: MinDistancePosition
	): {
		i: number,
		j: number
	} {

		let horizontalDists = this.getDists(closestMatrixPosition, 0, minDist.j)
 		let largestHorizontalDistIndex = this.getLargestDistIdx(horizontalDists)

		let verticalDists = this.getDists(closestMatrixPosition, minDist.i, 0)
		let largestVerticalDistIndex = this.getLargestDistIdx(verticalDists)

		// get next cell values
		const nextClosesCellValues = VALUE_MATRICES[2]
			[closestMatrixPosition.i + minDist.i][closestMatrixPosition.j + minDist.j]
		const closestCellValues = closestMatrixPosition.values
		let horizontalIncrement    =
					this.getInc(nextClosesCellValues, closestCellValues, largestHorizontalDistIndex)
		let verticalIncrement      =
					this.getInc(nextClosesCellValues, closestCellValues, largestVerticalDistIndex)

		return {
			i: Math.round(minDist.dist / horizontalIncrement),
			j: Math.round(minDist.dist / verticalIncrement)
		}
	}


	private getDists(
		closestMatrixPosition: MatrixPosition,
		iOffset: number,
		jOffset: number
	): number[] {
		// get vertical values
		const nextVerticalCellValues = VALUE_MATRICES[2]
			[closestMatrixPosition.i + iOffset][closestMatrixPosition.j + jOffset]
		let distances                = []
		for (let k = 0; k < 6; k++) {
			const currentDistance =
							Math.abs(nextVerticalCellValues[k]
								- closestMatrixPosition.values[k]) as DistanceFromMatrixPosition
			distances.push(currentDistance)
		}

		return distances
	}

	private getLargestDistIdx(
		dists: number[]
	): ValueArrayPosition {
		let largestDist
		let largestDistIndex
		for (let k = 0; k < 6; k++) {
			const dist = dists[k]
			if (!largestDist || largestDist < dist) {
				largestDist      = dist
				largestDistIndex = k
			}
		}

		return largestDistIndex
	}

	private getInc(
		nextClosesCellValues: PositionValues,
		closestCellValues: PositionValues,
		largestDistIndex
	) {
		const maxDistance =
						Math.abs(nextClosesCellValues[largestDistIndex]
							- closestCellValues[largestDistIndex]) as DistanceFromMatrixPosition
		return maxDistance / 5
	}

}
