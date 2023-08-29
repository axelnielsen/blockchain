//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract Elecciones {
    struct Candidato {
        string nombre;
        uint256 votos;
    }

    mapping(uint256 => Candidato) public candidatos;
    uint256 public totalCandidatos;

    function agregarCandidato(string memory _nombre) public {
        candidatos[totalCandidatos] = Candidato(_nombre, 0);
        totalCandidatos += 1;
    }

    function votar(uint256 _idCandidato) public {
        require(_idCandidato < totalCandidatos, "Candidato no existe, favor ingresarlo previo a votar.");
        candidatos[_idCandidato].votos += 1;
    }

    function getNombre(uint256 _idCandidato) public view returns (string memory) {
        require(_idCandidato < totalCandidatos, "Candidato no existe, favor ingresarlo previo a votar.");
        return candidatos[_idCandidato].nombre;
    }

    function getVotos(uint256 _idCandidato) public view returns (uint256) {
        require(_idCandidato < totalCandidatos, "Candidato no existe");
        return candidatos[_idCandidato].votos;
    }
}