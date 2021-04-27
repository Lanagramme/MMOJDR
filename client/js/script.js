    //mobile debugger
    const cl = console.log;

    //canvas data
    const ctx  = document.getElementById('ctx').getContext("2d");
    HEIGHT = window.innerHeight;
    WIDTH  = window.innerWidth ;

    ctx.canvas.width = window.innerWidth
    ctx.canvas.height = window.innerHeight
 
    //sprites data
    var Direction = "down"
    const pixel_size = 2
    const sprite_size = 50
    const player_size = 100
    const assets = {}
    assets.player = new Image(); assets.player.src = '/client/img/Girl_sprite.png'
//    assets.player = new Image(); assets.player.src = '/client/img/Demo_sprite2.png'
    assets.shadow = new Image(); assets.shadow.src = '/client/img/Shadow_sprite.png'
    assets.entity = new Image(); assets.entity.src = '/client/img/Demo_sprite.webp'
//    assets.map    = new Image(); assets.map.src    = '/client/img/Demo_map.webp'
    assets.map    = new Image(); assets.map.src    = '/client/img/carte1.png'

    //socket actions
    const socket = io()    
    var player_id = null
    socket.on('init', (data) => { player_id = data.id })
      //frame data
      socket.on('newPositions', (data) => {
         if (!player_id) return;
         renderFrame(data) }
      )
      
      function renderFrame(data){
      //reset canvas
      ctx.clearRect(0,0,window.innerWidth,window.innerHeight)
      //anti-aliasing
      ctx.imageSmoothingEnabled = false;
      //define player
      const player = data.find(x => x.color == 'red')
      //map render from player POV
      ctx.drawImage(assets.map,
        0,0,assets.map.width,assets.map.height,
        WIDTH/2-player.x,HEIGHT/2-player.y,
        assets.map.width*pixel_size, assets.map.height*pixel_size)
      //render player at the center of the screen
        let Height = assets.player.height/4
        
        switch (Direction) {
          case 'up':
            faces = Height*2
            break;
          case 'down':
            faces = 0
            break;
           case 'left':
            faces = Height*3
            break;
          case 'right':
            faces = Height
            break;       
        }
        ctx.drawImage(assets.shadow,
          0,0, assets.shadow.width, assets.shadow.height,
          WIDTH/2-assets.shadow.width/2*pixel_size, HEIGHT/2-assets.shadow.height/2*pixel_size,
          assets.shadow.width*pixel_size, assets.shadow.height*pixel_size
        )
        ctx.drawImage(assets.player, 
          assets.player.width/4,faces, assets.player.width/4, assets.player.height/4,
          WIDTH/2-25,HEIGHT/2-64+3,
          assets.player.width/4,assets.player.height/4 
        )
        ctx.fillStyle = 'red'
        ctx.fillRect(WIDTH/2,HEIGHT/2,2,2)
      
      //render the other players
      for(var i = 0; i < data.length; i++){
        if (data[i].color == 'red') continue
        [x, y, number, color] = [data[i].x, data[i].y, number = data[i].number, data[i].color]
        ctx.fillStyle = color  ; 
        ctx.fillRect( WIDTH/2-player.x+x-sprite_size/2,HEIGHT/2-player.y+y-sprite_size/2, sprite_size, sprite_size )
      }
    }

    //Responsive canvas
    window.addEventListener('resize', ()=>{ 
          ctx.canvas.width = window.innerWidth
          ctx.canvas.height = window.innerHeight
        }, false)

    //keyboard interaction
    const keys = { 38: "up", 37: "left", 39: "right", 40: "down" }
    
    document.addEventListener('keydown', event =>{
      socket.emit('keypress', {inputId: keys[event.which], state: true})
      Direction = keys[event.which]
    })
    document.addEventListener('keyup', event =>{
      socket.emit('keypress', {inputId: keys[event.which], state: false})
    })


