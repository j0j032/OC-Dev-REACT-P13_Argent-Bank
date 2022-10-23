import {useState} from 'react'
import useDidMountEffect from './useDidMountEffect'

/**
 * This custom Hook is made to render a notification for an amount of time
 *
 * @param {function | boolean} deps - To watch and toggle the notification
 * @param {number} delay - To set the time the notification will be displayed (in milliseconds,
 * ex: 3sec will be 3000)
 * @returns {boolean}
 */
const UseNotification = (deps, delay) => {
	const [visible, setVisible] = useState(false)
	
	useDidMountEffect(() => {
		setVisible(true)
		const timer = setTimeout(() => {
			setVisible(false)
		}, delay)
		return () => {
			clearTimeout(timer)
		}
	}, [deps])
	
	return visible
}

export default UseNotification
