import * as web3 from '@solana/web3.js';
import { Connection, PublicKey } from '@solana/web3.js';

async function getBalanceUsingWeb3(address: PublicKey): Promise<number> {
  const connection = new Connection(web3.clusterApiUrl('mainnet-beta'));
  return connection.getBalance(address);
}

async function getIsExecutable(address: PublicKey): Promise<boolean> {
  const connection = new Connection(web3.clusterApiUrl('mainnet-beta'));
  const accountInfo = await connection.getAccountInfo(address);
  if (accountInfo === null) {
    throw 'Error: cannot find the account';
  }
  return accountInfo.executable;
}

const publicKey = new PublicKey('whirLbMiicVdio4qvUfM5KAg6Ct8VwpYzGff3uctyCc');

getBalanceUsingWeb3(publicKey).then((balance) => {
  console.log('Balance in Lamports:', balance);
  console.log('Balance in SOL:', balance / web3.LAMPORTS_PER_SOL);
});

getIsExecutable(publicKey).then((isExecutable) => {
  console.log('Is executable:', isExecutable);
});