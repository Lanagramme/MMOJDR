require "collision"
require "input"
require "player"
require 'coin'
require "utils"
require 'assets'

function love.load()
  Score= 0
  SetSprite(Player, Demo_sprite, 2, 0, 3, 1)

end

function love.update(dt)
  LoadCoins()
  Input(Player)
  Animate(dt, Player, Player.direction)

end

function love.draw()
  local originalColor = {love.graphics.getColor()}

  love.graphics.setBackgroundColor(BetterColor(125, 150, 150))

  DisplayCoins(originalColor) 
  Player.draw()

  love.graphics.print("SCORE: " .. Score, 10, 10)
end
