import React, { useState } from 'react'


interface GetLinkButtonProps {
  address: string;
  customRefLink: string;
  setRefLink: (link: string) => void;
  setError: (error: string | null) => void;
}

export default function GetLinkButton({ address, customRefLink, setRefLink, setError }: GetLinkButtonProps) {
  const [loading, setLoading] = useState<boolean>(false);

  const validateCustomRefLink = (link: string) => {
    // Validate allowed characters
    const valid = /^[a-zA-Z0-9-_]+$/.test(link);
    if (!valid) {
      return 'Referral link can only contain letters, numbers, dashes, and underscores.';
    }
    return null;
  };

  const handleGetRefLink = async () => {
    setLoading(true);
    setError(null);

    // Validate the custom referral link
    const validationError = validateCustomRefLink(customRefLink);
    if (validationError) {
      setError(validationError);
      setLoading(false);
      return;
    }
/*
    try {
      // Make the POST request to the API to save the referral link
      const response = await fetch(`/api/cloudflayer/referral`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ address, refLink: customRefLink }),
      });

      if (!response.ok) {
        throw new Error(`${JSON.stringify(response)}`);
      }

      const data = await response.json();
      setRefLink(data.refLink);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }*/
  };

  return (
    <button
      className="btn btn-lg btn-dark rounded-3 w-100 mt-3"
      onClick={handleGetRefLink}
      disabled={loading}
    >
      {loading ? 'Loading...' : 'Change Link'}
    </button>
  );
}
