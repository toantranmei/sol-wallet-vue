console.log("run here");
import EventEmitter from "eventemitter3";
import {
  Connection,
  PublicKey,
  SystemProgram,
  Transaction,
  TransactionInstruction,
} from "@solana/web3.js";
import Wallet from "@project-serum/sol-wallet-adapter";

export interface WalletAdapter extends EventEmitter {
  publicKey: PublicKey | null;
  signTransaction: (transaction: Transaction) => Promise<Transaction>;
  connect: () => any;
}

const cluster = "http://api.devnet.solana.com";
const connection = new Connection(cluster, "confirmed");
console.log("conn: ", connection);
const wallet: WalletAdapter = new Wallet("https://www.sollet.io", cluster);
console.log("wallet: ", wallet);

export async function setWalletTransaction(
  instruction: TransactionInstruction
): Promise<Transaction> {
  const transaction = new Transaction();
  transaction.add(instruction);
  transaction.feePayer = wallet!.publicKey!;

  const hash = await connection.getRecentBlockhash();
  transaction.recentBlockhash = hash.blockhash;

  return transaction;
}

export async function signAndSendTransaction(
  wallet: WalletAdapter,
  transaction: Transaction
): Promise<string> {
  const signedTrans = await wallet.signTransaction(transaction);
  const signature = await connection.sendRawTransaction(
    signedTrans.serialize()
  );

  return signature;
}

export async function sendMoney(
  destPubkeyStr: string,
  lamports: number = 500 * 1000000
) {
  try {
    const destPubkey = new PublicKey(destPubkeyStr);
    const walletAccountInfo = await connection.getAccountInfo(
      wallet!.publicKey!
    );

    console.log("walletAccountInfo data: ", walletAccountInfo?.data.length);

    const receiverAccountInfo = await connection.getAccountInfo(destPubkey);

    console.log("receiverAccountInfo data: ", receiverAccountInfo?.data.length);

    const instruction = SystemProgram.transfer({
      fromPubkey: wallet!.publicKey!,
      toPubkey: destPubkey,
      lamports,
    });

    const trans = await setWalletTransaction(instruction);
    const signature = await signAndSendTransaction(wallet, trans);
    const result = await connection.confirmTransaction(
      signature,
      "singleGossip"
    );

    console.log("send money: ", result);
  } catch (error) {
    console.log("failed to send money: ", error);
  }
}

export async function initWallet(): Promise<[Connection, WalletAdapter]> {
  await wallet.connect();
  console.log("wallet publicKey", wallet?.publicKey?.toBase58());

  return [connection, wallet];
}
