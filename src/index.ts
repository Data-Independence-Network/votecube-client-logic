import {ValuesOutCallback} from './cube/cube-movement'
import {MutationApi}       from './cube/mutation/mutation-api'

export async function setViewImport(
	cb?: ValuesOutCallback
): Promise<MutationApi> {
	const eventListener = await import ('./cube/event-listener')

	return eventListener.setViewPort(cb)
}

export {IMutationApi} from './cube/mutation/mutation-api'
export {ZoomIndex}    from './cube/cube-move-matrix'
export {
	DimensionPercentages,
	PositionPercentages,
	Direction,
	PositionPercent
}                     from './cube/cube-movement'
export {
	Dimension
}                     from './cube/viewport'