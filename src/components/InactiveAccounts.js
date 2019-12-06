import React from 'react'
import Account from './Account'

const InactiveAccounts = (props) => {
  let accountList = props.inactiveAccounts.map(account => <Account key={account.Id} FirstName={account.FirstName} LastName={account.LastName} Email={account.Email} PhoneNumber={account.PhoneNumber} AmountDue={account.AmountDue} PaymentDueDate={account.PaymentDueDate}/>)

  return (
    <section className="account-column grid" id="inactive-account-column">
      <div className="account-container-title" id="inactive-account-container-title">
        <h3>Inactive</h3>
      </div>
      <div className="account-container inactive-account">
        {accountList}
      </div>
    </section>
  )
}

export default InactiveAccounts
