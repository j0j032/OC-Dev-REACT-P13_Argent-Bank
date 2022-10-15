import React from 'react'

const Accounts = () => {
	
	const accounts = [
		{
			title: 'Checking (x8349)',
			amount: '2,082.79',
			description: 'Available'
		},
		{
			title: 'Savings (x6712)',
			amount: '10,928.42',
			description: 'Available'
		},
		{
			title: 'Checking (x8349)',
			amount: '184.30',
			description: 'Current'
		}
	]
	
	return (
		<section className='accounts'>
			{
				accounts.map((account, i) => (
					<div key={i} className='account__card'>
						<div className='account'>
							<h3 className='account__title'>{`Argent Bank ${account.title}`}</h3>
							<p className='account__amount'>{`$${account.amount}`}</p>
							<p className='account__description'>{`${account.description} Balance`}</p>
						</div>
						<button className='profile__btn account__btn'>
							View transactions
						</button>
					</div>
				))
			}
		</section>
	)
}

export default Accounts
