import { ConfirmedTransaction, Connection, PublicKey } from "@solana/web3.js";

export async function getTransactions(
  connection: Connection,
  address: PublicKey
) {
  const transSignatures = await connection.getConfirmedSignaturesForAddress2(
    address
  );
  const transactions = new Array<TransactionWithSignature>();

  for (let i = 0; i < transSignatures.length; i++) {
    const signature = transSignatures[i].signature;
    const confirmedTransaction = await connection.getConfirmedTransaction(
      signature
    );

    if (confirmedTransaction) {
      const transWithSignature = new TransactionWithSignature(
        signature,
        confirmedTransaction
      );
      transactions.push(transWithSignature);
    }
  }

  return transactions;
}

export class TransactionWithSignature {
  constructor(
    public signature: string,
    public confirmedTransaction: ConfirmedTransaction
  ) {}
}
