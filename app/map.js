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
        
        // ROOM 0
        var t0 = {
            type: "Teleport",
            id: "0",
            direction: 2,
            destination: {
                map: "1",
                teleport: "0"
            }
        }
        var t1 = {
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
                [  ,  ,  ,  ,  ,  ,  ,a ,t0,a ,  ,  ,  ,  ,  ,  ,  ,  ],
                [  ,a ,a ,a ,a ,a ,a ,a ,b ,a ,a ,a ,a ,a ,a ,a ,a ,  ],
                [  ,a ,a ,a ,a ,a ,a ,a ,  ,  ,  ,a ,  ,  ,  ,  ,a ,  ],
                [  ,a ,  ,  ,  ,  ,  ,a ,  ,  ,  ,a ,  ,  ,h ,  ,a ,  ],
                [  ,a ,  ,h ,  ,  ,  ,  ,  ,  ,  ,a ,  ,a ,a ,a ,a ,  ],
                [  ,a ,a ,a ,a ,a ,a ,a ,a ,  ,  ,a ,  ,a ,  ,  ,b ,t1],
                [  ,a ,a ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,a ,  ],
                [  ,a ,a ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,a ,  ],
                [  ,a ,a ,  ,s ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,a ,  ],
                [  ,a ,a ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,a ,  ],
                [  ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,  ],
                [  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ],
            ]
        }
        
        // ROOM 1
        var t0 = {
            type: "Teleport",
            id: "0",
            direction: 0,
            destination: {
                map: "0",
                teleport: "0"
            }
        }
        var t1 = {
            type: "Teleport",
            id: "1",
            direction: 2,
            destination: {
                map: "5",
                teleport: "1"
            }
        }
        maps["1"] = {
            data: [
                [  ,  ,  ,  ,  ,  ,  ,  ,t1,  ,  ,  ,  ,  ,  ,  ,  ,  ],
                [  ,a ,a ,a ,a ,a ,a ,a ,b ,a ,a ,a ,a ,a ,a ,a ,a ,  ],
                [  ,a ,  ,  ,  ,  ,a ,a ,  ,a ,a ,  ,  ,  ,  ,  ,a ,  ],
                [  ,a ,  ,e ,  ,  ,  ,a ,  ,a ,  ,  ,e ,  ,  ,  ,a ,  ],
                [  ,a ,  ,  ,  ,e ,  ,  ,e ,  ,  ,  ,  ,  ,  ,  ,a ,  ],
                [  ,a ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,a ,  ],
                [  ,a ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,a ,  ],
                [  ,a ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,a ,  ],
                [  ,a ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,a ,  ],
                [  ,a ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,a ,  ],
                [  ,a ,a ,a ,a ,a ,a ,a ,b ,a ,a ,a ,a ,a ,a ,a ,a ,  ],
                [  ,  ,  ,  ,  ,  ,  ,  ,t0,  ,  ,  ,  ,  ,  ,  ,  ,  ],
            ]
        }

        // ROOM 2
        var t0 = {
            type: "Teleport",
            id: "0",
            direction: 1,
            destination: {
                map: "0",
                teleport: "1"
            }
        }

        var t1 = {
            type: "Teleport",
            id: "1",
            direction: 3,
            destination: {
                map: "3",
                teleport: "0"
            }
        }

        maps["2"] = {
            checkpoint: false,
            data: [
                [  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ],
                [  ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,  ],
                [  ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,  ],
                [  ,a ,a ,a ,a ,a ,a ,  ,  ,  ,  ,  ,  ,  ,  ,  ,a ,  ],
                [  ,a ,  ,  ,  ,a ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,b ,t1],
                [  ,a ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,e ,  ,  ,a ,  ],
                [t0,b ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,a ,  ],
                [  ,a ,  ,  ,  ,a ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,a ,  ],
                [  ,a ,a ,a ,a ,a ,a ,  ,  ,  ,  ,  ,  ,  ,  ,  ,a ,  ],
                [  ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,  ],
                [  ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,  ],
                [  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ],
            ]
        }

        // ROOM 3
        var t0 = {
            type: "Teleport",
            id: "0",
            direction: 1,
            destination: {
                map: "2",
                teleport: "1"
            }
        }

        maps["3"] = {
            data: [
                [  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ],
                [  ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,  ],
                [  ,a ,a ,a ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,a ,a ,  ],
                [  ,a ,a ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,e ,  ,  ,a ,  ],
                [t0,b ,  ,  ,  ,  ,  ,  ,  ,  ,  ,e ,  ,  ,  ,  ,a ,  ],
                [  ,a ,a ,a ,a ,a ,a ,a ,a ,a ,  ,  ,  ,  ,  ,  ,a ,  ],
                [  ,a ,a ,a ,a ,a ,a ,a ,a ,a ,  ,  ,  ,  ,  ,  ,a ,  ],
                [  ,a ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,a ,  ],
                [  ,a ,  ,kG,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,a ,a ,  ],
                [  ,a ,  ,  ,  ,  ,  ,  ,  ,  ,  ,a ,a ,  ,  ,a ,a ,  ],
                [  ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,  ],
                [  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ],
            ]
        }

        // ROOM 5
        var t0 = {
            type: "Teleport",
            id: "0",
            direction: 2,
            destination: {
                map: "6",
                teleport: "0"
            }
        }

        var t1 = {
            type: "Teleport",
            id: "1",
            direction: 0,
            destination: {
                map: "1",
                teleport: "1"
            }
        }

        maps["5"] = {
            checkpoint: true,
            data: [
                [  ,  ,  ,  ,  ,  ,  ,  ,t0,  ,  ,  ,  ,  ,  ,  ,  ,  ],
                [  ,a ,a ,a ,a ,a ,a ,a ,b ,a ,a ,a ,a ,a ,a ,a ,a ,  ],
                [  ,a ,a ,a ,a ,a ,a ,a ,  ,a ,a ,a ,a ,a ,a ,a ,a ,  ],
                [  ,a ,a ,a ,a ,a ,a ,  ,  ,  ,  ,a ,a ,a ,a ,a ,a ,  ],
                [  ,a ,a ,a ,a ,a ,  ,  ,  ,  ,  ,a ,a ,a ,a ,a ,a ,  ],
                [  ,a ,  ,  ,  ,a ,  ,  ,  ,  ,  ,  ,a ,a ,a ,a ,a ,  ],
                [  ,a ,  ,s ,  ,  ,  ,  ,  ,  ,  ,  ,a ,a ,a ,a ,a ,  ],
                [  ,a ,  ,  ,  ,a ,  ,  ,  ,  ,  ,a ,a ,a ,a ,a ,a ,  ],
                [  ,a ,a ,a ,a ,a ,a ,  ,  ,  ,  ,a ,a ,a ,a ,a ,a ,  ],
                [  ,a ,a ,a ,a ,a ,a ,a ,  ,a ,a ,a ,a ,a ,a ,a ,a ,  ],
                [  ,a ,a ,a ,a ,a ,a ,a ,b ,a ,a ,a ,a ,a ,a ,a ,a ,  ],
                [  ,  ,  ,  ,  ,  ,  ,  ,t1,  ,  ,  ,  ,  ,  ,  ,  ,  ],
            ]
        }

        return maps[id];    
    }
  }
})