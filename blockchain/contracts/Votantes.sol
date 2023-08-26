//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract Votantes {
    struct Votante {
        string nombreCompleto;
        string rut; // RUT (Registro Único Tributario) o número de identificación
    }

    // Mapeo del RUT a la estructura Votante
    mapping(string => Votante) public votantes;
    string[] public listaRuts;

    // Registrar un votante
    function registrarVotante(string memory _nombreCompleto, string memory _rut) public {
        require(bytes(votantes[_rut].nombreCompleto).length == 0, "El votante ya fue registrado");

        Votante memory nuevoVotante = Votante({
            nombreCompleto: _nombreCompleto,
            rut: _rut
        });

        votantes[_rut] = nuevoVotante;
        listaRuts.push(_rut);
    }

    // Obtener la información de un votante por su RUT
    function obtenerVotante(string memory _rut) public view returns (string memory nombreCompleto, string memory rut) {
        Votante memory votante = votantes[_rut];
        return (votante.nombreCompleto, votante.rut);
    }

    // Obtener el total de votantes registrados
    function totalVotantes() public view returns (uint256) {
        return listaRuts.length;
    }
}
