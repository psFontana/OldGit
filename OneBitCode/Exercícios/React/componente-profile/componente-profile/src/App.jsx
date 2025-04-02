import { useState } from 'react'
import Profile from './components/Profile'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='app'>
      <Profile 
        avatar="https://randomuser.me/api/portraits/men/75.jpg"
        name="John Doe"
        bio="Full-stack javascript developer at Acme Inc."
        phone="+5511987654321"
        email="john.doe@email.com"
        githubUrl="https://github.com"
        linkedinUrl="https://linkedin.com"
        twitterUrl="https://twitter.com"
      />
    </div>
  )
}

export default App
