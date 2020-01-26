import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import './index.css';
import App from './App';
import Block from './Block'
import Transcation from './Transcation'


const routing = (
    <Router>
      <div>
        <Header />
        <Route exact path={"/"} render={() => (<App />)} />        
        <Route exact path={"/block/:block_hash"} render={(props) => (
           <Block key={props.match.params.block_hash} {...props} />)
        }/>
        <Route exact path={"/transcation/:transcation_hash"} render={(props) => (
        <Transcation key={props.match.params.transcation_hash} {...props}/>)
        } />
                
      </div>
    </Router>
  )

  function Header() {    
    return (
      <div className="topnav">
        <Link  to={'/'}>Home</Link>  
        <Link  to={'/block/latestblock'}>Latest Block</Link>      
    </div>
    )
  }  

ReactDOM.render(routing, document.getElementById('root'));


