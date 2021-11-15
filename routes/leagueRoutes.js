const requireLogin = require('../middlewares/requireLogin');
const axios = require('axios');
const keys = require('../config/keys');
const champions = require('../league-models/championIdToName.json');
const items = require('../league-models/itemIdToName.json');
const maps = require('../league-models/mapIdToName.json');
const spells = require('../league-models/spellIdToName.json');
const queues = require('../league-models/queueIdToName.json');

module.exports = (app) => {
    app.post('/api/league/summoner', async (req, res) => {
        console.log(req.body)

        try {
            const summoner = await axios.get(
                `${keys.baseURL}/summoner/v4/summoners/by-name/${req.body.summonerName}?api_key=${keys.leagueApiKey}`,
            );

            const matchList = await axios.get(
                `${keys.continentalBaseUrl}/match/v5/matches/by-puuid/${summoner.data.puuid}/ids?start=${
                    req.body.position
                }&count=${req.body.position + 10}&api_key=${keys.leagueApiKey}`,
            );

            const matchDetailsArray = [];
                
            for (let i = 0; i < matchList.data.length; i++) {
                const matchDetails = await axios.get(
                    `${keys.continentalBaseUrl}/match/v5/matches/${matchList.data[i]}?api_key=${keys.leagueApiKey}`,
                );
                matchDetailsArray.push(matchDetails.data);
            }

            const response = [];

            for (let i = 0; i < matchDetailsArray.length; i++) {
                let winningTeam = 100;
                if (matchDetailsArray[i].info.teams[1].win == 'Win') {
                    winningTeam = 200;
                }

                const match = {
                    selfName: req.body.summonerName,
                    mapId: matchDetailsArray[i].info.mapId,
                    mapName: maps[matchDetailsArray[i].info.mapId],
                    gameCreation: matchDetailsArray[i].info.gameCreation,
                    gameDuration: matchDetailsArray[i].info.gameDuration,
                    queueId: matchDetailsArray[i].info.queueId,
                    queueName: queues[matchDetailsArray[i].info.queueId],
                    winningTeam: winningTeam,
                    teamOneBans: matchDetailsArray[i].info.teams[0].bans,
                    teamTwoBans: matchDetailsArray[i].info.teams[1].bans,
                    teamOneTowers: matchDetailsArray[i].info.teams[0].objectives.tower.kills,
                    teamTwoTowers: matchDetailsArray[i].info.teams[1].objectives.tower.kills,
                    teamOneBarons: matchDetailsArray[i].info.teams[0].objectives.baron.kills,
                    teamTwoBarons: matchDetailsArray[i].info.teams[1].objectives.baron.kills,
                    teamOneDragons: matchDetailsArray[i].info.teams[0].objectives.dragon.kills,
                    teamTwoDragons: matchDetailsArray[i].info.teams[1].objectives.dragon.kills,
                    teamOneRiftHeralds: matchDetailsArray[i].info.teams[0].objectives.riftHerald.kills,
                    teamTwoRiftHeralds: matchDetailsArray[i].info.teams[1].objectives.riftHerald.kills,
                    participants: getParticipants(matchDetailsArray[i]),
                };

                response.push(match);
            }

            if (response.length > 0) {
                res.send(response);
            } else {
                res.status(404).send('No more matches was found.');
            }
        } catch (err) {
            console.log('POST: ', err.message);
            res.status(403).send(err);
        }
    });

    function getParticipants(match) {
        try {
            const arr = [];

            for (let i = 0; i < match.info.participants.length; i++) {

                const participant = {
                    teamId: match.info.participants[i].teamId,
                    championId: match.info.participants[i].championId,
                    championName: champions[match.info.participants[i].championId],
                    spell1: spells[match.info.participants[i].summoner1Id],
                    spell2: spells[match.info.participants[i].summoner2Id],
                    item0: match.info.participants[i].item0,
                    item1: match.info.participants[i].item1,
                    item2: match.info.participants[i].item2,
                    item3: match.info.participants[i].item3,
                    item4: match.info.participants[i].item4,
                    item5: match.info.participants[i].item5,
                    item6: match.info.participants[i].item6,
                    kills: match.info.participants[i].kills,
                    deaths: match.info.participants[i].deaths,
                    assists: match.info.participants[i].assists,
                    damage: match.info.participants[i].totalDamageDealtToChampions,
                    gold: match.info.participants[i].goldEarned,
                    largestMultiKill: match.info.participants[i].largestMultiKill,
                    champLevel: match.info.participants[i].champLevel,
                    minions:
                        match.info.participants[i].totalMinionsKilled +
                        match.info.participants[i].neutralMinionsKilled,
                    summonerName: match.info.participants[i].summonerName
                };
                arr.push(participant);
            }
            return arr;
        } catch (e) {
        }
    }

    app.post('/api/league/favorites', async (req, res) => {
        try {
            if (req.body.type === 'ADD') {
                req.user.favoriteSN.push(req.body.summonerName);
            } else if (req.body.type === 'REMOVE') {
                let tmpFavorites = [];
                req.user.favoriteSN.filter((sn) => {
                    !!(trimName(sn) !== trimName(req.body.summonerName)) ? tmpFavorites.push(sn) : false;
                });
                req.user.favoriteSN = tmpFavorites;
            } else {
                console.log('TYPE NOT SUPPORTED');
            }
            const user = await req.user.save();
            res.send(user);
        } catch (e) {
            res.status(400).send('400 - Something went wrong. Please try again');
        }
    });

    function trimName(sn) {
        const tmpName = decodeURI(sn).toLowerCase().replace(' ', '');

        return tmpName;
    }
};
