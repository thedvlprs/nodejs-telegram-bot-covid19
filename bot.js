require('dotenv').config()
const { Telegraf } = require('telegraf')
const api = require('covid19-api')
const Markup = require('telegraf/markup')
const COUNTRIES_LIST = require('./constants')
 
const bot = new Telegraf(process.env.BOT_TOKEN);
bot.start((ctx) =>
	ctx.reply(
		`Hello there, ${ctx.message.from.first_name}! 
We hope you're well & in good health 🍎 \n
This bot provides updated real-time data on coronavirus cases from the worldometers page and other important websites, provided by the most reputable organizations and statistical offices in the world. \n
Type country name and get the most up-to-date information on total number of cases, deaths and recovered stats. \n
For full list of countries use /help command.
`,
		Markup.keyboard([
			['US', 'UK'],
			['Syria', 'Turkey'],
			['Russia', 'Ukraine'],
			['Kazakhstan', 'Uzbekistan'],
		]).extra()
	)
);

bot.help((ctx) => ctx.reply(COUNTRIES_LIST))

bot.on('text', async (ctx) => {
    let data = {}

    try {
    data = await api.getReportsByCountries(ctx.message.text)
    const formatData = `
Country:  ${data[0][0].country}
Cases:  ${data[0][0].cases}
Deaths:  ${data[0][0].deaths}
Recovered:  ${data[0][0].recovered}
    `
    ctx.reply(formatData);
    } catch {
        console.log('Error');
        ctx.reply('Error, please check country name for correctness.')
    }
});

bot.launch()
console.log('Yoo ✋, bot 🤖 is running');