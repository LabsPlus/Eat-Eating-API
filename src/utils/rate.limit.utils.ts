class RateLimitUtils {
    private blocked: Map<string, number> = new Map();

    constructor() {

    }

    blockIp(ip: string): void {
        this.blocked.set(ip, Date.now() + 15 * 60 * 1000);
    }

    verifyBlock(ip: string): Boolean {
        const blockTime = this.blocked.get(ip);
        return blockTime ? blockTime > Date.now() : false;
    }
}

export {RateLimitUtils};