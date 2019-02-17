"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const contract_1 = require("../../contract");
exports.default = new contract_1.ContractAbi([
    {
        "constant": true,
        "inputs": [
            {
                "name": "interfaceID",
                "type": "bytes4"
            }
        ],
        "name": "supportsInterface",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "node",
                "type": "bytes32"
            },
            {
                "name": "contentTypes",
                "type": "uint256"
            }
        ],
        "name": "ABI",
        "outputs": [
            {
                "name": "contentType",
                "type": "uint256"
            },
            {
                "name": "data",
                "type": "bytes"
            }
        ],
        "payable": false,
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "node",
                "type": "bytes32"
            },
            {
                "name": "hash",
                "type": "bytes"
            }
        ],
        "name": "setMultihash",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "node",
                "type": "bytes32"
            }
        ],
        "name": "multihash",
        "outputs": [
            {
                "name": "",
                "type": "bytes"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "node",
                "type": "bytes32"
            },
            {
                "name": "x",
                "type": "bytes32"
            },
            {
                "name": "y",
                "type": "bytes32"
            }
        ],
        "name": "setPubkey",
        "outputs": [],
        "payable": false,
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "node",
                "type": "bytes32"
            }
        ],
        "name": "content",
        "outputs": [
            {
                "name": "ret",
                "type": "bytes32"
            }
        ],
        "payable": false,
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "node",
                "type": "bytes32"
            }
        ],
        "name": "addr",
        "outputs": [
            {
                "name": "ret",
                "type": "address"
            }
        ],
        "payable": false,
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "node",
                "type": "bytes32"
            },
            {
                "name": "contentType",
                "type": "uint256"
            },
            {
                "name": "data",
                "type": "bytes"
            }
        ],
        "name": "setABI",
        "outputs": [],
        "payable": false,
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "node",
                "type": "bytes32"
            }
        ],
        "name": "name",
        "outputs": [
            {
                "name": "ret",
                "type": "string"
            }
        ],
        "payable": false,
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "node",
                "type": "bytes32"
            },
            {
                "name": "name",
                "type": "string"
            }
        ],
        "name": "setName",
        "outputs": [],
        "payable": false,
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "node",
                "type": "bytes32"
            },
            {
                "name": "hash",
                "type": "bytes32"
            }
        ],
        "name": "setContent",
        "outputs": [],
        "payable": false,
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "node",
                "type": "bytes32"
            }
        ],
        "name": "pubkey",
        "outputs": [
            {
                "name": "x",
                "type": "bytes32"
            },
            {
                "name": "y",
                "type": "bytes32"
            }
        ],
        "payable": false,
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "node",
                "type": "bytes32"
            },
            {
                "name": "addr",
                "type": "address"
            }
        ],
        "name": "setAddr",
        "outputs": [],
        "payable": false,
        "type": "function"
    },
    {
        "inputs": [
            {
                "name": "ensAddr",
                "type": "address"
            }
        ],
        "payable": false,
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "node",
                "type": "bytes32"
            },
            {
                "indexed": false,
                "name": "a",
                "type": "address"
            }
        ],
        "name": "AddrChanged",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "node",
                "type": "bytes32"
            },
            {
                "indexed": false,
                "name": "hash",
                "type": "bytes32"
            }
        ],
        "name": "ContentChanged",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "node",
                "type": "bytes32"
            },
            {
                "indexed": false,
                "name": "name",
                "type": "string"
            }
        ],
        "name": "NameChanged",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "node",
                "type": "bytes32"
            },
            {
                "indexed": true,
                "name": "contentType",
                "type": "uint256"
            }
        ],
        "name": "ABIChanged",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "node",
                "type": "bytes32"
            },
            {
                "indexed": false,
                "name": "x",
                "type": "bytes32"
            },
            {
                "indexed": false,
                "name": "y",
                "type": "bytes32"
            }
        ],
        "name": "PubkeyChanged",
        "type": "event"
    }
]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRW5zUmVzb2x2ZXJBYmkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZW5zL2NvbnRyYWN0cy9FbnNSZXNvbHZlckFiaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDZDQUE0QztBQUM1QyxrQkFBZSxJQUFJLHNCQUFXLENBQUM7SUFDN0I7UUFDRSxVQUFVLEVBQUUsSUFBSTtRQUNoQixRQUFRLEVBQUU7WUFDUjtnQkFDRSxNQUFNLEVBQUUsYUFBYTtnQkFDckIsTUFBTSxFQUFFLFFBQVE7YUFDakI7U0FDRjtRQUNELE1BQU0sRUFBRSxtQkFBbUI7UUFDM0IsU0FBUyxFQUFFO1lBQ1Q7Z0JBQ0UsTUFBTSxFQUFFLEVBQUU7Z0JBQ1YsTUFBTSxFQUFFLE1BQU07YUFDZjtTQUNGO1FBQ0QsU0FBUyxFQUFFLEtBQUs7UUFDaEIsTUFBTSxFQUFFLFVBQVU7S0FDbkI7SUFDRDtRQUNFLFVBQVUsRUFBRSxJQUFJO1FBQ2hCLFFBQVEsRUFBRTtZQUNSO2dCQUNFLE1BQU0sRUFBRSxNQUFNO2dCQUNkLE1BQU0sRUFBRSxTQUFTO2FBQ2xCO1lBQ0Q7Z0JBQ0UsTUFBTSxFQUFFLGNBQWM7Z0JBQ3RCLE1BQU0sRUFBRSxTQUFTO2FBQ2xCO1NBQ0Y7UUFDRCxNQUFNLEVBQUUsS0FBSztRQUNiLFNBQVMsRUFBRTtZQUNUO2dCQUNFLE1BQU0sRUFBRSxhQUFhO2dCQUNyQixNQUFNLEVBQUUsU0FBUzthQUNsQjtZQUNEO2dCQUNFLE1BQU0sRUFBRSxNQUFNO2dCQUNkLE1BQU0sRUFBRSxPQUFPO2FBQ2hCO1NBQ0Y7UUFDRCxTQUFTLEVBQUUsS0FBSztRQUNoQixNQUFNLEVBQUUsVUFBVTtLQUNuQjtJQUNEO1FBQ0UsVUFBVSxFQUFFLEtBQUs7UUFDakIsUUFBUSxFQUFFO1lBQ1I7Z0JBQ0UsTUFBTSxFQUFFLE1BQU07Z0JBQ2QsTUFBTSxFQUFFLFNBQVM7YUFDbEI7WUFDRDtnQkFDRSxNQUFNLEVBQUUsTUFBTTtnQkFDZCxNQUFN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