import React, { useState } from 'react';
import { useSignMessage } from 'wagmi';
import {
  isValidRefLink,
} from "src/utils/text";

interface SetLinkButtonProps {
  address: `0x${string}`;
  refId: string;
  setRefLink: (address: string, refLink: string) => void;
  setError: (error: string | null) => void;
}

interface ApiResponse {
  refLink?: string;
  error?: string;
}

export default function SetLinkButton({ address, refId, setRefLink, setError }: SetLinkButtonProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const { signMessageAsync } = useSignMessage();

  const domain = window.location.origin;

  const handleGetRefLink = async () => {
    setLoading(true);
    setError(null);

    if (!isValidRefLink(refId)) {
      setError('Referral link can only contain letters, numbers, dashes, and underscores.');
      setLoading(false);
      return;
    }

    try {
      // Check if the refLink already exists
      const getLinkById = await fetch(`/api/ref?id=${refId}`);
      if (getLinkById.ok) {
        const existingData = (await getLinkById.json()) as ApiResponse;
        if (existingData.refLink) {
          throw new Error('This referral ID is already taken. Please choose another one.');
        }
      }

      const message = `By signing this message, you authorize the referral ID "${refId}" to be linked to your Ethereum address: ${address}. This action confirms your ownership of the address and your intention to set this referral link.`;
      const signature = await signMessageAsync({ message });

      const response = await fetch(`/api/ref?id=${address}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refLink: refId, message, signature }),
      });

      if (!response.ok) {
        const errorData = (await response.json()) as ApiResponse;
        throw new Error(errorData.error || `Request failed with status ${response.status}`);
      }

      const data = (await response.json()) as ApiResponse;
      if (!data.refLink) throw new Error('Unexpected response format');

      // Set the referral link if everything was successful
      setRefLink(address, refId);

    } catch (error: any) {
      setError(error.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      className="btn btn-lg btn-dark rounded-3 w-100 mt-3"
      onClick={handleGetRefLink}
      disabled={loading}
    >
      {loading ? 'Loading...' : 'Set Referral Link'}
    </button>
  );
}
