export class Utils {
    public static emit(eventType: string, val: any = null) {
        const customEvent = new CustomEvent(eventType, val ? { detail: val } : null);
        window.dispatchEvent(customEvent);
    }
}