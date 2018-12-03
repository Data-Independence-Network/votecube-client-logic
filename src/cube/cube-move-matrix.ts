export const VALUE_MATRICES = [[], [], [], [], []]

export const NUM_DIVISIONS = [72, 24, 8]

// 5   1   2        5   1   2        5   1   2       5   1   2
const fiveDegreeValueTemplate =
				[[[0, 0, 100], [0, 0, 100], [0, 0, 100], [20, 0, 80], [20, 0, 80], [20, 0, 80], [40, 0, 60], [40, 0, 60], [40, 0, 60], [50, 0, 50], [50, 0, 50], [50, 0, 50]],
					[[0, 0, 100], [0, 0, 100], [0, 0, 100], [20, 0, 80], [20, 0, 80], [20, 0, 80], [40, 0, 60], [40, 0, 60], [40, 0, 60], [50, 0, 50], [50, 0, 50], [50, 0, 50]],
					[[0, 0, 100], [0, 0, 100], [0, 0, 100], [20, 0, 80], [20, 0, 80], [20, 0, 80], [40, 0, 60], [40, 0, 60], [40, 0, 60], [50, 0, 50], [50, 0, 50], [50, 0, 50]],
					[[0, 20, 80], [0, 20, 80], [0, 20, 80], [10, 10, 80], [10, 10, 80], [10, 10, 80], [30, 10, 60], [30, 10, 60], [30, 10, 60], [45, 45, 10], [45, 45, 10], [45, 45, 10]],
					[[0, 20, 80], [0, 20, 80], [0, 20, 80], [10, 10, 80], [10, 10, 80], [10, 10, 80], [30, 10, 60], [30, 10, 60], [30, 10, 60], [45, 45, 10], [45, 45, 10], [45, 45, 10]],
					[[0, 20, 80], [0, 20, 80], [0, 20, 80], [10, 10, 80], [10, 10, 80], [10, 10, 80], [30, 10, 60], [30, 10, 60], [30, 10, 60], [45, 45, 10], [45, 45, 10], [45, 45, 10]],
					[[0, 40, 60], [0, 40, 60], [0, 40, 60], [5, 35, 60], [5, 35, 60], [5, 35, 60], [15, 35, 50], [15, 35, 50], [15, 35, 50], [40, 40, 20], [40, 40, 20], [40, 40, 20]],
					[[0, 40, 60], [0, 40, 60], [0, 40, 60], [5, 35, 60], [5, 35, 60], [5, 35, 60], [15, 35, 50], [15, 35, 50], [15, 35, 50], [40, 40, 20], [40, 40, 20], [40, 40, 20]],
					[[0, 40, 60], [0, 40, 60], [0, 40, 60], [5, 35, 60], [5, 35, 60], [5, 35, 60], [15, 35, 50], [15, 35, 50], [15, 35, 50], [40, 40, 20], [40, 40, 20], [40, 40, 20]],
					[[0, 50, 50], [0, 50, 50], [0, 50, 50], [0, 50, 50], [0, 50, 50], [0, 50, 50], [20, 40, 40], [20, 40, 40], [20, 40, 40], [33, 33, 33], [33, 33, 33], [33, 33, 33]],
					[[0, 50, 50], [0, 50, 50], [0, 50, 50], [0, 50, 50], [0, 50, 50], [0, 50, 50], [20, 40, 40], [20, 40, 40], [20, 40, 40], [33, 33, 33], [33, 33, 33], [33, 33, 33]],
					[[0, 50, 50], [0, 50, 50], [0, 50, 50], [0, 50, 50], [0, 50, 50], [0, 50, 50], [20, 40, 40], [20, 40, 40], [20, 40, 40], [33, 33, 33], [33, 33, 33], [33, 33, 33]],
					[[0, 60, 40], [0, 60, 40], [0, 60, 40], [0, 66, 33], [0, 66, 33], [0, 66, 33], [10, 60, 30], [10, 60, 30], [10, 60, 30], [20, 60, 20], [20, 60, 20], [20, 60, 20]],
					[[0, 60, 40], [0, 60, 40], [0, 60, 40], [0, 66, 33], [0, 66, 33], [0, 66, 33], [10, 60, 30], [10, 60, 30], [10, 60, 30], [20, 60, 20], [20, 60, 20], [20, 60, 20]],
					[[0, 60, 40], [0, 60, 40], [0, 60, 40], [0, 66, 33], [0, 66, 33], [0, 66, 33], [10, 60, 30], [10, 60, 30], [10, 60, 30], [20, 60, 20], [20, 60, 20], [20, 60, 20]],
					[[0, 80, 20], [0, 80, 20], [0, 80, 20], [0, 85, 15], [0, 85, 15], [0, 85, 15], [0, 90, 10], [0, 90, 10], [0, 90, 10], [0, 100, 0], [0, 100, 0], [0, 100, 0]],
					[[0, 80, 20], [0, 80, 20], [0, 80, 20], [0, 85, 15], [0, 85, 15], [0, 85, 15], [0, 90, 10], [0, 90, 10], [0, 90, 10], [0, 100, 0], [0, 100, 0], [0, 100, 0]],
					[[0, 80, 20], [0, 80, 20], [0, 80, 20], [0, 85, 15], [0, 85, 15], [0, 85, 15], [0, 90, 10], [0, 90, 10], [0, 90, 10], [0, 100, 0], [0, 100, 0], [0, 100, 0]],
					[[0, 100, 0], [0, 100, 0], [0, 100, 0], [0, 100, 0], [0, 100, 0], [0, 100, 0], [0, 100, 0], [0, 100, 0], [0, 100, 0], [0, 100, 0], [0, 100, 0], [0, 100, 0]],
					[[0, 100, 0], [0, 100, 0], [0, 100, 0], [0, 100, 0], [0, 100, 0], [0, 100, 0], [0, 100, 0], [0, 100, 0], [0, 100, 0], [0, 100, 0], [0, 100, 0], [0, 100, 0]],
					[[0, 100, 0], [0, 100, 0], [0, 100, 0], [0, 100, 0], [0, 100, 0], [0, 100, 0], [0, 100, 0], [0, 100, 0], [0, 100, 0], [0, 100, 0], [0, 100, 0], [0, 100, 0]]]

// 5   1   2        5   1   2        5   1   2       5   1   2
const fifteenDegreeValueTemplate =
				[[[0, 0, 100], [20, 0, 80], [40, 0, 60], [50, 0, 50]],
					[[0, 20, 80], [10, 10, 80], [30, 10, 60], [45, 45, 10]],
					[[0, 40, 60], [5, 35, 60], [15, 35, 50], [40, 40, 20]],
					[[0, 50, 50], [0, 50, 50], [20, 40, 40], [33, 33, 33]],
					[[0, 60, 40], [0, 66, 33], [10, 60, 30], [20, 60, 20]],
					[[0, 80, 20], [0, 85, 15], [0, 90, 10], [0, 100, 0]],
					[[0, 100, 0], [0, 100, 0], [0, 100, 0], [0, 100, 0]]]

// 5   1   2        5   1   2        5   1   2       5   1   2
const fortyFifeDegreeValueTemplate =
				[[[0, 0, 100], [50, 0, 50]],
					[[0, 50, 50], [33, 33, 33]],
					[[0, 100, 0], [0, 100, 0]]]

const matrixValueTemplates = [
	fifteenDegreeValueTemplate,
	fifteenDegreeValueTemplate,
	fifteenDegreeValueTemplate,
	fifteenDegreeValueTemplate,
	fortyFifeDegreeValueTemplate
]

// same for every 4 MATRIX_TEMPLATE_DIRECTED POSITIONS
let matrixMoveXY = [
	// right side up
	// 4 sequential positions for each entry, repeating (16 total)
	[-1, 1], // left top right
	[-1, -1], // right top left
	[1, 1],  // left bottom left
	[1, -1]   // right bottom left
	// next 16 - upside down, repeats in movement
]
// always starting at perpendicular x (due to 7 positions defined)
// starting from full square and going towards 45/45 (in y)
// (in x & y directions specified by the move matrix)
let matrixTemplateDirectedPositions = [
	// right side up
	// left top right, x-index start, y-index start
	[4, 0, 1, 24, 24],
	[3, 0, 4, 24, 6],
	[2, 0, 3, 24, 12],
	[1, 0, 2, 24, 18],
	// right top left
	[1, 0, 4, 24, 6],
	[4, 0, 3, 24, 12],
	[3, 0, 2, 24, 18],
	[2, 0, 1, 24, 24],

	// next 8 - top and bottom are flipped (5 instead of 0)


	// next 16 - upside down, second is flipped (5 to 0 and back),
	// initial offset 180 abs(-12), 180 (+12%24)

]

// right side up
// 4 sequential positions for each entry, repeating (16 total)
let tempMatrixMoveXY = []
for (let i = 0; i < 4; i++) {
	for (let _ = 0; _ < 4; _++) {
		tempMatrixMoveXY.push(matrixMoveXY[i])
	}
}

// next 16 - upside down, repeats in movement
for (let i = 0; i < 16; i++) {
	tempMatrixMoveXY.push(tempMatrixMoveXY[i])
}
matrixMoveXY = tempMatrixMoveXY

// next 8 - top and bottom are flipped (5 instead of 0)
for (let i = 0; i < 8; i++) {
	let template = matrixTemplateDirectedPositions[i]
	matrixTemplateDirectedPositions.push([template[0], 5, template[2], template[3], template[4]])
}

// next 16 - upside down, second is flipped (5 to 0 and back),
// initial offset -180 abs(-12), 180 (12)
for (let i = 0; i < 16; i++) {
	let template = matrixTemplateDirectedPositions[i]
	let upDown   = template[1] == 0 ? 5 : 0
	matrixTemplateDirectedPositions.push([template[0], upDown, template[2], Math.abs(template[3] - 12), template[4] + 12])
}

export function populateValueMatrices() {
	populateValueMatrix(0, 21, 12)
	populateValueMatrix(1, 7, 4)
	populateValueMatrix(2, 3, 2)
}

export function populateValueMatrix(
	matrixIndex,
	endX,
	endY
) {
	const numDivisions = NUM_DIVISIONS[matrixIndex]
	let valueMatrix    = VALUE_MATRICES[matrixIndex]

	for (let i = 0; i < numDivisions; i++) {
		let xSubMatrix = []
		valueMatrix.push(xSubMatrix)
		// for (let j = 0; j < numDivisions; j++) {
		//     xSubMatrix.push([])
		// }
	}

	const matrixValueTemplate = matrixValueTemplates[matrixIndex]

	for (let i = 0; i < 32; i++) {
		let subMatrixPositions = matrixTemplateDirectedPositions[i]
		let moveSubMatrix      = matrixMoveXY[i]

		let positionStartX       = subMatrixPositions[3]
		let positionStartY       = subMatrixPositions[4]
		let loopEndX             = moveSubMatrix[0] == 1 ? endX : -endX
		let isPositiveDirectionX = moveSubMatrix[0] == 1 ? 1 : 0
		for (let x = 0;
				 isPositiveDirectionX ? x < loopEndX : x > loopEndX;
				 isPositiveDirectionX ? x++ : x--) {
			let loopEndY             = moveSubMatrix[1] == 1 ? endY : -endY
			let isPositiveDirectionY = moveSubMatrix[1] == 1 ? 1 : 0
			let xValueTemplate       = matrixValueTemplate[Math.abs(x)]
			for (let y = 0;
					 isPositiveDirectionY ? y < loopEndY : y > loopEndY;
					 isPositiveDirectionY ? y++ : y--) {
				let yValueTemplate                      = xValueTemplate[Math.abs(y)]
				let values                              = [0, 0, 0, 0, 0, 0]
				values[subMatrixPositions[0]]           = yValueTemplate[0]
				values[subMatrixPositions[1]]           = yValueTemplate[1]
				values[subMatrixPositions[2]]           = yValueTemplate[2]
				valueMatrix[(positionStartX + x) % numDivisions]
					[(positionStartY + y) % numDivisions] = values
			}
		}
	}
}