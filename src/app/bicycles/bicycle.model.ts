import { stringify } from "querystring";

export class Bicycle {
    public ID: number;
    public BikeType: string;
    public UnitPrice: number;
    public ImagePath: string;
    public Manufacturer: string;
    public Status: string;
    
    constructor(id: number, bikeType: string, unitPrice: number, imagePath: string, manufacturer:string, status: string)
    {
        this.ID = id;
        this.BikeType = bikeType;
        this.UnitPrice = unitPrice;
        this.ImagePath = imagePath;
        this.Manufacturer = manufacturer;
        this.Status = status;
    }

}