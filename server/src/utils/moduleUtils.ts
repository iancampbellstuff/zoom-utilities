class ImportError extends Error {}

export const requestModule = async <T = any>(modulePath: string) => {
    try {
        let module = await import(modulePath);
        if (module.default) {
            module = module.default;
        }
        return module as T;
    } catch (error) {
        throw new ImportError(`Unable to import module ${modulePath}!`);
    }
};
