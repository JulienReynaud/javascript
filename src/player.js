window.addEventListener("load", function () {
    loadXMLDoc();
    var label = document.getElementById("titre");
    var t= document.createTextNode("");
    label.appendChild(t);

    function loadXMLDoc() {
        var req = new XMLHttpRequest();
        req.open("GET", "https://crossorigin.me/http://www.funradio.fr/podcast/l-integrale.xml");
        req.onerror = function () {
            console.log("Échec de chargement " + "https://crossorigin.me/http://www.funradio.fr/podcast/l-integrale.xml");
        };
        req.onload = function () {
            if (req.status === 200) {
                console.log(req);
                var xml = req.responseXML;
                Liste(xml);
            } else {
                console.log("Erreur " + req.status);
            }
        };
        req.send();

    }

    function Liste(xml) {
        var x, i, xmlDoc;

        console.log(xml)
        x = xml.getElementsByTagName("item");
        var table = document.createElement("table");
        table.setAttribute("id", "tableau");

        document.getElementById("playlist").appendChild(table);

        for (i = 0; i < x.length; i++) {
            var lien = x[i].getElementsByTagName("enclosure")[0].getAttribute("url");
            var tr = document.createElement("tr");
            tr.setAttribute("id", "tr" + i + "");
            var td = document.createElement("td");
            td.setAttribute("id", "td" + i + "");

            var td2 = document.createElement("td");
            td2.setAttribute("id", "tddelete" + i + "");
            var td3 = document.createElement("td");
            td3.setAttribute("id", "tddepla" + i + "");
            td3.setAttribute("class", "td");
            var deletebutton = document.createElement("input");
            deletebutton.setAttribute("type", "button");
            deletebutton.setAttribute("id", "delete" + i + "");
            deletebutton.setAttribute("class", "delete");
            deletebutton.setAttribute("name", "delete");
            deletebutton.setAttribute("value", "-");
            var monterbutton = document.createElement("input");
            monterbutton.setAttribute("type", "button");
            monterbutton.setAttribute("id", "monter" + i + "");
            monterbutton.setAttribute("name", i);
            monterbutton.setAttribute("value", "up");

            var descendrebutton = document.createElement("input");
            descendrebutton.setAttribute("type", "button");
            descendrebutton.setAttribute("id", "descendre" + i + "");
            descendrebutton.setAttribute("name", i);
            descendrebutton.setAttribute("value", "down");
            descendrebutton.setAttribute("class", x.length);
            var input = document.createElement("input");
            input.setAttribute("href", lien);
            input.setAttribute("id", "musique" + i + "");
            input.setAttribute("name", i);
            input.setAttribute("type", "button");
            input.setAttribute("value", x[i].getElementsByTagName("title")[0].childNodes[0].nodeValue);


            document.getElementById("tableau").appendChild(tr);

            document.getElementById("tr" + i).appendChild(td);
            document.getElementById("td" + i).appendChild(input);
            document.getElementById("tr" + i).appendChild(td2);
            document.getElementById("tddelete" + i).appendChild(deletebutton);
            document.getElementById("tr" + i).appendChild(td3);
            document.getElementById("tddepla" + i).appendChild(monterbutton);
            document.getElementById("tddepla" + i).appendChild(descendrebutton);

            monterbutton.addEventListener("click", monter);
            descendrebutton.addEventListener("click", descendre);
            deletebutton.addEventListener("click", deletemusique);
            input.addEventListener("click", play);
            if (i == 0) {
                var pButton = document.getElementById('pButton');
                var link = input.getAttribute("href");
                var title = input.getAttribute("value");
                var label = document.getElementById("titre");
                label.removeChild(label.firstChild);
                var t = document.createTextNode(title);
                label.appendChild(t);
                console.log(link);

                var audio = document.createElement("audio");
                audio.setAttribute("id", "music");
                audio.setAttribute("preload", "true");
                audio.setAttribute("src", link);
                audio.setAttribute("autoplay", true);
                audio.setAttribute("name", i);
                document.getElementById("player").appendChild(audio);
                pButton.className = "pause";
                player();
            }
            var aud = document.getElementById("music");
            aud.addEventListener("ended", suite);


        }

    }

    function suite(e) {

        var i = this.getAttribute("name");
        i = parseInt(i);
        console.log(i);
        j = i + 1;
        console.log(j);

        var input = document.getElementById("musique" + j);
        console.log(input);
        var link = input.getAttribute("href");
        var title = input.getAttribute("value");
        var label = document.getElementById("titre");
        var t = document.createTextNode(title);
        label.removeChild(label.firstChild);
        label.appendChild(t);
        var audio = document.getElementById("music");
        var pButton = document.getElementById('pButton');
        audio.setAttribute("src", link);
        audio.setAttribute("name", j);
        pButton.className = "pause";


    }


    function monter(e) {
        var i = this.getAttribute("name");
        i = parseInt(i);
        console.log(i);
        var td = document.getElementById("musique" + i);
        var j = i - 1;
        var link = td.getAttribute("href");
        var title = td.getAttribute("value");

        if (i > 0) {
            var lignedessus = document.getElementById("musique" + j);
            var linkdessus = lignedessus.getAttribute("href");
            var titledessus = lignedessus.getAttribute("value");

            var input = document.getElementById("musique" + i);
            input.setAttribute("value", titledessus);
            input.setAttribute("href", linkdessus);
            var inputdessus = document.getElementById("musique" + j);
            inputdessus.setAttribute("value", title);
            inputdessus.setAttribute("href", link);
        }
    }

    function descendre(e) {
        var i = this.getAttribute("name");
        i = parseInt(i);
        var x = this.getAttribute("class");
        console.log(i);
        var td = document.getElementById("musique" + i);
        var j = i + 1;
        console.log(j);
        var link = td.getAttribute("href");
        var title = td.getAttribute("value");
        if (i < x) {
            var lignedessus = document.getElementById("musique" + j);
            console.log(lignedessus);
            var linkdessus = lignedessus.getAttribute("href");
            var titledessus = lignedessus.getAttribute("value");

            var input = document.getElementById("musique" + i);
            input.setAttribute("value", titledessus);
            input.setAttribute("href", linkdessus);
            var inputdessus = document.getElementById("musique" + j);
            inputdessus.setAttribute("value", title);
            inputdessus.setAttribute("href", link);
        }
    }


    function play(e) {
        var i = this.getAttribute("name");
        i = parseInt(i);
        j = i + 1;

        if (document.getElementById("music") != null) {
            var link = this.getAttribute("href");
            var title = this.getAttribute("value");
            var audio = document.getElementById("music");
            var pButton = document.getElementById('pButton');
            audio.setAttribute("name", i);
            audio.setAttribute("src", link);
            pButton.className = "pause";
            var label = document.getElementById("titre");
            var t = document.createTextNode(title);
            label.removeChild(label.firstChild);
            label.appendChild(t);
        } else {
            var pButton = document.getElementById('pButton');
            var link = this.getAttribute("href");
            var title = this.getAttribute("value");
            var label = document.getElementById("titre");
            var t = document.createTextNode(title);
            label.removeChild(label.firstChild);
            label.appendChild(t);
            console.log(link);
            var audio = document.createElement("audio");
            audio.setAttribute("id", "music");
            audio.setAttribute("preload", "true");
            audio.setAttribute("src", link);
            audio.setAttribute("autoplay", true);
            audio.setAttribute("name", i);
            document.getElementById("player").appendChild(audio);
            pButton.className = "pause";
            player();


        }

    }

    function deletemusique(e) {

        var td = this.parentNode;
        var musique = td.parentNode;
        console.log(musique);
        while (musique.hasChildNodes()) {
            musique.removeChild(musique.firstChild);
        }
    }

    function player() {

        console.log("test");
        var music = document.getElementById('music');
        var duration = music.duration;
        var pButton = document.getElementById('pButton');
        var playhead = document.getElementById('playhead');
        var timeline = document.getElementById('timeline');


        var timelineWidth = timeline.offsetWidth - playhead.offsetWidth;
        var plus = document.getElementById("+");
        var moins = document.getElementById("-");
        plus.addEventListener("click", volplus);
        moins.addEventListener("click", volmoins);

        pButton.addEventListener("click", play);


        music.addEventListener("timeupdate", timeUpdate, false);


        timeline.addEventListener("click", function (event) {
            moveplayhead(event);
            music.currentTime = duration * clickPercent(event);
        }, false);

        function volplus(e) {

            var audio = document.getElementById("music");
            volume = audio.volume;
            if (volume <= 0.9) {
                audio.volume = volume + 0.2;
            }

        }

        function volmoins(e) {
            var vol = this.getAttribute("name");
            vol = parseFloat(vol);
            var audio = document.getElementById("music");
            volume = audio.volume;
            if (volume >= 0.1) {
                audio.volume = volume - 0.2;
            }

        }

        function clickPercent(event) {
            return (event.clientX - getPosition(timeline)) / timelineWidth;
        }


        playhead.addEventListener('mousedown', mouseDown, false);
        window.addEventListener('mouseup', mouseUp, false);


        var onplayhead = false;


        function mouseDown() {
            onplayhead = true;
            window.addEventListener('mousemove', moveplayhead, true);
            music.removeEventListener('timeupdate', timeUpdate, false);
        }


        function mouseUp(event) {
            if (onplayhead == true) {
                moveplayhead(event);
                window.removeEventListener('mousemove', moveplayhead, true);
                // change current time
                music.currentTime = duration * clickPercent(event);
                music.addEventListener('timeupdate', timeUpdate, false);
            }
            onplayhead = false;
        }

        function moveplayhead(event) {
            var newMargLeft = event.clientX - getPosition(timeline);

            if (newMargLeft >= 0 && newMargLeft <= timelineWidth) {
                playhead.style.marginLeft = newMargLeft + "px";
            }
            if (newMargLeft < 0) {
                playhead.style.marginLeft = "0px";
            }
            if (newMargLeft > timelineWidth) {
                playhead.style.marginLeft = timelineWidth + "px";
            }
        }

        function timeUpdate() {
            var playPercent = timelineWidth * (music.currentTime / duration);
            playhead.style.marginLeft = playPercent + "px";
            if (music.currentTime == duration) {
                pButton.className = "";
                pButton.className = "play";
            }
        }

        function play() {

            if (music.paused) {
                music.play();

                pButton.className = "";
                pButton.className = "pause";
            } else {
                music.pause();

                pButton.className = "";
                pButton.className = "play";
            }
        }


        music.addEventListener("canplaythrough", function () {
            duration = music.duration;
        }, false);


        function getPosition(el) {
            return el.getBoundingClientRect().left;
        }
    }
});