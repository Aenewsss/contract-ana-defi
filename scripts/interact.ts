import { ethers } from "hardhat";
import { config } from "dotenv";
config()

async function main() {
    const contractAddress = process.env.CONTRACT_ADDRESS!   ;
    const [owner] = await ethers.getSigners();

    // 📌 Conectar ao contrato usando a ABI do ERC20
    const token = new ethers.Contract(
        contractAddress,
        [
            "function balanceOf(address) view returns (uint256)",
            "function transfer(address, uint256) returns (bool)",
            "function totalSupply() view returns (uint256)"
        ],
        owner
    );

    // 📌 Obter saldo da sua carteira
    const balance = await token.balanceOf(owner.address);
    console.log(`💰 Saldo do deployer: ${ethers.formatUnits(balance, 18)} ANA`);

    // 📌 Obter a oferta total de tokens
    const totalSupply = await token.totalSupply();
    console.log(`📊 Oferta total: ${ethers.formatUnits(totalSupply, 18)} ANA`);

    // 📌 Transferir 0.001 tokens para outro endereço (opcional)
    const recipient = "0x00000000000000"; // 📌 Insira um endereço válido
    const tx = await token.transfer(recipient, ethers.parseUnits("0.001", 18)); // 0.001 ANA
    await tx.wait();
    console.log(`✅ Transferidos 0.001 ANA para ${recipient}`);
}

main().catch((error) => {
    console.error("🚨 Erro ao interagir com o contrato:", error);
    process.exit(1);
});