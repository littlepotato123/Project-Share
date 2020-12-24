import React, { Component } from 'react';

class LayoutComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: sessionStorage.getItem('layout'),
            styles: null,
        };
    }

    componentDidMount() {
        if(this.props.id == this.state.id) {
            this.setState({
                ...this.state,
                styles: {
                    backgroundColor: 'blue'
                }
            })
        }
    }

    click = () => {
        window.location.reload(false);
        sessionStorage.setItem('curr_layout', this.props.id);
        console.log(sessionStorage.getItem('curr_layout'))
    }

    render() {
        return (
            <div onClick={this.click} style={this.state.styles}>
                {this.props.id} <br />
                {this.props.title} <br />
                {
                    this.props.info.map(i => {
                        return (
                            <div>
                                {i.title} <br />
                                {i.checked.toString()}
                            </div>
                        )
                    })
                }
            </div>
        )
    }
};

export default LayoutComponent;