const ViberBot = require('viber-bot').Bot,
BotEvents = require('viber-bot').Events,
TextMessage = require('viber-bot').Message.Text
const bodyParser = require('body-parser')
express = require('express');
const fetch = require('node-fetch');
const app = express();

const bot = new ViberBot({
    authToken: '4fb15627d4a7e6b9-6705f13fbe2685f0-5a819b1f97ae7e1e',
    name: "Cat Vet Bot",
    avatar: "https://upload.wikimedia.org/wikipedia/commons/3/3d/Katze_weiss.png"
});

app.use("/viber/webhook", bot.middleware());
app.use(
    bodyParser.urlencoded({
        extended: true
    })
)
    
app.use(bodyParser.json());
    
const router =express.Router();

// if (!process.env.BOT_ACCOUNT_TOKEN) {
//     console.log('Could not find bot account token key.');
//     return;
// }
// if (!process.env.EXPOSE_URL) {
//     console.log('Could not find exposing url');
//     return;
// }

const allowedUsers = ['ostfoVjsiFlO5LURW+fCwg=='];

bot.on(BotEvents.SUBSCRIBED, response => {
    console.log('SUBSCRIBE EVENT ');
    console.log({response});
    //response.send(new TextMessage(`Hi there ${response.userProfile.name}. I am ${bot.name}! Feel free to ask me anything.`));
});
bot.on(BotEvents.UNSUBSCRIBED, response => {
    console.log('UNSUBSCRIBE EVENT ');
    console.log({response});
    //response.send(new TextMessage(`Hi there ${response.userProfile.name}. I am ${bot.name}! Feel free to ask me anything.`));
});
bot.on(BotEvents.MESSAGE_RECEIVED, async (message, response) => {

    await fetch(`http://localhost:45427/api/viber/checksecretkey?secretKey=${message.text}`)
    .then(res => res.json())
    .then(text => {
        console.log(response.userProfile.name);
        if(text == true) {
            fetch(`http://localhost:45427/api/viber/senduserprofile/${message.text}`, {
                method: 'POST',
                body: JSON.stringify(response.userProfile),
                headers: { 'Content-Type': 'application/json'}
            }).then(res => res.json())
            .then(json => console.log(json));


            bot.sendMessage(response.userProfile, new TextMessage("Uspješna registracija!")); 
        }
        else {
            bot.sendMessage(response.userProfile, new TextMessage("Pogrešan kod!"));
        }
    });

});

bot.onConversationStarted((userProfile, isSubscribed, context, onFinish) =>
	onFinish(new TextMessage(`Pozdrav, molimo unesite Vas aktivacijski kljuc`)));

const port = process.env.PORT || 3000;
// app.use("/viber/webhook", bot.middleware());
app.listen(port, () => {
    console.log(`Application running on port: ${port}`);
    //https://b7d8-217-75-204-146.ngrok.io/viber/webhook
    bot.setWebhook(`https://chatapi.viber.com/pa/set_webhook`).catch(error => {
        console.log('Can not set webhook on following server. Is it running?');
        console.error(error);
        process.exit(1);
    });
});

router.post('/nekaporuka', (req,res) => {

    var userProfiles = [
        {
            id: 'op6+H3RgVQTiKBCuJZEn4g==',
            name: 'ʜaʀɪs',
            avatar: 'https://media-direct.cdn.viber.com/download_photo?dlid=M0nwK7nmp9QnVrFP7MaRlnOdWqygu2v9Gi_HSIKXcu_g2jnqvCLzTAs2dD-hwYruVaq9PfhTQVSsBG5eJb9wEnHl6VHQlTepHJI31wE8XqrB14k-BuixIE1bM6w69x-GKkxYxQ&fltp=jpg&imsz=0000',      country: 'BA',
            language: 'en-US',
            apiVersion: 10
          },
          {
            id: 'qK8k4xk4CPwUX1Etwu7WfA==',
            name: 'Tarik',
            avatar: '',
            country: 'BA',
            language: 'en-US',
            apiVersion: 10
          },
          {
            id: '+AjjBFIVE6ktqtemYOIrzg==',
            name: 'Tarik Krivosija',
            avatar: 'https://media-direct.cdn.viber.com/download_photo?dlid=M0nwK7nmp9QnVrFP7MaRlnOdXqymvjf4FS-ST4HAcr7tj2rjvCz5HAszf2PwlorgAPmyPa1dQFfxUj9bIetxFSez4gLYlTGuE5Fm1gllCKXF09w5YZXLvHxZ0q5KeOsjL8W-Mg&fltp=jpg&imsz=0000',
            country: 'BA',
            language: 'en-US',
            apiVersion: 10
          }
    ];


    console.log(req.body);

    //req.body.poruka.forEach((poruka) => console.log(poruka));

    var userProfile = req.body;
    bot.sendMessage(userProfile, new TextMessage(userProfile.message));

    //userProfiles.forEach((userProfile) => bot.sendMessage(userProfile, new TextMessage("ovo je test poruka")));

    // bot.sendMessage(userProfile, new TextMessage(req.body.poruka));

    // console.log('poruka', req.body.poruka);

    
    // fetch('http://localhost:45427/api/viber/checksecretkey?secretKey=test')
    // .then(res => res.text())
    // .then(text => console.log(text));
    
    //bot.sendMessage(userProfile, new TextMessage(req.body.poruka));
    return res.json({"message": "proslo"});
})

router.post('/nekaporukaTest', (req,res) => {
    var userProfiles = [
        {
            id: 'op6+H3RgVQTiKBCuJZEn4g==',
            name: 'ʜaʀɪs',
            avatar: 'https://media-direct.cdn.viber.com/download_photo?dlid=M0nwK7nmp9QnVrFP7MaRlnOdWqygu2v9Gi_HSIKXcu_g2jnqvCLzTAs2dD-hwYruVaq9PfhTQVSsBG5eJb9wEnHl6VHQlTepHJI31wE8XqrB14k-BuixIE1bM6w69x-GKkxYxQ&fltp=jpg&imsz=0000',      country: 'BA',
            language: 'en-US',
            apiVersion: 10
          },
          {
            id: 'qK8k4xk4CPwUX1Etwu7WfA==',
            name: 'Tarik',
            avatar: '',
            country: 'BA',
            language: 'en-US',
            apiVersion: 10
          },
          {
            id: '+AjjBFIVE6ktqtemYOIrzg==',
            name: 'Tarik Krivosija',
            avatar: 'https://media-direct.cdn.viber.com/download_photo?dlid=M0nwK7nmp9QnVrFP7MaRlnOdXqymvjf4FS-ST4HAcr7tj2rjvCz5HAszf2PwlorgAPmyPa1dQFfxUj9bIetxFSez4gLYlTGuE5Fm1gllCKXF09w5YZXLvHxZ0q5KeOsjL8W-Mg&fltp=jpg&imsz=0000',
            country: 'BA',
            language: 'en-US',
            apiVersion: 10
          }
    ];

    bot.sendMessage(userProfiles[0], new TextMessage("aaa"));

})

app.use("/api/viber", router);

const TextMessage1 = require('viber-bot').Message.Text;
var userProfile = {
    id: 'op6+H3RgVQTiKBCuJZEn4g==',
    name: 'ʜaʀɪs',
    avatar: 'https://media-direct.cdn.viber.com/download_photo?dlid=M0nwK7nmp9QnVrFP7MaRlnOdWqygu2v9Gi_HSIKXcu_g2jnqvCLzTAs2dD-hwYruVaq9PfhTQVSsBG5eJb9wEnHl6VHQlTepHJI31wE8XqrB14k-BuixIE1bM6w69x-GKkxYxQ&fltp=jpg&imsz=0000',      country: 'BA',
    language: 'en-US',
    apiVersion: 10
  }


  bot.onSubscribe(response => console.log(`Subscribed: ${response.userProfile}`));
