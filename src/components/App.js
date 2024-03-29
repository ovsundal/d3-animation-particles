import React, { Component } from 'react';
import { select as d3Select, mouse as d3Mouse, touches as d3Touches } from 'd3';

import Particles from './Particles';
import Footer from './Footer';
import Header from './Header';
import {Stage} from "react-konva";

class App extends Component {
  svgWrap = React.createRef();

  componentDidMount() {
    let svg = d3Select(this.svgWrap.current);

    svg.on('mousedown', () => {
      this.updateMousePos();
      this.props.startParticles();
    });
    svg.on('touchstart', () => {
      this.updateTouchPos();
      this.props.startParticles();
    });
    svg.on('mousemove', () => {
      this.updateMousePos();
    });
    svg.on('touchmove', () => {
      this.updateTouchPos();
    });
    svg.on('mouseup', () => {
      this.props.stopParticles();
    });
    svg.on('touchend', () => {
      this.props.stopParticles();
    });
    svg.on('mouseleave', () => {
      this.props.stopParticles();
    });
  }

  updateMousePos() {
    let [x, y] = d3Mouse(this.svgWrap.current);
    this.props.updateMousePos(x, y);
  }

  updateTouchPos() {
    let [x, y] = d3Touches(this.svgWrap.current)[0];
    this.props.updateMousePos(x, y);
  }

  render() {
    return (
        <div
            onMouseDown={e => this.props.startTicker()}
            style={{ overflow: "hidden" }}
        >
          <Header />
          <div
              style={{
                width: this.props.svgWidth,
                height: this.props.svgHeight,
                position: 'absolute',
                top: '0px',
                left: '0px',
                background: 'rgba(124, 224, 249, .3'
              }}
              ref={this.svgWrap}
          >
            <Stage
                width={this.props.svgWidth}
                height={this.props.svgHeight}
            >
              <Particles particles={this.props.particles} />
            </Stage>
          </div>
          <Footer N={this.props.particles.length} />
        </div>

    );
  }
}

export default App;
