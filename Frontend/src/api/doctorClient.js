import BaseClass from "../util/baseClass";
import axios from 'axios'

//Client to call the doctorService
export default class DoctorClient extends BaseClass {

    constructor(props ={}){
        super();
        const methodsToBind = ['clientLoaded','getDoctor','createDoctor','getAllDoctors'];
        this.bindClassMethods(methodsToBind, this);
        this.props = props;
        this.clientLoaded(axios);
    }

    clientLoaded(client){
        this.client = client;
        if(this.props.hasOwnProperty("onReady")){
            this.props.onReady();
            }
    }
    //could be the punctuation of DoctorId (doctorId)
    async getDoctor(doctorId, errorCallback){
        try{
            const response = await this.client.get(`/doctor/${doctorId}`)
            return response.data;
        }catch(error){
            this.handleError("getDoctor",error,errorCallback)
            }
    }

    async createDoctor(name,dob,errorCallback){
        try{
            const response = await this.client.post(`/doctor`,{
                "name": name,
                //"doctorId": doctorId
                "dob": dob
                //"isActive": isActive
                });
                return response.data;
                } catch (error) {
                    this.handleError("createDoctor",error, errorCallback);
                }
    }
    //have to make an endpoint in controller based off a service method to get all doctors
    async getAllDoctors(errorCallback){
        try{
            const response = await this.client.get(`/doctor/all`);
            return response.data;
            }catch(error){
                this.handleError("getAllDoctors",error,errorCallback);
                }
        }

        //helper method to log the error and run any error functions. the param is the error recieved from the server

        handleError(method,error,errorCallback) {
            console.error(method + " failed - " + error);
            if(error.response.data.message !== undefined){
                console.error(error.response.data.message);
                }
                if(errorCallback){
                    errorCallback(method + " failed - " + error);
                    }
                  }
}