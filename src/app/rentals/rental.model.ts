export class Rental {

    // public BikeID: number;
    // public RentalDate: string;
    // public Duration: number;

    // constructor(bikeId: number, rentalDate: string, duration: number) 
    // {
    //         this.BikeID = bikeId;
    //         this.RentalDate = rentalDate;
    //         this.Duration = duration;
    // }

    public RentalID: number;
    public BikeID: number;
    public RentalDate: any;
    public Duration: number;
    public Amount: number;
    public FirstName: string;
    public LastName: string;
    public PhoneNumber: string;
    public Paymethod: string;

    constructor(rentalId: number, bikeId: number, rentalDate: string, duration: number, amount: number,
        firstName: string, lastName: string, phoneNumber: string, paymethod: string) 
    {
            this.RentalID = rentalId;
            this.BikeID = bikeId;
            this.RentalDate = rentalDate;
            this.Duration = duration;
            this.Amount = amount;
            this.FirstName = firstName;
            this.LastName = lastName;
            this.PhoneNumber = phoneNumber;
            this.Paymethod = paymethod;
    }

}