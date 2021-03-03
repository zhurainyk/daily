
window.onload = init;//异步函数

function init(){
    const map  = new ol.Map({
        view:new ol.View({
            center:[11863826.83987542,3456905.70175451],
            // center:[-8495906.908036437,-1165289.7741472162],
            zoom:15,
            maxZoom:22,
            minZoom:1,
            rotation:0.5
        }),
        layers:[
            new ol.layer.Tile({
                source:new ol.source.OSM()
            })
        ],
        target:'js-map'
    })
    map.on('click',(e)=>{
        console.log(e)
    })
}