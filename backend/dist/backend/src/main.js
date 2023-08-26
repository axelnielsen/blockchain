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
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const candidato_contract_1 = require("./constracts/candidato.contract"); // Importa la función para obtener el contrato de Elecciones
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 20001; // Agregado un valor por defecto por si no se define PORT en .env
app.use((0, cors_1.default)()); // Usar cors de esta manera es más simple y efectivo que con app.options y app.all
// Endpoints para Elecciones
app.get('/elecciones/candidatos', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const contract = (0, candidato_contract_1.getCandidatoContract)();
    const totalCandidatosBN = yield contract.totalCandidatos();
    const totalCandidatos = totalCandidatosBN;
    const candidatosList = [];
    for (let i = 0; i < totalCandidatos; i++) {
        const nombre = yield contract.getNombre(i);
        candidatosList.push(nombre); // Agrega cada nombre al arreglo
    }
    res.json(candidatosList);
}));
app.post('/elecciones/agregarCandidato', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const nombre = req.query.nombre;
    const contract = (0, candidato_contract_1.getCandidatoContract)();
    const tx = yield contract.agregarCandidato(nombre);
    const receipt = yield tx.wait(); // Espera a que la transacción se confirme
    if (receipt.status === 1) {
        res.json({
            success: true,
            message: 'Candidato agregado con éxito'
        });
    }
    else {
        res.status(400).json({
            success: false,
            message: 'Hubo un error al agregar el candidato'
        });
    }
}));
app.post('/elecciones/votarPorCandidato', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const contract = (0, candidato_contract_1.getCandidatoContract)();
    ///const idCandidato = req.query.id;
    const { idCandidato } = req.body;
    const tx = yield contract.votarPorCandidato(Number(idCandidato));
    yield tx.wait();
}));
app.listen(port, () => {
    console.log(`⚡️[server]: DApp API Server is running at http://localhost:${port}`);
});
