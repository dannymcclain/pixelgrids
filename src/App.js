import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 1200,
      columns: 12,
      minGutter: 20,
      marginRatio: 0,
      gridLayout: [],
      calculated: false
    };
  }
  componentDidMount() {
    this.findGrids();
    document.addEventListener('keydown', event => {
      if (event.code === 'Enter') {
        this.findGrids();
      }
    });
  }


componentWillUnmount() {
  document.addEventListener('keydown');
}

  handleChange = event => {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  };

  findGrids = () => {
    const getWidth = gutter => {
      return this.state.width - 2 * this.state.marginRatio * gutter;
    };
    const getColumnWidth = gutter => {
      return (
        (getWidth(gutter) - (this.state.columns - 1) * gutter) /
        this.state.columns
      );
    };
    let gutter = parseInt(this.state.minGutter);
    let columnWidth = getColumnWidth(gutter);
    let margin = this.state.marginRatio * gutter;
    let gridLayout = [];
    while (gutter < columnWidth) {
      columnWidth = getColumnWidth(gutter);
      margin = this.state.marginRatio * gutter;
      if (columnWidth % 1 === 0) {
        const grid = { column: columnWidth, gutter: gutter, margin: margin, columns: this.state.columns };
        gridLayout.push(grid);
      }
      gutter++;
    }
    this.setState({
      gridLayout,
      calculated: true
    });
  };

  render() {
    return (
      <div className="App">
        <h1><span class="number-of-grids">{this.state.gridLayout.length}</span> Pixel Grids</h1>
        <section className="grid-inputs">
          <div className="input-wrap">
            <label>Total Width</label>
            <input
              type="number"
              name="width"
              value={this.state.width}
              onChange={this.handleChange}
              min="1"
            />
          </div>
          <div className="input-wrap">
            <label>Columns</label>
            <input
              type="number"
              name="columns"
              value={this.state.columns}
              onChange={this.handleChange}
              min="1"
            />
          </div>
          <div className="input-wrap">
            <label>Minimum Gutter</label>
            <input
              type="number"
              name="minGutter"
              value={this.state.minGutter}
              onChange={this.handleChange}
            />
          </div>
          <div className="input-wrap">
            <label>Outter Margin Ratio</label>
            <select
              name="marginRatio"
              value={this.state.marginRatio}
              onChange={this.handleChange}
            >
              <option value="0">0</option>
              <option value="0.5">0.5</option>
              <option value="1">1</option>
              <option value="1.5">1.5</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </div>
          <button onClick={this.findGrids}>Calculate</button>
        </section>
        <section className="grid-layouts">
        {/* <h2>{this.state.gridLayout.length} grids</h2> */}
          {this.state.gridLayout.length > 0
            ? this.state.gridLayout.map(({ columns, column, gutter, margin }) => {
                return (
                  <div className="layout" key={'Layout '+ column}>
                  <div className="specs">
                  <p>Column: <span className="value-text">{column}</span></p>
                  <p>Gutter: <span className="value-text">{gutter}</span></p>
                  <p>Margin: <span className="value-text">{margin}</span></p>
                  </div>
                      <div className="grid-preview">
                        <div className="margin" style={{width: margin + 'px'}}></div>
                          {
                            [...Array(parseInt(columns))].map((_, index) => {
                              return (
                              <React.Fragment key={`Column${index}`}>
                              <div className="column" style={{width: column + 'px'}}></div>
                              {columns-1 > index && <div className="gutter" style={{width: gutter + 'px'}}></div>}
                              </React.Fragment>
                            )})
                            
                          }
                        <div className="margin" style={{width: margin + 'px'}}></div>
                        </div>

                  </div>
                );
              })
            : (
                <div>
                  <p>No grid layouts. Bummer</p>
                </div>
              )}
        </section>
      </div>
    );
  }
}

export default App;
