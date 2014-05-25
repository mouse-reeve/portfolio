angular.module('flaskDirective', []).directive('flask', [function() {
    return {
        restrict: 'A',
        scope: {
            'toggle': '@'
        },
        link: function (scope, element, attrs) {
            var original = element[0].innerHTML;
            var html = element[0].innerHTML.split(/\b/);
            var inTag = false;
            for (var i=0; i<html.length; i++) {
                var item = html[i];
                var display = !inTag;

                if (inTag && item.match('>')) {
                    inTag = false;
                    display = false;
                }

                if (!inTag && item.match('<')) {
                    inTag = true;
                    display = false;
                }
                
                if (display) {
                    var flask = ' flask';
                    if (item.match(/^[\.\,\!\?\-].$/) || 
                                (!isNaN(parseFloat(item)) && item == parseFloat(item)) ||
                                item.match(/^[\s]+$/)) {
                        flask = item;
                    } else if (item.match(/^an$|^and$|^a$|^the$/)) {
                        flask = ' ' + item;
                    } else {
                        var first = item.slice(0,1);
                        if (item.toUpperCase() === item) {
                            flask = flask.toUpperCase();
                        } else if (first.toLowerCase() !== first) {
                            flask = " Flask"
                        }
                        var ending = item.match(/ing$|ed$|s$|ful$/);
                        if (ending) {
                            flask += ending[0];
                        }
                    }
                    html[i] = flask;
                }
            }

            scope.$watch('toggle', function(flaskMode) {
                if (flaskMode === "true") {
                    element[0].innerHTML = html.join('');
                } else {
                    element[0].innerHTML = original;
                }
            });
        }
    };
}]);

