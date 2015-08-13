var mapLoader = require('./map'),
    moment = require('moment'),
    stateLoader = require('./state'),
    util = require('./util'),
    bot = require('./bot');

module.exports = main;

function main(outputPath) {
    var startTime = moment();
    util.log('Started.');

    var state = stateLoader.load(outputPath);
    logPlayersState(state);

    var map = mapLoader.load(outputPath);
    logMap(map);

    //var move = getRandomMove(); // this is where we need to figure out how best to move
    var move = bot.getMove(state, map);
// priority object
/**

**/

/** logic tree

// can shoot (missileLimitReached?)
targeting opportities (prioritised)

// can build? (hasLivesLeft?)
Building priorities (priorities)

// movement required?
'may need to move to build or move to avoid fire'
**/

/**
util functions

TARGETING FUNCTIONS:
decide what is weakest target (easiest , last amount of moves and least amount of turns) --- using the following util functions
calc where to shoot in order to hit moving alien
* hit alien factory
* hit missile controller
    *** include priorities that show least amount of shields --- and calculate if aliens will cross paths

BUILDING FUNCTIONS:
decide what is fastest bonus to build (static build priority list)


// build list:
1. Missile Controller
2. Alien Factory

DEFENSE CONSIDERATIONS:
'when to build shields'
note that shields block all bullets,missiles and aliens (even yours i suppose)
and
'when to move to avoid enemy fire'
**/


    util.outputMove(move, outputPath, function() {
        var endTime = moment();
        var runTime = endTime.diff(startTime);
        util.log('Finished in ' + runTime + 'ms.');
    });
}

function logPlayersState(state) {
    if (state === null) {
        util.logError('Failed to load state.');
        return;
    }

    util.log('Game state:')
    util.log('\tRound: ', state.RoundNumber);

    for (var i = 0; i < state.Players.length; i++) {
        logPlayerState(state.Players[i]);
    }
}

function logPlayerState(player) {
    var playerName = '\tPlayer ' + player.PlayerNumberReal + ' (' + player.PlayerName + ')';

    util.log(playerName, '\tKills:', player.Kills);
    util.log(playerName, '\tLives: ', player.Lives);
    util.log(playerName, '\tMissiles:', player.Missiles.length, '/', player.MissileLimit);
}

function logMap(map) {
    if (map === null) {
        util.logError('Failed to load map.');
    }

    util.log('Map:\n' + map.text);
}

function getRandomMove() {
    var moves = [
        'Nothing',
        'MoveLeft',
        'MoveRight',
        'Shoot',
        'BuildShield',
        'BuildAlienFactory',
        'BuildMissileController'
    ];

    return moves[util.randomInt(0, moves.length)];
}
