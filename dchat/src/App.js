import './App.css';
import io from 'socket.io-client'
import {BrowserRouter as Router, Route, Switch, BrowserRouter, Redirect} from 'react-router-dom'
import {useState, useEffect} from 'react'
import Login from './components/Login'
import Chat from './components/Chat'
import Homepage from './components/Homepage'
import fire from './fire'

const socket = io.connect()

function App() {

  const [user, setUser] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [hasAccount, setHasAccount] = useState(false)

const clearInputs = () => {
  setEmail('')
  setPassword('')
}

const clearErrors = () => {
  setEmailError('');
  setPasswordError('')
}

const handleLogin = () => {
  clearErrors()
  fire
  .auth()
  .signInWithEmailAndPassword(email, password)
  .catch(err => {
      switch(err.code){
          case 'auth/invalid-email':
          case 'auth/user-disabled':
          case 'auth/user-not-found':
              setEmailError(err.message)
              break;
          case 'auth/wrong-password':
              setPasswordError(err.message)
              break
      }
  })
}

const handleSignup = () => {
  clearErrors()
  fire
  .auth()
  .createUserWithEmailAndPassword(email, password)
  .catch(err => {
      switch(err.code){
          case 'auth/email-already-in-use':
          case 'auth/invalid-email':
          setEmailError(err.message);
          break;

          case 'auth/weak-password':
          setPasswordError(err.message)
      }
  })
}

const handleLogout = () => {
  fire
  .auth()
  .signOut()
}

const authListener = () => {
  fire.auth().onAuthStateChanged((user) => {
    if(user){
      clearInputs()
      setUser(user)
      
    } 
    else {
        setUser('')
    }
  })
}

useEffect(() => {
  authListener()
}, [])
  
  return (
    <div className="App">
     {user ?
      <>
      <BrowserRouter>
        <Router>
          <div>
          <Switch>
            <Route exact path = '/login'><Redirect to = '/'/></Route>
          
            <Route exact path = '/'><Homepage user = {user} handleLogout = {handleLogout}/></Route>
            <Route path = {'/:id'} render = {({match}) => (<Chat user = {user} match = {match}/>)}/>
           
          </Switch>

          </div>
          
        </Router>
      </BrowserRouter>
      </> :
       <> 
       <BrowserRouter>
        <Router>
          <div>
          <Route exact path = '/'><Redirect to = '/login'/></Route>
          <Switch>
          
          <Route path = '/login'><Login email = {email} 
            setEmail = {setEmail} 
            password = {password} 
            setPassword={setPassword} 
            handleLogin={handleLogin}
            handleSignup={handleSignup}
            hasAccount={hasAccount}
            setHasAccount={setHasAccount}
            emailError={emailError}
            passwordError={passwordError} /></Route>
            
          </Switch>
          </div>
          
        </Router>
      </BrowserRouter>
       </>}
    </div>
  );
}

export default App;
