import React from 'react'
import BGimg from '../../../assets/img/bank-tree.jpeg'

const BannerLanding = () => {
	return (
		<div className='banner'>
			<img src={BGimg} alt='background'/>
			<section className='banner__content'>
				<h2>No fees</h2>
				<h2>No minimum deposit</h2>
				<h2>High interest rates</h2>
				<p>Open a savings account with Argent Bank today!</p>
			</section>
		</div>
	)
}

export default BannerLanding
