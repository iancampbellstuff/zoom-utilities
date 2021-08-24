export const getNowTimestamp = () => {
    const now = new Date();
    const timestamp = now.toISOString();
    return timestamp;
};
export const isExpired = (timestamp?: Date | string) => {
    let isExpired = true;
    if (timestamp) {
        const nowTimestamp = getNowTimestamp();
        const now = Date.parse(nowTimestamp);
        const date = Date.parse(
            timestamp instanceof Date ? timestamp.toLocaleString() : timestamp
        );
        isExpired = date <= now;
    }
    return isExpired;
};
