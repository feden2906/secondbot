const { Markup, Scenes, Composer } = require("telegraf");
const { getOffices } = require('../../common/sequelize/office.sequelize');


const startStep = new Composer();
startStep.hears("two", async (ctx) => {
   try {
      const allOff = await getOffices()
      // console.log(allOffices)
      ctx.wizard.state.formData = {};
      function f1(x) {
         return x.map((el) =>[Markup.button.callback(`${el.name}`, `${el.story}`)]
         )
      }

     const x = await ctx.replyWithHTML(`<b>OFFICE</b>`,  Markup.inlineKeyboard(
         f1(allOff)), {columns: 2})
      // console.log('x = ', x)

     // const z = await ctx.replyWithHTML(`ZZZZZ`, Markup.inlineKeyboard(
     //      [Markup.button.callback('Front-end', 'front'),
     //         Markup.button.callback('Back-end', 'back')]))
     //  console.log('z = ', z)

      // const y = await ctx.reply("oneMessage", {
      //    reply_markup: {
      //       "inline_keyboard": [
      //          [Markup.button.callback("yes-ok", "ok")],
      //          [Markup.button.callback("changed_my_mind", "changed_my_mind")]
      //       ]
      //    }
      // });
      // console.log('y = ', y)

      return ctx.wizard.next();
   } catch (e) {
      console.log(e);
   }
});

const finishStep = new Composer();
getOffices().then((allOff) => allOff.map((el) => finishStep.action(el.story, async (ctx) => {
   try {
      console.log('match MAX =', ctx.match)
      await ctx.answerCbQuery();
      await ctx.replyWithHTML("жена");
      return ctx.scene.leave();
   } catch (e) {
      console.log(e);
   }
})))

// console.log('******', allOff)
// finishStep.action("botton2", async (ctx) => {
//    try {
//       console.log('match MAX =', ctx.match)
//       await ctx.answerCbQuery();
//       await ctx.replyWithHTML("Have you changed your mind!");
//       return ctx.scene.leave();
//    } catch (e) {
//       console.log(e);
//    }
// });
// finishStep.action("botton1", async (ctx) => {
//    // console.log('from =', ctx.update.callback_query.from)
//    // console.log('message =', ctx.update.callback_query.message)
//    console.log('match =', ctx.match)
//    // console.log('reply_markup =', ctx.update.callback_query.message.reply_markup.inline_keyboard)
//    try {
//       await ctx.answerCbQuery();
//       await ctx.reply("ok");
//       return ctx.scene.leave();
//    } catch (e) {
//       console.log(e);
//    }
// });

module.exports = new Scenes.WizardScene("twoWizard", startStep, finishStep);