export async function setViewImport() {
	const eventListener = await import ('./cube/event-listener')
	eventListener.setViewPort(null)
}