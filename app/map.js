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
        var i = { type: "Flower1" };
        var j = { type: "Flower2" };
        
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
        var t2 = {
            type: "Teleport",
            id: "2",
            direction: 3,
            destination: {
                map: "4",
                teleport: "0"
            }
        }

        maps["1"] = {
            data: [
                [  ,  ,  ,  ,  ,  ,  ,  ,t1,  ,  ,  ,  ,  ,  ,  ,  ,  ],
                [  ,a ,a ,a ,a ,a ,a ,a ,b ,a ,a ,a ,a ,a ,a ,a ,a ,  ],
                [  ,a ,  ,  ,  ,  ,a ,a ,  ,a ,a ,  ,  ,  ,a ,a ,a ,  ],
                [  ,a ,  ,e ,  ,  ,  ,a ,  ,a ,  ,  ,e ,  ,  ,a ,a ,  ],
                [  ,a ,  ,  ,  ,e ,  ,  ,e ,  ,  ,  ,  ,  ,  ,a ,a ,  ],
                [  ,a ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,b ,  ,t2],
                [  ,a ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,a ,a ,  ],
                [  ,a ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,a ,a ,  ],
                [  ,a ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,a ,a ,  ],
                [  ,a ,a ,  ,  ,  ,  ,  ,  ,  ,a ,a ,a ,a ,a ,a ,a ,  ],
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

        // ROOM 6
        var t0 = {
            type: "Teleport",
            id: "0",
            direction: 0,
            destination: {
                map: "5",
                teleport: "0"
            }
        }

        var t1 = {
            type: "Teleport",
            id: "1",
            direction: 2,
            destination: {
                map: "7",
                teleport: "0"
            }
        }

        var t2 = {
            type: "Teleport",
            id: "2",
            direction: 3,
            destination: {
                map: "4",
                teleport: "1"
            }
        }

        maps["6"] = {
            data: [
                [  ,  ,  ,  ,  ,  ,  ,  ,t1,  ,  ,  ,  ,  ,  ,  ,  ,  ],
                [  ,a ,a ,a ,a ,a ,a ,a ,dG,a ,a ,a ,a ,a ,a ,a ,a ,  ],
                [  ,a ,  ,a ,  ,  ,g ,  ,  ,kG,  ,  ,  ,  ,a ,a ,a ,  ],
                [  ,a ,  ,  ,  ,a ,  ,a ,g ,a ,a ,a ,a ,a ,a ,  ,  ,t2],
                [  ,a ,  ,a ,a ,a ,a ,a ,a ,a ,a ,  ,  ,  ,a ,b ,a ,  ],
                [  ,a ,  ,a ,  ,a ,  ,  ,  ,  ,  ,  ,a ,  ,  ,  ,a ,  ],
                [  ,a ,  ,  ,  ,e ,  ,a ,a ,a ,a ,a ,a ,a ,a ,  ,a ,  ],
                [  ,a ,a ,a ,a ,  ,  ,a ,  ,  ,e ,a ,  ,  ,a ,  ,a ,  ],
                [  ,a ,  ,  ,a ,a ,a ,a ,  ,a ,  ,a ,a ,  ,a ,  ,a ,  ],
                [  ,a ,a ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,f ,a ,  ],
                [  ,a ,a ,a ,a ,a ,a ,a ,b ,a ,a ,a ,a ,a ,a ,a ,a ,  ],
                [  ,  ,  ,  ,  ,  ,  ,  ,t0,  ,  ,  ,  ,  ,  ,  ,  ,  ],
            ]
        }


        // ROOM 4

        var t0 = {
            type: "Teleport",
            id: "0",
            direction: 0,
            destination: {
                map: "1",
                teleport: "2"
            }
        }

        var t1 = {
            type: "Teleport",
            id: "1",
            direction: 2,
            destination: {
                map: "6",
                teleport: "2"
            }
        }

        maps["4"] = {
            data: [
                [  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ],
                [  ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,t1,a ,a ,a ,a ,a ,  ],
                [  ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,b ,  ,a ,a ,a ,a ,  ],
                [  ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,  ,  ,a ,a ,a ,  ],
                [  ,a ,a ,a ,a ,a ,  ,  ,  ,  ,  ,a ,  ,  ,  ,a ,a ,  ],
                [  ,a ,a ,a ,  ,  ,  ,a ,  ,h ,  ,a ,  ,kB,  ,a ,a ,  ],
                [t0,b ,  ,  ,  ,a ,a ,a ,a ,  ,a ,a ,  ,  ,  ,a ,a ,  ],
                [  ,a ,a ,a ,  ,a ,a ,a ,a ,a ,a ,a ,a ,  ,a ,a ,a ,  ],
                [  ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,  ],
                [  ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,  ],
                [  ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,  ],
                [  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ],
            ]
        }


        // ROOM 8

        var t0 = {
            type: "Teleport",
            id: "0",
            direction: 0,
            destination: {
                map: "11",
                teleport: "0"
            }
        }
        var t1 = {
            type: "Teleport",
            id: "1",
            direction: 3,
            destination: {
                map: "7",
                teleport: "1"
            }
        }
        var t2 = {
            type: "Teleport",
            id: "2",
            direction: 0,
            destination: {
                map: "8",
                teleport: "1"
            }
        }
        var t3 = {
            type: "Teleport",
            id: "3",
            direction: 0,
            destination: {
                map: "8",
                teleport: "5"
            }
        }
        var t4 = {
            type: "Teleport",
            id: "4",
            direction: 2,
            destination: {
                map: "8",
                teleport: "9"
            }
        }
        var t5 = {
            type: "Teleport",
            id: "5",
            direction: 3,
            destination: {
                map: "8",
                teleport: "4"
            }
        }
        var t6 = {
            type: "Teleport",
            id: "6",
            direction: 0,
            destination: {
                map: "8",
                teleport: "1"
            }
        }
        var t7 = {
            type: "Teleport",
            id: "7",
            direction: 1,
            destination: {
                map: "9",
                teleport: "0"
            }
        }
        var t8 = {
            type: "Teleport",
            id: "8",
            direction: 2,
            destination: {
                map: "8",
                teleport: "9"
            }
        }
        var t9 = {
            type: "Teleport",
            id: "9",
            direction: 0,
            destination: {
                map: "8",
                teleport: "8"
            }
        }
        maps["8"] = {
            data: [
                [  ,  ,t4,  ,t2,  ,  ,t3,  ,  ,  ,  ,  ,  ,  ,t8,  ,  ],
                [  ,a ,b ,a ,b ,a ,a ,b ,a ,a ,a ,a ,a ,a ,a ,b ,a ,  ],
                [  ,a ,  ,a ,  ,  ,a ,  ,  ,  ,  ,  ,  ,a ,  ,  ,a ,  ],
                [  ,a ,  ,a ,a ,  ,a ,a ,a ,a ,a ,a ,  ,a ,  ,a ,a ,  ],
                [  ,a ,  ,a ,  ,  ,a ,  ,  ,  ,  ,  ,  ,a ,  ,a ,a ,  ],
                [t7,b ,  ,a ,  ,a ,a ,  ,  ,a ,a ,a ,a ,a ,  ,  ,b ,t1],
                [  ,a ,a ,a ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,a ,  ],
                [  ,a ,  ,  ,  ,  ,a ,  ,  ,  ,  ,  ,  ,a ,a ,a ,a ,  ],
                [t2,b ,  ,  ,  ,  ,a ,a ,a ,a ,a ,a ,  ,a ,  ,  ,b ,t5],
                [  ,a ,  ,  ,  ,  ,a ,a ,  ,  ,  ,  ,  ,a ,  ,  ,a ,  ],
                [  ,a ,b ,a ,a ,b ,a ,a ,b ,a ,a ,b ,a ,a ,b ,a ,a ,  ],
                [  ,  ,t0,  ,  ,t2,  ,  ,t2,  ,  ,t9,  ,  ,t6,  ,  ,  ],
            ]
        }


        // ROOM 11
        
        var t0 = {
            type: "Teleport",
            id: "0",
            direction: 2,
            destination: {
                map: "8",
                teleport: "0"
            }
        }
        maps["11"] = {
            checkpoint: true,
            data: [
                [  ,  ,  ,  ,  ,  ,  ,  ,t0,  ,  ,  ,  ,  ,  ,  ,  ,  ],
                [  ,a ,a ,a ,a ,a ,a ,a ,b ,a ,a ,a ,a ,a ,a ,a ,a ,  ],
                [  ,a ,a ,a ,a ,a ,a ,a ,  ,  ,a ,a ,a ,a ,a ,a ,a ,  ],
                [  ,a ,a ,a ,a ,a ,a ,a ,  ,  ,  ,a ,a ,a ,a ,a ,a ,  ],
                [  ,a ,a ,  ,  ,  ,  ,  ,  ,  ,s ,  ,a ,a ,a ,a ,a ,  ],
                [  ,a ,a ,  ,h ,  ,  ,  ,  ,  ,  ,  ,a ,a ,a ,a ,a ,  ],
                [  ,a ,a ,  ,  ,  ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,  ],
                [  ,a ,a ,  ,h ,  ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,  ],
                [  ,a ,a ,  ,  ,  ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,  ],
                [  ,a ,a ,  ,h ,  ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,  ],
                [  ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,  ],
                [  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ],
            ]
        }


        // ROOM 7

        var t0 = {
            type: "Teleport",
            id: "0",
            direction: 0,
            destination: {
                map: "6",
                teleport: "1"
            }
        }

        var t1 = {
            type: "Teleport",
            id: "1",
            direction: 1,
            destination: {
                map: "8",
                teleport: "1"
            }
        }

        var t2 = {
            type: "Teleport",
            id: "2",
            direction: 3,
            destination: {
                map: "12",
                teleport: "0"
            }
        }

        var t3 = {
            type: "Teleport",
            id: "3",
            direction: 2,
            destination: {
                map: "14",
                teleport: "0"
            }
        }

        maps["7"] = {
            data: [
                [  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ],
                [  ,a ,a ,a ,a ,a ,t3,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,  ],
                [  ,a ,a ,a ,g ,a ,b ,a ,a ,e ,  ,a ,  ,  ,  ,g ,a ,  ],
                [  ,a ,a ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,a ,  ],
                [  ,a ,a ,  ,  ,a ,  ,  ,a ,  ,  ,  ,  ,  ,  ,  ,a ,  ],
                [  ,a ,a ,a ,  ,  ,  ,e ,  ,  ,a ,  ,  ,  ,  ,  ,a ,  ],
                [t1,  ,  ,dB,  ,  ,  ,  ,a ,a ,  ,  ,  ,  ,  ,  ,b ,t2],
                [  ,a ,a ,a ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,a ,  ,a ,  ],
                [  ,a ,a ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,a ,a ,  ,a ,  ],
                [  ,a ,a ,  ,g ,  ,a ,a ,  ,a ,  ,  ,a ,f ,  ,  ,a ,  ],
                [  ,a ,a ,a ,a ,a ,a ,a ,b ,a ,a ,a ,a ,a ,a ,a ,a ,  ],
                [  ,  ,  ,  ,  ,  ,  ,  ,t0,  ,  ,  ,  ,  ,  ,  ,  ,  ],
            ]
        }


        // ROOM 12

        var t0 = {
            type: "Teleport",
            id: "0",
            direction: 1,
            destination: {
                map: "7",
                teleport: "2"
            }
        }

        var t1 = {
            type: "Teleport",
            id: "1",
            direction: 3,
            destination: {
                map: "13",
                teleport: "0"
            }
        }

        maps["12"] = {
            data: [
                [  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ],
                [  ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,  ],
                [  ,a ,  ,g ,  ,  ,  ,  ,f ,  ,  ,  ,  ,  ,  ,g ,a ,  ],
                [  ,a ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,a ,e ,  ,  ,a ,  ],
                [  ,a ,  ,  ,  ,  ,e ,  ,  ,e ,  ,  ,  ,  ,a ,  ,a ,  ],
                [  ,a ,  ,  ,  ,  ,a ,  ,  ,  ,  ,  ,a ,  ,a ,  ,a ,  ],
                [  ,a ,  ,  ,e ,  ,a ,  ,  ,e ,  ,e ,  ,  ,  ,  ,dR,t1],
                [t0,b ,  ,  ,  ,  ,e ,  ,  ,  ,  ,a ,  ,  ,  ,  ,a ,  ],
                [  ,a ,  ,  ,  ,  ,  ,  ,  ,a ,  ,  ,  ,  ,  ,g ,a ,  ],
                [  ,a ,f ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,a ,  ],
                [  ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,  ],
                [  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ],
            ]
        }


        // ROOM 14

        var t0 = {
            type: "Teleport",
            id: "0",
            direction: 0,
            destination: {
                map: "7",
                teleport: "3"
            }
        }

        maps["14"] = {
            checkpoint: true,
            data: [
                [  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ],
                [  ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,  ],
                [  ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,  ],
                [  ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,  ],
                [  ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,  ,  ,  ,a ,a ,  ],
                [  ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,  ,h ,  ,  ,a ,a ,  ],
                [  ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,  ,  ,  ,  ,  ,a ,  ],
                [  ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,  ,  ,s ,  ,  ,a ,  ],
                [  ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,  ,  ,  ,  ,a ,a ,  ],
                [  ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,  ,  ,  ,a ,a ,  ],
                [  ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,b ,a ,a ,  ],
                [  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,t0,  ,  ,  ],
            ]
        }


        // ROOM 9
        
        var t0 = {
            type: "Teleport",
            id: "0",
            direction: 3,
            destination: {
                map: "8",
                teleport: "7"
            }
        }
        var t1 = {
            type: "Teleport",
            id: "1",
            direction: 1,
            destination: {
                map: "10",
                teleport: "0"
            }
        }
        maps["9"] = {
            data: [
                [  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ],
                [  ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,  ],
                [  ,a ,a ,a ,a ,a ,a ,a ,  ,  ,a ,a ,a ,a ,a ,a ,a ,  ],
                [  ,a ,a ,a ,a ,a ,a ,a ,f ,  ,  ,a ,a ,a ,a ,a ,a ,  ],
                [  ,a ,a ,a ,a ,a ,a ,  ,  ,e ,  ,  ,  ,  ,  ,  ,b ,t0],
                [t1,b ,  ,g ,  ,g ,  ,  ,  ,  ,  ,  ,a ,a ,a ,a ,a ,  ],
                [t1,b ,  ,  ,  ,  ,  ,  ,  ,e ,  ,  ,a ,a ,a ,a ,a ,  ],
                [  ,a ,a ,a ,a ,a ,a ,  ,  ,  ,  ,  ,a ,a ,a ,a ,a ,  ],
                [  ,a ,a ,a ,a ,a ,a ,  ,f ,  ,  ,  ,a ,a ,a ,a ,a ,  ],
                [  ,a ,a ,a ,a ,a ,a ,  ,  ,  ,  ,  ,a ,a ,a ,a ,a ,  ],
                [  ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,  ],
                [  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ],
            ]
        }


        // ROOM 10

        var t0 = {
            type: "Teleport",
            id: "0",
            direction: 3,
            destination: {
                map: "9",
                teleport: "1"
            }
        }
        maps["10"] = {
            checkpoint: true,
            data: [
                [  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ],
                [  ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,  ],
                [  ,a ,  ,a ,a ,a ,  ,  ,a ,a ,a ,a ,a ,a ,a ,a ,a ,  ],
                [  ,a ,  ,  ,  ,  ,g ,  ,  ,a ,a ,a ,a ,a ,a ,a ,a ,  ],
                [  ,a ,  ,kR,  ,e ,  ,  ,  ,  ,a ,a ,a ,a ,a ,a ,a ,  ],
                [  ,a ,  ,  ,  ,e ,  ,  ,  ,  ,a ,a ,a ,a ,a ,a ,a ,  ],
                [  ,a ,  ,  ,  ,  ,f ,  ,  ,  ,a ,a ,a ,a ,a ,a ,a ,  ],
                [  ,a ,  ,a ,a ,  ,  ,  ,  ,  ,a ,a ,a ,a ,a ,a ,a ,  ],
                [  ,a ,  ,a ,a ,  ,  ,  ,  ,  ,a ,a ,a ,a ,a ,a ,a ,  ],
                [  ,a ,a ,a ,a ,a ,a ,  ,  ,  ,  ,  ,  ,s ,  ,  ,b ,t0],
                [  ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,  ],
                [  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ],
            ]
        }


        // ROOM 13

        var t0 = {
            type: "Teleport",
            id: "0",
            direction: 1,
            destination: {
                map: "12",
                teleport: "1"
            }
        }

        var t1 = {
            type: "Teleport",
            id: "1",
            direction: 0,
            destination: {
                map: "15",
                spawn: true,
            }
        }

        maps["13"] = {
            data: [
                [  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ],
                [  ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,t1,a ,a ,  ],
                [  ,a ,g ,a ,  ,  ,e ,a ,  ,e ,  ,  ,  ,a ,  ,a ,a ,  ],
                [  ,a ,  ,  ,  ,  ,  ,a ,  ,  ,  ,  ,f ,a ,b ,a ,a ,  ],
                [  ,a ,  ,a ,g ,  ,  ,a ,  ,  ,f ,a ,  ,  ,  ,e ,a ,  ],
                [  ,a ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,a ,  ],
                [t0,b ,  ,a ,  ,a ,g ,  ,f ,  ,  ,a ,  ,  ,  ,  ,a ,  ],
                [  ,a ,  ,  ,  ,a ,  ,a ,  ,  ,  ,  ,g ,  ,e ,  ,a ,  ],
                [  ,a ,  ,a ,  ,a ,  ,a ,g ,f ,  ,a ,  ,  ,  ,  ,a ,  ],
                [  ,a ,  ,  ,  ,  ,  ,a ,  ,  ,g ,  ,  ,e ,  ,e ,a ,  ],
                [  ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,a ,  ],
                [  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ],
            ]
        }

        
        // ROOM 15

        maps["15"] = {
            win: true,
            data: [
                [  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ],
                [  ,c ,c ,c ,c ,c ,c ,c ,c ,c ,c ,c ,c ,c ,c ,c ,c ,  ],
                [  ,c ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,c ,  ],
                [  ,c ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,c ,  ],
                [  ,c ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,c ,  ],
                [  ,c ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,c ,  ],
                [  ,c ,  ,s ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,c ,  ],
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

// maps["1"] = {
//             data: [
//                 [  ,  ,  ,  ,  ,  ,  ,  ,t1,  ,  ,  ,  ,  ,  ,  ,  ,  ],
//                 [  ,a ,a ,a ,a ,a ,a ,a ,b ,a ,a ,a ,a ,a ,a ,a ,a ,  ],
//                 [  ,a ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,a ,  ],
//                 [  ,a ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,a ,  ],
//                 [  ,a ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,a ,  ],
//                 [  ,a ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,a ,  ],
//                 [  ,a ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,a ,  ],
//                 [  ,a ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,a ,  ],
//                 [  ,a ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,a ,  ],
//                 [  ,a ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,a ,  ],
//                 [  ,a ,a ,a ,a ,a ,a ,a ,b ,a ,a ,a ,a ,a ,a ,a ,a ,  ],
//                 [  ,  ,  ,  ,  ,  ,  ,  ,t0,  ,  ,  ,  ,  ,  ,  ,  ,  ],
//             ]
//         }