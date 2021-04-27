    //mobile debugger
    const cl = console.log;

    //canvas data
    const ctx  = document.getElementById('ctx').getContext("2d");
    HEIGHT = window.innerHeight;
    WIDTH  = window.innerWidth ;

    ctx.canvas.width = window.innerWidth
    ctx.canvas.height = window.innerHeight
 
    //sprites data
    const sprite_size = 50
    const player_size = 100
    const assets = {}
    assets.player = new Image(); assets.player.src = '/client/img/Demo_sprite.webp'
    assets.shadow = new Image(); assets.shadow.src = '/client/img/Shadow_sprite.webp'
    assets.entity = new Image(); assets.entity.src = '/client/img/Demo_sprite.webp'
    assets.map    = new Image(); assets.map.src    = '/client/img/Demo_map.webp'

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
        800,800)
      //render player at the center of the screen
      ctx.drawImage(assets.player, 
        0, 0, assets.player.width/4, assets.player.height/4,
       WIDTH/2-player_size/2,HEIGHT/2-player_size/2,
        player_size,player_size 
      )
      
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
    })
    document.addEventListener('keyup', event =>{
      socket.emit('keypress', {inputId: keys[event.which], state: false})
    })


