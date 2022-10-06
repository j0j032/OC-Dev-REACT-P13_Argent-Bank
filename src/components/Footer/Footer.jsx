import React from 'react'

const Footer = () => {
	
	const date = Date.now()
	
	/**
	 * To get the good copyright year each year
	 * @param {number} date
	 * @returns {string}
	 */
	const dateFormater = date => new Date(date).toLocaleDateString('fr-FR', {year: 'numeric'})
	
	return (
		<footer className='footer'>
			<p>{`Copyright ${dateFormater(date)} Argent Bank`}</p>
		</footer>
	)
}

export default Footer
