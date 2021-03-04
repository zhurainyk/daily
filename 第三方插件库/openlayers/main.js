
window.onload = init;//异步函数

function init(){
    const map  = new ol.Map({
        view:new ol.View({
            center:[11863826.83987542,3456905.70175451],
            // center:[-8495906.908036437,-1165289.7741472162],
            zoom:7,
            maxZoom:22,
            minZoom:1,
            rotation:0.5
        }),
        // layers:[
        //     new ol.layer.Tile({
        //         source:new ol.source.OSM()
        //     })
        // ],
        target:'js-map'
    })

    const openStreetMapStard = new ol.layer.Tile({
        source:new ol.source.OSM(),
        visible:true,
        title:'OSM模式'
    })

    const openStreetMapHumanitarian = new ol.layer.Tile({
        source:new ol.source.OSM({
            url:'https://{a-c}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
        }),
         visible:false,
        title:'OSMHumanitarian模式'
    })

    const stamenTerrain = new ol.layer.Tile({
        source:new ol.source.XYZ({
            url:'http://tile.stamen.com/terrain/{z}/{x}/{y}.jpg',
            attributeions:'Map tiles by <a href="http://stamen.com">Stamen design</a>'
        }),
        visible:false,
        title:'Stamen模式'
    })
    // map.addLayer(stamenTerrain)

    const baseLaerGroup = new ol.layer.Group({
        layers:[
            openStreetMapHumanitarian,
            openStreetMapStard,
            stamenTerrain

        ]
    })
    map.addLayer(baseLaerGroup)

    map.on('click',(e)=>{
        console.log(e)
    })
}