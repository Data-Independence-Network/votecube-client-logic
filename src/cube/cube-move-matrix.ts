export const VALUE_MATRICES = [[], [], []]

export const NUM_DIVISIONS = [8, 24, 72]

//  4   0   1    4   0   1    4   0   1    4   0   1    4   0   1    4   0   1
const fiveDegreeValueTemplate = [
	[[0, 0, 100], [0, 0, 100], [0, 0, 100], [6, 0, 94], [6, 0, 94], [6, 0, 94], [28, 0, 72], [28, 0, 72], [28, 0, 72], [50, 0, 50], [50, 0, 50], [50, 0, 50]],
	[[0, 0, 100], [0, 0, 100], [0, 0, 100], [6, 0, 94], [6, 0, 94], [6, 0, 94], [28, 0, 72], [28, 0, 72], [28, 0, 72], [50, 0, 50], [50, 0, 50], [50, 0, 50]],
	[[0, 0, 100], [0, 0, 100], [0, 0, 100], [6, 0, 94], [6, 0, 94], [6, 0, 94], [28, 0, 72], [28, 0, 72], [28, 0, 72], [50, 0, 50], [50, 0, 50], [50, 0, 50]],
	[[0, 6, 94], [0, 6, 94], [0, 6, 94], [5, 6, 89], [5, 6, 89], [5, 6, 89], [26, 6, 68], [26, 6, 68], [26, 6, 68], [47, 6, 47], [47, 6, 47], [47, 6, 47]],
	[[0, 6, 94], [0, 6, 94], [0, 6, 94], [5, 6, 89], [5, 6, 89], [5, 6, 89], [26, 6, 68], [26, 6, 68], [26, 6, 68], [47, 6, 47], [47, 6, 47], [47, 6, 47]],
	[[0, 6, 94], [0, 6, 94], [0, 6, 94], [5, 6, 89], [5, 6, 89], [5, 6, 89], [26, 6, 68], [26, 6, 68], [26, 6, 68], [47, 6, 47], [47, 6, 47], [47, 6, 47]],
	[[0, 28, 72], [0, 28, 72], [0, 28, 72], [3, 28, 69], [3, 28, 69], [3, 28, 69], [20, 26, 54], [20, 26, 54], [20, 26, 54], [37, 26, 37], [37, 26, 37], [37, 26, 37]],
	[[0, 28, 72], [0, 28, 72], [0, 28, 72], [3, 28, 69], [3, 28, 69], [3, 28, 69], [20, 26, 54], [20, 26, 54], [20, 26, 54], [37, 26, 37], [37, 26, 37], [37, 26, 37]],
	[[0, 28, 72], [0, 28, 72], [0, 28, 72], [3, 28, 69], [3, 28, 69], [3, 28, 69], [20, 26, 54], [20, 26, 54], [20, 26, 54], [37, 26, 37], [37, 26, 37], [37, 26, 37]],
	[[0, 50, 50], [0, 50, 50], [0, 50, 50], [0, 51, 49], [0, 51, 49], [0, 51, 49], [13, 49, 38], [13, 49, 38], [13, 49, 38], [26, 48, 26], [26, 48, 26], [26, 48, 26]],
	[[0, 50, 50], [0, 50, 50], [0, 50, 50], [0, 51, 49], [0, 51, 49], [0, 51, 49], [13, 49, 38], [13, 49, 38], [13, 49, 38], [26, 48, 26], [26, 48, 26], [26, 48, 26]],
	[[0, 50, 50], [0, 50, 50], [0, 50, 50], [0, 51, 49], [0, 51, 49], [0, 51, 49], [13, 49, 38], [13, 49, 38], [13, 49, 38], [26, 48, 26], [26, 48, 26], [26, 48, 26]],
	[[0, 72, 28], [0, 72, 28], [0, 72, 28], [0, 73, 27], [0, 73, 27], [0, 73, 27], [5, 73, 22], [5, 73, 22], [5, 73, 22], [14, 72, 14], [14, 72, 14], [14, 72, 14]],
	[[0, 72, 28], [0, 72, 28], [0, 72, 28], [0, 73, 27], [0, 73, 27], [0, 73, 27], [5, 73, 22], [5, 73, 22], [5, 73, 22], [14, 72, 14], [14, 72, 14], [14, 72, 14]],
	[[0, 72, 28], [0, 72, 28], [0, 72, 28], [0, 73, 27], [0, 73, 27], [0, 73, 27], [5, 73, 22], [5, 73, 22], [5, 73, 22], [14, 72, 14], [14, 72, 14], [14, 72, 14]],
	[[0, 94, 6], [0, 94, 6], [0, 94, 6], [0, 94, 6], [0, 94, 6], [0, 94, 6], [0, 96, 4], [0, 96, 4], [0, 96, 4], [0, 100, 0], [0, 100, 0], [0, 100, 0]],
	[[0, 94, 6], [0, 94, 6], [0, 94, 6], [0, 94, 6], [0, 94, 6], [0, 94, 6], [0, 96, 4], [0, 96, 4], [0, 96, 4], [0, 100, 0], [0, 100, 0], [0, 100, 0]],
	[[0, 94, 6], [0, 94, 6], [0, 94, 6], [0, 94, 6], [0, 94, 6], [0, 94, 6], [0, 96, 4], [0, 96, 4], [0, 96, 4], [0, 100, 0], [0, 100, 0], [0, 100, 0]],
	[[0, 100, 0], [0, 100, 0], [0, 100, 0], [0, 100, 0], [0, 100, 0], [0, 100, 0], [0, 100, 0], [0, 100, 0], [0, 100, 0], [0, 100, 0], [0, 100, 0], [0, 100, 0]],
	[[0, 100, 0], [0, 100, 0], [0, 100, 0], [0, 100, 0], [0, 100, 0], [0, 100, 0], [0, 100, 0], [0, 100, 0], [0, 100, 0], [0, 100, 0], [0, 100, 0], [0, 100, 0]],
	[[0, 100, 0], [0, 100, 0], [0, 100, 0], [0, 100, 0], [0, 100, 0], [0, 100, 0], [0, 100, 0], [0, 100, 0], [0, 100, 0], [0, 100, 0], [0, 100, 0], [0, 100, 0]]
]

//  4   0   1    4   0   1    4   0   1    4   0   1
const fifteenDegreeValueTemplate = [
	[[0, 0, 100], [6, 0, 94], [28, 0, 72], [50, 0, 50]],
	[[0, 6, 94], [5, 6, 89], [26, 6, 68], [47, 6, 47]],
	[[0, 28, 72], [3, 28, 69], [20, 26, 54], [37, 26, 37]],
	[[0, 50, 50], [0, 51, 49], [13, 49, 38], [26, 48, 26]],
	[[0, 72, 28], [0, 73, 27], [5, 73, 22], [14, 72, 14]],
	[[0, 94, 6], [0, 94, 6], [0, 96, 4], [0, 100, 0]],
	[[0, 100, 0], [0, 100, 0], [0, 100, 0], [0, 100, 0]]
]

const fifteenDegreeCombinations = [[100, 0, 0], [95, 5, 0], [90, 10, 0]]

//  4   0   1    4   0   1
const fortyFiveDegreeValueTemplate = [
	[[0, 0, 100], [50, 0, 50]],
	[[0, 50, 50], [33, 33, 33]],
	[[0, 100, 0], [0, 100, 0]]
]

const fortyFiveDegreeCombinations = [[100, 0, 0], [50, 50, 0], [33, 33, 33]];

const matrixValueTemplates = [
	fortyFiveDegreeValueTemplate,
	fifteenDegreeValueTemplate,
	fiveDegreeValueTemplate,
]

/*const uniqueCombinations = [
	fiveDegreeCombinations,
	fifteenDegreeCombinations,
	fortyFiveDegreeCombinations
]*/

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
	[4, 0, 1, 8, 8],
	[3, 0, 4, 8, 2],
	[2, 0, 3, 8, 4],
	[1, 0, 2, 8, 6],
	// right top left
	[1, 0, 4, 8, 2],
	[4, 0, 3, 8, 4],
	[3, 0, 2, 8, 6],
	[2, 0, 1, 8, 8],

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
	populateValueMatrix(0, 3, 2)
	populateValueMatrix(1, 7, 4)
	populateValueMatrix(2, 21, 12)
}

export function populateValueMatrix(
	matrixIndex: number,
	endX: number,
	endY: number
) {
	const numDivisions = NUM_DIVISIONS[matrixIndex]
	const valueMatrix    = VALUE_MATRICES[matrixIndex]

	for (let i = 0; i < numDivisions; i++) {
		const xSubMatrix = []
		valueMatrix.push(xSubMatrix)
		// for (let j = 0; j < numDivisions; j++) {
		//     xSubMatrix.push([])
		// }
	}

	const matrixValueTemplate = matrixValueTemplates[matrixIndex]

	const indexStartMultiplier = Math.pow(3, matrixIndex)

	for (let i = 0; i < 32; i++) {
		const subMatrixPositions = matrixTemplateDirectedPositions[i]
		const moveSubMatrix      = matrixMoveXY[i]

		const positionStartX       = subMatrixPositions[3] * indexStartMultiplier
		const positionStartY       = subMatrixPositions[4] * indexStartMultiplier
		const loopEndX             = moveSubMatrix[0] == 1 ? endX : -endX
		const isPositiveDirectionX = moveSubMatrix[0] == 1 ? 1 : 0
		for (let x = 0;
		     isPositiveDirectionX ? x < loopEndX : x > loopEndX;
		     isPositiveDirectionX ? x++ : x--) {
			const loopEndY             = moveSubMatrix[1] == 1 ? endY : -endY
			const isPositiveDirectionY = moveSubMatrix[1] == 1 ? 1 : 0
			const xValueTemplate       = matrixValueTemplate[Math.abs(x)]
			for (let y = 0;
			     isPositiveDirectionY ? y < loopEndY : y > loopEndY;
			     isPositiveDirectionY ? y++ : y--) {
				const yValueTemplate                      = xValueTemplate[Math.abs(y)]
				const values                              = [0, 0, 0, 0, 0, 0]
				values[subMatrixPositions[0]]           = yValueTemplate[0]
				values[subMatrixPositions[1]]           = yValueTemplate[1]
				values[subMatrixPositions[2]]           = yValueTemplate[2]
				valueMatrix[(positionStartX + x) % numDivisions]
					[(positionStartY + y) % numDivisions] = values
			}
		}
	}
}