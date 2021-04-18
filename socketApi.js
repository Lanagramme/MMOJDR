const
  socketApi = { 
    io: require( "socket.io" )()
  },
  socket_list = {}


  class Entity {
      constructor(id){
      this.id
      this.x = 0
      this.y = 0
      this.spdX = 0
      this.spdY = 0
    }
    update(){ this.updatePosition() }
    updatePosition(){
      this.x += this.spdX
      this.y += this.spdY
    }
  }

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
      else if( this.pressingDown ) this.spdY = this.maxSpeed
      else this.spdY = 0
      if( this.pressingRight ) this.spdX = this.maxSpeed
      else if( this.pressingLeft ) this.spdX = -this.maxSpeed
      else this.spdX = 0
    }
  }
    Player.list = {}
    Player.onConnect = (socket) => {
      const player = new Player(socket.id)
      socket.on('keypress', (data)=> {
      if(data.inputId == 'up' ) player.pressingUp = data.state
    else if(data.inputId == 'down' ) player.pressingDown = data.state
    else if(data.inputId == 'left' ) player.pressingLeft = data.state
    else if(data.inputId == 'right') player.pressingRight = data.state
  })

  socket.emit('init', { id:socket.id })
  }
    Player.onDisconnect = (socket) => {
      delete Player.list[socket.id]
    }
    Player.update = () =>{
      // liste mise à jour des joueurs
      const pack = []
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

  socketApi.io.sockets.on('connection', (socket) => {
      // connection
      socket.id = Math.random()
      socket_list[socket.id] = socket

  console.log('Nouvelle connection :: ' + socket.id)
    Player.onConnect(socket)
    socket.on('disconnect',() => {
      delete socket_list[socket.id]
      Player.onDisconnect (socket)
      console.log(socket.id + " :: déconnecté")
  })
  })
    setInterval(()=>{
      pack = Player.update()
      for (i in socket_list) {
      let socket = socket_list[i]
      for (j of pack){
      if (j.number == Player.list[i].number) j.color = "red"
    else j.color = "blue"
  }
    socket.emit('newPositions', pack)
  }
  }, 1000/25)

  // collision tests

  function testCollisionBetweenPoints(A,B){
      const vx = A.x - B.x
      const vy = A.y - B.y
      distance = Math.sqrt(vx*vx+vy*vy)
      return distance < 10
    }

  rect = {
      height: 30,
      width:30,
      x: Entity.x-this.width/2,
      y: Entity.y-this.height/2,
    }

  function testCollisionBetweenEntities(A,B){
      return A.x <= B.x + B.width
      && B.x <= A.x + A.width
      && A.y <= B.y + B.height
      && B.y <= A.y + A.height
    }


module.exports = socketApi;