// figure out what we can do using the state object
// state.Map.Rows contains the level information

// todo: (prioritise closest alien)calculate the number of moves the 'closest' alien ship needs to get to your closest asset
// determine 'closest' alien
// determine move to hit/shoot alien with missile (aliens move sideways)
// determine move to avoid incoming missile (if no missiles available)

// todo: (prioritise incoming fire)calculate the number of moves the 'closest' ai bot missile needs to hit your closest assets
// determine 'closest' fire
// determine move to hit/shoot incoming enemy missile (missile moves straight)
// predict if enemy fire will clear or hit an alien

// when priority move is determined - store it - then execute move

module.exports = {
  getMove: function(st, m){
    var state = st;
    var map = m;
    var move = 'Nothing';

    if(this.missileLimitReached() === false){
        //calculate if fire is possible?
        return 'Shoot';
    }else{
        return 'Nothing';
    }
  },
  missileLimitReached: function(){
      return false;
  },
  livesLeft: function(){
      return 1;
  }
};
