export class projectmasterdata{

    constructor(
        public protocol:number,
        public url:string,
        public IP:string,
        public FailoverIP:string,
        public projectname:string,
        public description:string,
        public pcname:string,
        public pcemail:string,
        public pcmobile1:string,
        public pcmobile2:string
        // public apikey:number,
        // public projectcode:string,
        // // public createdby:string,
    ){}
}