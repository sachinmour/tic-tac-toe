import React, { Component } from 'react';
import Board from './board';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { changeStatus } from '../actions';

class Game extends Component {

    constructor(props) {
        super(props);
        this.totalSteps = 0;
        this.count = {
            x: {
                row: [0, 0, 0],
                col: [0, 0, 0],
                dia: 0,
                antidia: 0
            },
            o: {
                row: [0, 0, 0],
                col: [0, 0, 0],
                dia: 0,
                antidia: 0
            }
        };
        this.defaultCount = _.cloneDeep(this.count);
        this.state = {
            turn: 'x'
        };
    }

    resetCount() {
        this.setState({
            turn: 'x'
        });
        this.totalSteps = 0;
        this.count = _.cloneDeep(this.defaultCount);
    }

    switchTurn(turn) {
        this.setState({
            turn: turn === 'x' ? 'o' : 'x'
        });
    }

    handleCount(row, col) {
        const { turn } = this.state;
        const count = this.count[turn];
        count.row[row] += 1;
        count.col[col] += 1;
        if (row === col) {
            count.dia += 1;
        }
        if (row + col === 2) {
            count.antidia += 1;
        }
        this.totalSteps += 1;
        if (count.row[row] === 3 || count.col[col] === 3 || count.dia === 3 || count.antidia === 3) {
            this.props.changeStatus('won');
            return false;
        }
        if (this.totalSteps === 9) {
            this.props.changeStatus('draw');
        }
        return true;
    }

    render() {
        const { turn } = this.state;
        return (
            <Board
                turn={turn}
                switchTurn={() => this.switchTurn(turn)}
                handleCount={(row, col) => this.handleCount(row, col)}
                resetCount={() => this.resetCount()}
            />
        );
    }
}

const mapDispatchToProps = (dispatch) => (
    bindActionCreators({
        changeStatus
    }, dispatch)
);

export default connect(null, mapDispatchToProps)(Game);

Game.propTypes = {
    changeStatus: React.PropTypes.func
};
