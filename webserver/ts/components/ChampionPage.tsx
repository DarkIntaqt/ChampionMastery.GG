import * as React from "react";
import {ReactNode} from "react";
import {CommonDataProps} from "./Layout";
import {ordinalize} from "../utils";
import Champion from "../Champion";
import {CommonData} from "../server";
import {Highscore} from "../apiHandler";
import ResponsiveAd from "./ResponsiveAd";

export default class ChampionPage extends React.Component<ChampionProps> {
	public render(): ReactNode {
		return (<React.Fragment>
			<h1>
				<img id="championIcon"
					 src={`${this.props.commonData.dragonUrl}/img/championIcons/${this.props.champion.icon}`}/>
				<span>{this.props.champion.getLocalizedName(this.props.commonData.T)}</span>
			</h1>
			<div id="container">
				<table className="well">
					<thead>
					<tr>
						<th>{this.props.commonData.T["Rank"]}</th>
						<th>{this.props.commonData.T["Summoner name"]} ({this.props.commonData.T["Region"]})</th>
						<th>{this.props.champion.id === -2 ? this.props.commonData.T["Total level"] : this.props.commonData.T["Mastery points"]}</th>
					</tr>
					</thead>
					<tbody>
					{this.props.scores.map((score: Highscore, index: number) =>
						<tr key={index}>
							<td>
								{ordinalize(index + 1, this.props.commonData.T)}
							</td>
							<td>
								<SummonerLink summonerName={score.name}
											  regionId={score.region}
											  commonData={this.props.commonData}/>
							</td>
							<td data-format-number={score ? score.points : 0}>
								{score ? score.points : 0}
							</td>
						</tr>
					)}
					</tbody>
				</table>
			</div>

			{/*CMGG/champion-footer-responsive*/}
			<ResponsiveAd adSlot={6258924078}/>
		</React.Fragment>);
	}
}

// TODO can this be reused on home?
function SummonerLink(props: { summonerName: string, regionId: string, commonData: CommonData }) {
	if (!props.summonerName) {
		return <a className="internalLink" href="/privacy">
			[{props.commonData.T["HIDDEN"]}] ({props.regionId})
		</a>;
	}

	return <a className="internalLink"
			  href={`/summoner?summoner=${encodeURIComponent(props.summonerName)}&region=${props.regionId}`}>
		{props.summonerName} ({props.regionId})
	</a>;
}

interface ChampionProps extends CommonDataProps {
	champion: Champion;
	scores: Highscore[];
}
