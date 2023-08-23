"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.votar = exports.getVotos = exports.getNombre = exports.getCandidatoContract = void 0;
const ethers_1 = require("ethers");
const Elecciones__factory_1 = require("../../../blockchain/typechain/factories/Elecciones__factory");
const urls_1 = require("./urls");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const getCandidatoContract = (url = urls_1.BlockchainUrlsEnum.POLYGON_MUMBAI) => {
    const provider = new ethers_1.ethers.JsonRpcProvider(url);
    const wallet = new ethers_1.ethers.Wallet(process.env.PRIVATE_KEY, provider);
    return new ethers_1.ethers.Contract(process.env.ELECCIONES_CONTRACT_ADDRESS, Elecciones__factory_1.Elecciones__factory.abi, wallet);
};
exports.getCandidatoContract = getCandidatoContract;
// Suponiendo que quieras agregar funciones para interactuar con los métodos específicos del contrato "Candidato":
const getNombre = (contractInstance) => __awaiter(void 0, void 0, void 0, function* () {
    return yield contractInstance.getNombre();
});
exports.getNombre = getNombre;
const getVotos = (contractInstance) => __awaiter(void 0, void 0, void 0, function* () {
    return yield contractInstance.getVotos();
});
exports.getVotos = getVotos;
const votar = (contractInstance) => __awaiter(void 0, void 0, void 0, function* () {
    const tx = yield contractInstance.votar();
    return yield tx.wait();
});
exports.votar = votar;
