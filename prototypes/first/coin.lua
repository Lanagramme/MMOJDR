math.randomseed(os.time())
Coins = {}

function NewCoin()
    local coin = {}
    coin.w = 50
    coin.h = 50
    coin.x = math.random(0, 800-coin.w)
    coin.y = math.random(0, 600-coin.h)
    return coin
end

function LoadCoins()
  if math.random() < 0.03 then
    local coin = NewCoin()
    table.insert(Coins, coin)
  end

  for i=#Coins, 1, -1 do
    local coin = Coins[i]
    if AABB(Player.x, Player.y, Player.w, Player.h, coin.x, coin.y, coin.w, coin.h) then
      table.remove(Coins, i)
      Score = Score +1
    end
  end
end

function DisplayCoins(color)
  love.graphics.setColor(0, 0, 0)
  for i=1, #Coins, 1 do
    local coin = Coins[i]
    love.graphics.rectangle('fill', coin.x, coin.y, coin.w, coin.h)
  end
  love.graphics.setColor(unpack(color))
end
