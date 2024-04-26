import { LightningElement,wire } from 'lwc';
import getComponent from '@salesforce/apex/getCarView.getLatestView';

export default class FilterCarView extends LightningElement {
    componentConstructor;
    error;
    @wire(getComponent)
    wireView({ error, data }) {
        if (data) {
            // Dynamic assignment. Not statically analyzable
            const componentToRender = `c/${data}`;
            this.renderComponent(componentToRender);
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.componentConstructor = undefined;
        }
    }
    
    async renderComponent(componentToRender) {
    try {
        const ctor = await import(componentToRender);
        this.componentConstructor = ctor.default;
    } catch (error) {
        console.error('Error during dynamic import:', error);
        // Handle the error appropriately
    }
    }

}