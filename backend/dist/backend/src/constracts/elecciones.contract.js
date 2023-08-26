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
exports.votar = exports.getVotos = exports.getNombre = void 0;
// elecciones.js
const ethers_1 = require("ethers");
const Elecciones__factory_1 = require("../../../blockchain/typechain/factories/Elecciones__factory");
const urls_1 = require("./urls");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Esta función devuelve la instancia del contrato Elecciones.
const getEleccionesContract = () => {
    const provider = new ethers_1.ethers.JsonRpcProvider(urls_1.BlockchainUrlsEnum.POLYGON_MUMBAI);
    const wallet = new ethers_1.ethers.Wallet(process.env.PRIVATE_KEY, provider);
    return new ethers_1.ethers.Contract(process.env.ELECCIONES_CONTRACT_ADDRESS, Elecciones__factory_1.Elecciones__factory.abi, wallet);
};
// Si necesitas una función similar para otro contrato, por ejemplo, Candidato, puedes agregarla aquí:
/*
const getCandidatoContract = () => {
  const provider = new ethers.JsonRpcProvider(BlockchainUrlsEnum.POLYGON_MUMBAI);
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY!, provider);
  return new ethers.Contract(
    process.env.CANDIDATO_CONTRACT_ADDRESS!,
    Candidato__factory.abi,
    wallet
  );
};
*/
const getNombre = () => __awaiter(void 0, void 0, void 0, function* () {
    const contract = getEleccionesContract();
    return yield contract.getNombre();
});
exports.getNombre = getNombre;
const getVotos = () => __awaiter(void 0, void 0, void 0, function* () {
    const contract = getEleccionesContract();
    return yield contract.getVotos();
});
exports.getVotos = getVotos;
const votar = (idCandidato) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const contract = getEleccionesContract();
        const tx = yield contract.votar(idCandidato);
        return yield tx.wait();
    }
    catch (error) {
        console.error('Error al votar:', error);
        throw error;
    }
});
exports.votar = votar;
