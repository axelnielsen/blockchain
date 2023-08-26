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
exports.listaVotantes = exports.registrarVotante = exports.obtenerVotante = exports.totalVotantes = exports.getVotanteContract = void 0;
const ethers_1 = require("ethers");
const Votantes__factory_1 = require("../../../blockchain/typechain/factories/Votantes__factory"); // Asegúrate de tener la definición del contrato en typechain
const urls_1 = require("./urls");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Función para obtener una instancia del contrato Votantes
const getVotanteContract = (url = urls_1.BlockchainUrlsEnum.POLYGON_MUMBAI) => {
    const provider = new ethers_1.ethers.JsonRpcProvider(url);
    const wallet = new ethers_1.ethers.Wallet(process.env.PRIVATE_KEY, provider);
    return new ethers_1.ethers.Contract(process.env.VOTANTES_CONTRACT_ADDRESS, // Asegúrate de tener esta variable de entorno configurada
    Votantes__factory_1.Votantes__factory.abi, wallet);
};
exports.getVotanteContract = getVotanteContract;
// Función para obtener el total de votantes registrados
const totalVotantes = (contractInstance) => __awaiter(void 0, void 0, void 0, function* () {
    return yield contractInstance.totalVotantes();
});
exports.totalVotantes = totalVotantes;
// Función para obtener la información de un votante por su RUT
const obtenerVotante = (contractInstance, rut) => __awaiter(void 0, void 0, void 0, function* () {
    return yield contractInstance.obtenerVotante(rut);
});
exports.obtenerVotante = obtenerVotante;
// Función para registrar un votante
const registrarVotante = (contractInstance, nombre, rut) => __awaiter(void 0, void 0, void 0, function* () {
    const tx = yield contractInstance.registrarVotante(nombre, rut);
    return yield tx.wait();
});
exports.registrarVotante = registrarVotante;
// Función para obtener la lista completa de votantes
const listaVotantes = (contractInstance) => __awaiter(void 0, void 0, void 0, function* () {
    const total = yield (0, exports.totalVotantes)(contractInstance);
    const votantesList = [];
    for (let i = 0; i < total.toNumber(); i++) {
        const rut = yield contractInstance.listaRuts(i);
        const votante = yield (0, exports.obtenerVotante)(contractInstance, rut);
        votantesList.push({
            nombreCompleto: votante.nombreCompleto,
            rut: votante.rut
        });
    }
    return votantesList;
});
exports.listaVotantes = listaVotantes;
