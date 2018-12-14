import {ValuesOutCallback} from './cube/cube-movement'
import {MutationApi}       from './cube/mutation-api'

export async function setViewImport(
	cb?: ValuesOutCallback
): Promise<MutationApi> {
	const eventListener = await import ('./cube/event-listener')

	return eventListener.setViewPort(cb)
}

export function devLoad(): void {
	console.log('vc-client-logic devLoad')
}

export {IMutationApi} from './cube/mutation-api'