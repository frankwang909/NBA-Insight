import React, {Component} from 'react';
import { Slider, InputNumber, Row, Col } from 'antd';

class CountSlider extends Component {
    state = {
        inputValue: this.props.value
    };

    onChange = (value) => {
        const cleanValue = Number(value) ? value : this.state.inputValue;
        this.setState({
            inputValue: cleanValue || 2
        });
        this.props.onCountSliderChange(cleanValue);
    };

    formatter= (value) => {
        return `Shot made times \u2265 ${value}.`;
    };

    render() {
        return (
            <Row>
                <Col span={12}>
                    <Slider tipFormatter={this.formatter} min={1} max={20} onChange={this.onChange} value={this.state.inputValue} />
                </Col>
                <Col span={2}>
                    <InputNumber
                        min={1}
                        max={20}
                        style={{ marginLeft: 10, width: 60}}
                        value={this.state.inputValue}
                        onChange={this.onChange}
                    />
                </Col>
            </Row>
        );
    }
}

export default CountSlider;