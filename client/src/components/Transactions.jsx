import React, { useContext, useState } from 'react';
import { TransactionContext } from '../context/TransactionContext';
import DummyData from "../utils/DummyData";
import useFetch from '../hooks/useFetch';
import { Trash2, Check, X, RotateCcw } from 'lucide-react';

const TransactionCard = ({ 
  addressTo, 
  addressFrom, 
  timestamp, 
  message, 
  keyword, 
  amount, 
  url, 
  isSelected, 
  onSelect, 
  transactionId 
}) => {
  const gifUrl = useFetch({ keyword });
  
  return (
    <div 
      className={`bg-[#181918] m-4 flex flex-1 3xl:min-w-[450px] 2xl:max-w-[500px] sm:min-w-[270px] sm:max-w-[300px] min-w-full flex-col p-3 rounded-md hover:shadow-2xl cursor-pointer transition-all duration-200 relative ${
        isSelected ? 'ring-2 ring-blue-500 ring-opacity-60 transform scale-105' : ''
      }`}
      onClick={() => onSelect(transactionId)}
    >
      {/* Selection Indicator */}
      <div className={`absolute top-3 right-3 z-10 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
        isSelected
          ? 'bg-blue-500 border-blue-500'
          : 'bg-transparent border-gray-400'
      }`}>
        {isSelected && (
          <Check size={14} className="text-white" />
        )}
      </div>

      <div className="flex flex-col items-center w-full mt-3">
        <div className="display-flex justify-start w-full mb-6 p-2">
          <a href={`https://sepolia.etherscan.io/address/${addressFrom}`} target="_blank" rel="noopener noreferrer">
            <p className="text-white text-base">From: {addressFrom.slice(0, 6)}...{addressFrom.slice(-4)}</p>
          </a>
          <a href={`https://sepolia.etherscan.io/address/${addressTo}`} target="_blank" rel="noopener noreferrer">
            <p className="text-white text-base">To: {addressTo.slice(0, 6)}...{addressTo.slice(-4)}</p>
          </a>
          <p className="text-white text-base">Amount: {amount} ETH</p>
          {
            message && (
              <>
                <br />
                <p className="text-white text-base">Message: {message}</p>
              </>
            )
          }
        </div>
        <img 
          src={gifUrl || url} 
          alt="gif" 
          className="w-full h-64 2xl:h-72 rounded-md shadow-lg object-cover" 
          loading="lazy"
        />
        <div className="bg-black p-3 px-5 w-max rounded-3xl -mt-5 shadow-2xl">
          <p className="text-[#37c7da] font-bold">{timestamp}</p>
        </div>
      </div>
    </div>
  )
}

const Transactions = () => {
  const { 
    currentAccount, 
    transactions, 
    clearTransactions, 
    restoreAllTransactions 
  } = useContext(TransactionContext);
  
  const [selectedTransactions, setSelectedTransactions] = useState(new Set());
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [localDummyData, setLocalDummyData] = useState(DummyData);

  // Combine and add unique IDs to transactions
  const dummyWithIds = localDummyData.map((transaction, index) => ({
    ...transaction,
    transactionId: transaction.transactionId || `dummy-${transaction.addressFrom}-${transaction.timestamp}-${index}`
  }));

  const allTransactions = [...dummyWithIds, ...transactions].reverse();

  const toggleTransactionSelection = (transactionId) => {
    const newSelected = new Set(selectedTransactions);
    if (newSelected.has(transactionId)) {
      newSelected.delete(transactionId);
    } else {
      newSelected.add(transactionId);
    }
    setSelectedTransactions(newSelected);
  };

  const selectAll = () => {
    if (selectedTransactions.size === allTransactions.length) {
      setSelectedTransactions(new Set());
    } else {
      setSelectedTransactions(new Set(allTransactions.map(t => t.transactionId)));
    }
  };

  const clearSelectedTransactions = () => {
    // Separate dummy data and blockchain transactions
    const dummyIds = [];
    const blockchainIds = [];

    selectedTransactions.forEach(id => {
      if (id.startsWith('dummy-')) {
        dummyIds.push(id);
      } else if (id.startsWith('blockchain-')) {
        blockchainIds.push(id);
      }
    });

    // Remove selected dummy transactions
    if (dummyIds.length > 0) {
      const remainingDummyData = localDummyData.filter(
        (transaction, index) => {
          const transactionId = transaction.transactionId || `dummy-${transaction.addressFrom}-${transaction.timestamp}-${index}`;
          return !dummyIds.includes(transactionId);
        }
      );
      setLocalDummyData(remainingDummyData);
    }

    // Clear blockchain transactions using context function
    if (blockchainIds.length > 0 && clearTransactions) {
      clearTransactions(blockchainIds);
    }

    setSelectedTransactions(new Set());
    setShowConfirmation(false);
  };

  const handleClearClick = () => {
    if (selectedTransactions.size > 0) {
      setShowConfirmation(true);
    }
  };

  const handleRestoreAll = () => {
    // Restore dummy data
    setLocalDummyData(DummyData);
    
    // Restore blockchain transactions
    if (restoreAllTransactions) {
      restoreAllTransactions();
    }
    
    setSelectedTransactions(new Set());
  };

  return (
    <div className="flex w-full justify-center items-center 2xl:px-20 gradient-bg-transactions">
      <div className="flex flex-col md:p-12 py-12 px-4">
        {
          currentAccount ? (
            <div className="text-center">
              <h3 className="text-white text-4xl text-center my-2 font-semibold">Latest Transactions</h3>
              
              {/* Control Bar */}
              <div className="flex justify-center items-center gap-5 mt-6 mb-4 flex-wrap">
                <button
                  onClick={selectAll}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 font-medium"
                >
                  {selectedTransactions.size === allTransactions.length ? 'Deselect All' : 'Select All'}
                </button>
                
                <button
                  onClick={handleClearClick}
                  disabled={selectedTransactions.size === 0}
                  className={`px-6 py-2 rounded-lg font-medium flex items-center gap-2 transition-all duration-200 ${
                    selectedTransactions.size === 0
                      ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                      : 'bg-red-600 hover:bg-red-700 text-white shadow-lg hover:shadow-red-500/25'
                  }`}
                >
                  <Trash2 size={18} />
                  Clear Selected ({selectedTransactions.size})
                </button>

                <button
                  onClick={handleRestoreAll}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-200 font-medium flex items-center gap-2"
                >
                  <RotateCcw size={18} />
                  Restore All
                </button>
              </div>
            </div>
          ) : (
            <h3 className="text-white text-3xl text-center my-2">Connect your account to see the latest transactions</h3>
          )
        }

        <div className="flex flex-wrap justify-center items-center mt-10">
          {allTransactions.map((transaction) => (
            <TransactionCard 
              key={transaction.transactionId} 
              {...transaction} 
              isSelected={selectedTransactions.has(transaction.transactionId)}
              onSelect={toggleTransactionSelection}
            />
          ))}
        </div>

        {/* Empty State */}
        {allTransactions.length === 0 && currentAccount && (
          <div className="text-center py-20">
            <div className="text-gray-400 text-xl mb-4">No transactions found</div>
            <div className="text-gray-500">All transactions have been cleared</div>
            <button
              onClick={handleRestoreAll}
              className="mt-4 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-200 font-medium flex items-center gap-2 mx-auto"
            >
              <RotateCcw size={18} />
              Restore All Transactions
            </button>
          </div>
        )}

        {/* Confirmation Modal */}
        {showConfirmation && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-800 rounded-xl p-6 max-w-md mx-4 border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-4">Confirm Deletion</h3>
              <p className="text-gray-300 mb-6">
                Are you sure you want to clear {selectedTransactions.size} selected transaction{selectedTransactions.size > 1 ? 's' : ''}? 
                This will hide them from the interface but blockchain transactions cannot be permanently deleted.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowConfirmation(false)}
                  className="flex-1 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  <X size={18} />
                  Cancel
                </button>
                <button
                  onClick={clearSelectedTransactions}
                  className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  <Trash2 size={18} />
                  Clear
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Transactions;