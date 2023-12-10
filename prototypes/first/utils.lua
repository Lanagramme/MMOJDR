function BetterColor(a, b, c)
  local function floor(x)
    return 1 / 255 * x
  end
  return floor(a), floor(b), floor(c)
end
