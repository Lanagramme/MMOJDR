function Input(object)
  object.moving = 0
  local speed = 3
  local x = 0
  local y = 0

  if love.keyboard.isDown("d") then
    x = 1
    object.direction = "right"
    object.moving = 1
  elseif love.keyboard.isDown("q") then
    x = -1
    object.direction = "left"
    object.moving = 1
  end

  if love.keyboard.isDown("z") then
    y = -1
    object.direction = "up"
    object.moving = 1
  elseif love.keyboard.isDown("s") then
    y = 1
    object.direction = "down"
    object.moving = 1
  end

  if love.keyboard.isDown("lshift") then
    speed = 5
    object.animate.frameDuration = 0.1
  else
    object.animate.frameDuration = 0.2
  end

  if x ~= 0 and y ~= 0 then
    speed = math.sqrt(speed * speed / 2)
  end


  object.x = object.x + x*speed
  object.y = object.y + y*speed
end
