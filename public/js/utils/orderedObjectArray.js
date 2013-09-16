angular.module('mean.utils').factory("OrderedObjectArray", [function() {
    // return $resource('articles/:articleId', {
    //     articleId: '@_id'
    // }, {
    //     update: {
    //         method: 'PUT'
    //     }
    // });

 // linked map for keeping a sorted map of objects.  used in keeping a list of sorted programs
    return function() {

        var list = [];
        var indexMap = {};
        var current;
        var currentIndex = 0;

        return {
            put: function(key,value) {
                if(typeof indexMap[key] === 'undefined') {
                    var tempObject = {key:key, value:value};
                    list.push(tempObject);
                    indexMap[key] = list.length - 1;
                } else {
                    var index = indexMap[key];
                    list[index].value = value;
                }
                if(typeof current === "undefined") {
                    current = list[indexMap[key]];
                    currentIndex = indexMap[key];
                }
            },
            get: function(key) {
                var value;
                if(typeof indexMap[key] !== 'undefined') {
                    var index = indexMap[key];
                    return list[index].value;
                } else {
                    return undefined;
                }
            },
            remove: function(key) {
                if(typeof indexMap[key] !== 'undefined') {

                    var index = indexMap[key];
                    list.splice(index,1);
                    delete indexMap[key];

                    // shift indexMap
                    for(itemInMap in indexMap) {
                        if(indexMap[itemInMap] >= index ) {
                            indexMap[itemInMap] = indexMap[itemInMap] - 1;
                        }
                    }
                    // reset current index so that it advances properly despite item removal
                    if(currentIndex != 0) {
                        currentIndex --;
                    }
                    current = list[currentIndex];
                }
                return this;
            },
            resetIndex: function() {
                currentIndex = 0;
            },
            next: function() {

                current = list[currentIndex];

                if(currentIndex + 1 < list.length) {
                    currentIndex++;
                } else {
                    currentIndex = 0;
                }

                return current;
            },
            current: function() {
                return current;
            },
            key: function() {
                return current.key;
            },
            value: function() {
                return current.value;
            },
            hasKey: function(key) {
                return typeof indexMap[key] !== 'undefined';
            },
            size: function() {
                return list.length;
            },
            clear: function() {
                list = [];
                indexMap = {};
                current = undefined;
                currentIndex = 0;
            },
            order: function(alg) {
                if(alg == "COUPON")
                {
                    // Only the first program in the list will be shown,
                    // so we want its rpf to be the value used for sorting.
                    for(i = 0; i < list.length; i++)
                    {
                        list[i].value.rpf = list[i].value.programs[0].rpf;
                    }
                    var sorted = list.sort(function(a,b){
                        return Math.round(parseFloat(b.value.rpf)*10000)/100 - Math.round(parseFloat(a.value.rpf)*10000)/100;
                    });
                    indexMap = {};
                    for(i = 0; i < sorted.length; i++)
                    {
                        indexMap[sorted[i].key] = i;
                    }
                    list = sorted;
                }
            },
            getList: function() {
                return list;
            }
        }
    }

}]);
