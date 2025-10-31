// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SRMBadge is ERC721, Ownable {
    uint256 public nextId;
    mapping(address => bool) public claimed;

    constructor() ERC721("SRM Badge", "SRMB") {}

    // Claim a free badge. Only one per address.
    function claimBadge() external {
        require(!claimed[msg.sender], "Already claimed");
        claimed[msg.sender] = true;
        nextId++;
        _safeMint(msg.sender, nextId);
    }

    // Admin mint (for faculty/manual issuance)
    function adminMint(address to) external onlyOwner {
        require(!claimed[to], "Already claimed");
        claimed[to] = true;
        nextId++;
        _safeMint(to, nextId);
    }
}
