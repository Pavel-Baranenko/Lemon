import { getRequestContext } from '@cloudflare/next-on-pages';

export const runtime = 'edge';

export const saveRefLink = async (address: string, refLink: string): Promise<void> => {
    try {
        const { env } = getRequestContext();
        const refKv = env.kv_ref;

        if (!refKv) {
            throw new Error("KV Namespace 'ref' is undefined. Check your wrangler.toml configuration.");
        }

        // Convert address and refLink to lowercase
        const lowerCaseAddress = address.toLowerCase();
        const lowerCaseRefLink = refLink.toLowerCase();

        await refKv.put(lowerCaseRefLink, lowerCaseAddress);
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error(`Error in saveRefLink: ${error.message}`, {
                function: 'saveRefLink',
                params: { address, refLink },
                stack: error.stack,
            });
        } else {
            console.error(`Unknown error in saveRefLink`, {
                function: 'saveRefLink',
                params: { address, refLink },
                error,
            });
        }
        throw error; // Propagate the error to the caller
    }
};

export const fetchRefLink = async (link: string): Promise<string | null> => {
    try {
        const { env } = getRequestContext();
        const refKv = env.kv_ref;

        if (!refKv) {
            throw new Error("KV Namespace 'ref' is undefined. Check your wrangler.toml configuration.");
        }

        // Convert link to lowercase
        const lowerCaseLink = link.toLowerCase();

        const result = await refKv.get(lowerCaseLink);
        return result;
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error(`Error in fetchRefLink: ${error.message}`, {
                function: 'fetchRefLink',
                params: { link },
                stack: error.stack,
            });
        } else {
            console.error(`Unknown error in fetchRefLink`, {
                function: 'fetchRefLink',
                params: { link },
                error,
            });
        }
        throw error; // Propagate the error to the caller
    }
};

export const deleteRefLink = async (address: string): Promise<void> => {
    try {
        const { env } = getRequestContext();
        const refKv = env.kv_ref;

        if (!refKv) {
            throw new Error("KV Namespace 'ref' is undefined. Check your wrangler.toml configuration.");
        }

        // Convert address to lowercase
        const lowerCaseAddress = address.toLowerCase();

        await refKv.delete(lowerCaseAddress);
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error(`Error in deleteRefLink: ${error.message}`, {
                function: 'deleteRefLink',
                params: { address },
                stack: error.stack,
            });
        } else {
            console.error(`Unknown error in deleteRefLink`, {
                function: 'deleteRefLink',
                params: { address },
                error,
            });
        }
        throw error; // Propagate the error to the caller
    }
};
