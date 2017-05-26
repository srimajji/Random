var request = require('request');

function getFoodTrucks(req, res, next) {

    function filterApiResponse(error, response, body) {
        if (!error && response.statusCode == 200) {
            var foodTrucks = JSON.parse(body);
            if (foodTrucks.length === 0)
                return res.status(200).json({
                    text: "Sorry, Couldn't find anything!"
                });
            var results = "Top 5 Results: \n";
            foodTrucks.forEach(function(foodTruck, index) {
                results += foodTruck.applicant + " " + foodTruck.locationdescription + "\n";
            });
        } else if (error) {
            results = ":cry: Call Sri! I cannot retreive any information!";
        }

        return res.status(200).json({
            text: results
        });
    }

    var baseUrl = "https://data.sfgov.org/resource/rqzj-sfat.json?";
    var user = req.body.user_name;
    var foodTruck = req.body.text.replace(req.body.trigger_word, '');
    var limit = 5;
    var apiEndPoint = baseUrl + '$q=' + foodTruck + '&Status=APPROVED' + '&$limit=' + limit;
    var options = {
        url: apiEndPoint,
        method: 'GET',
        timeout: 1300,
        headers: {
            'Content-Type': 'application/json'
        }
    };

    //conditions
    if (user !== 'slackbot' && foodTruck.length > 3) {
        request(options, filterApiResponse);
    } else {
        return res.status(200).end();
    }
}

module.exports = getFoodTrucks;
