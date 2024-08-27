const MINIMUM_TRUNCATE_LENGTH = 20;
const DEFAULT_TRUNCATE_LENGTH = 40;

export const truncate = (
    str: string,
    length: number = DEFAULT_TRUNCATE_LENGTH
) => {
    const strLength = str?.length ?? 0;
    if (length < MINIMUM_TRUNCATE_LENGTH || strLength <= length) {
        return str;
    }
    const truncated = `${str.substring(0, length - 3)}...`;
    return truncated;
};
