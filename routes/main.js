__path = process.cwd()

require('../settings');
const express = require('express');
const router = express.Router();
const passport = require('passport');
require('../controller/passportLocal')(passport);
const authRoutes = require('./auth');
const apiRoutes = require('./api')
const dataweb = require('../model/DataWeb');
const User = require('../model/user');

//_______________________ ┏ Function ┓ _______________________\\

function checkAuth(req, res, next) {
    if (req.isAuthenticated()) {
        res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, post-check=0, pre-check=0');
        next();
    } else {
        req.flash('error_messages', "Please Login to continue !");
        res.redirect('/users/login');
    }
}

async function getApikey(id) {
    let limit = await dataweb.findOne();
    let users = await User.findOne({_id: id})
    return {apikey: users.apikey, username: users.username, checklimit: users.limitApikey, isVerified : users.isVerified, RequestToday: limit.RequestToday};
}


//_______________________ ┏ Router ┓ _______________________\\

router.get('/', (req, res) => {
        res.render("home");
});

router.get('/docs',  checkAuth, async (req, res) => {
  let getinfo =  await getApikey(req.user.id)
  let { apikey, username, checklimit, isVerified , RequestToday } = getinfo
    res.render("docs", { username: username, verified: isVerified, apikey: apikey, limit: checklimit , RequestToday: RequestToday });
    
});


router.get("/logout", (req, res) => {
    req.logout(req.user, err => {
      if(err) return next(err);
      res.redirect("/users/login");
    });
  });


router.get('/admin/get_update', async (req, res) => {
  try {
    const jsonResponse = {
      status: true,
      creator: 'Cipher',
      data: {
        key: 'Cipher',
        message: {
          text: '*Api info:* https://api.alpha-md.rf.gd/docs\n*contact*: +2348114860536',
          contextInfo: {
            externalAdReply: {
              sourceUrl: 'https://chat.whatsapp.com/FCfSLTySyqz1c7YPJD2KSm',
              title: 'join our WhatsApp Group for updates!!'
            }
          }
        }
      }
    };
    res.json(jsonResponse);
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, error: 'Internal Server Error' });
  }
});



router.use(authRoutes);
router.use(apiRoutes);
module.exports = router;