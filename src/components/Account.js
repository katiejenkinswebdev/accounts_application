import React from 'react'

class Account extends React.Component {
  constructor(props) {
    super(props)
  }

  render () {
    let paymentDueDate = this.props.PaymentDueDate
    let paymentDueDateInput = 
      <li>
        <label>Due Date:</label>
        {this.props.PaymentDueDate}
      </li>

    let emptyPaymentDueDate = ""

    let paymentDueDateCheck = paymentDueDate ? paymentDueDateInput : emptyPaymentDueDate

    return (
      <div>
        <div className="account-container overdue-account">
          <ul className="account-data-list">
              <li>
                <label>Name:</label>
                {this.props.LastName}, {this.props.FirstName}
              </li>
              <li>
                <label>Email:</label>
                {this.props.Email}
              </li>
              <li>
                <label>Phone Number:</label>
                {this.props.PhoneNumber}
              </li>
              <li>
                <label>Amount Due:</label>
                ${this.props.AmountDue}
              </li>
              {paymentDueDateCheck}
          </ul>
        </div>
      </div>
    )
  }
}

export default Account