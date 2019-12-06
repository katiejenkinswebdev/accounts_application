import React from 'react'
import Account from './Account'

const OverdueAccounts = (props) => {
  let accountList = props.overdueAccounts.map(account => <Account key={account.Id} FirstName={account.FirstName} LastName={account.LastName} Email={account.Email} PhoneNumber={account.PhoneNumber} AmountDue={account.AmountDue} PaymentDueDate={account.PaymentDueDate}/>)

  return (
    <div>
      <section className="account-column grid" id="overdue-account-column">
        <div className="account-container-title" id="overdue-account-container-title">
          <h3>Overdue</h3>
        </div>
        <div className="account-container overdue-account">
          {accountList}
        </div>
      </section>
    </div>
  )
}

export default OverdueAccounts