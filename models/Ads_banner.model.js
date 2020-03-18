const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Ads_bannerSchema  = new Schema({
    Ads_banner_name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    Ads_img: {
        type: String,
        required: true
    },
    Ads_begin_date: {
        type: Date,
        required: true,
        default: Date.now
    },
    Ads_finish_date: {
        type: Date,
        required: true,
        default: null
    },
    Premium_ads: {
        type: Boolean,
        required: true,
    }

});

module.exports = mongoose.model('Ads_banner' , Ads_bannerSchema);
