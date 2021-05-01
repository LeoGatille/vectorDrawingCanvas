export class ExpansionBtn {
    constructor(target: HTMLElement, expanded: boolean = false) {
        this.targetContainer = target;
        this.init();

        this.expanded = expanded;
    }
    private target: HTMLElement;
    private targetContainer: HTMLElement;
    private expanded: boolean;
    private expandClass: string = 'fa-angle-up';
    private reducedClass: string = 'fa-angle-down';

    public toggleExpansion() {
        this.expanded = !this.expanded;
        this.removeTargetClass()
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