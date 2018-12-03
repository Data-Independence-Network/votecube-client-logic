import {ZoomLevel} from './cube-movement'
import {
	ViewPort,
	viewport
}                  from './viewport'

export class MutationApi {

	constructor(
		private vp: ViewPort
	) {
	}

	changeZoom(
		zoomLevel: ZoomLevel
	): void {

	}

}

export const mutationApi = new MutationApi(viewport)
