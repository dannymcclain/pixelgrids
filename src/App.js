import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 1200,
      columns: 12,
      minGutter: 0,
      marginRatio: 0,
      gridLayout: [],
      calculated: false
    };
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
        const grid = { column: columnWidth, gutter: gutter, margin: margin };
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
        <h1>Pixel Grids</h1>
        <main>
          <div className="inputWrap">
            <label>Total Width</label>
            <input
              type="number"
              name="width"
              value={this.state.width}
              onChange={this.handleChange}
              onBlur={this.findGrids}
              min="1"
            />
          </div>
          <div className="inputWrap">
            <label>Columns</label>
            <input
              type="number"
              name="columns"
              value={this.state.columns}
              onChange={this.handleChange}
              onBlur={this.findGrids}
              min="1"
            />
          </div>
          <div className="inputWrap">
            <label>Minimum Gutter</label>
            <input
              type="number"
              name="minGutter"
              value={this.state.minGutter}
              onChange={this.handleChange}
              onBlur={this.findGrids}
            />
          </div>
          <div className="inputWrap">
            <label>Outter Margin Ratio</label>
            <select
              name="marginRatio"
              value={this.state.marginRatio}
              onChange={this.handleChange}
              onBlur={this.findGrids}
            >
              <option value="0">0</option>
              <option value="0.5">0.5</option>
              <option value="1">1</option>
              <option value="1.5">1.5</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </div>
        </main>
        <section className="grid-layouts">
          {this.state.gridLayout.length > 0
            ? this.state.gridLayout.map(({ column, gutter, margin }) => {
                return (
                  <div className="layout">
                    <p>
                      {column}, {gutter}, {margin}
                    </p>
                  </div>
                );
              })
            : this.state.calculated && (
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
