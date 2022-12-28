import BaseClass from "../util/baseClass";
import DataStore from "../util/DataStore";
import ExampleClient from "../api/exampleClient";

/**
 * Logic needed for the view playlist page of the website.
 */
class HustleHospitalMainPage extends BaseClass {

    constructor() {
        super();
        this.bindClassMethods(['onGet', 'onCreate', 'renderExample'], this);
        this.dataStore = new DataStore();
    }

       /**
         * Once the page has loaded, set up the event handlers and fetch the concert list.
         */
        async mount() {
            document.getElementById('create-patientForm').addEventListener('submit', this.onGet);
            document.getElementById('create-doctorForm').addEventListener('submit', this.onCreate);
            //Change this new ExampleClient() to HospitalClient() when its made
            this.client = new ExampleClient();

            this.dataStore.addChangeListener(this.renderExample)
        }

 // Render Methods --------------------------------------------------------------------------------------------------

 async renderExample() {
        let resultArea = document.getElementById("result-info");

    //todo: Not sure what dataStore.get(example) means
    //get its from the basically a database from the document
        const example = this.dataStore.get("example");
        if (example) {
            resultArea.innerHTML = `
                <div>ID: ${example.id}</div>
                <div>Name: ${example.name}</div>
            `
        } else {
            resultArea.innerHTML = "No Item";
        }
    }

    // Event Handlers --------------------------------------------------------------------------------------------------
/*ToDo I still have to do the Event Handlers and possibly name them something else */
async onGet(event) {
        // Prevent the page from refreshing on form submit
        event.preventDefault();

        let id = document.getElementById("id-field").value;
        this.dataStore.set("Patient", null);

        let result = await this.client.getExample(id, this.errorHandler);
        this.dataStore.set("Patient", result);
        if (result) {
            this.showMessage(`Got ${result.name}!`)
        } else {
            this.errorHandler("Error doing GET!  Try again...");
        }
    }

    async onCreate(event) {
        // Prevent the page from refreshing on form submit
        event.preventDefault();
        this.dataStore.set("Doctor", null);

        let name = document.getElementById("create-name-field").value;
        //TODO: change the method in client
        const createdDoctor = await this.client.createExample(name, this.errorHandler);
        this.dataStore.set("Doctor", createdDoctor);

        if (createdDoctor) {
            this.showMessage(`Created ${createdExample.name}!`)
        } else {
            this.errorHandler("Error creating!  Try again...");
        }
    }
}

/**
 * Main method to run when the page contents have loaded.
 */
const main = async () => {
    const HustleHospitalMainPage = new HustleHospitalMainPage();
    HustleHospitalMainPage.mount();
};

window.addEventListener('DOMContentLoaded', main);