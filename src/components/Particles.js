import React, {Component} from 'react';
import {FastLayer} from "react-konva";

export default class Particles extends Component {
    _particles = {};
    layerRef = React.createRef();

    componentDidMount() {
        this.canvas = this.layerRef.current.canvas._canvas;
        this.canvasContext = this.canvas.getContext('2d');

        this.sprite = new Image();
        this.sprite.src = 'http://i.imgur.com/m5l6lhr.png'
    }

    drawParticle(particle) {
        let {x,y} = particle;

        this.canvasContext.drawImage(this.sprite, 0, 0, 128, 128, x, y, 15, 15);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        let particles = this.props.particles;

        console.time('drawing');
        this.canvasContext.clearRect(
            0,
            0,
            this.canvas.width,
            this.canvas.height
        );

        this.canvasContext.lineWidth = 1;
        this.canvasContext.strokeStyle = 'black';

        for(let i = 0; i < particles.length; i++) {
            this.drawParticle(particles[i]);
        }

        console.timeEnd('drawing');
    }

    render() {
        return (
            <FastLayer ref={this.layerRef} listening={'false'} />
        );
    }
}
