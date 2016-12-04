import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

export default class SignUpButtonGroup extends React.Component {

    static propTypes = {
        currentPage: React.PropTypes.number.isRequired,
        totalPages: React.PropTypes.number.isRequired,
        nextLabel: React.PropTypes.string,
        onPrev: React.PropTypes.func.isRequired,
        onCancel: React.PropTypes.func.isRequired,
        onNext: React.PropTypes.func.isRequired
    };

    static defaultProps = {
        nextLabel: 'Next'
    };

    render() {
        return (
            <div>
                <div style={{marginTop: '12px'}}>
                    <RaisedButton
                        primary={this.props.currentPage !== 1}
                        disabled={this.props.currentPage === 1}
                        label='Prev'
                        style={{marginRight: '12px'}}
                        onTouchTap={this.props.onPrev}
                    />
                    <RaisedButton
                        secondary
                        label='Cancel'
                        style={{marginRight: '12px'}}
                        onTouchTap={this.props.onCancel}
                    />
                    <RaisedButton
                        primary
                        label={this.props.nextLabel}
                        onTouchTap={this.props.onNext}
                    />
                </div>
                <div style={{marginTop: '12px', textAlign: 'center'}}>
                    {'Page ' + this.props.currentPage + ' of ' + this.props.totalPages}
                </div>
            </div>
        );
    }
}