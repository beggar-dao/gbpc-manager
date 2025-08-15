import {
  useAccountModal,
  useChainModal,
  useConnectModal,
} from "@rainbow-me/rainbowkit";
import { useEffect, useMemo, useState } from "react";
import {
  useAccount,
  useReadContracts,
  useSwitchChain,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import abiData from "@/utils/abi";
import { etherToWei } from "@/utils/index";
import { useModel } from "@umijs/max";
import { message } from "antd";

export default function AccountModel() {
  const { setLoading } = useModel("global");
  const { address, status, chainId } = useAccount();
  console.log(address, status, chainId);

  const { data: readContractsData, refetch: readContractsRefetch } =
    useReadContracts({
      contracts: [
        {
          address: abiData.address,
          abi: abiData.abi,
          chainId,
          functionName: "owner",
        },
        {
          address: abiData.address,
          abi: abiData.abi,
          chainId,
          functionName: "totalSupply",
        },
        {
          address: abiData.address,
          abi: abiData.abi,
          chainId,
          functionName: "balanceOf",
          args: [address as `0x${string}`],
        },
        {
          address: abiData.address,
          abi: abiData.abi,
          chainId,
          functionName: "decimals",
        },
      ],
    });
  console.log(readContractsData);
  const isSelf = useMemo(() => {
    return (
      (readContractsData &&
        readContractsData[0]?.result?.toString().toLowerCase()) ===
      (address && address.toString().toLowerCase())
    );
  }, [readContractsData, address]);
  const [hash, setHash] = useState<`0x${string}` | undefined>(undefined);
  const { writeContract } = useWriteContract();
  const [callbackFunc, setCallbackFunc] = useState(
    () => () => console.log("callback")
  );
  const { switchChain } = useSwitchChain();
  const { openConnectModal } = useConnectModal();
  const { openAccountModal } = useAccountModal();
  const { openChainModal } = useChainModal();
  const { status: transactionStatus } = useWaitForTransactionReceipt({
    hash,
  });
  useEffect(() => {
    console.log("transactionStatus", transactionStatus);
    if (transactionStatus === "success") {
      callbackFunc();
    } else if (transactionStatus === "error") {
      setCallbackFunc(() => () => {});
      setHash(undefined);
      setLoading(false);
      message.error("Transaction failed");
    }
  }, [transactionStatus]);
  const changeNetWork = async (chainId: number) => {
    await switchChain({ chainId });
  };
  const handleMint = (account: number) => {
    console.log(etherToWei(account), "etherToWei(account)");
    if (!isSelf) {
      message.error("No permission");
      return false;
    }
    setLoading(true);
    writeContract(
      {
        address: abiData.address,
        abi: abiData.abi,
        functionName: "mint",
        args: [
          readContractsData && readContractsData[0]?.result,
          etherToWei(account),
        ],
      },
      {
        onSuccess: (data) => {
          console.log(data, "handleMint");
          setHash(data);
          setCallbackFunc(() => () => {
            message.success("Mint success");
            readContractsRefetch();
            setLoading(false);
            setCallbackFunc(() => () => {});
          });
        },
        onError: (error) => {
          setLoading(false);
          console.log(error);
          message.error(error.message);
        },
      }
    );
  };
  const handleRedeem = (account: number) => {
    if (!isSelf) {
      message.error("No permission");
      return false;
    }
    setLoading(true);
    writeContract(
      {
        address: abiData.address,
        abi: abiData.abi,
        functionName: "burn",
        args: [etherToWei(account)],
      },
      {
        onSuccess: (data) => {
          setHash(data);
          setCallbackFunc(() => () => {
            message.success("Burn success");
            readContractsRefetch();
            setLoading(false);
            setCallbackFunc(() => () => {});
          });
        },
        onError: (error) => {
          setLoading(false);
          console.log(error);
          message.error(error.message);
        },
      }
    );
  };
  const handleTransferOwnership = (newAddress: string) => {
    if (!isSelf) {
      message.error("No permission");
      return false;
    }
    setLoading(true);
    writeContract(
      {
        address: abiData.address,
        abi: abiData.abi,
        functionName: "transferOwnership",
        args: [newAddress],
      },
      {
        onSuccess: (data) => {
          setHash(data);
          setCallbackFunc(() => () => {
            message.success("Transfer ownership success");
            readContractsRefetch();
            setLoading(false);
            setCallbackFunc(() => () => {});
          });
        },
        onError: (error) => {
          setLoading(false);
          console.log(error);
          message.error(error.message);
        },
      }
    );
  };
  return {
    readContractsData,
    handleRedeem,
    handleMint,
    handleTransferOwnership,
    status,
    address,
    chainId,
    callbackFunc,
    setCallbackFunc,
    setHash,
    changeNetWork,
    openConnectModal,
    openAccountModal,
    openChainModal,
    writeContract,
  };
}
