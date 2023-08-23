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
exports.totalVotantes = exports.obtenerVotante = exports.registrarVotante = exports.getVotantesContract = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const ethers_1 = require("ethers");
const Votantes__factory_1 = require("../../../blockchain/typechain/factories/Votantes__factory");
const urls_1 = require("./urls");
dotenv_1.default.config();
const getVotantesContract = (url = urls_1.BlockchainUrlsEnum.POLYGON_MUMBAI) => {
    const provider = new ethers_1.ethers.JsonRpcProvider(url);
    const wallet = new ethers_1.ethers.Wallet(process.env.PRIVATE_KEY, provider);
    return new ethers_1.ethers.Contract(process.env.VOTANTES_CONTRACT_ADDRESS, Votantes__factory_1.Votantes__factory.abi, wallet);
};
exports.getVotantesContract = getVotantesContract;
// Suponiendo que quieras agregar funciones para interactuar con los métodos específicos del contrato "Votantes":
const registrarVotante = (nombreCompleto, rut, contractInstance) => __awaiter(void 0, void 0, void 0, function* () {
    const tx = yield contractInstance.registrarVotante(nombreCompleto, rut);
    return yield tx.wait();
});
exports.registrarVotante = registrarVotante;
const obtenerVotante = (direccion, contractInstance) => __awaiter(void 0, void 0, void 0, function* () {
    return yield contractInstance.obtenerVotante(direccion);
});
exports.obtenerVotante = obtenerVotante;
const totalVotantes = (contractInstance) => __awaiter(void 0, void 0, void 0, function* () {
    return yield contractInstance.totalVotantes();
});
exports.totalVotantes = totalVotantes;
