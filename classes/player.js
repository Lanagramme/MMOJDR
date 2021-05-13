const { Entity } = require('./entity.js')

class Player extends Entity{
   constructor(id,x,y){
     super(id,x,y)
     this.pressingUp = false
     this.pressingDown = false
     this.pressingLeft = false
     this.pressingRight = false
     this.number = Math.floor(Math.random() * 100)
     this.maxSpeed = 10
  
     Player.list[id] = this
   }
  
   update(){
     this.updateSpeed()
     super.update()
   }
   
   updateSpeed(){
     let speed = (( this.pressingUp || this.pressingDown ) && (this.pressingLeft || this.pressingRight)) ? this.maxSpeed / 4 * 2.5 : this.maxSpeed 
     if( this.pressingUp ) this.spdY = -speed
     else if( this.pressingDown ) this.spdY = speed
     else this.spdY = 0
     if( this.pressingRight ) this.spdX =  speed
     else if( this.pressingLeft ) this.spdX = -speed
     else this.spdX = 0
   }
}

Player.list = {}
Player.onConnect = (socket) => {
  var player = new Player(socket.id)
  socket.on('keypress', (data)=> {
    if(data.inputId == 'up'   ) player.pressingUp    = data.state
    else if(data.inputId == 'down' ) player.pressingDown  = data.state
    else if(data.inputId == 'left' ) player.pressingLeft  = data.state
    else if(data.inputId == 'right') player.pressingRight = data.state
   })

   socket.emit('init', { id:socket.id })
}
Player.onDisconnect = (socket) => {
  delete Player.list[socket.id]
}
Player.update = () =>{
  // liste mise à jour des joueurs
  var pack = []
  for (i in Player.list) {
    player = Player.list[i]
    player.update()
    pack.push({
      x : player.x,
      y : player.y,
      number : player.number
    })
  }
  return pack
}

module.exports = { Player }
