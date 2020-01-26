import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';


class Block extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      err: null,
      isLoaded: false,
      block: {},
      block_hash: '',
      url: null,
      isLatest: false
    };
    this.fetchData = this.fetchData.bind(this);
  }
  componentWillMount(){    
    this.setState({block_hash: this.props.match.params.block_hash})
    if(this.props.match.params.block_hash === 'latestblock') {
      
      this.setState({url: `https://blockchain.info/latestblock?cors=true`, isLatest: true})
    }else{
      this.setState({url: `https://blockchain.info/rawblock/${this.props.match.params.block_hash}?cors=true`})
    }
  }

  componentDidMount() {    
    this.fetchData()
  }  

  fetchData() {
    fetch(this.state.url)
    .then(response => {
      if (!response.ok) { throw response.statusText }
      return response.json()  
    }) 
    .then((result) => {        
        this.setState({
          isLoaded: true,
          block: result
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
    const { err, isLoaded, block, block_hash, isLatest } = this.state;   
    block.block_hash = block_hash 
    if (err) {
      return (<div>Error: {err}</div>);
    }else if (!isLoaded) {
      return (<div>Loading...</div>);
    } else {
      if(!isLatest){
        return (          
          <Fragment>
            <BlockData block={block} />  
            <Transcations transcations={block.tx}/>
          </Fragment>          
        );
      }else{
        return (<LatestBlock block={block}/>)
      }
    }
  }
}

function LatestBlock(data){
  const block = data.block;
  return (
    <div className="half_layout">
        <div><h1>Latest Block</h1></div>
        <table className="small_table">          
          <tbody>
            <tr>
              <td className="width30">{'Hash'}</td>
              <td className="width70">{block.hash}</td>
            </tr>
            <tr>
              <td className="width30">{'Time'}</td>
              <td className="width70">{new Date(block.time).toDateString()}</td>
            </tr>
            <tr>
              <td className="width30">{'Block Index'}</td>
              <td className="width70">{block.block_index}</td>
            </tr>            
            <tr>
              <td className="width30">{'Block Height '}</td>
              <td className="width70">{block.height}</td>
            </tr>            
          </tbody>
        </table>
      </div>
  )
}

function BlockData(data){
  const block = data.block;
  return (
    <div className="half_layout">
        <table className="small_table">          
          <tbody>
            <tr>
              <td className="width30">{'Hash'}</td>
              <td className="width70">{block.block_hash}</td>
            </tr>
            <tr>
              <td className="width30">{'Time'}</td>
              <td className="width70">{new Date(block.time).toDateString()}</td>
            </tr>
            <tr>
              <td className="width30">{'Number Of Tranctions '}</td>
              <td className="width70">{block.n_tx}</td>
            </tr>
            <tr>
              <td className="width30">{'Relayed By'}</td>
              <td className="width70">{block.relayed_by}</td>
            </tr>
            <tr>
              <td className="width30">{'Block Height '}</td>
              <td className="width70">{block.height}</td>
            </tr>
            <tr>
              <td className="width30">{'Size'}</td>
              <td className="width70">{block.size}</td>
            </tr>
            <tr>
              <td className="width30">{'Fee'}</td>
              <td className="width70">{block.fee}</td>
            </tr>
          </tbody>
        </table>
      </div>
  )
}

function Transcations(data){
  const transcations = data.transcations
  return (
    <div className="transcation">
      <div><h1>Tranctions</h1></div>
      <table className="full_responsive">
      <thead>
          <tr>
              <th>Hash</th>
              <th>Size</th>
              <th>Fee</th>
              <th>Relayed By</th>
              <th>Tranctions Index</th>
              <th>Time</th>
          </tr>
      </thead>
      <tbody>
      {transcations.map((transcation, index) => {
          return (
          <tr key={ index }>
              <td data-column="Hash"><Link to={`/transcation/${transcation.hash}`} >{transcation.hash}</Link></td>
              <td data-column="Size">{transcation.size}</td>
              <td data-column="Fee">{transcation.fee}</td>
              <td data-column="Relayed By">{transcation.relayed_by}</td>
              <td data-column="Tx Index">{transcation.tx_index}</td>
              <td data-column="Date">{new Date(transcation.time).toDateString()}</td>
          </tr>
          )
        })}          
      </tbody>
      </table>                
    </div>
  )
}

export default Block