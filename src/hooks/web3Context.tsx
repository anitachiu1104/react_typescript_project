import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import Web3Modal from 'web3modal';
import { providers } from 'ethers';
import { ChainId, env } from '../constansts';

const Web3Context = React.createContext<Web3ContextData | undefined>(undefined);

export interface Connection {
  signer?: providers.JsonRpcSigner;
  provider?: providers.JsonRpcProvider;
  account?: string;
  chainId?: ChainId;
  supportedChainId: boolean;
}

interface Web3ContextData extends Connection {
  connect: () => void;
  disconnect: () => void;
  connected: boolean;
}

const web3Modal = new Web3Modal({
  network: 'mainnet',
  cacheProvider: true,
  providerOptions: {},
});

export const useWeb3Context = (): Web3ContextData => {
  const web3Context = useContext(Web3Context);
  if (!web3Context) {
    throw new Error(
      `useWeb3Context() can only be used inside of <Web3ContextProvider />, please declare it at a higher level.`,
    );
  }
  return useMemo(() => web3Context, [web3Context]);
};

export default function Web3ContextProvider({ children }: { children: JSX.Element }): JSX.Element {
  const [state, setState] = useState<Connection & { web3Provider?: any }>({
    supportedChainId: false,
  });

  const connect = useCallback(async () => {
    const web3Provider = await web3Modal.connect();
    const provider = new providers.Web3Provider(web3Provider);
    const signer = provider.getSigner();
    const [account, network] = await Promise.all([signer.getAddress(), provider.getNetwork()]);
    const chainId = network.chainId as ChainId;

    setState({
      web3Provider,
      signer,
      account,
      provider,
      chainId,
      supportedChainId: chainId !== undefined && env.config[chainId] !== undefined,
    });
  }, []);

  const disconnect = useCallback(async () => {
    await web3Modal.clearCachedProvider();
    if (state.web3Provider && state.web3Provider.disconnect && typeof state.web3Provider.disconnect === 'function') {
      await state.web3Provider.disconnect();
    }
    window.location.reload();
  }, [state.web3Provider]);

  useEffect(() => {
    const handleAccountsChanged = (): void => {
      window.location.reload();
    };
    const handleChainChanged = (): void => {
      window.location.reload();
    };
    const handleDisconnect = (): void => {
      disconnect().then();
    };

    if (state.web3Provider?.on) {
      state.web3Provider.on('accountsChanged', handleAccountsChanged);
      state.web3Provider.on('chainChanged', handleChainChanged);
      state.web3Provider.on('disconnect', handleDisconnect);
    }

    return () => {
      if (state.web3Provider?.removeListener) {
        state.web3Provider.removeListener('accountsChanged', handleAccountsChanged);
        state.web3Provider.removeListener('chainChanged', handleChainChanged);
        state.web3Provider.removeListener('disconnect', handleDisconnect);
      }
    };
  }, [state.web3Provider, disconnect]);

  useEffect(() => {
    if (web3Modal.cachedProvider) {
      connect().then();
    }
  }, [connect]);

  const data = useMemo<Web3ContextData>(() => {
    const { account, provider, chainId, signer, supportedChainId } = state;
    return {
      account,
      provider,
      chainId,
      signer,
      connect,
      disconnect,
      supportedChainId,
      connected: account !== undefined && provider !== undefined && chainId !== undefined && signer !== undefined,
    };
  }, [state, connect, disconnect]);

  return <Web3Context.Provider value={data}>{children}</Web3Context.Provider>;
}
