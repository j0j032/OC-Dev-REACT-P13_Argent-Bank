import React, {useState} from 'react'
import useDidMountEffect from './useDidMountEffect'

const UseNotification = (deps) => {
	const [visible, setVisible] = useState(false)
	
	useDidMountEffect(() => {
		setVisible(true)
		const timer = setTimeout(() => {
			setVisible(false)
		}, 3000)
		return () => {
			clearTimeout(timer)
		}
	}, [deps])
	
	return visible
}

export default UseNotification
