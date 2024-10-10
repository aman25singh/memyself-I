document.addEventListener('DOMContentLoaded', function() {
    // NodesJs Particle Animation Initialization
    var NodesJs = function(t) {
        var t_NodesJs = this;
        t_NodesJs.id = t.id;
        t_NodesJs.width = t.width;
        t_NodesJs.height = t.height;
        t_NodesJs.particleSize = t.particleSize || 2;
        t_NodesJs.lineSize = t.lineSize || 1;
        t_NodesJs.number = t.number || 100;
        t_NodesJs.speed = t.speed || 100;
        t_NodesJs.nobg = t.nobg || !1;
        t_NodesJs.pointerCircleRadius = t.pointerCircleRadius || 150;
        
        var staticBgColor = "rgb(250, 250, 250)"; 
        
        var o, d, n, i, a = Date.now(), r = 0;
        t_NodesJs.nodes = [];
        t_NodesJs.setWidth = function(t) { o.width = t; n = t };
        t_NodesJs.setHeight = function(t) { o.height = t; i = t };
        
        t_NodesJs.placeNodes = function(t) {
            t_NodesJs.nodes = [];
            for (var o = 0; o < t; o++)
                t_NodesJs.nodes.push([Math.floor(Math.random() * (+n + 1)) + 0, Math.floor(Math.random() * (+i + 1)) + 0, Math.random() * (2 * Math.PI + 1) + 0, []]);
        };

        t_NodesJs.pointerCircleRadius && window.addEventListener("mousemove", function(t) {
            var mouseX = t.clientX;
            var mouseY = t.clientY;

            if (t_NodesJs.nodes.length) {
                t_NodesJs.nodes.forEach(function(node, index) {
                    var nodeX = node[0];
                    var nodeY = node[1];
                    var dx = nodeX - mouseX;
                    var dy = nodeY - mouseY;
                    var distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < t_NodesJs.pointerCircleRadius) {
                        var angle = Math.atan2(dy, dx);
                        node[0] += Math.cos(angle) * (t_NodesJs.pointerCircleRadius - distance);
                        node[1] += Math.sin(angle) * (t_NodesJs.pointerCircleRadius - distance);
                    }
                });
            }
        });

        window[window.addEventListener ? "addEventListener" : "attachEvent"](window.addEventListener ? "load" : "onload", function() {
            o = document.getElementById(t_NodesJs.id), d = o.getContext("2d"), o.width = t_NodesJs.width, o.height = t_NodesJs.height, n = o.width, i = o.height, t_NodesJs.placeNodes(t_NodesJs.number);
            var s = function() {
                var t, o, e;
                window.requestAnimationFrame(s), d.clearRect(0, 0, n, i);
                d.beginPath();
                d.fillStyle = staticBgColor; 
                d.fillRect(0, 0, n, i); 
                d.fill();

                var lineR = 0;
                var lineG = 0;
                var lineB = 0;
                var lineColor = `rgba(${lineR}, ${lineG}, ${lineB}, 0.3)`;
                var particleColor = `rgba(${lineR}, ${lineG}, ${lineB}, 0.8)`; 

                t_NodesJs.nodes.forEach(function(s, a) {
                    s[0] += Math.cos(s[2]) * t_NodesJs.speed * (r / 1000);
                    s[1] += Math.sin(s[2]) * t_NodesJs.speed * (r / 1000);
                    s[0] < 0 && (s[0] = n + s[0] % n);
                    s[0] > n && (s[0] = s[0] % n);
                    s[1] < 0 && (s[1] = i + s[1] % i);
                    s[1] > i && (s[1] = s[1] % i);

                    d.fillStyle = particleColor;
                    d.beginPath();
                    d.arc(s[0], s[1], t_NodesJs.particleSize, 0, 2 * Math.PI, !0);
                    d.fill();
                    s[3] = [];

                    t_NodesJs.nodes.forEach(function(node, index) {
                        var dx = Math.abs(s[0] - node[0]);
                        var dy = Math.abs(s[1] - node[1]);
                        var distance = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));

                        if (distance <= 150) {
                            var opacity = 0.3 - (0.3 * distance / 150);
                            d.beginPath();
                            d.strokeStyle = `rgba(${lineR}, ${lineG}, ${lineB}, ${opacity})`;
                            d.moveTo(s[0], s[1]);
                            d.lineTo(node[0], node[1]);
                            d.stroke();
                        }
                    });
                });
                r = Date.now() - a, a = Date.now();
            };
            window.requestAnimationFrame(s);
        }, !1);
    };

    // Initialize NodesJs animation
    new NodesJs({
        id: "myCanvas",
        width: window.innerWidth,
        height: window.innerHeight,
        particleSize: 2,
        lineSize: 1,
        number: 150,
        speed: 65,
        pointerCircleRadius: 150
    });

    // Initialize the Leaflet map
    var map = L.map('map').setView([20, 0], 2); // Centered on the world, zoom level 2

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Array of visited places (latitude, longitude, description)
    var visitedPlaces = [
        { coords: [48.8566, 2.3522], description: 'Paris, France' },
        { coords: [40.7128, -74.0060], description: 'New York, USA' },
        { coords: [35.6895, 139.6917], description: 'Tokyo, Japan' },
        { coords: [51.5074, -0.1278], description: 'London, UK' }
    ];

    // Loop through the places and add markers
    visitedPlaces.forEach(function(place) {
        L.marker(place.coords)
            .addTo(map)
            .bindPopup(place.description)
            .openPopup();
    });
});
