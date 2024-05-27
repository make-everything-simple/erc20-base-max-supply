// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

/// @author askbills

interface IERC20MaxSupply {
    /**
     * @dev Return maximum total supply can mint for this contract.
     */
    function maxSupply() external view returns (uint256);
}
