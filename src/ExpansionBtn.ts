import { Utils } from "./Utils";

export class ExpansionBtn {
    constructor(target: HTMLElement, customEventName: string = 'expand', expanded: boolean = false) {
        this.targetContainer = target;
        this.customEvent = customEventName;
        this.expanded = expanded;
        this.init();

        target.addEventListener('click', () => this.toggleExpansion());
    }
    private target: HTMLElement;
    private targetContainer: HTMLElement;
    private customEvent: string;
    private expanded: boolean;
    private expandClass: string = 'fa-angle-up';
    private reducedClass: string = 'fa-angle-down';

    public toggleExpansion() {
        this.expanded = !this.expanded;
        Utils.emit(this.customEvent, this.expanded);
        //! instead of remove should handle a transiton on rotation 180°
        this.removeTargetClass();
        this.addTargetClass();
    }
    private removeTargetClass() {
        this.target.classList.remove(this.expanded ? this.reducedClass : this.expandClass);
    }
    private addTargetClass() {
        this.target.classList.add(this.expanded ? this.expandClass : this.reducedClass);
        console.debug('classList => ', this.target.classList)
    }
    private init() {
        this.target = this.getTargetFromParentNode();
        this.addTargetClass();
    }
    private getTargetFromParentNode(): HTMLElement {
        for (const child of this.targetContainer.children) {
            if (child.classList.contains('control-expansion-btn')) {
                return this.target = child.children[0] as HTMLElement;
            }
        }
    }
}