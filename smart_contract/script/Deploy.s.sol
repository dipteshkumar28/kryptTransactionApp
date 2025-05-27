// SPDX-License-Identifier:MIT
pragma solidity ^0.8.0;

import {Script,console} from "../lib/forge-std/src/Script.sol";
import {Transactions} from "../src/Transactions.sol";

contract DeployTransaction is Script {
    function run() external {
        vm.startBroadcast();
        Transactions transaction = new Transactions();
        console.log("Transactions address:", address(transaction));
        vm.stopBroadcast();
    }
}
