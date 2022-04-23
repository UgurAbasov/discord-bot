const { Schema, model } = require('mongoose');

module.exports = model("MutingDB", new Schema({
    GuildID: String,
    UserID: String,
    StaffID: String,
    Reason: String
}))