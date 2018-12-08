import {
	ZoomIndex
} from './cube-move-matrix'
import {
	ViewPort,
	viewport
} from './viewport'

export class MutationApi {

	constructor(
		private vp: ViewPort
	) {
	}

	changeZoom(
		zoomIndex: ZoomIndex
	): void {

	}

}

export const mutationApi = new MutationApi(viewport)
