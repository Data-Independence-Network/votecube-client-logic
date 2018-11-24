export async function helloFromLazyModule() {
	console.log('before dynamic import')
	const dynamicModule = await import ('./test/testDynamic')

	console.log('after dynamic import')

	const value = dynamicModule.helloDynamicImport()

	console.log('value:' + value)
}