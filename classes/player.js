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
     if( this.pressingUp ) this.spdY = -this.maxSpeed
     else if( this.pressingDown ) this.spdY =  this.maxSpeed
     else this.spdY = 0
     if( this.pressingRight ) this.spdX =  this.maxSpeed
     else if( this.pressingLeft ) this.spdX = -this.maxSpeed
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