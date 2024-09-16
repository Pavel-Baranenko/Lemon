// utils/text.tsx

export const isValidEthereumAddress = (address: string): boolean => {
    const ethereumAddressRegex = /^0x[a-fA-F0-9]{40}$/;
    return ethereumAddressRegex.test(address);
  };
  
  export const isValidRefLink = (refLink: string): boolean => {
    const refLinkRegex = /^[a-zA-Z0-9-_]+$/;
    return refLinkRegex.test(refLink);
  };
  
  export const isValidMessageFormat = (message: string, template: string): boolean => {
    return message === template;
  };