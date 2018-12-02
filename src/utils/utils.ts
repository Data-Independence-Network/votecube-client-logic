// export const D = document; // new NodePtr('')

/*
export class NodePtr {
	el: Node

	constructor(
		private id: string
	) {
	}

	get val(): Node {
		if (this.el) {
			return this.el
		}

		return this.el = gQ(this.id)
	}
}
D.el           = document
*/


export interface GlobalEventListenerMap {
	ad(
		target: Node // NodePtr
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
		tg: Node // | NodePtr, // element
	) {
		return eCO(this.tM, tg,
			// Per element Event listener map
			{
				lM: new Map(), // Listener Map
				// And a listener fo a particular event
				ad(
					eN: string, // event name
					ln: EventListener<any> // listener
				) {
					// add to array
					eCA(this.lM, eN).push(ln)
					// let node: Node = <Node>tg
					// if (tg instanceof  NodePtr) {
					// 	node = tg.val
					// }
					// node.addEventListener(eN, ln)
					tg.addEventListener(eN, ln)

					return (
						eN2: string,
						ln2: EventListener<any>
					) => {
						return this.ad(eN2, ln2)
					}
				},
				rm(
					eN: string // event name
				) {
					if (this.lM.has(eN)) {
						for (let ln of this.lM.get(eN)) {
							// let node: Node = <Node>tg
							// if (tg instanceof NodePtr) {
							// 	node = tg.val
							// }
							// node.removeEventListener(eN, ln)
							tg.removeEventListener(eN, ln)
						}
						this.lM.delete(eN)
					}

					return (
						eN2: string
					) => {
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
	return document.querySelector(sl)
}

export interface DispatchEventOnKnownObject<E> {
	(event: E): DispatchEventOnKnownObject<E>
}

// dispatch event
export function dE<E>(
	tg: Node,  // NodePtr, // target
	eN: string, // Event Name,
	eO: E // Event Object
): DispatchEventOnKnownObject<E> {
	// tg.val.dispatchEvent(new CustomEvent(eN, {detail: eO}))
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
	(tagName?: string): boolean | IsKnownElementOfTag
}

// is tag
export function iT(
	t?: Element, // target
	tN?: string, // tag name
	aM?: boolean  // aggregate match
): boolean | IsKnownElementOfTag {
	if (!tN) {
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
