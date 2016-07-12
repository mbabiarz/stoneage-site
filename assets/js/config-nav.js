const App = React.createClass({
  getInitialState: function () {
    return {
      liked: false,
      pipeSize: '2 in.',
      hoseSize: '4/4',
      flange: true,
      plate: true,
      addHose: 'false',
      addCollet: 'false',
      addRoller: false,
      addFlangeMount: false,
      addStrapMount: false,
      addNozzle: 'false',
      notes: '',
      done: false,
      tab: 1
    };
  },
  
  changeTab: function (tab) {
    this.setState({tab: tab});
  },
  
  getActiveClass: function (tab) {
    var className = 'tab-nav';
    if (this.state.tab === tab) {
      return className + ' tab-nav-active';
    }
    return className;
  },
  
  updateRadio: function (nextState) {
    this.setState(nextState);
  },
  
  handleCheck: function(e) {
    this.setState({isChecked: !this.state.isChecked});
  },
  
  toggleValue: function (event) {
    var val = event.currentTarget;
    var newVal = {};
    newVal[val.id] = val.checked;
    this.setState(newVal);
  },
  
  // TODO: we can probably refactor to a single change handler for select options that change state
  setPipeSize: function(e) {
    this.setState({ pipeSize: e.target.value });
  },
  
  setHoseSize: function(e) {
    this.setState({ hoseSize: e.target.value });
  },
  
  setAddHose: function(e) {
    this.setState({ addHose: e.target.value });
  },
  
  setAddCollet: function(e) {
    this.setState({ addCollet: e.target.value });
  },
  
  setAddNozzle: function(e) {
    this.setState({ addNozzle: e.target.value });
  },
  
  
  setNotes: function(e) {
    this.setState({ notes: e.target.value });
  },
  
  render() {
    var styleInline = { display:'inline' };
    var marginLeft21 = { marginLeft:'21px' }; 
    var tab = this.state.tab;
    
    return (
      <div>
      
        <h1>Configure your equipment</h1>
        
        {/* TAB NAV */}
        <span onClick={this.changeTab.bind(null, 1)} className={this.getActiveClass(1)}>1. Parameters</span>
        <span onClick={this.changeTab.bind(null, 2)} className={this.getActiveClass(2)}>2. Options</span>
        <span onClick={this.changeTab.bind(null, 3)} className={this.getActiveClass(3)}>3. Notes</span>
        <span onClick={this.changeTab.bind(null, 4)} className={this.getActiveClass(4)}>4. Summary</span>

        {/* TAB 1 CONTENT */}
        {tab === 1 && (
          <div className="tab-content">
            {/* PIPE SIZE */}
            <div className="tab-row bg-lt-grey">
              <label htmlFor="pipeSize" className="even">Pipe Size</label>
              <select id="pipeSize" defaultValue={this.state.pipeSize} onChange={this.setPipeSize}>
              <option value='2 in.'>2 in.</option>
              <option value='2.5 in.'>2.5 in.</option>
              <option value='3 in.'>3 in.</option>
              <option value='4 in.'>4 in.</option>
              </select>
            </div>

            {/* HOSE SIZE */}
            <div className="tab-row">
              <label htmlFor="hoseSize" className="even"> Hose Size</label>
              <select id="hoseSize" defaultValue={this.state.hoseSize} onChange={this.setHoseSize}>
              <option value="4/4">4/4</option>
              <option value="5/4">5/4</option>
              <option value="6/4">6/4</option>
              </select>
            </div>

            <div className="tab-row bg-lt-grey">
              {/* FLANGE */}
              <div>
                <label>Does the pipe have a flange?</label>
                <input type="radio" name="flange" onChange={this.updateRadio.bind(null, {flange: true})} value="true" checked={this.state.flange} style={marginLeft21} />
                <label> Yes</label>
                <input type="radio" name="flange" onChange={this.updateRadio.bind(null, {flange: false})} value="false" checked={!this.state.flange} />
                <label> No</label>
              </div>

              {/* PLATE */}                    
              {!this.state.flange && (
                <div>
                  <label>Will you require a splash plate?</label>
                  <input type="radio" name="plate" onChange={this.updateRadio.bind(null, {plate: true})} value="true" checked={this.state.plate} />
                  <label> Yes</label>
                  <input type="radio" name="plate" onChange={this.updateRadio.bind(null, {plate: false})} value="false" checked={!this.state.plate} />
                  <label> No</label>
                </div>
              )}
            </div>

            <div className="prev-next">
              <button onClick={this.changeTab.bind(null, 2)} className="pull-right btn btn-gray">Next: Options</button>
            </div>
          </div>
        )}
        
        {/* TAB 2 CONTENT */}
        {tab === 2 && (
          <div className="tab-content">
            {/* ADD HOSE */}
            <div className="tab-row bg-lt-grey">
              <label htmlFor="addHose" className="even">Add Hose</label>
              <select id="addHose" defaultValue={this.state.addHose} onChange={this.setAddHose}>
              <option value='None'>None</option>
              <option value='75 ft'>75 ft</option>
              <option value='100 ft'>100 ft</option>
              </select>
            </div>

            {/* ADD COLLET */}
            <div className="tab-row">
              <label htmlFor="addCollet" className="even">Add Collet</label>
              <select id="hoseKit" defaultValue={this.state.addCollet} onChange={this.setAddCollet}>
              <option value='None'>None</option>
              <option value='FF 121-438'> Single, .438</option>
              <option value='FF 121-460'>Single, .460</option>
              <option value='FF 121-484'>Single, .484</option>
              <option value='FF 121-516'>Single, .516</option>
              <option value='NAV 621'>Kit,  .438–.516</option>
              </select>
            </div>

            {/* ADD NOZZLE */}
            <div className="tab-row bg-lt-grey">
              <label htmlFor="addNozzle" className="even">Add Nozzle </label>
              <select id="addNozzle" defaultValue={this.state.addNozzle} onChange={this.setAddNozzle}>
              <option value='None'>None</option>
              <option value='BT25-MP6R-C'>Banshee, 22k psi (12-15 gpm)</option>
              <option value='BT25-MP6R-A'>Banshee, 22k psi (13-20 gpm)</option>
              </select>
            </div>

            {/* ADD OTHER */}
            <div>
              <h3>Other Options</h3>
              <input id="addRoller" defaultChecked={this.state.addRoller} type="checkbox" onChange={this.toggleValue}/>
              <label htmlFor="addRoller"> Roller, .460</label><br/>

              <input id="addFlangeMount" defaultChecked={this.state.addFlangeMount} type="checkbox" onChange={this.toggleValue}/>
              <label htmlFor="addFlangeMount"> Flange Mount Base Plate Assembly</label><br/>

              <input id="addStrapMount" defaultChecked={this.state.addStrapMount} type="checkbox" onChange={this.toggleValue}/>
              <label htmlFor="addStrapMount"> Strap Mount Assembly</label><br/>

            </div>
            <div className="prev-next">
              <button onClick={this.changeTab.bind(null, 1)} className="pull-left btn btn-gray">Previous</button>
              <button onClick={this.changeTab.bind(null, 3)} className="pull-right btn btn-gray">Next: Notes</button>
            </div>
          </div>
        )}

        {/* TAB 3 CONTENT */}
        {tab === 3 && (
          <div className="tab-content">
            <div className="tab-row">
              <label>Add instructions or other info:</label>
                <textarea
                  type="text"
                  name="notes"
                  value={this.state.notes}           onChange={this.setNotes}
                  className="msg-box"
                />
            </div>
            <div className="prev-next">
              <button onClick={this.changeTab.bind(null, 2)} className="pull-left btn btn-gray">Previous</button>
              <button onClick={this.changeTab.bind(null, 4)} className="pull-right btn btn-gray">Next: Summary</button>
            </div>
          </div>
        )}

        {/* TAB 4 CONTENT */}
        {tab === 4 && (
          <div className="tab-content">
            <div className="tab-row">
              <div className="col-sm-6" style={{paddingBottom: '15px'}}>
                <h2>Parameters</h2>
                <strong>Pipe Size:</strong> {this.state.pipeSize}<br/>
                Hose Size: {this.state.hoseSize}<br/>{this.state.flange ? 'Flange: true' : 'Flange: false'}<br/>
                {!this.state.flange && this.state.plate ? 'Plate: true' : 'Plate: false'}
              </div>
              <div className="col-sm-6">
                <h2>Optional Items</h2>
                Add Hose: {this.state.addHose}<br/>
                Add Collet: {this.state.addCollet}<br/>
                Add Roller: {this.state.addRoller ? 'PRO 174-46' : 'false'}<br/>
                Add Flange Mount: {this.state.addFlangeMount ? 'BOP 010-4-8' : 'false'}<br/>
                Add Strap Mount: {this.state.addStrapMount ? 'BOP 050' : 'false'}<br/>
                Add Nozzle: {this.state.addNozzle}<br/>
                Notes: {this.state.notes}
              </div>
              <br className="clearfix"/>
            </div>
            <div className="prev-next">
              
              {!this.state.done && <button onClick={this.changeTab.bind(null, 3)} className="pull-left btn btn-gray">Previous</button>}
        
              {!this.state.done && <input type="button" value="Get a Quote" onClick={this.updateRadio.bind(null, {done: true})} className="pull-right btn" />}

              {this.state.done && (
                <div>
                  <div className="tab-row">
                    <h2>Customer Contact Information</h2>
                  </div>
                  <form action="https://formspree.io/margaret.babiarz@stoneagetools.com"
          method="POST" className="send-form">
                    <input type="text" name="Name: " placeholder="Your Name" className="wide pull-right"/><br/>
                    <input type="text" name="Company: " placeholder="Company Name" className="wide pull-right"/><br/>
                    <input type="email" name="Email: " placeholder="Email Address" className="wide pull-right"/><br/>
                    <input type="text" name="Phone: " placeholder="Phone Number" className="wide pull-right"/><br/>

                    <input type="submit" className="btn wide pull-right" value="Send to Sales"/><br className="clearfix" />

                    <input type="hidden" name="_subject" value="Navigator Quote Request" />
                    <input type="hidden" name="Pipe Size: " value={this.state.pipeSize} />
                    <input type="hidden" name="Hose Size: " value={this.state.hoseSize} />
                    <input type="hidden" name="Flange: " value={this.state.flange} />
                    <input type="hidden" name="Splash Plate: " value={this.state.plate} className="hidden" />
                    <input type="hidden" name="Hose: " value={this.state.addHose} className="hidden" />
                    <input type="hidden" name="Collet: " value={this.state.addCollet} className="hidden" />
                    <input type="hidden" name="Roller: " value={this.state.addRoller} className="hidden" />
                    <input type="hidden" name="Flange Mount: " value={this.state.addFlangeMount} className="hidden" />
                    <input type="hidden" name="Strap Mount: " value={this.state.addStrapMount} className="hidden" />
                    <input type="hidden" name="Nozzle: " value={this.state.addNozzle} className="hidden" />
                    <input type="hidden" name="Notes: " value={this.state.notes} className="hidden" />
                    <input type="hidden" name="_next" value="http://www.stoneagetools.com/email-thanks.html" />
                  </form>
                </div>
              )}
              
            </div>
          </div>
        )}
      
      </div>
    );
  }
});
 
ReactDOM.render(<App />, document.querySelector('#appContent'));