


exports.translateFunc = async function (projectId = 'fsmtranslate',text) {
    const {Translate} = require('@google-cloud/translate');

    // Instantiates a client
    const translate = new Translate({projectId});
    const target = 'he**';

      const [translation] = await translate.translate(text, target);
        console.log("TRANSLATE"+translation);
      return translation;



};



//module.exports= translateFunc;


