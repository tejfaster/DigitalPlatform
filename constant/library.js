const express = require("express")
const mongoose = require("mongoose")
const cookie = require("cookie-parser")
const jwt = require("jsonwebtoken")
const asyncHandler = require("express-async-handler")
const bcrypt = require("bcrypt")
const morgan = require("morgan")
const slugify = require("slugify")
const crypto = require("crypto")
const nodemailer = require("nodemailer")
const cors = require("cors")

const app = express()
const ObjectId = mongoose.Types.ObjectId


module.exports = {
    app,
    mongoose,
    ObjectId,
    cookie,
    express,
    jwt,
    asyncHandler,
    bcrypt,
    morgan,
    slugify,
    crypto,
    nodemailer,
    cors
}