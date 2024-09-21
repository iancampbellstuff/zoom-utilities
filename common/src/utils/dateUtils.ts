export const getNowTimestamp = (expirationSeconds?: number) => {
    const now = new Date();
    if (expirationSeconds && expirationSeconds > 0) {
        now.setSeconds(now.getSeconds() + expirationSeconds);
    }
    const timestamp = now.toISOString();
    return timestamp;
};
export const parseTimestamp = (timestamp?: Date | string) => {
    const parsed = Date.parse(
        timestamp instanceof Date
            ? timestamp.toLocaleString()
            : // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
              (timestamp as string)
    );
    return Number.isNaN(parsed) ? -1 : parsed;
};
export const isExpired = (timestamp?: Date | string | null) => {
    let isExpired = false;
    if (timestamp) {
        const nowTimestamp = getNowTimestamp();
        const now = parseTimestamp(nowTimestamp);
        const parsed = parseTimestamp(timestamp);
        isExpired = parsed <= now;
    }
    return isExpired;
};
export const getExpirationDate = (expirationSeconds: number) => {
    const expirationDate = getNowTimestamp(expirationSeconds);
    return expirationDate;
};
export const getFormattedDate = (timestamp?: Date | string) => {
    const parsed = parseTimestamp(timestamp);
    let date = new Date(parsed);
    const minutesOffset = date.getTimezoneOffset();
    const millisecondsOffset = minutesOffset * 60 * 1000;
    date = new Date(date.getTime() + millisecondsOffset);
    return date;
};
export const getFormattedTimestamp = (timestamp?: Date | string) => {
    const date = getFormattedDate(timestamp);
    const formattedTimestamp = date.toISOString().split('T')[0];
    return formattedTimestamp;
};
