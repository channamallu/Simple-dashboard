import React, { Fragment } from 'react';

class Transcation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      err: null,
      isLoaded: false,
      transcation: {},
      transcation_hash: null
    };
  }

  componentWillMount() {
    this.setState({transcation_hash: this.props.match.params.transcation_hash})
  }

  componentDidMount() {    
    
    fetch(`https://blockchain.info/rawtx/${this.state.transcation_hash}?cors=true&format=json`)
    .then(response => {
      if (!response.ok) { throw response.statusText }
      return response.json()  
    }) 
    .then((result) => {        
        this.setState({
          isLoaded: true,
          transcation: result
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
    const { err, isLoaded, transcation } = this.state;    
    if (err) {
      return (<div>Error: {err}</div>);
    }else if (!isLoaded) {
      return (<div>Loading...</div>);
    } else {
      return (        
        <Fragment>
          <TranscationData data={transcation}/>       
          <TranscationInputs inputs={transcation.inputs}/>             
          <TranscationOutputs output={transcation.out}/>
        </Fragment>
      );
    }
  }
}

function TranscationData(data) {
  let transcation = data.data
  return (
    <div className="half_layout">
      <table className="small_table">          
        <tbody>
          <tr>
            <td className="width30">{'Hash'}</td>
            <td className="width70">{transcation.hash}</td>
          </tr>
          <tr>
            <td className="width30">{'Time'}</td>
            <td className="width70">{new Date(transcation.time).toDateString()}</td>
          </tr>
          <tr>
            <td className="width30">{'Number Of Inputs '}</td>
            <td className="width70">{transcation.vin_sz}</td>
          </tr>
          <tr>
            <td className="width30">{'Number Of Outputs '}</td>
            <td className="width70">{transcation.vout_sz}</td>
          </tr>
          <tr>
            <td className="width30">{'Relayed By'}</td>
            <td className="width70">{transcation.relayed_by}</td>
          </tr>
          <tr>
            <td className="width30">{'Block Height '}</td>
            <td className="width70">{transcation.block_height}</td>
          </tr>
          <tr>
            <td className="width30">{'Size'}</td>
            <td className="width70">{transcation.size}</td>
          </tr>            
        </tbody>
      </table>
    </div>
  )
}

function TranscationInputs(transcation) {
  return (
    <div className="transcation">
        <div >{`Transcation Inputs`}</div> 
         <table className="full_responsive">
            <thead>
                <tr>
                  <th>Sequence</th>
                  {/* <th>Witness</th> */}
                  <th>Script</th>                        
                </tr>
            </thead>
            <tbody> 
              {transcation.inputs.map((input, index) => {
                return (
                <tr key={index}>                      
                  <td data-column="Sequence">{input.sequence}</td>
                  {/* <td data-column="Witness">{input.input.witness}</td> */}
                  <td data-column="Script">{input.script}</td>                      
              </tr>
                )
              })}
                  
            </tbody>
          </table>     
      </div>          
  );
}

function TranscationOutputs(output){
  
  return (
    <div className="transcation">
         <div >{`Transcation Out`}</div> 
         <table className="full_responsive">
            <thead>
                <tr>
                  <th>#</th>
                  <th>Address</th>
                  <th>Value</th>
                  <th>Script</th>                        
                </tr>
            </thead>
            <tbody>
              {output.output.map((out, index) => {
                return (
                  <tr key={index}>                      
                <td data-column="#">{out.n + 1}</td>
                <td data-column="Address">{out.addr}</td>
                <td data-column="Value">{out.value}</td>
                <td data-column="Script">{out.script}</td>                      
              </tr> 
                )
              })}                
                 
            </tbody>
          </table>
    </div>          
  );
}

export default Transcation