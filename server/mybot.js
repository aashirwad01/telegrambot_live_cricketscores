
const { Telegraf } = require('telegraf')
const axios = require("axios");


const bot=new Telegraf('5037017667:AAHbn_OeS3GJEJGMDJiamSuHoikEG49L4AA');






var options = {
  url:'https://indian-news-live.p.rapidapi.com/news/cricket',
  method: 'GET',
  headers: {
    'x-rapidapi-host': 'indian-news-live.p.rapidapi.com',
    'x-rapidapi-key': 'cd30dfcf79mshc5798de5bba6226p13e5a6jsnc7b7e12f67aa',
  }
};

var fetchUpdates =  async(options) => {
    try {
       var data = await axios (options)
       .catch((e) => console.log(e));
     
        return (data);
      
    } catch (e) {
      throw e;
    }
  }



bot.hears("cricket", async (ctx) => {
    
    try {
      ctx.reply("⌛️ Please Wait It will take few seconds to grab Updates"); // bot will send a reply to users. 
     
      const values = await fetchUpdates(options);
    console.log(`done `);
    
    for (let r of values.data){
        ctx.reply(r.title);
    }
     
      
    } catch (e) {
      console.log(e);
      ctx.reply("Please try after sometime Server is down :(")
    }
  });


bot.start(ctx => ctx.reply(`
Hi, I'm a simple bot to give Daily Cricket News (please write /help to know how to use)
`))

bot.command('about', (ctx) => {
    ctx.reply(`Hey, my name @aashirwadd and i created using Node js to get cricket news. `)
})

bot.help(ctx => ctx.reply(`
   Write the word 'cricket' to get cricket updates . Write /about to know about me.
`))

bot.on('sticker', (ctx) => ctx.reply('👍'))

// bot.hears('cricket', function(url,options){

// })



// bot.hears('updates', (ctx, next) => {
//     console.log(ctx.from)
//     bot.telegram.sendMessage(ctx.chat.id, 'Do you want to get Cricket News Updates?', requestUpdatesKeyboard);

// })

// const requestUpdatesKeyboard = {
//     "reply_markup": {
//         "one_time_keyboard": true,
//         "keyboard": [
//             [{
//                 text: "Yes",
//                 request_contact: true,
//                 one_time_keyboard: true
//             }],
//             ["Cancel"]
//         ]
//     }
// };

bot.launch();