const bodyParser = require('body-parser');
const express = require('express');
const axios = require('axios');
const app = express();


app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/codeforces/:handle', (req, res) => {
    let userDetails;
    let userContestAndRating;
    async function info() {
        await axios(`https://codeforces.com/api/user.info`, {
            params: {
                handles: req.params.handle
            }
        })
        .then(function(result) {
            userDetails = result.data.result;
            console.log(userDetails);
        })
        .catch(function(error) {
            console.log(error);
        });
    
        await axios(`https://codeforces.com/api/user.rating?`, {
            params: {
                handle: req.params.handle
            }
        })
        .then(function(result) {
            userContestAndRating = result.data.result;
        })
        .catch(function(error) {
            console.log(error);
        });
        
        res.status(200).json({
            info: {
                userDetails : userDetails,
                userContestAndRating: userContestAndRating
            }
        });
    }
    info();
    
});



const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server Started at PORT: ${PORT}`);
});