const shortid = require("shortid");
const URL = require("../models/url");

async function handleGenerateNewShortURL(req, res) {
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "url is required" });
  const shortID = shortid();

  try{
    const isURLExist = await URL.findOne({redirectURL: body.url});
    if(isURLExist){
      isURLExist.redirectURL = body.url
      isURLExist.shortId = shortID

      await isURLExist.save();
      return res.json({ id: shortID });
    }else{
        await URL.create({
          shortId: shortID,
          redirectURL: body.url,
          visitHistory: [],
        });
        return res.json({ id: shortID });
    }
  }catch(err){
    console.error("Error in adding URL details to DB: ",err);
  }
}

async function handleGetAnalytics(req, res) {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });
  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}

async function handleRedirectUrl(req,res){
  const shortId = req.params.shortId;

  const entry = await URL.findOne({shortId: shortId});

  if(entry){
    const timestamp = {
      timestamp: Date.now()
    }
    entry.visitHistory.push(timestamp);
    await entry.save();
    return res.redirect(entry.redirectURL);
  }else{
    return res.status(404).json({
      message: "No Url Entry Found!"
    })
  }
}

module.exports = {
  handleGenerateNewShortURL,
  handleGetAnalytics,
  handleRedirectUrl
};
