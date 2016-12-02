define('app/map', [], function() {
  return {
    getMap: function(id) {
        var _ = ""
        
        var maps = {};

        var a = { type: "Tile" };
        var b = { type: "EnemyStopperTile" };

        var e = { type: "Enemy" };
        var s = { type: "Spawn" };
        
        var t1 = {
            type: "Teleport",
            id: "0",
            direction: 2,
            destination: {
                map: "1",
                teleport: "0"
            }
        }
        var t2 = {
            type: "Teleport",
            id: "1",
            direction: 3,
            destination: {
                map: "2",
                teleport: "0"
            }
        }
        maps["0"] = {
            checkpoint: true,
            data: [
                [  ,  ,  ,  ,  ,  ,  ,a ,t1,t1,a ,  ,  ,  ,  ,  ,  ,  ],
                [  ,a ,a ,a ,a ,a ,a ,a ,  ,  ,a ,a ,a ,a ,a ,a ,a ,  ],
                [  ,a ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,a ,  ],
                [  ,a ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,a ,  ],
                [  ,a ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,a ,  ],
                [  ,a ,  ,  ,  ,  ,  ,  ,a ,  ,  ,  ,  ,  ,  ,  ,  ,t2],
                [  ,a ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,a ,  ],
                [  ,a ,  ,  ,  ,a ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,a ,  ],
                [  ,a ,  ,  ,  ,  ,  ,  ,s ,  ,  ,  ,  ,  ,  ,  ,a ,  ],
                [  ,a ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,a ,  ],
                [  ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,  ],
                [  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ],
            ]
        }
        
        var t1 = {
            type: "Teleport",
            id: "0",
            direction: 0,
            destination: {
                map: "0",
                teleport: "0"
            }
        }
        maps["1"] = {
            checkpoint: false,
            data: [
                [  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ],
                [  ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,  ],
                [  ,a ,  ,  ,  ,  ,  ,a ,  ,a ,  ,  ,  ,  ,  ,  ,a ,  ],
                [  ,a ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,e ,  ,  ,  ,a ,  ],
                [  ,a ,  ,  ,e ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,a ,  ],
                [  ,a ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,a ,  ],
                [  ,a ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,a ,  ],
                [  ,a ,  ,  ,  ,  ,  ,  ,e ,  ,  ,  ,  ,  ,  ,  ,a ,  ],
                [  ,a ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,a ,  ],
                [  ,a ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,a ,  ],
                [  ,a ,a ,a ,a ,a ,a ,a ,b ,a ,a ,a ,a ,a ,a ,a ,a ,  ],
                [  ,  ,  ,  ,  ,  ,  ,  ,t1,  ,  ,  ,  ,  ,  ,  ,  ,  ],
            ]
        }

        var t1 = {
            type: "Teleport",
            id: "0",
            direction: 1,
            destination: {
                map: "0",
                teleport: "1"
            }
        }

        maps["2"] = {
            checkpoint: false,
            data: [
                [  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ],
                [  ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,  ],
                [  ,a ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,a ,  ],
                [  ,a ,  ,  ,e ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,a ,  ],
                [  ,a ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,a ,  ],
                [  ,a ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,a ,  ],
                [t1,b ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,a ,  ],
                [  ,a ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,a ,  ],
                [  ,a ,  ,  ,  ,  ,  ,  ,  ,e ,  ,  ,  ,  ,  ,  ,a ,  ],
                [  ,a ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,a ,  ],
                [  ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,  ],
                [  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ],
            ]
        }

        return maps[id];    
    }
  }
})