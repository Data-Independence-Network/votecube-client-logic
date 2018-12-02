export async function setViewImport() {
	const eventListener = await import ('./cube/event-listener')
	eventListener.setViewPort(null)
}

export function devLoad() {
	console.log('vc-client-logic devLoad')
}