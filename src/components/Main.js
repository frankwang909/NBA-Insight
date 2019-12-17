import React, {Component} from 'react';

import nba from "nba"

import Profile from "./Profile";
import DataViewContainer from "./DataViewContainer";
import SearchBar from "./SearchBar";
import { DEFAULT_PLAYER_INFO} from "../constants";

class Main extends Component {
    state = {
        playerInfo: DEFAULT_PLAYER_INFO,
    };

    componentDidMount() {
        console.log(this.state.playerId);
        this.loadPlayerInfo(this.state.playerInfo.fullName)
    }

    loadPlayerInfo = (playerName) => {
        nba.stats.playerInfo({ PlayerID: nba.findPlayer(playerName).playerId }).then((info) => {
            const playerInfo = Object.assign(info.commonPlayerInfo[0], info.playerHeadlineStats[0]);
            this.setState({ playerInfo });
            console.log(this.state.playerInfo)
        });

    };

    handleSelectPlayer = (playerName) => {
        this.loadPlayerInfo(playerName);
    };


    render() {
        return (
            <div className="main">
                <SearchBar loadPlayerInfo={this.handleSelectPlayer}/>
                <div className="player">
                    <Profile playerInfo={this.state.playerInfo}/>
                    <DataViewContainer playerId={this.state.playerInfo.playerId}/>
                </div>
            </div>
        );
    }
}

export default Main;