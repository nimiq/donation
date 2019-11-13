import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import { WalletStore } from '@/lib/WalletStore';
import { WalletInfo, WalletType } from '@/lib/WalletInfo';
import { AccountInfo } from '@/lib/AccountInfo';
import { ContractInfo } from '@/lib/ContractInfo';
import {
    LEGACY_GROUPING_ACCOUNT_ID,
    LEGACY_GROUPING_ACCOUNT_LABEL,
} from '@/lib/Constants';

Vue.use(Vuex);

export interface RootState {
    wallets: WalletInfo[]; // TODO: this is not JSON compatible, is this a problem?
    activeWalletId: string | null;
    activeUserFriendlyAddress: string | null;
}

const store: StoreOptions<RootState> = {
    state: {
        wallets: [],
        activeWalletId: null,
        activeUserFriendlyAddress: null,
    },
    mutations: {
        initWallets(state, wallets: WalletInfo[]) {
            state.wallets = wallets;
        },
        setActiveAccount(state, payload: { walletId: string, userFriendlyAddress: string }) {
            state.activeWalletId = payload.walletId;
            state.activeUserFriendlyAddress = payload.userFriendlyAddress;
            // Store as recent account for next requests
            localStorage.setItem('_recentAccount', JSON.stringify(payload));
        },
    },
    actions: {
        initWallets({ state, commit }) {
            // Fetch data from store
            return WalletStore.Instance.list().then((walletInfoEntries) => {
                const wallets = walletInfoEntries.map((walletInfoEntry) => WalletInfo.fromObject(walletInfoEntry));
                commit('initWallets', wallets);

                if (wallets.length === 0) return;

                // Try loading active
                let activeWallet: WalletInfo | undefined;
                let activeUserFriendlyAddress: string | null = null;

                const storedRecentAccount = localStorage.getItem('_recentAccount');
                if (storedRecentAccount) {
                    try {
                        const recentAccount = JSON.parse(storedRecentAccount);
                        activeWallet = state.wallets.find((x) => x.id === recentAccount.walletId);
                        activeUserFriendlyAddress = recentAccount.userFriendlyAddress;
                    } catch (err) {
                        // Do nothing
                    }
                }

                if (!activeWallet) {
                    // If none found, pre-select the first available
                    activeWallet = state.wallets[0];
                }

                // Validate that the address exists on the active wallet
                if (activeUserFriendlyAddress) {
                    const activeAccount = activeWallet.accounts.get(activeUserFriendlyAddress);
                    if (!activeAccount) activeUserFriendlyAddress = null;
                }

                if (!activeUserFriendlyAddress) {
                    // If none found, pre-select the first available
                    const account = activeWallet.accounts.values().next().value;
                    if (!account) return; // No addresses on this wallet
                    activeUserFriendlyAddress = account.userFriendlyAddress;
                }

                commit('setActiveAccount', {
                    walletId: activeWallet.id,
                    userFriendlyAddress: activeUserFriendlyAddress,
                });
            });
        },
    },
    getters: {
        processedWallets: (state) => {
            const singleAccounts = new Map<string, AccountInfo>();
            const singleContracts: ContractInfo[] = [];

            const processedWallets = state.wallets.filter((wallet) => {
                if (wallet.keyMissing) return false;
                if (wallet.type !== WalletType.LEGACY) return true;

                const [singleAccountAddress, singleAccountInfo] = Array.from(wallet.accounts.entries())[0];
                singleAccountInfo.walletId = wallet.id;
                singleAccounts.set(singleAccountAddress, singleAccountInfo);

                for (const contract of wallet.contracts) {
                    contract.walletId = wallet.id;
                    singleContracts.push(contract);
                }

                return false;
            });

            if (singleAccounts.size > 0) {
                processedWallets.push(new WalletInfo(
                    LEGACY_GROUPING_ACCOUNT_ID,
                    /* keyId */ '',
                    LEGACY_GROUPING_ACCOUNT_LABEL,
                    singleAccounts,
                    singleContracts,
                    WalletType.LEGACY,
                ));
            }

            return processedWallets;
        },
    },
};

export default new Vuex.Store<RootState>(store);
