const App = React.createClass({
  getInitialState: function () {
    return {
      pressure: 0,
      flow: 0,
      pipeSize: 0,
      rotation: 'Slow',
      inlet: '1 NPT',
      swivel: '',
      hoseSize: '4 mm',
      hoseLength: 0,
      headType: '',
      backout: true,
      cSkid: false,
      cCage: false,
      c6Wheel: false,
      c8Wheel: false,
      ring: false,
      case: false,
      kService: false,
      kSeal: false,
      kOverhaul: false,
      kTool: false,
      notes: '',
      done: false,
      tab: 1
    };
  },
  
  changeTab: function (tab) {
    this.setState({tab: tab});
    if (tab === 2) {
      this.setSwivel();
      this.setHeadType();
    }
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
  
  toggleValue: function (event) {
    var val = event.currentTarget;
    var newVal = {};
    newVal[val.id] = val.checked;
    this.setState(newVal);
  },
  
//  handleChecks: function (event) {
//    var checkbox = event.currentTarget;
//    console.log(checkbox);
//    var newVal = {};
//    newVal[val.id] = val.checked;
//    this.setState(newVal);
//  },
  
  toggleVisibility: function (id) {
     var e = document.getElementById(id);
     if(e.style.display == 'block')
        e.style.display = 'none';
     else
        e.style.display = 'block';
  },

  updateValue: function(key) {
    var update = {};
    update[key] = this.refs[key].value;
    this.setState(update);
  },
  
  setRotation: function(e) {
    this.setState({ rotation: e.target.value });
  },
  
  setInlet: function(e) {
    this.setState({ inlet: e.target.value });
  },
  
  setHoseSize: function(e) {
    this.setState({ hoseSize: e.target.value });
  },
  
//  setHeadType: function(e) {
//    this.setState({ headType: e.target.value });
//  },
  
  setNotes: function(e) {
    this.setState({ notes: e.target.value });
  },
  
  getSwivel: function () {
    var p = this.state.pressure;
    var f = this.state.flow;
    var i = this.state.inlet;
    var r = this.state.rotation;
    var s = this.state.swivel;
    
    var swivels = ['BJV-P16-S', 'BJV-P16-F', 'BJV-P12-S', 'BJV-P12-F', 'BJV-M24-S', 'BJV-M24-F', 'BJV-MP12-S', 'BJV-MP12-F', 'BJV-H9-S', 'BJV-H9-F'];
    var p16logic = p >= 2000 && p <= 10000 && f >= 20 && f <= 200 && i === '1 NPT';
    var p12logic = p >= 2000 && p <= 15000 && f >= 12 && f <= 100 && i === '3/4 NPT';
    var m24logic = p >= 2000 && p <= 22000 && f >= 12 && f <= 100 && i === 'M24';
    var mp12logic = p >= 2000 && p <= 22000 && f >= 10 && f <= 60 && i === '3/4 MP';
    var h9logic = p >= 20000 && p <= 40000 && f >= 3 && f <= 20 && i === '9/16 HP';
    if (p16logic && r === 'Slow') { return swivels[0]; }
    if (p16logic && r === 'Fast') { return swivels[1]; }
    if (p12logic && r === 'Slow') { return swivels[2]; }
    if (p12logic && r === 'Fast') { return swivels[3]; }
    if (m24logic && r === 'Slow') { return swivels[4]; }
    if (m24logic && r === 'Fast') { return swivels[5]; }
    if (mp12logic && r === 'Slow') { return swivels[6]; }
    if (mp12logic && r === 'Fast') { return swivels[7]; }
    if (h9logic && r === 'Slow') { return swivels[8]; }
    if (h9logic && r === 'Fast') { return swivels[9]; }
    
    return <span style={{color:'#c45846',fontSize:'12px',fontStyle:'italic'}}>No swivel found for this configuration. Try entering new parameters.</span>;
  },
  
  setSwivel:function() {
    this.setState({swivel: this.getSwivel()});
  },
  
  getHeadType: function () {
    var s = this.state.swivel;
    
    var heads = ['6-Port, P12, with extensions', '6-Port, P8, with extensions', '6-Port, P4, No extensions', '7-Port, P4, No extensions', '6-Port, G12, with extensions', '6-Port, S6, No extensions', '8-Port, S6, No extensions', '6-Port, G9, with extensions'];
    var p16logic = s === 'BJV-P16-S' || s === 'BJV-P16-F';
    var p12logic = s === 'BJV-P12-S' || s === 'BJV-P12-F';
    var mlogic = s === 'BJV-M24-S' || s === 'BJV-M24-F' || s === 'BJV-MP12-S' || s === 'BJV-MP12-F';
    var h9logic = s === 'BJV-H9-S' || s === 'BJV-H9-F';
    if (p16logic) { return [heads[0], heads[1]]; }
    if (p12logic) { return [heads[2], heads[3], heads[1]];}
    if (mlogic) { return [heads[2], heads[3], heads[4]]; }
    if (h9logic) { return [heads[5], heads[6], heads[7]]; }
    
//    console.log({swivel: s, ex: [heads[0], heads[1]]});
    return <span style={{color:'#c45846',fontSize:'12px',fontStyle:'italic'}}>No head found for this configuration. Try entering new parameters.</span>;
  },
  
  setHeadType:function() {
    this.setState({headType: this.getHeadType()});
  },
    
//  resetHeadType: function(e) {
//    this.setState({ headType: e.target.value });
//  },
                              
  render() {
//    console.log('render', this.state);
    var styleInline = { display:'inline' };
    var errorMsg = { color:'#c45846', margin:0, fontSize:'12px', fontStyle:'italic' };
    var infoMsg = { color:'#888', margin:'10px', fontSize:'12px', fontStyle:'italic', display:'none' };
    var tab = this.state.tab;
    var swivel = this.state.swivel;
    var heads = this.state.headType;
    
    return (
      <div>
      
        <h1>Configure your equipment</h1>
        
        {/* TAB NAV */}
        <span onClick={this.changeTab.bind(null, 1)}
           className={this.getActiveClass(1)}>1. Parameters</span>
        <span onClick={this.changeTab.bind(null, 2)} className={this.getActiveClass(2)}>2. Head Selection</span>
        <span onClick={this.changeTab.bind(null, 3)} className={this.getActiveClass(3)}>3. Options</span>
        <span onClick={this.changeTab.bind(null, 4)} className={this.getActiveClass(4)}>4. Notes</span>
        <span onClick={this.changeTab.bind(null, 5)} className={this.getActiveClass(5)}>5. Summary</span>

        {/* TAB 1 CONTENT */}
        {tab === 1 && (
          <div className="tab-content">
            {/* PRESSURE */}
            <div className="tab-row bg-lt-grey">
              <label className="even-120">Operating Pressure</label>
                <input
                  ref="pressure"
                  type="text"
                  name="pressure"
                  value={this.state.pressure ? this.state.pressure : ''}           onChange={this.updateValue.bind(null, 'pressure')}
                />
              <small className="grey">2000 - 40000 psi</small>
              {isNaN(this.state.pressure) && (<p style={errorMsg}>Pressure should be a number between 2000-40000 with no commas.</p>)}
            </div>     
            {/* FLOW */}
            <div className="tab-row">
              <label className="even-120">Operating Flow</label>
                <input
                  ref="flow"
                  type="text"
                  name="flow"
                  value={this.state.flow ? this.state.flow : ''} 
                  onChange={this.updateValue.bind(null, 'flow')}
                />
              <small className="grey">3 - 200 gpm</small>
              {isNaN(this.state.flow) && (<p style={errorMsg}>Flow should be a number between 3-200 with no commas.</p>)}
            </div>
            {/* PIPE SIZE */}
            <div className="tab-row bg-lt-grey">
              <label className="even-120">Pipe Size</label>
                <input
                  ref="pipeSize"
                  type="text"
                  name="pipeSize"
                  value={this.state.pipeSize ? this.state.pipeSize : ''}           onChange={this.updateValue.bind(null, 'pipeSize')}
                />
              <small className="grey">6 - 72 in.</small>
              {isNaN(this.state.pipeSize) && (<p style={errorMsg}>Pipe size should be a number between 6-72 with no commas. If working on larger diameter pipe, please include details in the Notes section.</p>)}
            </div>
            {/* ROTATION */}
            <div className="tab-row">
              <label className="even-120">Rotation Speed</label>
                <select id="rotation" defaultValue={this.state.rotation} onChange={this.setRotation}>
                <option value='Slow'>Slow</option>
                <option value='Fast'>Fast</option>
                </select>
            </div> 
            {/* INLET */}
            <div className="tab-row bg-lt-grey">
              <label className="even-120">Inlet Connection</label>
              {/* All inlet options */}
              <select id="inlet" defaultValue={this.state.inlet} onChange={this.setInlet}>
                <option value='1 NPT'>1 NPT</option>
                <option value='3/4 NPT'>3/4 NPT</option>
                <option value='M24'>M24</option>
                <option value='3/4 MP'>3/4 MP</option>
                <option value='9/16 HP'>9/16 HP</option>
              </select>
              {/* Filter inlet options for higher pressures 
              {this.state.pressure <= 10000 && (
              <select id="inlet" defaultValue={this.state.inlet} onChange={this.setInlet}>
                <option value='1 NPT'>1 NPT</option>
                <option value='3/4 NPT'>3/4 NPT</option>
                <option value='M24'>M24</option>
                <option value='3/4 MP'>3/4 MP</option>
              </select>
              )}
              
              {this.state.pressure > 10000 && this.state.pressure <=  22000 && (
              <select id="inlet" defaultValue={this.state.inlet} onChange={this.setInlet}>
                <option value='3/4 NPT'>3/4 NPT</option>
                <option value='M24'>M24</option>
                <option value='3/4 MP'>3/4 MP</option>
              </select>
              )}
              
              {this.state.pressure > 22000 && (
              <select id="inlet" defaultValue={this.state.inlet} onChange={this.setInlet}>
                <option value='9/16 HP'>9/16 HP</option>
              </select>
              )}*/}
            </div>
            {/* HOSE SIZE */}
            <div className="tab-row">
              <label htmlFor="hoseSize" className="even-120"> Hose Size</label>
              <select id="hoseSize" defaultValue={this.state.hoseSize} onChange={this.setHoseSize}>
              <option value="4 mm">4 mm</option>
              <option value="3/16 in.">3/16 in.</option>
              <option value="5 mm">5 mm</option>
              <option value="6 mm">6 mm</option>
              <option value="1/4 in.">1/4 in.</option>
              <option value="8 mm">8 mm</option>
              <option value="3/8 in.">3/8 in.</option>
              <option value="1/2 in.">1/2 in.</option>
              <option value="13 mm">13 mm</option>
              <option value="5/8 in.">5/8 in.</option>
              <option value="3/4 in.">3/4 in.</option>
              <option value="20 mm">20 mm</option>
              <option value="25 mm">25 mm</option>
              <option value="1 in.">1 in.</option>
              <option value="1 1/4 in.">1 1/4 in.</option>
              <option value="32 mm">32 mm</option>
              </select>
            </div>
            {/* HOSE LENGTH */}
            <div className="tab-row bg-lt-grey">
              <label className="even-120">Hose Length</label>
                <input
                  ref="hoseLength"
                  type="text"
                  name="hoseLength"
                  value={this.state.hoseLength ? this.state.hoseLength : ''}           onChange={this.updateValue.bind(null, 'hoseLength')}
                />
              <small className="grey">30 - 1000 ft</small>
              {isNaN(this.state.hoseLength) && (<p style={errorMsg}>Hose length should be a number between 3-1000 with no commas.</p>)}
            </div> 

            <div className="prev-next">
              <button onClick={this.changeTab.bind(null, 2)} className="pull-right btn btn-gray">Next: Head Selection</button>
            </div>
          </div>
        )}
        
        {/* TAB 2 CONTENT */}
        {tab === 2 && (
          <div className="tab-content">
            {/* HEAD TYPE 
            If [Pressure, Flow, Inlet, Rotation], set swivel=something. Then, based on swivel, display appropriate head choices. OR try fitting that login into getSwivel()!
            */}
            <div className="tab-row">
              Swivel: {swivel}
            </div>
          
            {swivel === 'BJV-P16-S' && (
            <div className="tab-row bg-lt-grey">
              <div>
                <label htmlFor="headType" className="even">Head Type: </label>  <select id="headType" onChange={this.resetHeadType}>
                  <option>{heads[0]}</option>
                  <option>{heads[1]}</option>
                </select> <button className="pull-right" onClick={this.toggleVisibility.bind(null, 'backoutTip')}>?</button>
                <div id="backoutTip" className="media" style={infoMsg}>
                  <div className="media-body">
                    <p>Select the head with the port size required.</p>
                    <p>A 6-port head configuration with extensions to fit the specified pipe size is standard for this swivel.</p>
                    <p>Custom heads are available &mdash; please specify additional instructions in the Notes section.</p>
                  </div>
                  <span className="media-right">
                      <img src="http://www.stoneagetools.com/assets/img/product/thumb-bjv-05.jpg" alt="..." />
                  </span>
                </div>
              </div>
            </div>
            )}

            {swivel === 'BJV-P16-F' && (
            <div className="tab-row bg-lt-grey">
              <div>
                <label htmlFor="headType" className="even">Head Type: </label>  <select id="headType">
                  <option>{heads[0]}</option>
                  <option>{heads[1]}</option>
                </select> <button className="pull-right" onClick={this.toggleVisibility.bind(null, 'backoutTip')}>?</button>
                <div id="backoutTip" className="media" style={infoMsg}>
                  <div className="media-body">
                    <p>Select the head with the port size required.</p>
                    <p>A 6-port head configuration with extensions to fit the specified pipe size is standard for this swivel.</p>
                    <p>Custom heads are available &mdash; please specify additional instructions in the Notes section.</p>
                  </div>
                  <span className="media-right">
                      <img src="http://www.stoneagetools.com/assets/img/product/thumb-bjv-05.jpg" alt="..." />
                  </span>
                </div>
              </div>
            </div>
            )}
          
            {swivel === 'BJV-P12-S' && (
            <div className="tab-row bg-lt-grey">
              <div>
                <label htmlFor="headType" className="even">Head Type: </label>  <select id="headType">
                  <option>{heads[0]}</option>
                  <option>{heads[1]}</option>
                  <option>{heads[2]}</option>
                </select> <button className="pull-right" onClick={this.toggleVisibility.bind(null, 'backoutTip')}>?</button>
                <div id="backoutTip" className="media" style={infoMsg}>
                  <div className="media-body">
                    <p>Select the appropriate head with the port size required.</p>
                    <p>This swivel can be configured with a 6-port head or a 7-port head.</p>
                    <img src="http://www.stoneagetools.com/assets/img/product/thumb-bjv-05.jpg" alt="..." />
                    <img src="http://www.stoneagetools.com/assets/img/product/thumb-bjv-05.jpg" alt="..." />
                    <img src="http://www.stoneagetools.com/assets/img/product/thumb-bjv-05.jpg" alt="..." />
                    <p>Custom heads are available &mdash; please specify additional instructions in the Notes section.</p>
                  </div>
                </div>
              </div>
            </div>
            )}
          
            {swivel === 'BJV-P12-F' && (
            <div className="tab-row bg-lt-grey">
              <div>
                <label htmlFor="headType" className="even">Head Type: </label>  <select id="headType">
                  <option>{heads[0]}</option>
                  <option>{heads[1]}</option>
                  <option>{heads[2]}</option>
                </select> <button className="pull-right" onClick={this.toggleVisibility.bind(null, 'backoutTip')}>?</button>
                <div id="backoutTip" className="media" style={infoMsg}>
                  <div className="media-body">
                    <p>Select the appropriate head with the port size required.</p>
                    <p>This swivel can be configured with a 6-port head or a 7-port head.</p>
                    <img src="http://www.stoneagetools.com/assets/img/product/thumb-bjv-05.jpg" alt="..." />
                    <img src="http://www.stoneagetools.com/assets/img/product/thumb-bjv-05.jpg" alt="..." />
                    <img src="http://www.stoneagetools.com/assets/img/product/thumb-bjv-05.jpg" alt="..." />
                    <p>Custom heads are available &mdash; please specify additional instructions in the Notes section.</p>
                  </div>
                </div>
              </div>
            </div>
            )}
          
            {swivel === 'BJV-M24-S' && (
            <div className="tab-row bg-lt-grey">
              <div>
                <label htmlFor="headType" className="even">Head Type: </label>  <select id="headType">
                  <option>{heads[0]}</option>
                  <option>{heads[1]}</option>
                  <option>{heads[2]}</option>
                </select> <button className="pull-right" onClick={this.toggleVisibility.bind(null, 'backoutTip')}>?</button>
                <div id="backoutTip" className="media" style={infoMsg}>
                  <div className="media-body">
                    <p>Select the appropriate head with the port size required.</p>
                    <p>This swivel can be configured with a 6-port head or a 7-port head.</p>
                    <img src="http://www.stoneagetools.com/assets/img/product/thumb-bjv-05.jpg" alt="..." />
                    <img src="http://www.stoneagetools.com/assets/img/product/thumb-bjv-05.jpg" alt="..." />
                    <img src="http://www.stoneagetools.com/assets/img/product/thumb-bjv-05.jpg" alt="..." />
                    <p>Custom heads are available &mdash; please specify additional instructions in the Notes section.</p>
                  </div>
                </div>
              </div>
            </div>
            )}
          
            {swivel === 'BJV-M24-F' && (
            <div className="tab-row bg-lt-grey">
              <div>
                <label htmlFor="headType" className="even">Head Type: </label>  <select id="headType">
                  <option>{heads[0]}</option>
                  <option>{heads[1]}</option>
                  <option>{heads[2]}</option>
                </select> <button className="pull-right" onClick={this.toggleVisibility.bind(null, 'backoutTip')}>?</button>
                <div id="backoutTip" className="media" style={infoMsg}>
                  <div className="media-body">
                    <p>Select the appropriate head with the port size required.</p>
                    <p>This swivel can be configured with a 6-port head or a 7-port head.</p>
                    <img src="http://www.stoneagetools.com/assets/img/product/thumb-bjv-05.jpg" alt="..." />
                    <img src="http://www.stoneagetools.com/assets/img/product/thumb-bjv-05.jpg" alt="..." />
                    <img src="http://www.stoneagetools.com/assets/img/product/thumb-bjv-05.jpg" alt="..." />
                    <p>Custom heads are available &mdash; please specify additional instructions in the Notes section.</p>
                  </div>
                </div>
              </div>
            </div>
            )}
          
            {swivel === 'BJV-MP12-S' && (
            <div className="tab-row bg-lt-grey">
              <div>
                <label htmlFor="headType" className="even">Head Type: </label>  <select id="headType">
                  <option>{heads[0]}</option>
                  <option>{heads[1]}</option>
                  <option>{heads[2]}</option>
                </select> <button className="pull-right" onClick={this.toggleVisibility.bind(null, 'backoutTip')}>?</button>
                <div id="backoutTip" className="media" style={infoMsg}>
                  <div className="media-body">
                    <p>Select the appropriate head with the port size required.</p>
                    <p>This swivel can be configured with a 6-port head or a 7-port head.</p>
                    <img src="http://www.stoneagetools.com/assets/img/product/thumb-bjv-05.jpg" alt="..." />
                    <img src="http://www.stoneagetools.com/assets/img/product/thumb-bjv-05.jpg" alt="..." />
                    <img src="http://www.stoneagetools.com/assets/img/product/thumb-bjv-05.jpg" alt="..." />
                    <p>Custom heads are available &mdash; please specify additional instructions in the Notes section.</p>
                  </div>
                </div>
              </div>
            </div>
            )}
          
            {swivel === 'BJV-MP12-F' && (
            <div className="tab-row bg-lt-grey">
              <div>
                <label htmlFor="headType" className="even">Head Type: </label>  <select id="headType">
                  <option>{heads[0]}</option>
                  <option>{heads[1]}</option>
                  <option>{heads[2]}</option>
                </select> <button className="pull-right" onClick={this.toggleVisibility.bind(null, 'backoutTip')}>?</button>
                <div id="backoutTip" className="media" style={infoMsg}>
                  <div className="media-body">
                    <p>Select the appropriate head with the port size required.</p>
                    <p>This swivel can be configured with a 6-port head or a 7-port head.</p>
                    <img src="http://www.stoneagetools.com/assets/img/product/thumb-bjv-05.jpg" alt="..." />
                    <img src="http://www.stoneagetools.com/assets/img/product/thumb-bjv-05.jpg" alt="..." />
                    <img src="http://www.stoneagetools.com/assets/img/product/thumb-bjv-05.jpg" alt="..." />
                    <p>Custom heads are available &mdash; please specify additional instructions in the Notes section.</p>
                  </div>
                </div>
              </div>
            </div>
            )}
          
            {swivel === 'BJV-H9-S' && (
            <div className="tab-row bg-lt-grey">
              <div>
                <label htmlFor="headType" className="even">Head Type: </label>  <select id="headType">
                  <option>{heads[0]}</option>
                  <option>{heads[1]}</option>
                  <option>{heads[2]}</option>
                </select> <button className="pull-right" onClick={this.toggleVisibility.bind(null, 'backoutTip')}>?</button>
                <div id="backoutTip" className="media" style={infoMsg}>
                  <div className="media-body">
                    <p>Select the appropriate head with the port size required.</p>
                    <p>This swivel can be configured with a 6-port head or a 8-port head.</p>
                    <img src="http://www.stoneagetools.com/assets/img/product/thumb-bjv-05.jpg" alt="..." />
                    <img src="http://www.stoneagetools.com/assets/img/product/thumb-bjv-05.jpg" alt="..." />
                    <img src="http://www.stoneagetools.com/assets/img/product/thumb-bjv-05.jpg" alt="..." />
                    <p>Custom heads are available &mdash; please specify additional instructions in the Notes section.</p>
                  </div>
                </div>
              </div>
            </div>
            )}

            {swivel === 'BJV-H9-F' && (
            <div className="tab-row bg-lt-grey">
              <div>
                <label htmlFor="headType" className="even">Head Type: </label>  <select id="headType">
                  <option>{heads[0]}</option>
                  <option>{heads[1]}</option>
                  <option>{heads[2]}</option>
                </select> <button className="pull-right" onClick={this.toggleVisibility.bind(null, 'backoutTip')}>?</button>
                <div id="backoutTip" className="media" style={infoMsg}>
                  <div className="media-body">
                    <p>Select the appropriate head with the port size required.</p>
                    <p>This swivel can be configured with a 6-port head or a 8-port head.</p>
                    <img src="http://www.stoneagetools.com/assets/img/product/thumb-bjv-05.jpg" alt="..." />
                    <img src="http://www.stoneagetools.com/assets/img/product/thumb-bjv-05.jpg" alt="..." />
                    <img src="http://www.stoneagetools.com/assets/img/product/thumb-bjv-05.jpg" alt="..." />
                    <p>Custom heads are available &mdash; please specify additional instructions in the Notes section.</p>
                  </div>
                </div>
              </div>
            </div>
            )}

            
            <div>
              <hr />
              <p><a href="http://jetting.stoneagetools.com" target="_blank"><i className="fa fa-plane"></i> See our Jetting Calculator for detailed tool jetting information.</a></p>
            </div>
              
            <div className="prev-next">
              <button onClick={this.changeTab.bind(null, 1)} className="pull-left btn btn-gray">Previous</button>
              <button onClick={this.changeTab.bind(null, 3)} className="pull-right btn btn-gray">Next: Options</button>
            </div>
             
          </div>
        )}

        {/* TAB 3 CONTENT */}
        {tab === 3 && (
          <div className="tab-content">
            {/* ADD BACKOUT */}
            <div className="tab-row bg-lt-grey">
              <input id="backout" defaultChecked={this.state.backout} type="checkbox" onChange={this.toggleValue}/>
              <label htmlFor="backout"> Add Backout Preventer</label> <button className="pull-right" onClick={this.toggleVisibility.bind(null, 'backoutTip')}>?</button>
              <div id="backoutTip" className="media" style={infoMsg}>
                <div className="media-body">
                  <p>Backout preventers increase operator safety by keeping the tool from backing out of the pipe.</p>
                  <p>Options are available including fixtures for small diameter pipes, pipes with various flange bolt circle diameters, and adapters for pipes with no-flange entry.</p>
                  <p>The appropriate backout preventer will be selected based on your parameters. Include additional instructions in Notes.</p>
                  <p><a href="http://www.stoneagetools.com/backout-prevention" target="_blank">See our backout prevention product page for details.</a></p>
                </div>
                <span className="media-right">
                    <img src="http://www.stoneagetools.com/assets/img/product/thumb-backout-305.jpg" alt="..." />
                </span>
              </div>
            </div>
          
            {/* ADD CENTRALIZER */}
            <div className="tab-row">
              Add Centralizer <button className="pull-right" onClick={this.toggleVisibility.bind(null, 'cTip')}>?</button>
              <input id="cSkid" defaultChecked={this.state.cSkid} type="checkbox" onChange={this.toggleValue}/>
              <label htmlFor="cSkid"> Skid Style</label> 
              
              <input id="cCage" defaultChecked={this.state.cCage} type="checkbox" onChange={this.toggleValue}/>
              <label htmlFor="cCage"> Cage Style</label>
              
              <input id="c6Wheel" defaultChecked={this.state.c6Wheel} type="checkbox" onChange={this.toggleValue}/>
              <label htmlFor="c6Wheel"> 6-Wheel</label>
              
              <input id="c8Wheel" defaultChecked={this.state.c8Wheel} type="checkbox" onChange={this.toggleValue}/>
              <label htmlFor="c8Wheel"> 8-Wheel</label>
              <div id="cTip" className="media" style={infoMsg}>
                <div className="media-body">
                  <p>A centralizer helps to protect the tool as it passes through the pipe and balances jet standoff distance for more consistent cleaning.</p>
                  <p>In cases where pipe size is more than 1.5 times the diameter of the tool, a centralizer is an important safety device, preventing the tool from turning around and thrusting backwards out of the pipe.</p>
                  <p><a href="http://www.stoneagetools.com/bjv-centralizers" target="_blank">See our centralizer product page for details.</a></p>
                </div>
                <span className="media-right">
                  <img src="http://www.stoneagetools.com/assets/img/product/thumb-bjv-centralizer-02.jpg" />
                </span>
              </div> 
            </div>
            
            {/* ADD PULLING RING */}
            <div className="tab-row bg-lt-grey">
              <input id="ring" defaultChecked={this.state.ring} type="checkbox" onChange={this.toggleValue}/>
              <label htmlFor="ring"> Add Pulling Ring</label> <button className="pull-right" onClick={this.toggleVisibility.bind(null, 'ringTip')}>?</button>
              <div id="ringTip" className="media" style={infoMsg}>
                <div className="media-body">
                  <p>A pulling ring can be utilized to pull a tool through the pipe in difficult cleaning applications. Pulling rings are available for 6-port and 8-port BJV heads.</p>
                </div>
                {/*<span className="media-right">
                    <img src="http://www.stoneagetools.com/assets/img/product/thumb-backout-305.jpg" alt="..." />
                </span>*/}
              </div>
            </div>
                    
            {/* ADD CASE */}
            <div className="tab-row">
              <input id="case" defaultChecked={this.state.case} type="checkbox" onChange={this.toggleValue}/>
              <label htmlFor="case"> Add Carrying Case</label> <button className="pull-right" onClick={this.toggleVisibility.bind(null, 'caseTip')}>?</button>
              <div id="caseTip" className="media" style={infoMsg}>
                <div className="media-body">
                  <p>A Pelican&trade; protection/carrying case with custom cut foam insert is available for BJV tools.</p>
                </div>
                {/*<span className="media-right">
                    <img src="http://www.stoneagetools.com/assets/img/product/thumb-backout-305.jpg" alt="..." />
                </span>*/}
              </div>
            </div>
                    
            {/* ADD MAINT KIT */}
            <div className="tab-row bg-lt-grey">
              Add Maintenance Kit <button className="pull-right" onClick={this.toggleVisibility.bind(null, 'maintTip')}>?</button>
              <input id="kService" defaultChecked={this.state.kService} type="checkbox" onChange={this.toggleValue}/>
              <label htmlFor="kService"> Service Kit</label> 
              
              <input id="kSeal" defaultChecked={this.state.kSeal} type="checkbox" onChange={this.toggleValue}/>
              <label htmlFor="kSeal"> Seal Kit</label>
              
              <input id="kOverhaul" defaultChecked={this.state.kOverhaul} type="checkbox" onChange={this.toggleValue}/>
              <label htmlFor="kOverhaul"> Overhaul Kit</label>
              
              <input id="kTool" defaultChecked={this.state.kTool} type="checkbox" onChange={this.toggleValue}/>
              <label htmlFor="kTool"> Tool Kit</label>
              <div id="maintTip" className="media" style={infoMsg}>
                <p>Maintenance kits should be listed somewhere on the website</p>
                <p><a href="#" target="_blank">Where are they listed?</a></p>
              </div> 
            </div>
          
            <div className="prev-next">
              <button onClick={this.changeTab.bind(null, 2)} className="pull-left btn btn-gray">Previous</button>
              <button onClick={this.changeTab.bind(null, 4)} className="pull-right btn btn-gray">Next: Notes</button>
            </div>
          </div>
        )}
        
        {/* TAB 4 CONTENT */}
        {tab === 4 && (
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
              <button onClick={this.changeTab.bind(null, 5)} className="pull-right btn btn-gray">Next: Summary</button>
            </div>
          </div>
        )}

        {/* TAB 5 CONTENT */}
        {tab === 5 && (
          <div className="tab-content">
            <div className="tab-row">
              <div className="col-sm-6" style={{paddingBottom: '15px'}}>
                <h2>Parameters</h2>
                Pressure: {this.state.pressure}<br/>
                Flow: {this.state.flow}<br/>
                Pipe Size: {this.state.pipeSize}<br/>
                Rotation Speed: {this.state.rotation}<br/>
                Inlet Connection: {this.state.inlet}<br/>
                Hose Size: {this.state.hoseSize}<br/>
                Hose Length: {this.state.hoseLength}<br/><hr/>
                Swivel: {this.state.swivel}<br/>
                {swivel !== '' &&
                  /* onChange doesn't work for head options b/c we have setHeadType tied to tab changes. Cheat this for the sake of appearance. */
                  <div>Head Type: {heads[1]}</div>
                }
              </div>
              <div className="col-sm-6">
                <h2>Optional Items</h2>
                Backout Preventer: {this.state.backout ? 'true' : 'false'}<br/>
                Centralizer: {this.state.cSkid ? 'BJ 070' : ''} {this.state.cCage ? 'Cage' : ''} {this.state.c6Wheel ? 'BJ 286' : ''} {this.state.c8Wheel ? 'BJ 288' : ''}{!this.state.cSkid && !this.state.cCage && !this.state.c6Wheel && !this.state.c8Wheel && 'false'}<br/>
                Pulling ring: {this.state.ring ? 'HC 090' : 'false'}<br/>
                Carrying Case: {this.state.addFlangeMount ? 'BJ 080' : 'false'}<br/>
                Maintenance Kit: {this.state.kService ? 'BJ 600' : ''} {this.state.kSeal ? 'BJ 602' : ''} {this.state.kOverhaul ? 'BJ 610' : ''} {this.state.kTool ? 'BJ 612' : ''}{!this.state.kService && !this.state.kSeal && !this.state.kOverhaul && !this.state.kTool && 'false'}<br/>
                Notes: {this.state.notes}
          
              </div>
              <br className="clearfix"/>
            </div>
            <div className="prev-next">
              
              {!this.state.done && <button onClick={this.changeTab.bind(null, 4)} className="pull-left btn btn-gray">Previous</button>}
        
              {!this.state.done && <input type="button" value="Get a Quote" onClick={this.updateRadio.bind(null, {done: true})} className="pull-right btn" />}

              {this.state.done && (
                <div>
                  <div className="tab-row">
                    <h2>Customer Contact Information</h2>
                  </div>
                  <form action="https://formspree.io/margaret.babiarz@stoneagetools.com"
          method="POST" className="send-form">
                    <div className="col-sm-6">
                      <input type="text" name="Name: " placeholder="Your Name" className="wide pull-right"/><br/>
                      <input type="text" name="Company: " placeholder="Company Name" className="wide pull-right"/>
                    </div>
                    <div className="col-sm-6">
                      <input type="email" name="Email: " placeholder="Email Address" className="wide pull-right"/><br/>
                      <input type="text" name="Phone: " placeholder="Phone Number" className="wide pull-right"/>

                      <input type="submit" className="btn pull-right" value="Send"/>
                    </div>
                    
                    <br className="clearfix" />
                    <input type="hidden" name="_subject" value="BJV Quote Request" />
                    <input type="hidden" name="Swivel: " value={this.state.swivel} />
                    <input type="hidden" name="Head Type: " value={heads[1]} />
                    <input type="hidden" name="Pressure: " value={this.state.pressure} />
                    <input type="hidden" name="Flow: " value={this.state.flow} />
                    <input type="hidden" name="Pipe Size: " value={this.state.pipeSize} />
                    <input type="hidden" name="Rotation: " value={this.state.rotation} className="hidden" />
                    <input type="hidden" name="Inlet: " value={this.state.inlet} className="hidden" />
                    <input type="hidden" name="Hose Size: " value={this.state.hoseSize} className="hidden" />
                    <input type="hidden" name="Hose Length: " value={this.state.hoseLength} className="hidden" />
                    <input type="hidden" name="Backout: " value={this.state.backout} className="hidden" />
                    <input type="hidden" name="Skid Centralizer: " value={this.state.cSkid} className="hidden" />
                    <input type="hidden" name="Cage Centralizer: " value={this.state.cCage} className="hidden" />
                    <input type="hidden" name="6-Wheel Centralizer: " value={this.state.c6Wheel} className="hidden" />
                    <input type="hidden" name="8-Wheel Centralizer: " value={this.state.c8Wheel} className="hidden" />
                    <input type="hidden" name="Case: " value={this.state.case} className="hidden" />
                    <input type="hidden" name="Service Kit: " value={this.state.kService} className="hidden" />
                    <input type="hidden" name="Seal Kit: " value={this.state.kSeal} className="hidden" />
                    <input type="hidden" name="Overhaul Kit: " value={this.state.kOverhaul} className="hidden" />
                    <input type="hidden" name="Tool Kit: " value={this.state.kTool} className="hidden" />
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