import {useEffect, useRef} from 'react'

/**
 * This hook work the same has useEffect but doesn't render on first time component render.
 * @param {function | boolean} deps : to set the dependency to watch
 */
function useDidMountEffect(func, deps) {
	const didMount = useRef(false)
	
	useEffect(() => {
		if (didMount.current) func()
		else didMount.current = true
	}, [deps, func])
}

export default useDidMountEffect
