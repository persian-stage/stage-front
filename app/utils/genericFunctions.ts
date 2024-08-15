export const setAppRegistered = (appKey: string, isRegistered: boolean) => {
    localStorage.setItem(appKey, JSON.stringify(isRegistered));
}