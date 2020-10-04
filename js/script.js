ymaps.ready(init);
var map, bstuPlacemark;

function init(){ 
    map = new ymaps.Map("map", {
        center: [53.304696, 34.304016],
        zoom: 17
    });
    
    bstuPlacemark = new ymaps.Placemark([53.304696, 34.304016], {
        hintContent: 'БГТУ',
        balloonContent: '*Брянский Букмекерский Технический Университет'
    });

    autoPizzaPlacemark = new ymaps.Placemark([53.305062, 34.303131], {
        hintContent: 'Автосуши',
        balloonContent: 'Автопицца/Автосуши 11:00-23:00 (ПН-ВС)'
    }, {
        iconLayout: 'default#image',
        iconImageHref: 'images/utensils-solid.svg',
        iconImageSize: [13, 16],
        iconImageOffset: [0, 0]
    });

    foxHolePlacemark = new ymaps.Placemark([53.305005, 34.303405], {
        hintContent: 'FOXhole',
        balloonContent: 'FOXhole 8:30-18:30 (ПН-ПТ)'
    }, {
        iconLayout: 'default#image',
        iconImageHref: 'images/coffee-solid.svg',
        iconImageSize: [15, 12],
        iconImageOffset: [0, 0]
    });

    fastFoodPlacemark = new ymaps.Placemark([53.304456, 34.303186], {
        hintContent: 'Фастфуд',
        balloonContent: 'Киоск по продаже фастфудной продукции 8:00-20:00 (ПН-ВС)'
    }, {
        iconLayout: 'default#image',
        iconImageHref: 'images/hamburger-solid.svg',
        iconImageSize: [15, 15],
        iconImageOffset: [0, 0]
    });

    canteenPlacemark = new ymaps.Placemark([53.303703, 34.305669], {
        hintContent: 'Столовая',
        balloonContent: 'Столовая 10:30-15:30 (ПН-ПТ)'
    }, {
        iconLayout: 'default#image',
        iconImageHref: 'images/utensils-solid.svg',
        iconImageSize: [13, 16],
        iconImageOffset: [0, 0]
    });

    businessBarPlacemark = new ymaps.Placemark([53.304388, 34.302619], {
        hintContent: 'Бизнес бар',
        balloonContent: 'Бизнес бар 11:00-00:00 (ПН-ВС)'
    }, {
        iconLayout: 'default#image',
        iconImageHref: 'images/utensils-solid.svg',
        iconImageSize: [13, 16],
        iconImageOffset: [0, 0]
    });

    kebabPlacemark = new ymaps.Placemark([53.305155, 34.301998], {
        hintContent: 'Лаззат кебаб',
        balloonContent: 'Лаззат кебаб 0:00-24:00 (ПН-ВС)'
    }, {
        iconLayout: 'default#image',
        iconImageHref: 'images/hamburger-solid.svg',
        iconImageSize: [15, 15],
        iconImageOffset: [0, 0]
    });

    chachaPlacemark = new ymaps.Placemark([53.303777, 34.300083], {
        hintContent: 'Чача',
        balloonContent: 'Чача 11:00-22:00 (ПН-ВС)'
    }, {
        iconLayout: 'default#image',
        iconImageHref: 'images/utensils-solid.svg',
        iconImageSize: [13, 16],
        iconImageOffset: [0, 0]
    });

    chilePlacemark = new ymaps.Placemark([53.301991, 34.305922], {
        hintContent: 'Чили',
        balloonContent: 'Чили 10:00-23:00 (ПН-ВС)'
    }, {
        iconLayout: 'default#image',
        iconImageHref: 'images/utensils-solid.svg',
        iconImageSize: [13, 16],
        iconImageOffset: [0, 0]
    });

    olivierPlacemark = new ymaps.Placemark([53.306614, 34.305229], {
        hintContent: 'Оливье',
        balloonContent: 'Оливье 08:00-00:00 (ПН-ВС)'
    }, {
        iconLayout: 'default#image',
        iconImageHref: 'images/utensils-solid.svg',
        iconImageSize: [13, 16],
        iconImageOffset: [0, 0]
    });

    shvedPlacemark = new ymaps.Placemark([53.307591, 34.303647], {
        hintContent: 'Shved 2888',
        balloonContent: 'Shved 2888 8:00-18:00 (ПН-ВС)'
    }, {
        iconLayout: 'default#image',
        iconImageHref: 'images/coffee-solid.svg',
        iconImageSize: [15, 12],
        iconImageOffset: [0, 0]
    });

    mcdonaldsPlacemark = new ymaps.Placemark([53.308272, 34.303039], {
        hintContent: 'Макдоналдс',
        balloonContent: 'Макдоналдс 07:00-00:00 (ПН-ВС)'
    }, {
        iconLayout: 'default#image',
        iconImageHref: 'images/utensils-solid.svg',
        iconImageSize: [13, 16],
        iconImageOffset: [0, 0]
    });

    waurmaPlacemark = new ymaps.Placemark([53.307212, 34.299931], {
        hintContent: 'Wаурма',
        balloonContent: 'Wаурма 11:00-21:00 (ПН-ВС)'
    }, {
        iconLayout: 'default#image',
        iconImageHref: 'images/hamburger-solid.svg',
        iconImageSize: [15, 15],
        iconImageOffset: [0, 0]
    });
    
    map.geoObjects.add(bstuPlacemark);
    map.geoObjects.add(autoPizzaPlacemark);
    map.geoObjects.add(foxHolePlacemark);
    map.geoObjects.add(fastFoodPlacemark);
    map.geoObjects.add(canteenPlacemark);
    map.geoObjects.add(businessBarPlacemark);
    map.geoObjects.add(kebabPlacemark);
    map.geoObjects.add(chachaPlacemark);
    map.geoObjects.add(chilePlacemark);
    map.geoObjects.add(olivierPlacemark);
    map.geoObjects.add(shvedPlacemark);
    map.geoObjects.add(mcdonaldsPlacemark);
    map.geoObjects.add(waurmaPlacemark);
}
