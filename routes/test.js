module.exports = (app) => {
    app.get('/api/dummy1', async (req, res) => {
        const test = {
            type: "INFOMESSAGE",
            reference: "cXV44fp",
            timestamp: "15756209981",
            requestedLanguage: "en,en_gb",
            messages:
            [
                { 
                    messageText: "App is actived but can not be used until System starts to use the new system", 
                    messageHeader: "Info from System",
                    messageDestination: "requestList", 
                    messageStartTime: "2022-01-18T08:46:02Z", 
                    messageStopTime: "2022-12-18T08:46:02Z" 
                },
                
                {
                    messageText: "Welcome to the App", 
                    messageHeader: "Welcome", 
                    messageDestination: "popup", 
                    messageStartTime: "2022-01-18T08:46:02Z", 
                    messageStopTime: "2022-01-18T08:46:02Z" 
                }
            ]
        }
        setTimeout(() => {

            res.send(test)
        },1000)
    });

    app.get('/api/dummy2', async (req, res) => {
        const test = [
            {id: 1, name: "Fish", isShopped: false},
            {id: 2, name: "Spice", isShopped: false},
            {id: 3, name: "Foccacia", isShopped: false},
            {id: 4, name: "Sause", isShopped: false},
            {id: 5, name: "Carrots", isShopped: false},
            {id: 6, name: "Cucumber", isShopped: false},
            {id: 7, name: "Vinegar", isShopped: false},
            {id: 8, name: "Eggs", isShopped: false},
            {id: 9, name: "Potatoes", isShopped: false},
        ]
        res.send(test)
    });

    app.get('/api/dummy3', async (req, res) => {
        const test = [
            {id: 1, name: "Minced meat", isShopped: false},
            {id: 2, name: "Taco spice", isShopped: false},
            {id: 3, name: "Taco sauce", isShopped: false},
            {id: 4, name: "Tortillas", isShopped: false},
            {id: 5, name: "Salad", isShopped: false},
            {id: 6, name: "Onion", isShopped: false},
            {id: 7, name: "Corn", isShopped: false},
            {id: 8, name: "Tomatoes", isShopped: false},
            {id: 9, name: "Mushrooms", isShopped: false},
            {id: 10, name: "Cucumber", isShopped: false},
            {id: 11, name: "Pepsi", isShopped: false}
        ]
        res.send(test)
    });
};
