"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const contract_1 = require("../../contract");
exports.default = new contract_1.ContractAbi([
    {
        "constant": true,
        "inputs": [
            {
                "name": "node",
                "type": "bytes32"
            }
        ],
        "name": "resolver",
        "outputs": [
            {
                "name": "",
                "type": "address"
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
        "name": "owner",
        "outputs": [
            {
                "name": "",
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
                "name": "label",
                "type": "bytes32"
            },
            {
                "name": "owner",
                "type": "address"
            }
        ],
        "name": "setSubnodeOwner",
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
                "name": "ttl",
                "type": "uint64"
            }
        ],
        "name": "setTTL",
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
        "name": "ttl",
        "outputs": [
            {
                "name": "",
                "type": "uint64"
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
                "name": "resolver",
                "type": "address"
            }
        ],
        "name": "setResolver",
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
                "name": "owner",
                "type": "address"
            }
        ],
        "name": "setOwner",
        "outputs": [],
        "payable": false,
        "type": "function"
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
                "name": "owner",
                "type": "address"
            }
        ],
        "name": "Transfer",
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
                "name": "label",
                "type": "bytes32"
            },
            {
                "indexed": false,
                "name": "owner",
                "type": "address"
            }
        ],
        "name": "NewOwner",
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
                "name": "resolver",
                "type": "address"
            }
        ],
        "name": "NewResolver",
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
                "name": "ttl",
                "type": "uint64"
            }
        ],
        "name": "NewTTL",
        "type": "event"
    }
]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRW5zUmVnaXN0cnlBYmkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZW5zL2NvbnRyYWN0cy9FbnNSZWdpc3RyeUFiaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDZDQUE0QztBQUM1QyxrQkFBZSxJQUFJLHNCQUFXLENBQUM7SUFDN0I7UUFDRSxVQUFVLEVBQUUsSUFBSTtRQUNoQixRQUFRLEVBQUU7WUFDUjtnQkFDRSxNQUFNLEVBQUUsTUFBTTtnQkFDZCxNQUFNLEVBQUUsU0FBUzthQUNsQjtTQUNGO1FBQ0QsTUFBTSxFQUFFLFVBQVU7UUFDbEIsU0FBUyxFQUFFO1lBQ1Q7Z0JBQ0UsTUFBTSxFQUFFLEVBQUU7Z0JBQ1YsTUFBTSxFQUFFLFNBQVM7YUFDbEI7U0FDRjtRQUNELFNBQVMsRUFBRSxLQUFLO1FBQ2hCLE1BQU0sRUFBRSxVQUFVO0tBQ25CO0lBQ0Q7UUFDRSxVQUFVLEVBQUUsSUFBSTtRQUNoQixRQUFRLEVBQUU7WUFDUjtnQkFDRSxNQUFNLEVBQUUsTUFBTTtnQkFDZCxNQUFNLEVBQUUsU0FBUzthQUNsQjtTQUNGO1FBQ0QsTUFBTSxFQUFFLE9BQU87UUFDZixTQUFTLEVBQUU7WUFDVDtnQkFDRSxNQUFNLEVBQUUsRUFBRTtnQkFDVixNQUFNLEVBQUUsU0FBUzthQUNsQjtTQUNGO1FBQ0QsU0FBUyxFQUFFLEtBQUs7UUFDaEIsTUFBTSxFQUFFLFVBQVU7S0FDbkI7SUFDRDtRQUNFLFVBQVUsRUFBRSxLQUFLO1FBQ2pCLFFBQVEsRUFBRTtZQUNSO2dCQUNFLE1BQU0sRUFBRSxNQUFNO2dCQUNkLE1BQU0sRUFBRSxTQUFTO2FBQ2xCO1lBQ0Q7Z0JBQ0UsTUFBTSxFQUFFLE9BQU87Z0JBQ2YsTUFBTSxFQUFFLFNBQVM7YUFDbEI7WUFDRDtnQkFDRSxNQUFNLEVBQUUsT0FBTztnQkFDZixNQUFNLEVBQUUsU0FBUzthQUNsQjtTQUNGO1FBQ0QsTUFBTSxFQUFFLGlCQUFpQjtRQUN6QixTQUFTLEVB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