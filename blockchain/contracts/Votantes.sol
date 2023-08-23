//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract Votantes {
    struct Votante {
        string nombreCompleto;
        address direccion;
        string rut; // RUT (Registro Único Tributario) o número de identificación
    }

    mapping(address => Votante) public votantes;
    address[] public listaVotantes;

    // Registrar un votante
    function registrarVotante(string memory _nombreCompleto, string memory _rut) public {
        require(bytes(votantes[msg.sender].nombreCompleto).length == 0, "El votante ya fue registrado");

        Votante memory nuevoVotante = Votante({
            nombreCompleto: _nombreCompleto,
            direccion: msg.sender,
            rut: _rut
        });

        votantes[msg.sender] = nuevoVotante;
        listaVotantes.push(msg.sender);
    }

    // Obtener la información de un votante por su dirección
    function obtenerVotante(address _direccion) public view returns (string memory, address, string memory) {
        Votante memory votante = votantes[_direccion];
        return (votante.nombreCompleto, votante.direccion, votante.rut);
    }

    // Obtener el total de votantes registrados
    function totalVotantes() public view returns (uint256) {
        return listaVotantes.length;
    }
}
