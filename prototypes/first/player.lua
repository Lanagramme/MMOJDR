  Player = {
    x = 50,
    y = 300,
    w = 85,
    h = 100,
    direction = "down",
    moving = 0,
    animate = {
      frame = 0,
      frameDuration = 0.2,
      timer = 0,
      go = {
        up = {},
        down = {},
        left = {},
        right = {},
      }
    }
  }


  function Animate(dt, object, animation)
    if object.moving == 0 then
      return
    end
    local frameDuration = object.animate.frameDuration
    object.animate.timer = object.animate.timer + dt

    if object.animate.timer >= frameDuration then
        object.animate.timer = object.animate.timer - frameDuration
        object.animate.frame = object.animate.frame + 1
    end

    if object.animate.frame == #object.animate.go[animation] then
      object.animate.frame = 0
    end
  end

  function SetSprite(object, sprite, up, down, left, right)
    object.spriteSheet = sprite
    object.spriteSheet:setFilter("nearest", "nearest")
    local height = object.spriteSheet:getHeight() / 4
    local width = object.spriteSheet:getWidth() / 4

    object.w = width *2
    object.h = height *2

    local function setAnimation(animationName, index)
        for x = 0, 4, 1 do
          object.animate.go[animationName][x] = love.graphics.newQuad(
            width * x, height * index,
            width, height -1,
            object.spriteSheet:getDimensions())
        end
    end

    setAnimation("up", up)
    setAnimation("down", down)
    setAnimation("left", left)
    setAnimation("right", right)

  end

  function Player.draw()
    love.graphics.draw(Player.spriteSheet, Player.animate.go[Player.direction][Player.animate.frame], Player.x, Player.y, 0 , 2, 2)
  end
