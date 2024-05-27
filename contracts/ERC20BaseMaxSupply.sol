// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@thirdweb-dev/contracts/base/ERC20Base.sol";
import './IERC20MaxSupply.sol';

contract ERC20BaseMaxSupply is ERC20Base, IERC20MaxSupply {
    // 18 decimals
    uint256 private immutable _maxSupply;
	
    /**
     * @dev Sets the values for {name}, {symbol}, and {maxTotalSupply}.
     *
     * The default value of {decimals} is 18. To select a different value for
     * {decimals} you should overload it.
     *
     * All 3 of these values are immutable: they can only be set once during
     * construction.
     */
    constructor(
        address _defaultAdmin,
        string memory _name,
        string memory _symbol,
        uint256 maxTotalSupply
    )
        ERC20Base(
            _defaultAdmin,
            _name,
            _symbol
        )
    {
        _maxSupply = maxTotalSupply;
    }

    /**
     *  @notice          Lets an authorized address mint tokens to a recipient if not exceed the max total supply
     *  @dev             The logic in the `_canMint` function determines whether the caller is authorized to mint tokens.
     *
     *  @param _to       The recipient of the tokens to mint.
     *  @param _amount   Quantity of tokens to mint.
     */
    function mintTo(address _to, uint256 _amount) public virtual override {
        require(_canMint(), "Not authorized to mint.");
        require(_amount != 0, "Minting zero tokens.");
        require(_maxSupply >= (totalSupply() + _amount), "Cannot exceed max supply");
        _mint(_to, _amount);
    }

    /**
     * @dev return the maximum total Supply for this contract
     */
    function maxSupply() public view virtual override returns (uint256) {
        return _maxSupply;
    }
}