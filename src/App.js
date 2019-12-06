import React from 'react'
import ActiveAccounts from './components/ActiveAccounts'
import OverdueAccounts from './components/OverdueAccounts'
import InactiveAccounts from './components/InactiveAccounts'
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      allAccounts: [],
      activeAccounts: [],
      overdueAccounts: [],
      inactiveAccounts: []
    }
  }

  // Organize Accounts into Components based on Account Status
  separateAccounts(allAccounts) {
    let newState = Object.assign({}, this.state)
    const currentDate = Date.now(),
      activeAccounts = [],
      overdueAccounts = [],
      inactiveAccounts = []

    newState.allAccounts.forEach(account => {
      const dueDate = new Date(account.PaymentDueDate).getTime()
      if (dueDate === 0) {
        inactiveAccounts.push(account)
      }
      if (dueDate < currentDate && dueDate !== 0) {
        overdueAccounts.push(account)
      } 
      if (dueDate > currentDate) {
        activeAccounts.push(account)
      }
    })
    this.setState({...this.state, activeAccounts: activeAccounts, overdueAccounts: overdueAccounts, inactiveAccounts: inactiveAccounts})
  }

  // Remove any extra characters in Phone Number & format accordingly
  formatPhoneNumber(allAccounts) {
    let newState = Object.assign({}, this.state)
    
    newState.allAccounts.forEach(account => {
      let phoneNumber = account.PhoneNumber
      let sanitizedPhoneNumber
      let formattedPhoneNumber

      sanitizedPhoneNumber = phoneNumber.replace(/[^\d]/g, "")

      if (sanitizedPhoneNumber.length === 10) {
        formattedPhoneNumber = sanitizedPhoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, "($1)-$2-$3")
        account.PhoneNumber = formattedPhoneNumber
        this.setState({...this.state, PhoneNumber: account.PhoneNumber })
      }
    })
  }

  // Find end of Date and remove Time. Format to MM/DD/YYYY
  formatDate(allAccounts) {
    let newState = Object.assign({}, this.state)
    
    newState.allAccounts.forEach(account => {
      if (account.PaymentDueDate) {
        let startSliceLocation = account.PaymentDueDate.indexOf('T')
        let timeRemovedFromDueDate = account.PaymentDueDate.slice(0, startSliceLocation)
        let paymentDueDateArray = timeRemovedFromDueDate.split('-')
        let paymentYear = paymentDueDateArray.shift()

        paymentDueDateArray.push(paymentYear)

        let formattedPaymentDueDate = paymentDueDateArray.join('/')
        account.PaymentDueDate = formattedPaymentDueDate

        this.setState({...this.state, PaymentDueDate: account.PaymentDueDate })
      }
    })
  }

  // Fetch all Accounts from API when App is loaded
  componentDidMount() {
    try {
    fetch('https://frontiercodingtests.azurewebsites.net/api/accounts/getall')
      .then(response => response.json())
      .then(results => { 
        this.setState({
          allAccounts: results
        })
      })
      .then(() => {
        this.formatPhoneNumber(this.state.allAccounts)
        this.formatDate(this.state.allAccounts)
        this.separateAccounts(this.state.allAccounts)
      })
    }
    catch(error) {
      // TODO Add more robust error handling prior to production
      console.log('There was an error in fetch:', error)
    }
  }

  render () {
    return (
      <article className="grid">
        <header className="grid">
          <div className="title-container">
            <h1>Coding Test</h1>
          </div>
        </header>
        <main className="content grid" id="home-content">
          <div className="content-title-container">
            <h2>Accounts</h2>
          </div>
          <section className="grid" id="account-grid">
            <ActiveAccounts activeAccounts={this.state.activeAccounts} />
            <OverdueAccounts overdueAccounts={this.state.overdueAccounts} />
            <InactiveAccounts inactiveAccounts={this.state.inactiveAccounts} />
          </section>
        </main>
        <footer className="grid">
          {/* TODO Not displaying full year */}
          <p className="copy">&copy;<script>document.write(new Date().getFullYear())</script></p>
        </footer>
      </article>
    ) 
  }
} 

export default App;
