import hre from "hardhat";

async function main() {
    const MyToken = await hre.ethers.getContractFactory("MyToken");
    const token = await MyToken.deploy();

    await token.waitForDeployment();

    // 🔹 Obtém o endereço do contrato
    console.log(`✅ Token implantado em: ${await token.getAddress()}`);
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});