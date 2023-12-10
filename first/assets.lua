local function newSprite(path)
  local sprite = love.graphics.newImage(path)
  sprite:setFilter("nearest", "nearest")
  return sprite
end

Demo_sprite = newSprite("assets/sprites/characters/Demo_sprite2.png")
