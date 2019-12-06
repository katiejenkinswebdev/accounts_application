import React from 'react'
import Account from './Account'

const ActiveAccounts = (props) => {
  let accountList = props.activeAccounts.map(account => <Account key={account.Id} FirstName={account.FirstName} LastName={account.LastName} Email={account.Email} PhoneNumber={account.PhoneNumber} AmountDue={account.AmountDue} PaymentDueDate={account.PaymentDueDate}/>)

  return (
    <div>
      <section className="account-column grid" id="active-account-column">
        <div className="account-container-title" id="active-account-container-title">
          <h3>Active</h3>
        </div>
        <div className="account-container active-account">
          {accountList}
        </div>     
      </section>
    </div>
  )
}

export default ActiveAccounts