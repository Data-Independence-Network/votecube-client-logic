export const D = document

export interface GlobalEventListenerMap {
	ad(
		target: Node
	): PerElementEventListenerMap

	tM: Map<Node, PerElementEventListenerMap>
}

export interface EventListener<E extends Event> {
	(event: E): void
}

export interface AddEventListener {
	(
		eventName: string,
		listener: EventListener<any>
	): AddEventListener
}

export interface RemoveEventListener {
	(
		eventName: string
	): RemoveEventListener
}

export interface PerElementEventListenerMap {
	ad: AddEventListener
	rm: RemoveEventListener
	lM: Map<string, EventListener<any>>
}


// Global (per Element) Event Listener map
export const LM: GlobalEventListenerMap = {
	tM: new Map(), // Target element Map
	// Add add event handler to element
	ad(
		tg, // element
	) {
		return eCO(this.tM, tg,
			// Per element Event listener map
			{
				lM: new Map(), // Listener Map
				// And a listener fo a particular event
				ad(
					eN, // event name
					ln // listener
				) {
					// add to array
					eCA(this.lM, eN).push(ln)
					tg.addEventListener(eN, ln)

					return (
						eN2,
						ln2
					) => {
						return this.ad(eN2, ln2)
					}
				},
				rm(
					eN // event name
				) {
					if (this.lM.has(eN)) {
						for (let ln of this.lM.get(eN)) {
							tg.removeEventListener(eN, ln)
						}
						this.lM.delete(eN)
					}

					return (eN2) => {
						return this.rm(eN2)
					}
				}
			})
	}
}

// Ensure Child Object
export function eCO<K, V>(
	mp: Map<K, V>, // map
	k: K, // key
	o: V // object
): V {
	if (mp.has(k)) {
		return mp.get(k)
	}
	mp.set(k, o)

	return o
}

// Ensure Child Array
export function eCA<K, V>(
	mp: Map<K, V[]>, // map
	k: K // key
): V[] {
	let a = mp.get(k)
	if (a) {
		return a
	}
	a = []
	mp.set(k, a)

	return a
}

// Get by query selector
export function gQ(
	sl: string // selector
): Element {
	return D.querySelector(sl)
}

export interface DispatchEventOnKnownObject<E> {
	(event: E) : DispatchEventOnKnownObject<E>
}

// dispatch event
export function dE<E>(
	tg, // target
	eN: string, // Event Name,
	eO: E // Event Object
): DispatchEventOnKnownObject<E> {
	tg.dispatchEvent(new CustomEvent(eN, {detail: eO}))
	return (
		eO2 // event object
	) => {
		return dE(tg, eN, eO2)
	}
}


// Prevent default
export function pD(
	ev: Event // Event
): void {
	ev.preventDefault()
}

export interface IsKnownElementOfTag {
	(tagName?: string) : boolean | IsKnownElementOfTag
}

// is tag
export function iT(
	t?: Element, // target
	tN?: string, // tag name
	aM?: boolean  // aggregate match
): boolean | IsKnownElementOfTag {
	if (!t) {
		return aM
	}
	if (!aM) {
		aM = t.tagName === tN
	}
	return function (
		tN2?: string // tag name
	) {
		return iT(t, tN2, aM)
	}
}
