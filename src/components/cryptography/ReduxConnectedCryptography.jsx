import React from "react";
import { CryptographyProvider, randomString } from "cryptography/Cryptography";
import { useSelector } from "react-redux";
import { compiler as profileCompiler } from "../blockchain/chains/profileChain";
import { useBlockchain } from "../blockchain/Blockchain";

const ReduxConnectedCryptography = ({ children }) => {
  const userProfileBlockchain = useSelector(
    (state) => state.userProfile.blockchain,
  );
  const { compiledBlockchain: userProfile } = useBlockchain({
    compiler: profileCompiler,
    blockchain: userProfileBlockchain,
  });

  return (
    <CryptographyProvider entropy={userProfile.encryptionSignature + randomString()}>
      {children}
    </CryptographyProvider>
  );
};

export default ReduxConnectedCryptography;
