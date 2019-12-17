import React, {Component} from 'react';

import {AutoComplete, Input, Icon} from 'antd';
import nba from 'nba';
import {PROFILE_PIC_URL_PREFIX} from '../constants';

const {Option} = AutoComplete;

class SearchBar extends Component {
    state = {
        dataSource: [],
    };

    onSelect = (playerName) => {
        this.props.loadPlayerInfo(playerName);
    };

    handleSearch = (value) => {
        // console.log(value);

        this.setState({
            dataSource: !value ?
                [] : nba.searchPlayers(value).map(player => ({
                    fullName: player.fullName,
                    playerId: player.playerId,
                }))
        });
    };

    render() {
        const {dataSource} = this.state;
        const options = dataSource.map((player) => (
            <Option key={player.fullName} value={player.fullName} className="player-option">
                <img className="player-option-image" src={`${PROFILE_PIC_URL_PREFIX}/${player.playerId}.png`}
                     alt="Profile"/>
                <span className="player-option-label">{player.fullName}</span>
            </Option>
        ));

        return (
            <AutoComplete
                className="search-bar"
                size="large"
                placeholder="Search NBA players here"
                optionLabelProp="value"
                onSelect={this.onSelect}
                onSearch={this.handleSearch}
                dataSource={options}
            >
                <Input suffix={<Icon type="search" className="certain-category-icon"/>}/>
            </AutoComplete>
        );
    }
}

export default SearchBar;