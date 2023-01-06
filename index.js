const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const system = {
    static: {
        interval_time: 5000,
        timeout_time: 3
    },
    variable: {
        connected: false,
        connected_time: null
    },
    getTime: function(){
        const date_object = new Date();
        return {
            h: date_object.getHours(),
            m: date_object.getMinutes(),
        }
    }
}

app.get('/', (req, res) => res.render('index.ejs', {
    title: "AutomaticFireExtinguisherDetectionHerokuSystem",
    connected_client: system.variable.connected
}));

app.post('/afe', (req, res) => {
    system.variable.connected_time = system.getTime();
    systeme.variable.connected = true;
    console.log(`[connected client] Hours: ${system.variable.connected_time.h}, Minutes: ${system.variable.connected_time.m}`);
});

setInterval(() => {
    if (system.variable.connected) {
        const connected_time = system.variable.connected_time;
        const now_time = system.getTime(); 
        if ((now_time.m - connected_time.m >= system.static.timeout_time) || (now_time.m - connected_time.m < system.static.timeout_time && now_time.h - connected_time.h >= 1)) {
            system.variable.connected = false;
            system.variable.connected_time = null;
        }
    }
}, system.static.interval_time);

app.listen(PORT, () => console.log(`Listening on ${ PORT }`));
