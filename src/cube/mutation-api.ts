import {ZoomIndex} from './cube-move-matrix'
import {
	Direction,
	PositionPercent
}                  from './cube-movement'
import {
	ViewPort,
	viewport
}                  from './viewport'

export interface IMutationApi {

	changeZoom(
		zoomIndex: ZoomIndex
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
		let percentChange;
		switch (this.vp.zm) {
			case 0:
				percentChange = 20;
				break;
			case 1:
				percentChange = 5;
				break;
			case 2:
				percentChange = 1;
				break;
		}
		if()
	}

	moveXToPercent(
		movePercent: PositionPercent
	) {
	}

	moveY(
		direction: Direction
	): void {
	}

	moveYToPercent(
		movePercent: PositionPercent
	) {
	}

	moveZ(
		direction: Direction
	): void {
	}

	moveZToPercent(
		movePercent: PositionPercent
	) {
	}


}

export const mutationApi = new MutationApi(viewport)
