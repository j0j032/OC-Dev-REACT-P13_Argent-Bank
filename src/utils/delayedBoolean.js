/**
 * To set and reset a boolean after a certain amount of time
 * @param {boolean} on - your boolean wanted value
 * @param {boolean} off - your boolean initial value
 * @param {number} delay - Time in ms
 * @returns {(function(): void)|*}
 */
export const delayedBoolean = (on, off, delay) => {
	on()
	const timer = setTimeout(() => {
		off()
	}, delay)
	return () => {
		clearTimeout(timer)
	}
}
