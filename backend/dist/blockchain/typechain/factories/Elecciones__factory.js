"use strict";
/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Elecciones__factory = void 0;
const ethers_1 = require("ethers");
const _abi = [
    {
        inputs: [
            {
                internalType: "string",
                name: "_nombre",
                type: "string",
            },
        ],
        name: "agregarCandidato",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        name: "candidatos",
        outputs: [
            {
                internalType: "string",
                name: "nombre",
                type: "string",
            },
            {
                internalType: "uint256",
                name: "votos",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_idCandidato",
                type: "uint256",
            },
        ],
        name: "getNombre",
        outputs: [
            {
                internalType: "string",
                name: "",
                type: "string",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_idCandidato",
                type: "uint256",
            },
        ],
        name: "getVotos",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "totalCandidatos",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_idCandidato",
                type: "uint256",
            },
        ],
        name: "votar",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
];
const _bytecode = "0x608060405234801561001057600080fd5b5061093f806100206000396000f3fe608060405234801561001057600080fd5b50600436106100625760003560e01c80632160683114610067578063503c560f146100835780638f023f851461009f578063a7217629146100d0578063bc83abde14610100578063f485c6791461011e575b600080fd5b610081600480360381019061007c9190610593565b61014e565b005b61009d60048036038101906100989190610552565b6101c2565b005b6100b960048036038101906100b49190610593565b610232565b6040516100c7929190610649565b60405180910390f35b6100ea60048036038101906100e59190610593565b6102de565b6040516100f79190610627565b60405180910390f35b6101086103c9565b6040516101159190610699565b60405180910390f35b61013860048036038101906101339190610593565b6103cf565b6040516101459190610699565b60405180910390f35b6001548110610192576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161018990610679565b60405180910390fd5b600160008083815260200190815260200160002060010160008282546101b89190610726565b9250508190555050565b6040518060400160405280828152602001600081525060008060015481526020019081526020016000206000820151816000019080519060200190610208929190610432565b506020820151816001015590505060018060008282546102289190610726565b9250508190555050565b6000602052806000526040600020600091509050806000018054610255906107c8565b80601f0160208091040260200160405190810160405280929190818152602001828054610281906107c8565b80156102ce5780601f106102a3576101008083540402835291602001916102ce565b820191906000526020600020905b8154815290600101906020018083116102b157829003601f168201915b5050505050908060010154905082565b60606001548210610324576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161031b90610679565b60405180910390fd5b6000808381526020019081526020016000206000018054610344906107c8565b80601f0160208091040260200160405190810160405280929190818152602001828054610370906107c8565b80156103bd5780601f10610392576101008083540402835291602001916103bd565b820191906000526020600020905b8154815290600101906020018083116103a057829003601f168201915b50505050509050919050565b60015481565b60006001548210610415576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161040c90610679565b60405180910390fd5b600080838152602001908152602001600020600101549050919050565b82805461043e906107c8565b90600052602060002090601f01602090048101928261046057600085556104a7565b82601f1061047957805160ff19168380011785556104a7565b828001600101855582156104a7579182015b828111156104a657825182559160200191906001019061048b565b5b5090506104b491906104b8565b5090565b5b808211156104d15760008160009055506001016104b9565b5090565b60006104e86104e3846106d9565b6106b4565b90508281526020810184848401111561050057600080fd5b61050b848285610786565b509392505050565b600082601f83011261052457600080fd5b81356105348482602086016104d5565b91505092915050565b60008135905061054c816108f2565b92915050565b60006020828403121561056457600080fd5b600082013567ffffffffffffffff81111561057e57600080fd5b61058a84828501610513565b91505092915050565b6000602082840312156105a557600080fd5b60006105b38482850161053d565b91505092915050565b60006105c78261070a565b6105d18185610715565b93506105e1818560208601610795565b6105ea816108b8565b840191505092915050565b6000610602601383610715565b915061060d826108c9565b602082019050919050565b6106218161077c565b82525050565b6000602082019050818103600083015261064181846105bc565b905092915050565b6000604082019050818103600083015261066381856105bc565b90506106726020830184610618565b9392505050565b60006020820190508181036000830152610692816105f5565b9050919050565b60006020820190506106ae6000830184610618565b92915050565b60006106be6106cf565b90506106ca82826107fa565b919050565b6000604051905090565b600067ffffffffffffffff8211156106f4576106f3610889565b5b6106fd826108b8565b9050602081019050919050565b600081519050919050565b600082825260208201905092915050565b60006107318261077c565b915061073c8361077c565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff038211156107715761077061082b565b5b828201905092915050565b6000819050919050565b82818337600083830152505050565b60005b838110156107b3578082015181840152602081019050610798565b838111156107c2576000848401525b50505050565b600060028204905060018216806107e057607f821691505b602082108114156107f4576107f361085a565b5b50919050565b610803826108b8565b810181811067ffffffffffffffff8211171561082257610821610889565b5b80604052505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6000601f19601f8301169050919050565b7f43616e64696461746f206e6f2065786973746500000000000000000000000000600082015250565b6108fb8161077c565b811461090657600080fd5b5056fea26469706673582212208b7ca0cb322148d469eb9f9a553a48542ca6707d58acf904a563f993d0a2b5da64736f6c63430008040033";
class Elecciones__factory extends ethers_1.ContractFactory {
    constructor(...args) {
        if (args.length === 1) {
            super(_abi, _bytecode, args[0]);
        }
        else {
            super(...args);
        }
    }
    deploy(overrides) {
        return super.deploy(overrides || {});
    }
    getDeployTransaction(overrides) {
        return super.getDeployTransaction(overrides || {});
    }
    attach(address) {
        return super.attach(address);
    }
    connect(signer) {
        return super.connect(signer);
    }
    static createInterface() {
        return new ethers_1.utils.Interface(_abi);
    }
    static connect(address, signerOrProvider) {
        return new ethers_1.Contract(address, _abi, signerOrProvider);
    }
}
exports.Elecciones__factory = Elecciones__factory;
Elecciones__factory.bytecode = _bytecode;
Elecciones__factory.abi = _abi;
