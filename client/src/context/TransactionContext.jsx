import React, { useState, useEffect } from "react";
import { Contract, BrowserProvider, parseEther } from "ethers";

import { contractABI, contractAddress } from "../utils/constants";
import { toast } from "react-hot-toast";

export const TransactionContext = React.createContext();

const getEthereumContract = async () => {
    const { ethereum } = window;
    if (!ethereum) throw new Error("MetaMask not installed");

    const provider = new BrowserProvider(ethereum);
    const signer = await provider.getSigner();
    const transactionContract = new Contract(contractAddress, contractABI, signer);

    console.log({ provider, signer, transactionContract });
    return transactionContract;
};

export const TransactionProvider = ({ children }) => {
    const [currentAccount, setCurrentAccount] = useState("");
    const [formData, setFormData] = useState({ addressTo: "", amount: "", keyword: "", message: "" });
    const [isLoading, setIsLoading] = useState(false);
    const [transactionCount, setTransactionCount] = useState(localStorage.getItem("transactionCount"));
    const [transactions, setTransactions] = useState([]);
    const [clearedTransactionIds, setClearedTransactionIds] = useState(new Set());

    const handleChange = (e, name) => {
        setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
    };

    const getAllTransactions = async () => {
        try {
            if (!window.ethereum) {
                console.log("Ethereum is not present");
                return;
            }

            const transactionContract = await getEthereumContract();
            const availableTransactions = await transactionContract.getAllTransactions();

            const structuredTransactions = availableTransactions.map((transaction, index) => ({
                transactionId: `blockchain-${transaction.sender}-${transaction.timestamp}-${index}`,
                addressTo: transaction.receiver,
                addressFrom: transaction.sender,
                timestamp: new Date(Number(transaction.timestamp) * 1000).toLocaleString(),
                message: transaction.message,
                keyword: transaction.keyword,
                amount: parseFloat(parseFloat(transaction.amount) / 1e18),
            }));

            // Filter out cleared transactions
            const visibleTransactions = structuredTransactions.filter(
                transaction => !clearedTransactionIds.has(transaction.transactionId)
            );

            setTransactions(visibleTransactions);
        } catch (error) {
            console.error("Error fetching transactions:", error);
        }
    };

    const clearTransactions = (transactionIds) => {
        try {
            // Add transaction IDs to the cleared set (this hides them from the UI)
            const newClearedIds = new Set([...clearedTransactionIds, ...transactionIds]);
            setClearedTransactionIds(newClearedIds);

            // Filter out cleared transactions from current state
            const remainingTransactions = transactions.filter(
                transaction => !transactionIds.includes(transaction.transactionId)
            );
            setTransactions(remainingTransactions);

            // Store cleared transaction IDs in localStorage for persistence
            localStorage.setItem('clearedTransactionIds', JSON.stringify([...newClearedIds]));

            toast.success(`🗑️ ${transactionIds.length} transaction${transactionIds.length > 1 ? 's' : ''} cleared successfully!`);

            // Note: Actual blockchain transactions cannot be deleted from the blockchain
            // This function only hides them from the UI
            console.log(`Cleared ${transactionIds.length} transactions from UI`);

        } catch (error) {
            console.error("Error clearing transactions:", error);
            toast.error("Failed to clear transactions");
        }
    };

    const restoreAllTransactions = () => {
        try {
            // Clear the cleared transactions set
            setClearedTransactionIds(new Set());
            localStorage.removeItem('clearedTransactionIds');
            
            // Refresh transactions to show all again
            getAllTransactions();
            
            toast.success("🔄 All transactions restored!");
        } catch (error) {
            console.error("Error restoring transactions:", error);
            toast.error("Failed to restore transactions");
        }
    };

    const checkIfWalletIsConnected = async () => {
        try {
            if (!window.ethereum) return alert("Please install MetaMask");
            const accounts = await window.ethereum.request({ method: 'eth_accounts' });

            if (accounts.length) {
                setCurrentAccount(accounts[0]);
                getAllTransactions();
            } else {
                console.log("No accounts found");
            }
        } catch (error) {
            console.error("Error checking wallet connection:", error);
        }
    };

    const checkIfTransactionsExist = async () => {
        try {
            if (window.ethereum) {
                const transactionContract = await getEthereumContract();
                const currentTransactionCount = await transactionContract.getTransactionCount();
                window.localStorage.setItem("transactionCount", currentTransactionCount.toString());
            }
        } catch (error) {
            console.error("Error checking transaction count:", error);
        }
    };

    const sendTransaction = async () => {
        try {
            if (!window.ethereum) return alert("Please install MetaMask");
            const { addressTo, amount, keyword, message } = formData;
            const transactionContract = await getEthereumContract();
            const parsedAmount = parseEther(amount);

            await window.ethereum.request({
                method: 'eth_sendTransaction',
                params: [{
                    from: currentAccount,
                    to: addressTo,
                    gas: '0x5208',
                    value: parsedAmount.toString(),
                }],
            });

            const transactionHash = await transactionContract.addToBlockchain(addressTo, parsedAmount, keyword, message);
            setIsLoading(true);
            console.log(`Loading - ${transactionHash.hash}`);
            await transactionHash.wait();
            setIsLoading(false);
            console.log(`Success - ${transactionHash.hash}`);

            toast.success("🎉 Transaction sent successfully!!!");

            const transactionCount = await transactionContract.getTransactionCount();
            setTransactionCount(Number(transactionCount));
            window.location.reload();

        } catch (error) {
            console.error("Error sending transaction:", error);
        }
    };

    const connectWallet = async () => {
        try {
            if (!window.ethereum) return alert("Please install MetaMask");
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            setCurrentAccount(accounts[0]);
        } catch (error) {
            console.error("Error connecting to wallet:", error);
        }
    };

    // Load cleared transaction IDs from localStorage on mount
    useEffect(() => {
        const storedClearedIds = localStorage.getItem('clearedTransactionIds');
        if (storedClearedIds) {
            try {
                const parsedIds = JSON.parse(storedClearedIds);
                setClearedTransactionIds(new Set(parsedIds));
            } catch (error) {
                console.error("Error parsing cleared transaction IDs:", error);
            }
        }
    }, []);

    useEffect(() => {
        checkIfWalletIsConnected();
        checkIfTransactionsExist();
    }, []);

    // Re-fetch transactions when clearedTransactionIds changes
    useEffect(() => {
        if (currentAccount) {
            getAllTransactions();
        }
    }, [clearedTransactionIds, currentAccount]);

    return (
        <TransactionContext.Provider
            value={{
                connectWallet,
                currentAccount,
                formData,
                setFormData,
                handleChange,
                sendTransaction,
                transactions,
                isLoading,
                clearTransactions,
                restoreAllTransactions,
                clearedTransactionIds,
            }}
        >
            {children}
        </TransactionContext.Provider>
    );
};