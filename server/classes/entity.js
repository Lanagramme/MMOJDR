const entity = {
  Entity = class {
  constructor(id){
    this.id
    this.x = 1500
    this.y = 1600
    this.spdX = 0
    this.spdY = 0
  }
  update(){ this.updatePosition() }
  updatePosition(){
    this.x += this.spdX
    this.y += this.spdY
  }
}
}

module.export entity

