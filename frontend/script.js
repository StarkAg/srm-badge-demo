// Replace with your deployed contract address after deploy
const CONTRACT_ADDRESS = "0xd3DCcCE2eD92Cf9C8062C6dc25532E21cbDA1189";
const ABI = [
  "function claimBadge() external",
  "function claimed(address) view returns (bool)"
];

let provider, signer, contract;

const connectBtn = document.getElementById('connect');
const claimBtn = document.getElementById('claim');
const status = document.getElementById('status');

async function connectWallet() {
  if (!window.ethereum) {
    status.innerText = "No MetaMask detected. Install it first.";
    return;
  }
  provider = new ethers.providers.Web3Provider(window.ethereum, "any");
  await provider.send("eth_requestAccounts", []);
  signer = provider.getSigner();
  const addr = await signer.getAddress();
  status.innerText = "Connected: " + addr;
  contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
  connectBtn.disabled = true;
  await checkClaimed(addr);
}

async function checkClaimed(addr) {
  try {
    const claimed = await contract.claimed(addr);
    if (claimed) {
      status.innerText = `Already claimed — address ${addr}`;
      claimBtn.disabled = true;
    } else {
      status.innerText = `Connected: ${addr} — Ready to claim`;
      claimBtn.disabled = false;
    }
  } catch (err) {
    console.error(err);
    status.innerText = "Error reading contract. Ensure you're on Polygon Amoy and address is correct.";
  }
}

connectBtn.onclick = connectWallet;

claimBtn.onclick = async () => {
  if (!contract) { status.innerText = "Connect wallet first"; return; }
  try {
    claimBtn.disabled = true;
    status.innerText = "Sending transaction — check MetaMask...";
    const tx = await contract.claimBadge();
    status.innerText = "Waiting for confirmation...";
    await tx.wait();
    status.innerText = "Badge claimed! Check your wallet (OpenSea testnets or PolygonScan).";
  } catch (err) {
    console.error(err);
    status.innerText = "Transaction failed or cancelled.";
    claimBtn.disabled = false;
  }
};