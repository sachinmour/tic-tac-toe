import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { changeStatus } from '../actions';
import _ from 'lodash';

class Board extends Component {
    constructor(props) {
        super(props);
        this.state = {
            owner: _.times(3, () => (
                _.times(3, () => null)
            ))
        };
    }

    setOwner(row, col) {
        const newState = this.state;
        if (!newState.owner[row][col]) {
            newState.owner[row][col] = this.props.turn;
            this.setState(newState);
            if (this.props.handleCount(row, col)) {
                this.props.switchTurn();
            }
        }
    }

    reset() {
        this.setState({
            owner: _.times(3, () => (
                _.times(3, () => null)
            ))
        });
        this.props.changeStatus('newGame');
        this.props.resetCount();
    }

    renderBoxes() {
        const { owner } = this.state;
        const { turn } = this.props;
        return _.times(9, (i) => {
            const row = Math.floor(i / 3);
            const col = i % 3;
            const boxOwner = owner[row][col];
            let boxClass;
            if (boxOwner) {
                boxClass = `boxWrapper--box boxWrapper--${boxOwner}-set-marker`;
            } else {
                boxClass = `boxWrapper--box boxWrapper--${turn}-marker`;
            }
            return (<div key={i} onClick={() => this.setOwner(row, col)} className={boxClass} />);
        });
    }

    renderStatus() {
        const { status, turn } = this.props;
        let message;
        switch (status) {
            case 'won':
                message = `${turn.toUpperCase()} won!`;
                break;
            case 'draw':
                message = 'It\'s a draw!';
                break;
            default:
                message = null;
        }
        if (message) {
            return (
                <div className='boxWrapper--status'>
                    <h3 className='boxWrapper--status--msg'>{message}</h3>
                    <div className='boxWrapper--status--restart' onClick={() => this.reset()}>New Game</div>
                </div>
            );
        }
        return null;
    }

    render() {
        return (
            <div className='boxWrapper'>
                {this.renderBoxes()}
                {this.renderStatus()}
            </div>
        );
    }
}

Board.propTypes = {
    turn: React.PropTypes.string,
    handleCount: React.PropTypes.func,
    switchTurn: React.PropTypes.func,
    status: React.PropTypes.string,
    changeStatus: React.PropTypes.func,
    resetCount: React.PropTypes.func
};

const mapStateToProps = (state) => ({
    status: state.status
});

const mapDispatchToProps = (dispatch) => (
    bindActionCreators({
        changeStatus
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Board);
