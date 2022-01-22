var metal = 3.4;
var magnet = 5.68;
var wire = 1.71;
var plastic = 0.6;
var rubber = 1.1;
var raremetal = 7.81;

var circuit = (plastic * 2) + wire;                                                                 
var [hose] = (rubber * 2);                                                                            
var logicunity = (wire * 5) + (circuit * 2);                                                        
var motor = (magnet * 2) + metal + (wire * 2);                                                      
var pump = (metal * 2) + plastic + rubber;                                                          
var thingamajig = (circuit * 3) + (hose * 2) + motor + (pump * 2);                                  
                                                                                                    
var advlogicunity =  (wire * 4) + (circuit * 4) + (logicunity * 2);                                 
var jetengine = (metal * 8) + (wire * 12) + (hose * 6) + (pump * 4) + thingamajig;                  
var sensor = (raremetal * 2) + wire + circuit + logicunity;                                         

var jet =  (metal * 24) + (wire * 18) + (advlogicunity * 6) + (jetengine * 4) + (sensor * 8);       

console.log(jet);


var somametal = 1 + (2 * 2) + (2 * 4 * 4) + (16 * 4) + 24;
var somamagnet = 2
var somawire = 18 + (22 * 6) + (17 * 4) + (9 * 8);
var somaplastic = (16 * 6) + (12 * 4) + (6 * 8);
var somarubber = 88
var somararemetal = 16

var gasto = (somametal * metal) + (somamagnet * magnet) + (somawire * wire) + (somaplastic * plastic) + (somarubber * rubber) + (somararemetal * raremetal)

console.log("somametal = " + somametal)
console.log(8)
console.log("somawire = " + somawire)
console.log("somaplastic = " + somaplastic)
console.log(88)

console.log("gasto = " + gasto)

// metal = 125
// magnet = 8
// wire = 290
// plastic = 192
// rubber = 88
// raremetal = 16

//
//
//
//
//
//
//