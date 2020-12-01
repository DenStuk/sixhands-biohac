export class CodeGeneratorService {

    private static readonly numDict: string = "1234567890";
    private static readonly letDict: string = "qazwsxedcrfvtgbyhnujmikolpQAZXSWEDCVFRTGBYHNUJMIKOLP";

    public static generate(length: number) {
        const combDict = this.numDict + this.letDict;
        let code = "";
        for (let i = 0; i < length; i++) code += combDict[Math.floor(Math.random() * combDict.length)];
        return code;
    }

}