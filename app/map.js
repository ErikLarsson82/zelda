define('app/map', [], function() {
  return {
    getMap: function(id) {
        var _ = ""
        
        var maps = {};

        var a = { type: "Tile" };
        var b = { type: "EnemyStopperTile" };
        var c = { type: "WinTile" };

        var e = { type: "Enemy" };
        var f = { type: "EnemySlider", horizontal: false };
        var g = { type: "EnemySlider", horizontal: true };
        var s = { type: "Spawn" };
        var h = { type: "Heart" };
        
        var kR = { type: "KeyRed" };
        var kG = { type: "KeyGreen" };
        var kB = { type: "KeyBlue" };

        var dR = { type: "DoorRed" };
        var dG = { type: "DoorGreen" };
        var dB = { type: "DoorBlue" };
        
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
                [  ,  ,  ,  ,  ,  ,  ,a ,t1,a ,  ,  ,  ,  ,  ,  ,  ,  ],
                [  ,a ,a ,a ,a ,a ,a ,a ,dR,a ,a ,a ,a ,a ,a ,a ,a ,  ],
                [  ,a ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,a ,  ],
                [  ,a ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,a ,  ],
                [  ,a ,  ,  ,  ,  ,  ,  ,a ,  ,  ,  ,  ,  ,  ,  ,a ,  ],
                [  ,a ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,t2],
                [  ,a ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,a ,  ],
                [  ,a ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,a ,  ],
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
        var t2 = {
            type: "Teleport",
            id: "1",
            direction: 0,
            destination: {
                map: "3",
                spawn: true
            }
        }
        maps["1"] = {
            checkpoint: true,
            data: [
                [  ,  ,  ,  ,  ,  ,  ,  ,t2,  ,  ,  ,  ,  ,  ,  ,  ,  ],
                [  ,a ,a ,a ,a ,a ,a ,a ,b ,a ,a ,a ,a ,a ,a ,a ,a ,  ],
                [  ,a ,  ,  ,  ,  ,  ,a ,  ,a ,  ,  ,  ,  ,  ,  ,a ,  ],
                [  ,a ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,e ,  ,  ,  ,a ,  ],
                [  ,a ,  ,  ,e ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,a ,  ],
                [  ,a ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,a ,  ],
                [  ,a ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,a ,  ],
                [  ,a ,  ,  ,s ,  ,  ,  ,e ,  ,  ,  ,  ,  ,  ,  ,a ,  ],
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
                [  ,a ,f ,  ,a ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,a ,  ],
                [  ,a ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,a ,  ],
                [  ,a ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,a ,  ],
                [t1,b ,  ,  ,  ,kR,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,a ,  ],
                [  ,a ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,a ,  ],
                [  ,a ,  ,g ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,a ,  ],
                [  ,a ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,a ,  ],
                [  ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,  ],
                [  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ],
            ]
        }

        maps["3"] = {
            win: true,
            data: [
                [  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ],
                [  ,c ,c ,c ,c ,c ,c ,c ,c ,c ,c ,c ,c ,c ,c ,c ,c ,  ],
                [  ,c ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,c ,  ],
                [  ,c ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,c ,  ],
                [  ,c ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,c ,  ],
                [  ,c ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,c ,  ],
                [  ,c ,  ,  ,  ,s ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,c ,  ],
                [  ,c ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,c ,  ],
                [  ,c ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,c ,  ],
                [  ,c ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,c ,  ],
                [  ,c ,c ,c ,c ,c ,c ,c ,c ,c ,c ,c ,c ,c ,c ,c ,c ,  ],
                [  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ],
            ]
        }

        return maps[id];    
    }
  }
})