import React from 'react'
import chat from '../../../assets/img/icon-chat.png'
import money from '../../../assets/img/icon-money.png'
import security from '../../../assets/img/icon-security.png'

const Argument = () => {
	
	const features = [
		{
			icon: chat,
			heading: 'You are our #1 priority',
			text: 'Need to talk to a representative? You can get in touch through our 24/7 chat' +
				' or through a phone call in less than 5 minutes.'
		},
		{
			icon: money,
			heading: 'More savings means higher rates',
			text: 'The more you save with us, the higher your interest rate will be!'
		},
		{
			icon: security,
			heading: 'Security you can trust',
			text: 'We use top of the line encryption to make sure your data and money is always' +
				' safe.'
		}
	]
	
	return (
		<section className='features-container'>
			{
				features.map((feature, index) => (
					<div className='feature__item' key={index + feature.heading}>
						<img className='feature__icon' src={feature.icon} alt={feature.heading}/>
						<h3>{feature.heading}</h3>
						<p>{feature.text}</p>
					</div>
				))
			}
		</section>
	)
}

export default Argument
