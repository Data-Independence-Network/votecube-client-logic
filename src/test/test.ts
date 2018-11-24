export class HelloClass {
    
        async helloFromLazyModule() {
        console.log('before dynamic import')
        const dynamicModule = await import ('./testDynamic')

        console.log('after dynamic import')

        const value = dynamicModule.helloDynamicImport()

        console.log('value:')
        console.log(value)

        return value

    }
}