"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMessengerContract = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const ethers_1 = require("ethers");
const Messenger__factory_1 = require("../../../blockchain/typechain/factories/Messenger__factory");
const urls_1 = require("./urls");
dotenv_1.default.config();
const getMessengerContract = (url = urls_1.BlockchainUrlsEnum.POLYGON_MUMBAI) => {
    const provider = new ethers_1.ethers.JsonRpcProvider(url);
    const wallet = new ethers_1.ethers.Wallet(process.env.PRIVATE_KEY, provider);
    return new ethers_1.ethers.Contract(process.env.MESSENGER_CONTRACT_ADDRESS, Messenger__factory_1.Messenger__factory.abi, wallet);
};
exports.getMessengerContract = getMessengerContract;
