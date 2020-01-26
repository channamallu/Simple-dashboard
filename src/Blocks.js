import React from 'react';
import { Link } from 'react-router-dom';


class Blocks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      err: null,
      isLoaded: false,
      blocks: [],
      date: new Date().getTime()
    };
  }

  componentDidMount() {    
    
    fetch(`https://blockchain.info/blocks/${this.state.date}?cors=true&format=json`)
    .then(response => {
      if (!response.ok) { throw response.statusText }
      return response.json()  
    }) 
    .then((result) => {        
        this.setState({
          isLoaded: true,
          blocks: result.blocks
        });
      },        
      (error) => {
        console.log(error)
        this.setState({
          isLoaded: true,
          err:error
        });
      }
    )
  }        
    

  

  render() {
    const { err, isLoaded, blocks, date } = this.state;    
    if (err) {
      return (<div>Error: {err}</div>);
    }else if (!isLoaded) {
      return (<div>Loading...</div>);
    } else {
      return (        
          <div >
              <div><h1>{ `Blocks for ${new Date(date).toDateString()}`}</h1></div>
              <table className="full_responsive">
              <thead>
                  <tr>
                      <th>Hash</th>
                      <th>Height</th>
                      <th>Time</th>
                      <th>Is Main Chain?</th>                      
                  </tr>
              </thead>
              <tbody>
                {blocks.map((block, index) => {
                  return (
                  <tr key={ index}>
                      <td data-column="Hash"><Link to={`/block/${block.hash}`} >{block.hash}</Link></td>
                      <td data-column="Height">{block.height}</td>
                      <td data-column="Time">{new Date(block.time).toDateString()}</td>
                      <td data-column="Is Main Chain?">{block.main_chain.toString()}</td>
                      
                  </tr>
                  )
                })}                
                  
              </tbody>
              </table>
           </div>
      
     
      
      );
    }
  }
}

export default Blocks